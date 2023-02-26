import { Layout, theme } from "antd";

// Styles
import "./index.css";

// Components
import CustomHeader from "components/header/CustomHeader";
import CustomFooter from "components/footer/CustomFooter";
import Main from "pages/Main";

function App() {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout className="layout">
			<CustomHeader />
			<Main colorBgContainer={colorBgContainer} />
			<CustomFooter />
		</Layout>
	);
}

export default App;
