import axios from "axios";

export default class OpenAi {
  static url = window.location.href;
  static apiUrl = this.url.includes("ai-interviewer")
    ? "https://ai-interviewer.onrender.com"
    : "http://localhost:3000";

  static async getResponse(previousMessages, newMessage, loggedInUser) {
    console.log(newMessage);
    const fullMessage = this.buildFullMessage(newMessage, loggedInUser);
    const config = {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    };
    axios
      .post(`${this.apiUrl}/openai`, { message: fullMessage }, config)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(
          "Something happed while getting the response, error: ",
          error
        );
        return error;
      });
  }

  static async speechToText(formData, loggedInUser) {
    console.log("📚 Speech to text API");
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    return await axios
      .post(`${this.apiUrl}/openai/speech-to-text`, formData, config)
      .then((res) => {
        console.log("📚 Response from OpenAI Util data is: ", res.data);
        return res.data;
      })
      .catch((error) => {
        console.error(
          "📚🚩 Something happed while getting the response, error: ",
          error
        );
        return error;
      });
  }

  static buildFullMessage(newMessage, loggedInUser) {
    // ADD lastMessage
    const fullMessage = `${newMessage.map((m) => {
      if (m.author !== loggedInUser.firstName) {
        // AI
        return String(m.message + "\n");
      } else {
        //USER
        return String(m.message + "->");
      }
    })}${newMessage.message}->`;

    return fullMessage;
  }
}
