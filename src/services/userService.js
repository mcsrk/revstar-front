import { createRequest, throwErrors } from "./globalService";

// Auth
import jwt_decode from "jwt-decode";

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
		const token = response.data;

		localStorage.setItem("token", token);

		// decode user info such id, username and is_admin from backend generated jwtoken
		const userData = jwt_decode(token);
		localStorage.setItem("user", JSON.stringify(userData));

		window.location.reload();
	} catch (e) {
		return throwErrors(e);
	}
};

export const getToken = () => {
	return localStorage.getItem("token");
};

export const getUserData = () => {
	return JSON.parse(localStorage.getItem("user"));
};

export const logOutUser = async () => {
	localStorage.clear();
	window.location.reload();
};
