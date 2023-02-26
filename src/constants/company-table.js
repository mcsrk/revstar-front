const company_table_cols = [
	{
		title: "Nit",
		dataIndex: "nit",
		key: "nit",
	},
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
			return record?.address ? record.address : <p className="italic text-gray-400 m-0">Sin datos</p>;
		},
	},
	{
		title: "Telefóno",
		dataIndex: "phone",
		key: "phone",
		responsive: ["sm"],
		render: (_, record) => {
			return record?.phone ? record.phone : <p className="italic text-gray-400 m-0">Sin datos</p>;
		},
	},
];

export default company_table_cols;
