import { useState } from "react";
import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Components
import TableTitle from "components/common/TableTitle";
import ProductForm from "./ProductForm";
import iventory_table_cols from "constants/inventory-table";

import { getUserData } from "services/userService";
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
	const { is_admin } = getUserData();

	const [open, setOpen] = useState(false);

	return (
		<>
			<TableTitle
				title="Inventario"
				btnTitle="Crear Articulo"
				allowAction={is_admin}
				icon={<PlusOutlined />}
				btnAction={() => {
					setOpen(true);
				}}
			/>

			<Table className="mt-8" columns={iventory_table_cols} dataSource={data} />
			<ProductForm open={open} setOpen={setOpen} />
		</>
	);
};

export default Inventory;
