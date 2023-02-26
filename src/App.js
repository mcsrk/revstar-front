import { createContext, useEffect, useState } from "react";
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

	const UserContext = createContext();
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		console.log(userInfo);
	}, [userInfo]);

	return (
		<Auth setUserInfo={setUserInfo}>
			<UserContext.Provider value={userInfo}>
				{/* <Router history={createBrowserHistory()}> */}
				<Layout className="layout">
					<CustomHeader />
					<Main colorBgContainer={colorBgContainer} />
					<CustomFooter />
				</Layout>
			</UserContext.Provider>
			{/* </Router> */}
		</Auth>
	);
}

export default App;
