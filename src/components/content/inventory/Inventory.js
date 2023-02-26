import { useState } from "react";
import { Button, Table } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// Components
import TableTitle from "components/common/TableTitle";
import ProductForm from "./ProductForm";

// Costansts
const columns = [
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

const data = [
	{
		key: "1",
		name: "John Brown",
		stock: 32,
		price: 20.99,
		description: "New York No. 1 Lake Park",
	},
	{
		key: "2",
		name: "Jim Green",
		stock: 42,
		price: 20.99,
		description: "London No. 1 Lake Park",
	},
	{
		key: "3",
		name: "Joe Black",
		stock: 32,
		price: 20.99,
		description: "Sydney No. 1 Lake Park",
	},
];

const Inventory = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableTitle
				title="Inventario"
				btnTitle="Crear Articulo"
				icon={<PlusOutlined />}
				btnAction={() => {
					setOpen(true);
				}}
			/>

			<Table className="mt-8" columns={columns} dataSource={data} />
			<ProductForm open={open} setOpen={setOpen} />
		</>
	);
};

export default Inventory;
