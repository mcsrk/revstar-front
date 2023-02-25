import { useState } from "react";
import { Button, Card, Form, Input, Spin, Switch } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// Components
import LandingCardHeader from "components/common/LandingCardHeader";

// Service
import { createUser } from "services/userService";

// Utils
import { openNotification } from "utils/utils";

const Signup = () => {
	const [form] = Form.useForm();
	const [signupLoading, setSignupLoading] = useState(false);

	const handleCreateUser = async (userBody) => {
		setSignupLoading(true);
		try {
			await createUser(userBody);
			openNotification("success", "Usuario creado!");
			form.resetFields();

			// setOpen(false); // TODO: Redirect to login
		} catch (e) {
			console.log("[Signup] - Error creando usuario");
			openNotification("error", "Error creando usuario.", e.response.data.message);
		} finally {
			setSignupLoading(false);
		}
	};

	const onFinish = (userData) => {
		handleCreateUser(userData);
	};

	return (
		<Card className="max-w-md">
			<LandingCardHeader heading="Crea un usuario" paragraph="¿Ya tienes un usuario? " linkName="Ingresa" linkUrl="/" />
			<Spin spinning={signupLoading}>
				<Form layout="vertical" name="basic" className="w-full bg-white" onFinish={onFinish} autoComplete="off">
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
					<Form.Item name="is_admin" label="¿Eres administrador?" className="w-full items-center">
						<Switch />
					</Form.Item>

					<Form.Item>
						<Button htmlType="submit" loading={signupLoading} className="w-full">
							Crear usuario
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</Card>
	);
};

export default Signup;
