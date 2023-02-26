import { createRequest, throwErrors } from "./globalService";

export const createUser = async (newuserBody) => {
	try {
		const response = await createRequest().post(`/users`, newuserBody);
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const loginUser = async (username, password) => {
	try {
		const response = await createRequest().post(
			`/login`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Basic " + btoa(username + ":" + password),
				},
			}
		);
		localStorage.setItem("token", response.data);
		window.location.reload();
		return response.data;
	} catch (e) {
		return throwErrors(e);
	}
};

export const logOutUser = async () => {
	localStorage.clear();
	window.location.reload();
};
