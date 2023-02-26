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
		render: (_, record) => {
			return record.address ?? <p className="italic text-gray-400 m-0">Sin datos</p>;
		},
	},
	{
		title: "Telefóno",
		dataIndex: "phone",
		key: "phone",
		responsive: ["sm"],
		render: (_, record) => {
			return record.phone ?? <p className="italic text-gray-400 m-0">Sin datos</p>;
		},
	},

	{
		title: "Acción",
		key: "action",
		width: "5%",
		render: (_, record) => <Button danger ghost icon={<DeleteOutlined />} />,
	},
];

export default company_table_cols;
