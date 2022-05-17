// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3000/api/";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
import axios from "axios";

const HTTP = axios.create({
  baseURL: `http://localhost:3000/api/`,
  headers: {
    common: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
});

export default {
  get: HTTP.get,
  post: HTTP.post,
  put: HTTP.put,
  patch: HTTP.patch,
  delete: HTTP.delete
};
// HTTP.interceptors.response.use(null, (error) => {
//     //handling error => log it or what ever
//     if (
//       error.reponse &&
//       error.reponse.status >= 400 &&
//       error.reponse.status <= 500
//     )
//       return Promise.reject(error);
//     else {
//       console.log("Loggin the error", error);
//       alert("An unexpected error occurred");
//     }
//   });
