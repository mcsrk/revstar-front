import { Button, Card, Form, Input, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// Constants
const { Content } = Layout;

const Login = () => {
	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Content className="px-6 sm:px-12">
			<div className="min-h-screen p-4 sm:p-6">
				<Card className="max-w-sm">
					<Form
						layout="vertical"
						name="basic"
						labelCol={{
							span: 16,
						}}
						wrapperCol={{
							span: 24,
						}}
						className="w-full bg-white"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Nombre de usuario"
							name="username"
							rules={[
								{
									required: true,
									message: "Ingrese su nombre de usuario!",
								},
							]}
						>
							<Input prefix={<UserOutlined className="site-form-item-icon" />} />
						</Form.Item>

						<Form.Item
							label="Contraseña"
							name="password"
							rules={[
								{
									required: true,
									message: "Ingrese su contraseña!",
								},
							]}
						>
							<Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit" className="w-full">
								Ingresar
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</Content>
	);
};

export default Login;
