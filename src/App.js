import { Layout, theme } from "antd";

// Styles
import "./index.css";

// Components
import CustomHeader from "components/header/CustomHeader";
import CustomContent from "components/content/CustomContent";
import CustomFooter from "components/footer/CustomFooter";

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
