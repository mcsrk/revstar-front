import { createRequest, throwErrors } from "./globalServices";

export const getAllCompanies = async () => {
	try {
		const response = await createRequest().get(`/companies`);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const createCompany = async (companyId, companyBody) => {
	try {
		const response = await createRequest().post(`/companies/${companyId}`, companyBody);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const updateCompany = async (companyId, companyBody) => {
	try {
		const response = await createRequest().put(`/companies/${companyId}`, companyBody);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const deleteCompany = async (companyId) => {
	try {
		const response = await createRequest().delete(`/companies/${companyId}`);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};
