import { useContext, useEffect, useState } from "react";
import { LoggedInUserContext } from "../LoggedInUserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import ErrorPopup from "../ErrorPopup";
import OpenAi from "../../utils/OpenAI";

import MicRecorder from "mic-recorder-to-mp3";
import Database from "../../utils/Database";
import Browser from "../../utils/Browser";

export default function Interview() {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const { interviewId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ visible: false, message: "" });
  const [errorInterviewer, setErrorInterviewer] = useState({
    state: false,
    messages: "",
  });
  const [bannerVisible, setBannerVisible] = useState(true);
  const navigateTo = useNavigate();

  const [interviewData, setInterviewData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [interviewOver, setInterviewOver] = useState(false);

  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState();

  useEffect(() => {
    if (!loggedInUser) {
      return navigateTo("/");
    }
    checkInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkInterview = async () => {
    // ⚙️ Check if this Interview belongs to this LoggedInUser
    // 📑 Fetches the Messages if any from the Server and Store in local state
    setLoading(true);
    const interviewInfo = await Database.getInterviewById(
      interviewId,
      loggedInUser.token
    );
    if (!interviewInfo) {
      return navigateTo("/dashboard");
    }

    // 📥 Save interview info
    setInterviewData(interviewInfo);

    // 🧑⛔ User doesn't own this Interview.
    if (loggedInUser.id !== interviewInfo.userId) {
      console.log("💥 Interview does not belong to you bruh.");
      setLoading(false);
      return navigateTo("/dashboard");
    }

    const interviewMessages = await Database.getInterviewMessages(
      interviewId,
      loggedInUser.id,
      loggedInUser.token
    );

    // 📍 Check if Current Round matches amount of Messages retrieved by server.
    const messageLocalRounds = Math.ceil(interviewMessages.length / 2);
    if (messageLocalRounds !== interviewInfo.currentRound) {
      // 📦 Updates the Database if the CurrentRound field does not match.
      const updatedInterview = await Database.updateInterviewCurrentRound(
        interviewId,
        loggedInUser.token,
        messageLocalRounds
      );
      setInterviewData(updatedInterview);
    }
    // 📍🏁 Interview Ended
    if (messageLocalRounds >= interviewInfo.maxRound) {
      setInterviewOver(true);
    }

    // 🔁 Remove <end-interview> from all messages
    const formattedInterviewMessages = interviewMessages.map((message) => {
      message.message = message.message.replace("<end-interview>", "");
      return message;
    });

    setMessages(formattedInterviewMessages);
    setLoading(false);
  };

  const startRecording = () => {
    const newRecorder = new MicRecorder({
      bitRate: 128,
    });
    newRecorder
      .start()
      .then(() => {
        setRecording(true);
        setRecorder(newRecorder);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        setRecording(false);
        setLoading(true);

        // 🧑 Get Transcription of User audio
        const formData = new FormData();
        formData.append("audioFile", blob, "audio/mp3");
        const speechToText = await OpenAi.speechToText(formData, loggedInUser);

        // 📑 Check if it's the Round maxRound-1 (ex 4/5)
        console.log("Interview data is:", interviewData);
        console.log(
          "Current round is same as maxRound-1?: ",
          interviewData.currentRound === interviewData.maxRound - 1
        );
        if (interviewData.currentRound === interviewData.maxRound - 1) {
          // 🏁 Add <end-interview> to the end of Transcription
          console.log(
            "Yes they are the same, so we add the <end-interview> to the end of the trans."
          );
          console.log(
            "Transcription from speechToText WAS:",
            speechToText.transcription
          );
          speechToText.transcription += "<end-interview>";
          console.log(
            "Transcription from speechToText is now:",
            speechToText.transcription
          );
          setInterviewOver(true);
        }

        // 🧑📥 Save Transcription of User audio
        const savedMessage = await Database.saveMessage(
          speechToText.transcription,
          interviewId,
          loggedInUser.token,
          loggedInUser.Profile
        );
        if (!savedMessage) {
          setLoading(false);
          return setError({
            visible: true,
            message: "Error while Saving message. Try again please.",
          });
        }
        console.log("Saved message is: ", savedMessage);

        // 🧑 Store Transcription of User audio into local state
        const localMessages = [
          ...messages,
          {
            author: "User",
            message: speechToText.transcription.replace("<end-interview>", ""),
          },
        ];
        setMessages(localMessages);

        // 🤖 Get Interviewer Response
        const interviewerResponse = await OpenAi.getResponse(
          localMessages,
          loggedInUser
        );
        if (!interviewerResponse) {
          setLoading(false);
          setErrorInterviewer({ state: true, messages: localMessages });
          return setError({
            visible: true,
            message:
              "Error while Receiving Interviewer response. Try again please.",
          });
        }

        // 🤖 Save Interviewer Response
        const savedInterviewerMessage = await Database.saveMessage(
          interviewerResponse.result,
          interviewId,
          loggedInUser.token,
          { firstName: "Interviewer", userId: loggedInUser.id }
        );
        if (!savedInterviewerMessage) {
          setLoading(false);
          setErrorInterviewer({ state: true, messages: localMessages });
          return setError({
            visible: true,
            message:
              "Error while Saving Interviewer message. Try again please.",
          });
        }

        // 🤖 Store Interviewer Response into local state
        setMessages([
          ...localMessages,
          { author: "Interviewer", message: interviewerResponse.result },
        ]);

        // 🤖 Read Interviewer Response
        Browser.readMessage(interviewerResponse.result);

        // 📍 Update currentRound in the DataBase
        const updatedInterview = await Database.updateInterviewCurrentRound(
          interviewId,
          loggedInUser.token,
          interviewData.currentRound + 1
        );
        setInterviewData(updatedInterview);

        setErrorInterviewer({ state: false, messages: null });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError({
          visible: true,
          message: "We could not retrieve your message. Try again please.",
        });
        setLoading(false);
      });
  };

  const resendResponseRequest = async () => {
    setLoading(true);
    // 🤖 Get Interviewer Response
    const interviewerResponse = await OpenAi.getResponse(
      errorInterviewer.messages,
      loggedInUser
    );
    if (!interviewerResponse) {
      setLoading(false);
      setErrorInterviewer({ state: true, messages: errorInterviewer.messages });
      return setError({
        visible: true,
        message:
          "Error while Receiving Interviewer response. Try again please.",
      });
    }

    // 🤖 Save Interviewer Response
    const savedInterviewerMessage = await Database.saveMessage(
      interviewerResponse.result,
      interviewId,
      loggedInUser.token,
      { firstName: "Interviewer", userId: loggedInUser.id }
    );
    if (!savedInterviewerMessage) {
      setLoading(false);
      setErrorInterviewer({ state: true, messages: errorInterviewer.messages });
      return setError({
        visible: true,
        message: "Error while Saving Interviewer message. Try again please.",
      });
    }

    // 🤖 Store Interviewer Response into local state
    setMessages([
      ...messages,
      { author: "Interviewer", message: interviewerResponse.result },
    ]);

    // 🤖 Read Interviewer Response
    Browser.readMessage(interviewerResponse.result);

    setErrorInterviewer({ state: false, messages: null });
    setLoading(false);
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
          {/* ⛔ X CLOSE */}
          <Link
            to={"/dashboard"}
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
          </Link>

          {/* 📃 MESSAGES SECTION */}
          <section className="text-white h-4/5 overflow-y-auto pb-8">
            <div className="flex flex-col gap-2 h-full">
              {!messages.length && (
                <div className="text-2xl flex flex-col justify-center items-center h-full ">
                  <span>Start by introducing yourself.</span>
                  <span>A simple "Hello, my name is..." does the trick 👍</span>
                  <span className="animate-pulse">
                    Press and hold the <b>Record</b> button to start.
                  </span>
                </div>
              )}

              {messages.map((message, index) => {
                switch (message.author) {
                  case "Interviewer":
                    return (
                      <div
                        key={index}
                        className="flex flex-col text-left border bg-gradient-to-b from-amber-900 border-slate-500 p-9 rounded-2xl"
                      >
                        <span className="text-orange-300 text-2xl mr-4">
                          {message.author}
                        </span>
                        <span className="text-white text-2xl">
                          {message.message}
                        </span>
                      </div>
                    );
                  default:
                    return (
                      <div
                        key={index}
                        className="flex flex-col text-left border bg-gradient-to-b from-slate-700 border-slate-500 p-9 rounded-2xl"
                      >
                        <span className="text-blue-400 text-2xl mr-4">
                          {message.author}
                        </span>
                        <span className="text-white text-2xl">
                          {message.message}
                        </span>
                      </div>
                    );
                }
              })}
            </div>
          </section>

          {/* ⚙️ CONTROL SECTION */}
          <section className="flex flex-row gap-4 text-white h-1/5 shadow-2xl">
            {/* ◀️ Left side */}
            <div className="h-full w-full flex justify-center shadow-2xl bg-gradient-to-tr from-slate-700 to-slate-600 rounded-3xl">
              {interviewOver ? (
                <>
                  {/* 📊 Statistics Controls */}
                  <div className="flex flex-col justify-center place-items-center">
                    <span>Interview is over.</span>
                  </div>
                </>
              ) : (
                <>
                  {/* 🎙️ Recording Controls */}
                  <div className="flex flex-col justify-center place-items-center relative">
                    {/* 🎙️ Microphone */}
                    <div className="absolute top-[-50px]">
                      <svg
                        className={
                          recording
                            ? "h-20 text-red-300 scale-95 drop-shadow-none transition duration-100 ease-linear hover:scale-110 hover:drop-shadow-2xl"
                            : "h-20 text-slate-300 drop-shadow-2xl transition duration-100 ease-linear hover:scale-110 hover:drop-shadow-2xl"
                        }
                        // className="h-20 text-red-300 scale-95 drop-shadow-none transition duration-200 ease-linear hover:scale-110 hover:drop-shadow-2xl"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 352 512"
                      >
                        <path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" />
                      </svg>
                    </div>

                    {/* 🔽 Space bar */}
                    <div className="align-bottom">
                      <button
                        id="record-button"
                        disabled={errorInterviewer.state}
                        onTouchStart={startRecording}
                        onTouchEnd={stopRecording}
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        autoFocus={true}
                        className="outline-none transition-all duration-300 ease-in active:duration-75 hover:translate-y-1 active:translate-y-2 text-xl text-center w-96 h-20 bg-gradient-to-t from-slate-800 to-slate-700 border-slate-600 drop-shadow-xl shadow-2xl hover:shadow-md active:shadow-sm hover:drop-shadow-lg active:drop-shadow-sm disabled:opacity-30 disabled:hover:shadow-2xl disabled:hover:translate-y-0 disabled:hover:drop-shadow-xl border-2 border-solid rounded-xl "
                      >
                        <span className="text-slate-200 drop-shadow-[0_0_15px_#000000]">
                          Record
                        </span>
                      </button>

                      <button
                        className={
                          errorInterviewer.state
                            ? "ml-4 outline-none transition-all duration-300 ease-in active:duration-75 hover:translate-y-1 active:translate-y-2 text-xl text-center w-52 h-16 bg-gradient-to-t from-red-800 to-red-500 border-red-300 drop-shadow-xl shadow-2xl hover:shadow-md active:shadow-sm hover:drop-shadow-lg active:drop-shadow-sm disabled:opacity-30 disabled:hover:shadow-2xl disabled:hover:translate-y-0 disabled:hover:drop-shadow-xl border-2 border-solid rounded-xl "
                            : "hidden"
                        }
                        onClick={resendResponseRequest}
                      >
                        Get response again
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ▶️ Right side */}
            <div className="w-fit p-4 shadow-2xl bg-gradient-to-tr from-slate-700 to-slate-600 rounded-3xl">
              {/* 📦 Rounds Counter */}
              {interviewData ? (
                <div className="flex flex-col justify-center h-full bg-slate-600 rounded-3xl py-1 px-8">
                  <span>Rounds</span>
                  <span>
                    {interviewData.currentRound}/{interviewData.maxRound}
                  </span>
                  {/* 🏁 Interview is Over indicator */}
                  {interviewOver && (
                    <span className="text-red-300 font-bold">
                      Interview's over.
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center h-full bg-slate-600 rounded-3xl py-1 px-8">
                  <h2>Loading...</h2>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
