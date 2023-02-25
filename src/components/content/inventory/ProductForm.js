import { Col, Form, Input, InputNumber, Modal, Row } from "antd";

// Constanst
const { TextArea } = Input;

const ProductForm = ({ open, onCreate, onCancel }) => {
	const [form] = Form.useForm();
	const onChange = (value) => {
		console.log("changed", value);
	};

	return (
		<Modal
			open={open}
			title="Crear nuevo artículo"
			okText="Crear artículo"
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
					price: 1000,
					stock: 1,
				}}
			>
				<Form.Item
					name="name"
					label="Nombre"
					rules={[
						{
							required: true,
							message: "Ingrese nombre del producto!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Row gutter={24}>
					<Col span={12}>
						<Form.Item
							name="price"
							label="Precio"
							rules={[
								{
									required: true,
									message: "Ingrese precio del producto!",
								},
							]}
						>
							<InputNumber
								className="w-full"
								min={50}
								formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
								onChange={onChange}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="stock"
							label="Cantidad"
							rules={[
								{
									required: true,
									message: "Ingrese cantidad del producto!",
								},
							]}
						>
							<InputNumber className="w-full" min={0} />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item name="description" label="Descripción">
					<TextArea
						rows={4}
						placeholder="Descripción detallada del producto, como color, tamaño talla, materiales, etc..."
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ProductForm;
