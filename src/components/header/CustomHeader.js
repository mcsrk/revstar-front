import { Menu, Layout, Button } from "antd";

// Constants
import sidebar_menu from "constants/header-menu";
import { logOutUser } from "services/userService";

// Const
const { Header } = Layout;

const CustomHeader = () => {
	return (
		<Header>
			<div className="w-32 h-7 my-4 mr-6 bg-blue-900 float-left" />
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[sidebar_menu.default]} items={sidebar_menu.items} />
			<Button onClick={logOutUser}>Logout</Button>
		</Header>
	);
};

export default CustomHeader;
