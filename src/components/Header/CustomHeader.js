import { Menu, Layout } from "antd";

// Constants
import sidebar_menu from "constants/header-menu";
const { Header } = Layout;

const CustomHeader = () => {
	return (
		<Header>
			<div className="w-32 h-7 my-4 mr-6 bg-blue-900 float-left" />
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[sidebar_menu.default]} items={sidebar_menu.items} />
		</Header>
	);
};

export default CustomHeader;
