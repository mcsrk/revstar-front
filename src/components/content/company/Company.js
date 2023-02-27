import { useEffect, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";

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

	const userData = getUserData();
	const isAdmin = userData?.is_admin;

	const [open, setOpen] = useState(false);

	const [companiesLoading, setCompaniesLoading] = useState(false);
	const [companies, setCompanies] = useState([]);

	const [loadingDelete, setLoadingDelete] = useState(false);

	let columns = [...company_table_cols];

	const handleGetCompanies = async ({ id, is_admin }) => {
		setCompaniesLoading(true);
		try {
			let res;
			if (is_admin) {
				res = await getCompaniesByUser(id);
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
			handleGetCompanies(userData);
		} catch (e) {
			console.log("[Company] - Error eliminando empresa", e.response?.data?.message);
			openNotification("error", "Error eliminando empresa.", e.response?.data?.message);
		} finally {
			setLoadingDelete(false);
		}
	};

	const reloadCompanies = () => {
		handleGetCompanies(userData);
	};

	if (isAdmin) {
		columns.push({
			title: "Acción",
			key: "action",
			width: "5%",
			render: (_, record) => (
				<Popconfirm
					title="Borrar empresa"
					description="Seguro que quieres borrar esta empresa?"
					onConfirm={(e) => {
						e.stopPropagation();
						handleDeleteCompany(record.nit);
					}}
					onCancel={(e) => e.stopPropagation()}
					okButtonProps={{ loading: loadingDelete }}
					icon={
						<QuestionCircleOutlined
							style={{
								color: "red",
							}}
						/>
					}
					okText="Sí"
					cancelText="No"
					placement="bottom"
				>
					<Button
						onClick={(e) => e.stopPropagation()}
						danger
						type="text"
						shape="circle"
						icon={<DeleteOutlined />}
						loading={loadingDelete}
						size="small"
					/>
				</Popconfirm>
			),
		});
	}
	useEffect(() => {
		handleGetCompanies(userData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClickRow = (row) => {
		const { key } = row;
		navigate(`/companies/${key}/inventory`);
	};

	return (
		<>
			<TableTitle
				title={`${isAdmin ? "Tus" : "Todas las"} empresas`}
				allowAction={isAdmin}
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
				rowClassName="cursor-pointer"
			/>
			<CompanyForm open={open} setOpen={setOpen} reloadCompanies={reloadCompanies} />
		</>
	);
};

export default Company;
