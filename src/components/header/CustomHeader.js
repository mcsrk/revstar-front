import { LogoutOutlined } from "@ant-design/icons";
import { Menu, Layout, Button } from "antd";

// Constants
import sidebar_menu from "constants/header-menu";
import { logOutUser } from "services/userService";

// Const
const { Header } = Layout;

const CustomHeader = () => {
	return (
		<Header className="flex justify-between items-center px-4 sm:px-6">
			<div className="w-5/6 flex flex-row items-center">
				<div className="w-32 h-7 my-4 mr-6 bg-blue-900 float-left" />
				<Menu
					className="w-full"
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={[sidebar_menu.default]}
					items={sidebar_menu.items}
				/>
			</div>
			<Button danger ghost onClick={logOutUser} icon={<LogoutOutlined />} />
		</Header>
	);
};

export default CustomHeader;
