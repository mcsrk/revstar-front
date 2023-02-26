import { useState } from "react";
import { Button, Card, Form, Input, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// Components
import LandingCardHeader from "components/common/LandingCardHeader";

// Services
import { loginUser } from "services/userService";

// Utils
import { openNotification } from "utils/utils";

const Login = ({ setCurrentTab }) => {
	const [form] = Form.useForm();
	const [loginLoading, setLoginLoading] = useState(false);

	const handleLogin = async (username, password) => {
		setLoginLoading(true);
		try {
			await loginUser(username, password);

			openNotification("success", "Bienvenido!");
			form.resetFields();
		} catch (e) {
			console.log("[Login] - Error iniciando sesión", e.response?.data?.message);
			openNotification("error", "Error iniciando sesión.", e.response?.data?.message);
		} finally {
			setLoginLoading(false);
		}
	};

	const onFinish = (values) => {
		handleLogin(values.username.trim(), values.password.trim());
	};

	return (
		<Card className="max-w-md mx-auto">
			<LandingCardHeader
				heading="Ingresa con tu cuenta"
				paragraph="¿No tienes una cuenta aún? "
				linkName="Registrate"
				onClick={() => setCurrentTab("SIGNUP")}
			/>
			<Spin spinning={loginLoading}>
				<Form form={form} layout="vertical" name="login" className="w-full" onFinish={onFinish} autoComplete="off">
					<Form.Item
						name="username"
						label="Nombre de usuario"
						rules={[
							{
								required: true,
								message: "Ingrese su nombre de usuario!",
							},
						]}
					>
						<Input placeholder="Jhac Admin" prefix={<UserOutlined className="site-form-item-icon" />} />
					</Form.Item>

					<Form.Item
						name="password"
						label="Contraseña"
						rules={[
							{
								required: true,
								message: "Ingrese su contraseña!",
							},
						]}
					>
						<Input.Password placeholder="123456" prefix={<LockOutlined className="site-form-item-icon" />} />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loginLoading} className="w-full">
							Ingresar
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</Card>
	);
};

export default Login;
