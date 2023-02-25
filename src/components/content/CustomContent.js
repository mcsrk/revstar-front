import { Breadcrumb, Layout } from "antd";

// Componets
import Company from "./company/Company";
import Inventory from "./inventory/Inventory";

// Constants
const { Content } = Layout;

const CustomContent = ({ colorBgContainer }) => {
	return (
		<Content className="px-6 sm:px-12">
			<Breadcrumb className="my-4">
				<Breadcrumb.Item>Home</Breadcrumb.Item>
				<Breadcrumb.Item>List</Breadcrumb.Item>
				<Breadcrumb.Item>App</Breadcrumb.Item>
			</Breadcrumb>
			<div
				className="min-h-screen p-4 sm:p-6"
				style={{
					background: colorBgContainer,
				}}
			>
				<Company />
				<Inventory />
			</div>
		</Content>
	);
};

export default CustomContent;
