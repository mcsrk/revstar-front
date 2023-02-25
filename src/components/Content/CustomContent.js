import { Breadcrumb, Layout } from "antd";

// Constants
const { Content } = Layout;

const CustomContent = ({ colorBgContainer }) => {
	return (
		<Content className="px-12">
			<Breadcrumb className="my-4">
				<Breadcrumb.Item>Home</Breadcrumb.Item>
				<Breadcrumb.Item>List</Breadcrumb.Item>
				<Breadcrumb.Item>App</Breadcrumb.Item>
			</Breadcrumb>
			<div
				className="min-h-screen p-6"
				style={{
					background: colorBgContainer,
				}}
			>
				<h1 className="text-3xl font-thin">Hello world!</h1>
				Content
			</div>
		</Content>
	);
};

export default CustomContent;
