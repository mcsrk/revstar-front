import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const company_table_cols = [
	{
		title: "Nombre",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Dirección",
		dataIndex: "address",
		key: "address",
		responsive: ["md"],
	},
	{
		title: "Telefóno",
		dataIndex: "phone",
		key: "phone",
		responsive: ["sm"],
	},

	{
		title: "Acción",
		key: "action",
		width: "5%",
		render: (_, record) => <Button danger ghost icon={<DeleteOutlined />} />,
	},
];

export default company_table_cols;
