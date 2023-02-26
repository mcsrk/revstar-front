import { useState } from "react";
import { Button, Card, Checkbox, Form, Input, Spin } from "antd";
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

	const handleCreateUser = async (newuserBody) => {
		setSignupLoading(true);
		try {
			await createUser(newuserBody);
			openNotification("success", "Usuario creado!");
			form.resetFields();

			// setOpen(false); // TODO: Redirect to login
		} catch (e) {
			console.log("[Signup] - Error creando usuario", e.response.data.message);
			openNotification("error", "Error creando usuario.", e.response.data.message);
		} finally {
			setSignupLoading(false);
		}
	};

	const onFinish = (values) => {
		const newUserData = {
			username: btoa(values?.username.trim()),
			password: btoa(values?.password.trim()),
			is_admin: btoa(values?.is_admin ?? false),
		};

		handleCreateUser(newUserData);
	};

	return (
		<Card className="max-w-md">
			<LandingCardHeader heading="Crea un usuario" paragraph="¿Ya tienes un usuario? " linkName="Ingresa" linkUrl="/" />
			<Spin spinning={signupLoading}>
				<Form
					form={form}
					layout="vertical"
					name="signup"
					className="w-full "
					onFinish={onFinish}
					autoComplete="off"
					initialValues={{ is_admin: false }}
				>
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

					<Form.Item name="is_admin" valuePropName="checked">
						<Checkbox>¿Eres administrador?</Checkbox>
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
