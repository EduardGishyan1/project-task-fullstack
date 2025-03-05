import { refreshToken } from "./auth";
import Cookies from "js-cookie"

export const fetchWithAuth = async (url, options = {}) => {
    let token = Cookies.get("token");
    let refresh_token = Cookies.get("refresh-token");

    if (!options.headers) options.headers = {};
    options.headers["Authorization"] = `Bearer ${token}`;
    options.headers["refresh-token"] = refresh_token;
    options.headers["content-type"] = "application/json";
    options.credentials = "include"; 

    try {
        let response = await fetch(url, options);

        if (!response) {
            throw new Error("Failed to fetch data");
        }

        if (response.status === 403) {
            const newToken = await refreshToken();
            if (!newToken) {
                return null; 
            }
            Cookies.remove("token",{path: "/"})
            Cookies.set("token", newToken, { expires: 1 / 24 });
            options.headers["Authorization"] = `Bearer ${newToken}`;
            options.headers["refresh-token"] = refresh_token;
            response = await fetch(url, options);
        }

        return response;

    } catch (error) {
        console.error("Something went wrong");
        return null;
    }
};
