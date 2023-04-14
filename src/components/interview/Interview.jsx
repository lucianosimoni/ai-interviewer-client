import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import ErrorPopup from "../ErrorPopup";
import { LoggedInUserContext } from "../LoggedInUserContext";

export default function Interview() {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { interviewId } = useParams();
  const [bannerVisible, setBannerVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ visible: false, message: "" });
  const [messages, setMessages] = useState([]);

  // Space key handler
  const handleSpaceDown = useCallback((event) => {
    if (event.key === " ") {
      document.getElementById("record-button").focus();
      console.log("Spacebar Down - TODO: Start Listening");
    }
  }, []);
  const handleSpaceUp = useCallback((event) => {
    if (event.key === " ") {
      console.log("Spacebar Up - TODO: Stop Listening");
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

  const startListening = () => {
    console.log("Started listening");
  };

  const stopListening = () => {
    console.log("Stopped listening");
  };

  // eslint-disable-next-line no-unused-vars
  const saveUserMessage = async (message) => {
    setLoading(true);
    console.log("🗣️ Saving user message in Database");

    const body = {
      interviewId: Number(interviewId),
      userId: loggedInUser.id,
      message: message,
      author: loggedInUser.Profile.firstName,
    };
    const url = window.location.href;
    const apiUrl = url.includes("ai-interviewer")
      ? "https://ai-interviewer.onrender.com"
      : "http://192.168.1.251:3000";
    const axiosConfig = {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    };
    console.log("Request body is: ", body);

    await axios
      .post(`${apiUrl}/interview-message`, body, axiosConfig)
      .then((res) => {
        setLoading(false);
        // setUserSpeechTurn(false); FIXME:
        console.log("🗣️ res from SaveUserMessage:", res);
        setMessages((prevMessages) => [
          ...prevMessages,
          res.data.createdMessage,
        ]);
        console.log("🗣️🟢 Saved to database and State");

        getInterviewerSpeech(res.data.createdMessage);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        // setUserSpeechTurn(true); FIXME:
        setError({
          visible: true,
          message: error.message
            ? error.message
            : "Something happened while saving the message.",
        });
      });
  };

  const getInterviewerSpeech = async (message) => {
    setLoading(true);
    console.log("🧠 INTERVIEWER SPEECH");
    const fullMessage = buildOpenAiMessage(message);
    const body = {
      message: fullMessage,
    };
    const url = window.location.href;
    const apiUrl = url.includes("ai-interviewer")
      ? "https://ai-interviewer.onrender.com"
      : "http://192.168.1.251:3000";
    const axiosConfig = {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    };

    console.log("🧠 POSTING TO AI, DATA: ", body);
    axios
      .post(`${apiUrl}/openai`, body, axiosConfig)
      .then((response) => {
        console.log("⚠️⚠️🧠 AI RESPONSE IS: ", response);
        setLoading(false);
        saveInterviewerMessage(response.data.result);
      })
      .catch((error) => {
        setLoading(false);
        // setUserSpeechTurn(true); FIXME:
        setError({ visible: true, message: `Error: ${error}` });
        console.error("Something happed, error: ", error);
      });
  };

  const buildOpenAiMessage = (message) => {
    if (!messages.includes(message)) {
      // ADD lastMessage
      const lastMessage = `${message.message}`;
      const fullMessage = `${messages.map((m) => {
        if (m.author !== loggedInUser.firstName) {
          // AI
          return String(m.message + "\n");
        } else {
          //USER
          return String(m.message + "->");
        }
      })}${lastMessage}->`;

      console.log(
        "📦📦📦 FULL MESSAGE INCLUDING LAST MESSAGE MANUAL IS:",
        fullMessage
      );
      return fullMessage;
    }

    const fullMessage = `${messages.map((m) => {
      if (m.author !== loggedInUser.firstName) {
        // AI
        return `<${m.author}>${m.message}\n`;
      } else {
        //USER
        return `<${m.author}>${m.message}->`;
      }
    })}`;

    console.log("📦📦📦 FULL MESSAGE WITH FIRST IN STATE IS:", fullMessage);
    return fullMessage;
  };

  const saveInterviewerMessage = async (message) => {
    setLoading(true);
    console.log("- 📦 Saving interviewer message");
    const body = {
      interviewId: Number(interviewId),
      userId: loggedInUser.id,
      message: message,
      author: "Interviewer",
    };
    const url = window.location.href;
    const apiUrl = url.includes("ai-interviewer")
      ? "https://ai-interviewer.onrender.com"
      : "http://192.168.1.251:3000";
    const axiosConfig = {
      headers: { Authorization: `Bearer ${loggedInUser.token}` },
    };
    console.log("Request body is: ", body);
    await axios
      .post(`${apiUrl}/interview-message`, body, axiosConfig)
      .then((res) => {
        setLoading(false);
        // setUserSpeechTurn(true); FIXME:
        setMessages((prevMessages) => [
          ...prevMessages,
          res.data.createdMessage,
        ]);
        readInterviewerMessage(res.data.createdMessage);
        console.log("- 📦 Message saved 🟢");
      })
      .catch((error) => {
        setLoading(false);
        // setUserSpeechTurn(true); FIXME:
        console.log("- 📦 NOT SAVED 🔴");
        setError({ visible: true, message: `Error: ${error}` });
        console.error("Something happed, error: ", error);
      });
  };

  const readInterviewerMessage = (message) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = message.message;
    msg.rate = 1.5;
    window.speechSynthesis.speak(msg);
  };

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      {error.visible ? <ErrorPopup error={error} setError={setError} /> : null}
      {bannerVisible ? (
        <div
          id="marketing-banner"
          className="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600"
        >
          {/* TITLE AND TEXT */}
          <div className="flex flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0">
            {/* LOGO */}
            <Link to={"/dashboard/overview"}>
              <button
                type="button"
                className="flex items-center mb-2 border-gray-200 md:pr-4 md:mr-4 md:border-r md:mb-0 dark:border-gray-600"
              >
                <img src="logo192.png" className="h-6 mr-2" alt="" />
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                  AI Interview
                </span>
              </button>
            </Link>

            {/* TEXT */}
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              You need to give us permisson to access your Microphone.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                setBannerVisible(false);
              }}
              className="absolute top-2.5 right-2.5 md:relative md:top-auto md:right-auto flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close banner</span>
            </button>
          </div>
        </div>
      ) : null}

      <main className="h-screen w-full bg-white dark:bg-gray-800">
        <div className="h-full px-14 py-4 text-center overflow-clip">
          {/* MESSAGES SECTION */}
          <section className="text-white h-3/5 overflow-y-auto pb-8">
            <div className="flex flex-col gap-2">
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col text-left border border-slate-500 p-9 rounded-2xl"
                  >
                    <span className="text-blue-400 text-2xl mr-4">
                      {message.author}
                    </span>
                    <span className="text-white text-2xl">
                      {message.message}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CONTROL SECTION - BOTTOM */}
          <section
            // className={ FIXME:
            //   userSpeechTurn
            //     ? "text-white h-1/5 shadow-2xl from-slate-700 to-slate-600 bg-gradient-to-tr rounded-3xl place-self-end"
            //     : "opacity-20 text-white h-1/5 shadow-2xl from-slate-700 to-slate-600 bg-gradient-to-tr rounded-3xl place-self-end"
            // }
            className="text-white h-1/5 shadow-2xl from-slate-700 to-slate-600 bg-gradient-to-tr rounded-3xl place-self-end"
          >
            <div className="relative flex flex-col gap-2 justify-center place-items-center h-full w-full">
              {/* Microphone */}
              <div className="absolute top-[-50px]">
                <svg
                  // className={ FIXME:
                  //   listening && userSpeechTurn
                  //     ? "h-20 text-red-300 scale-95 drop-shadow-none transition duration-200 ease-linear hover:scale-110 hover:drop-shadow-2xl"
                  //     : "h-20 text-slate-300 drop-shadow-2xl transition duration-200 ease-linear hover:scale-110 hover:drop-shadow-2xl"
                  // }
                  className="h-20 text-red-300 scale-95 drop-shadow-none transition duration-200 ease-linear hover:scale-110 hover:drop-shadow-2xl"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 352 512"
                >
                  <path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" />
                </svg>
              </div>

              {/* Space bar */}
              <div className="align-bottom">
                <button
                  id="record-button"
                  // disabled={userSpeechTurn ? false : true} FIXME:
                  onTouchStart={startListening}
                  onMouseDown={startListening}
                  onKeyDown={startListening}
                  onKeyUp={stopListening}
                  onTouchEnd={stopListening}
                  onMouseUp={stopListening}
                  autoFocus={true}
                  className="outline-none transition duration-300 ease-in active:duration-75 hover:translate-y-1 active:translate-y-2 text-xl text-center w-96 h-20 bg-gradient-to-t from-slate-800 to-slate-700 border-slate-600 drop-shadow-xl shadow-2xl hover:shadow-md active:shadow-sm hover:drop-shadow-lg active:drop-shadow-sm border-2 border-solid rounded-xl "
                >
                  <span className="text-slate-200 drop-shadow-[0_0_15px_#000000]">
                    Space bar
                  </span>
                </button>
              </div>
            </div>
            {/* X CLOSE */}
            <Link to={"/dashboard"}>
              <button
                type="button"
                onClick={() => setError({ visible: false, message: "" })}
                className="absolute transition ease-linear top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <svg
                  className="w-20 h-20 rounded-full"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
