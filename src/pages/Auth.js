import { Layout } from "antd";

// Components
import Login from "components/auth/Login";
import Signup from "components/auth/Signup";

// Constants
const { Content } = Layout;

const Auth = () => {
	return (
		<Content className="px-6 sm:px-12">
			<div className="min-h-screen p-4 sm:p-6">
				<Login />
				<Signup />
			</div>
		</Content>
	);
};

export default Auth;
