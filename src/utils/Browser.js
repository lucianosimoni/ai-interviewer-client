export default class Browser {
  static askForPermission() {
    console.log("Hello world");
  }

  static readMessage(message) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = message;
    msg.rate = 1.5;
    window.speechSynthesis.speak(msg);
  }

  static getUrl() {
    const url = window.location.href;
    return url.includes("ai-interviewer")
      ? "https://ai-interviewer-server.onrender.com"
      : "http://localhost:3000";
  }
}
