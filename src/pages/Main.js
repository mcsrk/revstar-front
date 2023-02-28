import { useEffect } from "react";
import loadable from "@loadable/component";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "antd";

// Utils
import { getToken } from "services/userService";

// Componets
const Company = loadable(() => import("../components/content/company/Company"));
const Inventory = loadable(() => import("../components/content/inventory/Inventory"));
const NotFound = loadable(() => import("../components/content/notFound/NotFound"));

// Constants
const { Content } = Layout;

const Main = ({ colorBgContainer }) => {
	const navigate = useNavigate();
	const token = getToken();

	useEffect(() => {
		// When open the base url in a new tab, rigth after login, redirects to companies.
		if (token) navigate("/companies", { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

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
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Content>
	);
};

export default Main;
