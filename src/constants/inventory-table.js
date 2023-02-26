import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// Costansts
const iventory_table_cols = [
	{
		title: "Producto",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Descripción",
		dataIndex: "description",
		key: "description",
		responsive: ["md"],
		render: (_, record) => {
			return record.description ?? <p className="italic text-gray-400 m-0">Sin descripción</p>;
		},
	},
	{
		title: "Precio",
		dataIndex: "price",
		key: "price",
		responsive: ["sm"],
	},
	{
		title: "Cantidad",
		dataIndex: "stock",
		key: "stock",
		responsive: ["xs", "sm"],
	},

	{
		title: "Acción",
		key: "action",
		width: "5%",
		render: (_, record) => <Button danger ghost icon={<DeleteOutlined />} />,
	},
];
export default iventory_table_cols;
