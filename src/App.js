import { Layout, theme } from "antd";

// Styles
import "./index.css";

// Components
import CustomHeader from "components/Header/CustomHeader";
import CustomContent from "components/Content/CustomContent";
import CustomFooter from "components/Footer/CustomFooter";

function App() {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout className="layout">
			<CustomHeader />
			<CustomContent colorBgContainer={colorBgContainer} />
			<CustomFooter />
		</Layout>
	);
}

export default App;
