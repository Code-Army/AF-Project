import { createContext } from "react";

// const token = localStorage.auth-token
// const decoded = jwt_decode(token)

export default createContext(localStorage.auth);
