import { ShopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const sidebar_menu = {
	default: "1",
	items: [
		{ key: 1, label: <Link to="/companies">Empresas</Link>, icon: <ShopOutlined /> },
		// { key: 2, label: <Link to="/inventory">Inventarios</Link>, icon: <GoldOutlined /> },
	],
};

export default sidebar_menu;
