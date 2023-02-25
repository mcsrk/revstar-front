import axios_core from "axios";
import { API_ENDPOINT } from "config/config";

export const createRequest = () => {
	return axios_core.create({ baseURL: API_ENDPOINT });
};

export const throwErrors = (err) => {
	throw err;
};
