import axios_core from "axios";

// Config
import { API_ENDPOINT } from "config/config";

const createHeaders = () => {
	const bearerToken = `Bearer ${localStorage.getItem("token")}`;
	return { Authorization: bearerToken, "Content-Type": "application/json" };
};

export const createRequest = () => {
	return axios_core.create({ baseURL: API_ENDPOINT, headers: createHeaders() });
};

export const throwErrors = (err) => {
	throw err;
};
