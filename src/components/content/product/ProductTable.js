import { useEffect, useState } from "react";
import { Button, Row, Table } from "antd";
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
import ExportPdf from "./ExportPdf";

const ProductsTable = ({ inventoryId, name }) => {
	const navigate = useNavigate();

	const [productsLoading, setProductsLoading] = useState(false);
	const [products, setProducts] = useState([]);

	const isAdmin = getUserData().is_admin;

	const [open, setOpen] = useState(false);

	const handleGetProducts = async (inventoryId) => {
		setProductsLoading(true);
		try {
			const res = await getProdcutsByInventory(inventoryId);
			const updatedRes = res.map((product) => ({
				key: product.id,
				...product,
			}));
			setProducts(updatedRes);
			if (!updatedRes.length) {
				openNotification("info", "Sin productos");
			}
		} catch (e) {
			console.log("[ProductTable] - Error obteniendo productos", e.response?.data?.message);
			openNotification("error", "Error obteniendo Productos.", e.response?.data?.message);
		} finally {
			setProductsLoading(false);
		}
	};

	const reloadProducts = () => {
		handleGetProducts(inventoryId);
	};

	useEffect(() => {
		handleGetProducts(inventoryId);
	}, [inventoryId]);

	return (
		<>
			<Row justify="space-between">
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

				{isAdmin && <ExportPdf inventoryId={inventoryId} />}
			</Row>
			<TableTitle
				title={`Inventario: ${name}`}
				btnTitle="Crear Articulo"
				allowAction={isAdmin}
				icon={<PlusOutlined />}
				btnAction={() => {
					setOpen(true);
				}}
			/>

			<Table className="mt-8" columns={iventory_table_cols} dataSource={products} loading={productsLoading} />
			<ProductForm open={open} setOpen={setOpen} reloadProducts={reloadProducts} inventoryId={inventoryId} />
		</>
	);
};

export default ProductsTable;
