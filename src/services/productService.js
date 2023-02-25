import { createRequest, throwErrors } from "./globalServices";

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
		return response.data.data;
	} catch (e) {
		return throwErrors(e);
	}
};
