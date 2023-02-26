import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// Router
import { useNavigate } from "react-router";

// Componets
import TableTitle from "components/common/TableTitle";
import CompanyForm from "./CompanyForm";

// Services
import { deleteCompany, getAllCompanies, getCompaniesByUser } from "services/companyService";
import { getUserData } from "services/userService";

//Utils
import { openNotification } from "utils/utils";

// Costansts
import company_table_cols from "constants/company-table";

const Company = () => {
	const navigate = useNavigate();

	const { id, is_admin } = getUserData();

	const [open, setOpen] = useState(false);

	const [companiesLoading, setCompaniesLoading] = useState(false);
	const [companies, setCompanies] = useState([]);

	const [loadingDelete, setLoadingDelete] = useState(false);

	const columns = [...company_table_cols];

	const handleGetCompanies = async (uid, is_admin) => {
		setCompaniesLoading(true);
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
			console.log("[Company] - Error obteniendo empresas", e.response?.data?.message);
			openNotification("error", "Error obteniendo empresas.", e.response?.data?.message);
		} finally {
			setCompaniesLoading(false);
		}
	};

	const handleDeleteCompany = async (nit) => {
		setLoadingDelete(true);
		try {
			await deleteCompany(nit);
			openNotification("success", "Empresa eliminada!", "La empresa se ha eliminado correctamente");
			// hot reload
			handleGetCompanies(id, is_admin);
		} catch (e) {
			console.log("[Company] - Error eliminando empresa", e.response?.data?.message);
			openNotification("error", "Error eliminando empresa.", e.response?.data?.message);
		} finally {
			setLoadingDelete(false);
		}
	};

	useEffect(() => {
		if (is_admin) {
			columns.push({
				title: "Acción",
				key: "action",
				width: "5%",
				render: (_, record) => (
					<Button
						disabled={loadingDelete}
						onClick={() => {
							handleDeleteCompany(record.nit);
						}}
						danger
						ghost
						icon={<DeleteOutlined />}
					/>
				),
			});
		}

		handleGetCompanies(id, is_admin);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleClickRow = (row) => {
		const { key } = row;
		navigate(`/companies/${key}/inventory`);
	};

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

			<Table
				onRow={(row) => {
					return {
						onClick: () => {
							handleClickRow(row);
						},
					};
				}}
				loading={companiesLoading}
				className="mt-8"
				columns={columns}
				dataSource={companies}
			/>
			<CompanyForm open={open} setOpen={setOpen} />
		</>
	);
};

export default Company;
