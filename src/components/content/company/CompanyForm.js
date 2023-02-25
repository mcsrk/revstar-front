import { Form, Input, Modal, Select } from "antd";

// Constants
const { Option } = Select;

const CompanyForm = ({ open, onCreate, onCancel }) => {
	const [form] = Form.useForm();
	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select
				style={{
					width: 70,
				}}
			>
				<Option value="1">+1</Option>
				<Option value="57">+57</Option>
			</Select>
		</Form.Item>
	);

	return (
		<Modal
			open={open}
			title="Crear nueva empresa"
			okText="Crear empresa"
			cancelText="Cancelar"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
				initialValues={{
					prefix: "57",
				}}
			>
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
					<Input />
				</Form.Item>
				<Form.Item name="address" label="Dirección">
					<Input type="textarea" placeholder="Ej: Calle 123 # 45 - 67, Barrio Los Pinos" />
				</Form.Item>
				<Form.Item name="phone" label="Teléfono móvil">
					<Input
						addonBefore={prefixSelector}
						style={{
							width: "100%",
						}}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CompanyForm;
