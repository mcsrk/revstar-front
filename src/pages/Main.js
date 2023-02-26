import loadable from "@loadable/component";
import { Layout } from "antd";

import { Route, Routes, Navigate } from "react-router-dom";

// Constants
const { Content } = Layout;
// Componets
const Company = loadable(() => import("../components/content/company/Company"));
const Inventory = loadable(() => import("../components/content/inventory/Inventory"));
const NotFound = loadable(() => import("../components/content/notFound/NotFound"));

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
					<Route path="/companies" element={<Company />} />
					<Route path="/companies/:company_nit/inventory" element={<Inventory />} />
					<Route path="/" element={<Navigate replace to="/companies" />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Content>
	);
};

export default Main;
