import axios from "axios";

export default class Database {
  static url = window.location.href;
  static apiUrl = this.url.includes("ai-interviewer")
    ? "https://ai-interviewer.onrender.com"
    : "http://localhost:3000";

  static async saveMessage(message, interviewId, userToken, profile) {
    // 📑 Saves both User and AI messages. Specify the profile to have the "Interviewer" as firstName when wanted.
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

  static async getInterviewMessages(interviewId, userId, userToken) {
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    return await axios
      .get(
        `${this.apiUrl}/interview-message?interviewId=${interviewId}&userId=${userId}`,
        config
      )
      .then((res) => {
        return res.data.allMessages;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  static async getInterviewsByUserId(userId, userToken) {
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    return await axios
      .get(`${this.apiUrl}/interview/user/${userId}`, config)
      .then((res) => {
        return res.data.userInterviews;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  static async updateInterviewCurrentRound(
    interviewId,
    userToken,
    newCurrentRound
  ) {
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    return await axios
      .patch(
        `${this.apiUrl}/interview/${interviewId}`,
        { newCurrentRound: newCurrentRound },
        config
      )
      .then((res) => {
        return res.data.updatedInterview;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}
