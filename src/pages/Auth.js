import { Layout } from "antd";

// Components
import Login from "components/auth/Login";
import Signup from "components/auth/Signup";

// Constants
const { Content } = Layout;

const Auth = ({ setUserInfo, children }) => {
	const token = localStorage.getItem("token");

	return (
		<Content>
			<div className="min-h-screen ">
				{token ? (
					<>{children}</>
				) : (
					<>
						<Login setUserInfo={setUserInfo} />
						<Signup />
					</>
				)}
			</div>
		</Content>
	);
};

export default Auth;
