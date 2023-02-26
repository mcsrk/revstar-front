import { createRequest, throwErrors } from "./globalService";

export const getAllCompanies = async () => {
	try {
		const response = await createRequest().get(`/companies`);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const getCompaniesByUser = async (userId) => {
	try {
		const response = await createRequest().get(`/users/${userId}/companies`);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const createCompany = async (companyBody) => {
	try {
		const response = await createRequest().post(`/companies`, companyBody);
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

export const deleteCompany = async (nit) => {
	try {
		const response = await createRequest().delete(`/companies/${nit}`);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};
