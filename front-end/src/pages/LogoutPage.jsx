import { useEffect } from "react";
import Cookies from "js-cookie";

const LogOut = () => {
  useEffect(() => {
    Cookies.remove("token");
    Cookies.remove("refresh-token");
    window.location.href = "/login";
  }, []);
};

export default LogOut;
