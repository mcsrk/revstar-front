import { Layout, theme } from "antd";

// Styles
import "./index.css";

// Components
import CustomHeader from "components/header/CustomHeader";
import CustomFooter from "components/footer/CustomFooter";
import Main from "pages/Main";
import Auth from "pages/Auth";

function App() {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Auth>
			{/* <Router history={createBrowserHistory()}> */}
			<Layout className="layout">
				<CustomHeader />
				<Main colorBgContainer={colorBgContainer} />
				<CustomFooter />
			</Layout>
			{/* </Router> */}
		</Auth>
	);
}

export default App;
