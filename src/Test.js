import { useCallback, useEffect } from "react";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const appId = "d7b96257-772b-4a2d-acb0-cbe9c7e3a453";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

export default function TestScene() {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  // Space key handler
  const handleSpaceDown = useCallback((event) => {
    if (event.key === " ") {
      startListening();
      document.getElementById("record-button").focus();
    }
  }, []);
  const handleSpaceUp = useCallback((event) => {
    if (event.key === " ") {
      SpeechRecognition.stopListening();
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleSpaceDown);
    document.addEventListener("keyup", handleSpaceUp);
    return () => {
      document.removeEventListener("keydown", handleSpaceDown);
      document.removeEventListener("keydown", handleSpaceUp);
    };
  }, [handleSpaceDown, handleSpaceUp]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button
        id="record-button"
        onTouchStart={startListening}
        onMouseDown={startListening}
        onKeyDown={startListening}
        onKeyUp={SpeechRecognition.stopListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
        autoFocus={true}
        className="outline-none transition duration-300 ease-in active:duration-75 hover:translate-y-1 active:translate-y-2 text-xl text-center w-72 h-20 bg-gradient-to-t from-slate-100 to-white drop-shadow-xl hover:drop-shadow-lg active:drop-shadow-sm border-2 border-white border-solid rounded-xl "
      >
        Space Bar
      </button>
      <p>{transcript}</p>
    </div>
  );
}
