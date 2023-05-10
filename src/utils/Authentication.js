import axios from "axios";

export default class Authentication {
  static url = window.location.href;
  static apiUrl = this.url.includes("ai-interviewer")
    ? "https://ai-interviewer.onrender.com"
    : "http://localhost:3000";

  static async login(body) {
    return await axios
      .post(this.apiUrl + "/user/login", body)
      .then((res) => {
        if (res.status !== 200) {
          localStorage.removeItem("loggedInUser");
          throw new Error(res);
        }
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(res.data.loggedInUser)
        );
        return res.data.loggedInUser;
      })
      .catch((error) => {
        const errorRes = error.response.data.error;
        const errorObject = {
          error: { message: errorRes.message ? errorRes.message : error },
        };
        console.error(errorObject);
        return errorObject;
      });
  }

  // TODO: Create the Register
  static async register(body) {
    return await axios
      .post(this.apiUrl + "/user/register", body)
      .then((res) => {
        if (res.status !== 201) {
          console.error(res);
          localStorage.removeItem("loggedInUser");
          throw new Error(res);
        }
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(res.data.createdUser)
        );
        return res.data.createdUser;
      })
      .catch((error) => {
        localStorage.removeItem("loggedInUser");
        const errorRes = error.response.data.error;
        const errorObject = {
          error: { message: errorRes.message ? errorRes.message : error },
        };
        console.error(errorObject);
        return errorObject;
      });
  }
}
