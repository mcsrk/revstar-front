// Costansts
const iventory_table_cols = [
	{
		title: "Id",
		dataIndex: "id",
		key: "id",
	},
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
			return record.description ? record.description : <p className="italic text-gray-400 m-0">Sin descripción</p>;
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
];
export default iventory_table_cols;
