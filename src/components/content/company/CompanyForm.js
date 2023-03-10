import { useState } from "react";
import { Form, Input, InputNumber, Modal, Spin } from "antd";

// Services
import { createCompany } from "services/companyService";
import { getUserData } from "services/userService";

// Utils
import { openNotification } from "utils/utils";

// Constants
import loadingMessages from "constants/loading-messages";
import { phonePrefixOptions } from "constants/company-form";

const CompanyForm = ({ open, setOpen, reloadCompanies }) => {
	const [form] = Form.useForm();
	const id = getUserData()?.id;

	const [createLoading, setCreateLoading] = useState(false);

	const handleCreateCompany = async (companyBody) => {
		setCreateLoading(true);
		try {
			await createCompany(companyBody);
			reloadCompanies();
			openNotification("success", "Empresa creada!");
			form.resetFields();
			setOpen(false);
		} catch (e) {
			console.log("[Company Form] - Error creando empresa");
			openNotification("error", "Error creando empresa.", e.response.data.message);
		} finally {
			setCreateLoading(false);
		}
	};

	const onCreate = (values) => {
		const companyBody = {
			nit: values.nit,
			owner_id: id,
			name: values.name.trim(),
			// Nullable fields
			address: values?.address?.trim() ?? null,
			phone: values?.phone ? "+" + values.prefix + values?.phone : null,
		};

		handleCreateCompany(companyBody);
	};

	return (
		<Modal
			open={open}
			title="Crear nueva empresa"
			okText="Crear empresa"
			cancelText="Cancelar"
			onCancel={() => {
				setOpen(false);
				form.resetFields();
			}}
			okButtonProps={{ disabled: createLoading }}
			cancelButtonProps={{ disabled: createLoading }}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						onCreate(values);
					})
					.catch((info) => {
						console.log("[CompanyForm] - Validate Failed:", info);
					});
			}}
		>
			<Spin spinning={createLoading} tip={loadingMessages.createCompany}>
				<Form
					form={form}
					layout="vertical"
					name="create_company"
					initialValues={{
						prefix: 57,
					}}
				>
					<Form.Item
						name="nit"
						label="NIT de la empresa"
						rules={[
							{
								required: true,
								message: "Ingrese el NIT de la empresa!",
							},
						]}
					>
						<InputNumber
							maxLength={12}
							style={{
								width: "100%",
							}}
						/>
					</Form.Item>
					<Form.Item
						name="name"
						label="Nombre"
						rules={[
							{
								required: true,
								message: "Ingrese nombre de la empresa!",
							},
						]}
					>
						<Input showCount maxLength={250} />
					</Form.Item>
					<Form.Item name="address" label="Direcci??n">
						<Input showCount maxLength={250} type="textarea" placeholder="Ej: Calle 123 # 45 - 67, Barrio Los Pinos" />
					</Form.Item>
					<Form.Item name="phone" label="Tel??fono m??vil">
						<InputNumber
							maxLength={10}
							addonBefore={phonePrefixOptions}
							style={{
								width: "100%",
							}}
						/>
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};

export default CompanyForm;
