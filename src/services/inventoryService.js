import { createRequest, throwErrors } from "./globalService";

export const getInventoriesByCompany = async (company_nit) => {
	try {
		const response = await createRequest().get(`/companies/${company_nit}/inventories`);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};
