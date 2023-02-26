import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";

// Router
import { useNavigate } from "react-router-dom";

// Components
import TableTitle from "components/common/TableTitle";
import ProductForm from "./ProductForm";

// Services
import { getUserData } from "services/userService";
import { getProdcutsByInventory } from "services/productService";

// Constants
import iventory_table_cols from "constants/inventory-table";

//Utils
import { openNotification } from "utils/utils";

const ProductsTable = ({ inventoryId, name }) => {
	const navigate = useNavigate();

	const [productsLoading, setProductsLoading] = useState(false);
	const [products, setProducts] = useState([]);

	const { is_admin } = getUserData();

	const [open, setOpen] = useState(false);

	const handleGetProducts = async (inventoryId) => {
		setProductsLoading(true);
		try {
			const res = await getProdcutsByInventory(inventoryId);
			const updatedRes = res.map((product) => ({
				key: product.nit,
				...product,
			}));
			setProducts(updatedRes);
			if (updatedRes.length) {
				openNotification("success", "Productos obtenidos!");
			} else {
				openNotification("info", "Sin productos");
			}
		} catch (e) {
			console.log("[ProductTable] - Error obteniendo productos", e.response?.data?.message);
			openNotification("error", "Error obteniendo Productos.", e.response?.data?.message);
		} finally {
			setProductsLoading(false);
		}
	};
	useEffect(() => {
		handleGetProducts(inventoryId);
	}, [inventoryId]);

	return (
		<>
			<Button
				className="mb-2"
				ghost
				type="primary"
				onClick={() => {
					navigate(`/companies`);
				}}
				icon={<ArrowLeftOutlined />}
			>
				Regresar
			</Button>
			<TableTitle
				title={`Inventario: ${name}`}
				btnTitle="Crear Articulo"
				allowAction={is_admin}
				icon={<PlusOutlined />}
				btnAction={() => {
					setOpen(true);
				}}
			/>

			<Table className="mt-8" columns={iventory_table_cols} dataSource={products} loading={productsLoading} />
			<ProductForm open={open} setOpen={setOpen} />
		</>
	);
};

export default ProductsTable;
