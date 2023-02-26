import { Layout, theme, ConfigProvider } from "antd";
import es_ES from "antd/es/locale/es_ES";
import { BrowserRouter } from "react-router-dom";

// Components
import CustomHeader from "components/header/CustomHeader";
import CustomFooter from "components/footer/CustomFooter";
import Auth from "pages/Auth";
import Main from "pages/Main";

// Styles
import "./index.css";
import { createBrowserHistory } from "history";

function App() {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<ConfigProvider locale={es_ES}>
			<Auth>
				<BrowserRouter history={createBrowserHistory()}>
					<Layout className="layout">
						<CustomHeader />
						<Main colorBgContainer={colorBgContainer} />
						<CustomFooter />
					</Layout>
				</BrowserRouter>
			</Auth>
		</ConfigProvider>
	);
}

export default App;
