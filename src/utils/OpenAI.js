import axios from "axios";

export default class OpenAi {
  static url = window.location.href;
  static apiUrl = this.url.includes("ai-interviewer")
    ? "https://ai-interviewer.onrender.com"
    : "http://localhost:3000";

  static async getResponse(messages, loggedInUser) {
    const promptMessage = this.buildPromptMessage(messages);
    const config = {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    };

    return await axios
      .post(`${this.apiUrl}/openai`, { message: promptMessage }, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(
          "Something happed while getting the response (Interviewer Response), error: ",
          error
        );
        return null;
      });
  }

  static async speechToText(formData, loggedInUser) {
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    return await axios
      .post(`${this.apiUrl}/openai/speech-to-text`, formData, config)
      .then((res) => {
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

  static buildPromptMessage(messages) {
    // messages: [{author, message}, {}...]
    let promptMessage = "";
    messages.map((message) => {
      switch (message.author) {
        case "Interviewer":
          return (promptMessage += String(message.message + "\n"));
        default:
          return (promptMessage += String(message.message + "->"));
      }
    });
    return promptMessage;
  }
}
