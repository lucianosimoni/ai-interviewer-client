import axios from "axios";

export default class Database {
  static url = window.location.href;
  static apiUrl = this.url.includes("ai-interviewer")
    ? "https://ai-interviewer.onrender.com"
    : "http://localhost:3000";

  static async saveMessage(
    message,
    interviewId,
    userToken,
    profile = { firstName: "Interviewer", userId: null }
  ) {
    // 📑 Saves both User and AI messages. Leave profile empty for AI
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    const body = {
      interviewId: interviewId,
      userId: profile.userId,
      message: message,
      author: profile.firstName,
    };

    return await axios
      .post(`${this.apiUrl}/interview-message`, body, config)
      .then((res) => {
        return res.data.createdMessage;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  static async getInterviewById(interviewId, userToken) {
    console.log("Getting interview by id");
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    return await axios
      .get(`${this.apiUrl}/interview/${interviewId}`, config)
      .then((res) => {
        return res.data.interview;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}
