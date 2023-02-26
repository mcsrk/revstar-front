import loadable from "@loadable/component";
import { Layout } from "antd";

import { Route, Routes } from "react-router";

// Constants
const { Content } = Layout;
// Componets
const Company = loadable(() => import("../components/content/company/Company"));
const Inventory = loadable(() => import("../components/content/inventory/Inventory"));

const Main = ({ colorBgContainer }) => {
	return (
		<Content className="px-6 py-6 sm:px-12">
			<div
				className="min-h-screen p-4 sm:p-6"
				style={{
					background: colorBgContainer,
				}}
			>
				<Routes>
					<Route path="/inventory" element={<Inventory />} />
					<Route path="/companies" element={<Company />} />
					{/* <Route path="*" element={<NoMatch />} /> */}
				</Routes>
			</div>
		</Content>
	);
};

export default Main;
