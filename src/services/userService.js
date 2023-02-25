import { createRequest, throwErrors } from "./globalService";

export const createUser = async (newuserBody) => {
	try {
		const response = await createRequest().post(`/users`, newuserBody);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const loginUser = async (userBody) => {
	try {
		const response = await createRequest().get(`/login`, userBody);
		return response.data.data;
	} catch (e) {
		return throwErrors(e);
	}
};
