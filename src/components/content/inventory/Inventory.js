import { useEffect, useState } from "react";

// Router
import { useParams } from "react-router-dom";

// Components
import ProductsTable from "../product/ProductTable";

// Services
import { getInventoriesByCompany } from "services/inventoryService";

//Utils
import { openNotification } from "utils/utils";
import InventorySkeleton from "./InventorySkeleton";

const Inventory = () => {
	const params = useParams();
	const { company_nit } = params;

	const [inventoriesLoading, setInventoriesLoading] = useState(false);
	const [inventories, setIventories] = useState([]);

	const handleGetInventoriesByCompany = async (company_nit) => {
		setInventoriesLoading(true);
		try {
			const res = await getInventoriesByCompany(company_nit);

			setIventories(res);
			console.log("[Inventory] - Inventarios obtenidos");
		} catch (e) {
			console.log("[Inventory] - Error obteniendo inventarios", e.response?.data?.message);
			openNotification("error", "Error obteniendo inventario.", e.response?.data?.message);
		} finally {
			setInventoriesLoading(false);
		}
	};

	useEffect(() => {
		handleGetInventoriesByCompany(company_nit);
	}, [company_nit]);

	return (
		<>
			{inventoriesLoading ? (
				<InventorySkeleton />
			) : (
				inventories.map(({ id, name }) => <ProductsTable key={id} name={name} inventoryId={id} />)
			)}
		</>
	);
};

export default Inventory;
