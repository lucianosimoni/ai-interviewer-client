import axios from "axios";

export default class Database {
  constructor() {
    this.url = window.location.href;
    this.apiUrl = this.url.includes("ai-interviewer")
      ? "https://ai-interviewer.onrender.com"
      : "http://localhost:3000";
  }

  static async saveMessage(body, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .post(`${this.apiUrl}/interview-message`, body, config)
      .then((res) => {
        return res.data.createdMessage;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }
}
