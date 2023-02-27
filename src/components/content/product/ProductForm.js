import { useState } from "react";
import { Col, Form, Input, InputNumber, Modal, Row, Spin } from "antd";

// Services
import { createProduct } from "services/productService";

// Utils
import { openNotification } from "utils/utils";

// Constanst
const { TextArea } = Input;

const ProductForm = ({ open, setOpen, reloadProducts, inventoryId }) => {
	const [form] = Form.useForm();
	const [createLoading, setCreateLoading] = useState(false);

	const handleCreateProduct = async (inventoryId, productBody) => {
		setCreateLoading(true);
		try {
			await createProduct(inventoryId, productBody);

			reloadProducts();

			openNotification("success", "Producto creado!");
			form.resetFields();

			setOpen(false);
		} catch (e) {
			console.log("[ProductForm] - Error creando producto");
			openNotification("error", "Error creando producto.", e.response.data.message);
		} finally {
			setCreateLoading(false);
		}
	};

	const onCreate = (values) => {
		const productBody = {
			name: values.name,
			price: values.price,
			stock: values.stock,
			description: values?.description ?? null,
		};
		console.log(productBody);
		handleCreateProduct(inventoryId, productBody);
	};

	return (
		<Modal
			open={open}
			title="Crear nuevo artículo"
			okText="Crear artículo"
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
						console.log("[ProductForm] - Validate Failed:", info);
					});
			}}
		>
			<Spin spinning={createLoading}>
				<Form
					form={form}
					layout="vertical"
					name="create_product"
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
			</Spin>
		</Modal>
	);
};

export default ProductForm;
