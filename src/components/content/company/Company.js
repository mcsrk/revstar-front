import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined, EditOutlined } from "@ant-design/icons";

// Router
import { useNavigate } from "react-router";

// Componets
import TableTitle from "components/common/TableTitle";
import CompanyForm from "./CompanyForm";
import EditCompanyForm from "./EditCompanyForm";

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

	const [companiesLoading, setCompaniesLoading] = useState(false);
	const [companies, setCompanies] = useState([]);

	const [deletingKey, setDeletingKey] = useState(null);
	const [loadingDelete, setLoadingDelete] = useState(false);

	const [openCreate, setOpenCreate] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);

	const [companyNit, setCompanyNit] = useState(null);

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
		} catch (e) {
			console.log("[Company] - Error obteniendo empresas", e.response?.data?.message);
			openNotification("error", "Error obteniendo empresas.", e.response?.data?.message);
		} finally {
			setCompaniesLoading(false);
		}
	};

	const handleDeleteCompany = async (nit) => {
		setDeletingKey(nit);
		setLoadingDelete(true);
		try {
			await deleteCompany(nit);
			openNotification("success", "Empresa eliminada!", "La empresa se ha eliminado correctamente");
			// hot reload
			handleGetCompanies(userData, isAdmin);
		} catch (e) {
			console.log("[Company] - Error eliminando empresa", e.response?.data?.message);
			openNotification("error", "Error eliminando empresa.", e.response?.data?.message);
		} finally {
			setLoadingDelete(false);
			setDeletingKey(null);
		}
	};

	const reloadCompanies = () => {
		handleGetCompanies(userData, isAdmin);
	};

	if (isAdmin) {
		columns.push({
			title: "Acción",
			key: "action",
			width: "5%",
			render: (_, record) => (
				<Space>
					<Button
						onClick={(e) => {
							// Stops "Selected company row -> show invenotries" event
							e.stopPropagation();
							setCompanyNit(record.nit);
							setOpenEdit(true);
						}}
						type="text"
						shape="circle"
						icon={<EditOutlined />}
						disabled={loadingDelete}
						size="small"
					/>
					<Popconfirm
						title="Borrar empresa"
						description="Seguro que quieres borrar esta empresa?"
						onConfirm={(e) => {
							// Stops "Selected company row -> show invenotries" event
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
							disabled={loadingDelete}
							loading={
								// Only displays loading animation to the icon of the row that's being deleted
								loadingDelete && deletingKey === record?.nit
							}
							size="small"
						/>
					</Popconfirm>
				</Space>
			),
		});
	}
	useEffect(() => {
		handleGetCompanies(userData, isAdmin);
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
					setOpenCreate(true);
				}}
			/>

			<Table
				bordered
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
			<CompanyForm open={openCreate} setOpen={setOpenCreate} reloadCompanies={reloadCompanies} />
			<EditCompanyForm
				open={openEdit}
				setOpen={setOpenEdit}
				reloadCompanies={reloadCompanies}
				companyNit={companyNit}
				setCompanyNit={setCompanyNit}
			/>
		</>
	);
};

export default Company;
