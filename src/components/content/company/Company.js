import { useEffect, useState } from "react";
import { Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Componets
import TableTitle from "components/common/TableTitle";
import CompanyForm from "./CompanyForm";

// Services
import { getAllCompanies, getCompaniesByUser } from "services/companyService";
import { getUserData } from "services/userService";

//Utils
import { openNotification } from "utils/utils";

// Costansts
import company_table_cols from "constants/company-table";

const Company = () => {
	const { id, is_admin } = getUserData();

	const [open, setOpen] = useState(false);

	const [companiesLoading, setLoginLoading] = useState(false);
	const [companies, setCompanies] = useState([]);

	const handleGetCompanies = async (uid, is_admin) => {
		setLoginLoading(true);
		try {
			let res;
			if (is_admin) {
				res = await getCompaniesByUser(3);
			} else {
				res = await getAllCompanies();
			}

			const updatedRes = res.map((company) => ({
				key: company.nit,
				...company,
			}));

			setCompanies(updatedRes);
			openNotification("success", "Empresas obtenidas!");
		} catch (e) {
			console.log("[Login] - Error obteniendo compañias", e.response?.data?.message);
			openNotification("error", "Error obteniendo compañias.", e.response?.data?.message);
		} finally {
			setLoginLoading(false);
		}
	};

	useEffect(() => {
		handleGetCompanies(id, is_admin);
	}, [id, is_admin]);

	return (
		<>
			<TableTitle
				title={`${is_admin ? "Tus" : "Todas las"} empresas`}
				allowAction={is_admin}
				btnTitle="Crear Empresa"
				icon={<PlusOutlined />}
				btnAction={() => {
					setOpen(true);
				}}
			/>

			<Table loading={companiesLoading} className="mt-8" columns={company_table_cols} dataSource={companies} />
			<CompanyForm open={open} setOpen={setOpen} />
		</>
	);
};

export default Company;
