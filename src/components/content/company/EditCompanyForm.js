import { useCallback, useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Spin } from "antd";

// Services
import { getCompanyByNit, updateCompany } from "services/companyService";

// Utils
import { openNotification } from "utils/utils";

// Constants
import { phonePrefixOptions, phonePrefixRaw } from "constants/company-form";
import loadingMessages from "constants/loading-messages";

const EditCompanyForm = ({ open, setOpen, reloadCompanies, companyNit, setCompanyNit }) => {
	const [form] = Form.useForm();

	const [getDataLoading, setGetDataLoading] = useState(false);

	const [updateLoading, setUpdateLoading] = useState(false);

	const [editingValues, setEditingValues] = useState(null);

	const handleGetCompanyByNit = useCallback(async (nit) => {
		setGetDataLoading(true);
		try {
			const companyDetails = await getCompanyByNit(nit);

			// Remove phone indicator from string and set it as a field
			// TODO: Add phone prefix in Company database data structure

			if (companyDetails.phone !== null) {
				const prefixPattern = new RegExp(`^(${phonePrefixRaw.map((p) => "\\" + p.tag).join("|")})`);

				const phone = companyDetails.phone.replace(prefixPattern, (match, prefix) => {
					companyDetails.prefix = parseInt(prefix.replace("+", ""));
					return "";
				});

				companyDetails.phone = parseInt(phone);
			}
			companyDetails.nit = parseInt(companyDetails.nit);

			form.setFieldsValue(companyDetails);
			setEditingValues(companyDetails);
		} catch (e) {
			console.log("[Company Form] - Error obteniendo  datos deempresa");
			openNotification("error", "Error obteniendo datos de empresa.", e.response.data.message);
		} finally {
			setGetDataLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUpdateCompany = async (nit, companyBody) => {
		setUpdateLoading(true);
		try {
			await updateCompany(nit, companyBody);
			reloadCompanies();
			setCompanyNit(null);
			openNotification("success", "Empresa actualizada!");
			form.resetFields();
			setOpen(false);
		} catch (e) {
			console.log("[Company Form] - Error actualizando empresa");
			openNotification("error", "Error actualizando empresa.", e.response.data.message);
		} finally {
			setUpdateLoading(false);
		}
	};

	const onFinish = (values) => {
		const companyBody = {
			//Editable fields
			name: values.name.trim(),
			// Nullable fields
			address: values?.address?.trim() ?? null,
			phone: values?.phone ? "+" + values.prefix + values?.phone : null,
		};

		handleUpdateCompany(companyNit, companyBody);
	};

	// Get the newest information directly from Server
	useEffect(() => {
		if (companyNit) {
			handleGetCompanyByNit(companyNit);
		}
	}, [companyNit, handleGetCompanyByNit]);

	return (
		<Modal
			open={open}
			title="Editar empresa"
			okText="Guardar cambios"
			cancelText="Cancelar"
			onCancel={() => {
				setOpen(false);
				setEditingValues(null);
				form.resetFields();
			}}
			okButtonProps={{ disabled: updateLoading || getDataLoading }}
			cancelButtonProps={{ disabled: updateLoading || getDataLoading }}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						onFinish(values);
					})
					.catch((info) => {
						console.log("[CompanyForm] - Validate Failed:", info);
					});
			}}
		>
			<Spin spinning={getDataLoading} tip={loadingMessages.getSingleCompany}>
				<Spin spinning={updateLoading} tip={loadingMessages.updateCompany}>
					<Form form={form} layout="vertical" name="edit_company" initialValues={{ ...editingValues, prefix: 57 }}>
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
								disabled
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
							<Input
								showCount
								maxLength={250}
								type="textarea"
								placeholder="Ej: Calle 123 # 45 - 67, Barrio Los Pinos"
							/>
						</Form.Item>
						<Form.Item name="phone" label="Teléfono móvil">
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
			</Spin>
		</Modal>
	);
};

export default EditCompanyForm;
