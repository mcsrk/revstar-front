import { useState } from "react";
import { Form, Input, InputNumber, Modal, Select, Spin } from "antd";

// Services
import { createCompany } from "services/companyService";

// Utils
import { openNotification } from "utils/utils";

// Constants
import prefix from "constants/company-form";
import { getUserData } from "services/userService";

const { Option } = Select;

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
			name: values.name,
			// Nullable fields
			address: values?.address ?? null,
			phone: values?.phone ? "+" + values.prefix + values?.phone : null,
		};

		handleCreateCompany(companyBody);
	};

	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select className="w-20">
				{prefix.map(({ val, tag }) => (
					<Option key={val} value={val}>
						{tag}
					</Option>
				))}
			</Select>
		</Form.Item>
	);

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
			<Spin spinning={createLoading}>
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
					<Form.Item name="address" label="Dirección">
						<Input showCount maxLength={250} type="textarea" placeholder="Ej: Calle 123 # 45 - 67, Barrio Los Pinos" />
					</Form.Item>
					<Form.Item name="phone" label="Teléfono móvil">
						<InputNumber
							maxLength={10}
							addonBefore={prefixSelector}
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
