import { useState } from "react";
import { Button, Table } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// Componets
import TableTitle from "components/common/TableTitle";
import CompanyForm from "./CompanyForm";

// Costansts
const columns = [
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

const data = [
	{
		key: "1",
		name: "John Brown",
		owner_id: 1,
		address: "New York No. 1 Lake Park",
		phone: "+573053507",
	},
	{
		key: "2",
		name: "Jim Green",
		owner_id: 1,
		address: "London No. 1 Lake Park",
		phone: "+57312454434",
	},
	{
		key: "3",
		name: "Joe Black",
		owner_id: 2,
		address: "Sydney No. 1 Lake Park",
		phone: "+5738924603",
	},
];
const Company = () => {
	const [open, setOpen] = useState(false);
	const onCreate = (values) => {
		console.log("Received values of form: ", values);
		setOpen(false);
	};

	return (
		<>
			<TableTitle
				title="Empresas"
				btnTitle="Crear Empresa"
				icon={<PlusOutlined />}
				btnAction={() => {
					setOpen(true);
				}}
			/>

			<Table className="mt-8" columns={columns} dataSource={data} />
			<CompanyForm
				open={open}
				onCreate={onCreate}
				onCancel={() => {
					setOpen(false);
				}}
			/>
		</>
	);
};

export default Company;
