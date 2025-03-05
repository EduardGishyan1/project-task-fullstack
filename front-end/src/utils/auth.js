import Cookies from "js-cookie";

export const refreshToken = async () => {
    const token = Cookies.get("token");
    const refresh_token = Cookies.get("refresh-token");

    try {
        const response = await fetch("http://127.0.0.1:4021/auth/refresh", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "refresh-token": refresh_token
            },
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            Cookies.set("token", data.accessToken, { expires: 1 / 24 });
            return data.accessToken; 
        } else {
            return null; 
        }
    } catch{
        console.error("Something went wrong");
        return null;
    }
};
