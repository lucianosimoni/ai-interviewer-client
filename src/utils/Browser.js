export default class Browser {
  static startAudioListening() {
    console.log("Started");
  }
  static stopAudioListening() {
    console.log("Stopped");
  }

  static readMessage(message) {
    console.log("Browser is going to read the message");
    const msg = new SpeechSynthesisUtterance();
    msg.text = message;
    msg.rate = 1.5;
    window.speechSynthesis.speak(msg);
  }
}
