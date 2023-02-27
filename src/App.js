import { Layout, theme, ConfigProvider } from "antd";
import es_ES from "antd/es/locale/es_ES";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

// Components
import CustomHeader from "components/header/CustomHeader";
import CustomFooter from "components/footer/CustomFooter";
import Auth from "pages/Auth";
import Main from "pages/Main";

// Styles
import "./index.css";

function App() {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<ConfigProvider locale={es_ES}>
			<BrowserRouter history={createBrowserHistory()}>
				<Auth>
					<Layout className="layout">
						<CustomHeader />
						<Main colorBgContainer={colorBgContainer} />
						<CustomFooter />
					</Layout>
				</Auth>
			</BrowserRouter>
		</ConfigProvider>
	);
}

export default App;
