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
    console.log("HELLO THERE, GETTING URL");
    const url = window.location.href;
    return url.includes("ai-interviewer")
      ? "https://18.134.73.217:3000"
      : "http://localhost:3000";
  }
}
