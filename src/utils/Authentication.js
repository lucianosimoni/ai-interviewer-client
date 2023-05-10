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
        return console.error({
          error: { message: errorRes.message ? errorRes.message : error },
        });
      });
  }

  // TODO: Create the Register
}
