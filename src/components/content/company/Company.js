import { useState } from "react";
import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Componets
import TableTitle from "components/common/TableTitle";
import CompanyForm from "./CompanyForm";

// Costansts
import company_table_cols from "constants/company-table";

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

			<Table className="mt-8" columns={company_table_cols} dataSource={data} />
			<CompanyForm open={open} setOpen={setOpen} />
		</>
	);
};

export default Company;
