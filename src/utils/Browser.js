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
}
