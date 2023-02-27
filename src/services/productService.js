import { createRequest, throwErrors } from "./globalService";

export const createProduct = async (inventoryId, productBody) => {
	try {
		const response = await createRequest().post(`/inventories/${inventoryId}/products`, productBody);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const getProdcutsByInventory = async (inventoryId) => {
	try {
		const response = await createRequest().get(`/inventories/${inventoryId}/products`);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const sendInventoryPdfToEmail = async (company_nit, inventoryId, body) => {
	try {
		const response = await createRequest().post(
			`/companies/${company_nit}/inventories/${inventoryId}/export-data`,
			body
		);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};
