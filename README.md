# 🧠 AI Interviewer | Frontend

Create a real-time _software development_ **interview** on your browser, using a custom trained LLM AI as your Interviewer.

<p align="center" style="padding:1rem;">
  <a
  style="background-color: #84a59d; border-radius:20px; padding:1rem; color:#f7ede2; font-weight:bold; text-decoration:none;"
  href="https://ai-interviewer-gh3q.onrender.com">👉 Check the Live version here 👈</a>
</p>

<a
style="background-color:#bfd3c1; border-radius:20px; padding:0.5rem; color:#3d5a80; font-size:0.75rem; padding-right:1rem; font-weight:bold; text-decoration:none;"
href="https://github.com/lucianosimoni/ai-interviewer-server"
target="_blank">
⚙️ Backend GitHub
</a>

## ✨ Features

- Simulate a real-time Junior interview
- Speech Recognition _(Whisper 🗣️)_
- AI Model _(Custom Trained 🏋️)_
- Interview organizer
- Mobile friendly

---

## ⚙️ Technologies Used

- ### Frontend 💻

  - React.js
  - TailwindCSS
  - Axios

- ### Backend 👈(ﾟヮﾟ 👈)

  - Node.js
  - OpenAI
  - PostgreSQL
  - Prisma ORM
  - Express.js

---

## 🚂 Getting Started

To get started with the project, clone the repository and install the dependencies.

_Install the dependencies_

```bash
 npm install
```

_Build react application_

```bash
npm run build
```

_Start the application locally_

```bash
 npm run start # Starts the Local Server at port 3000
```

---

## 📦 Dependencies

```json
"dependencies": {
    "axios": "^1.3.4",
    "mic-recorder-to-mp3": "^2.2.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.2",
    "react-scripts": "5.0.1"
},
"devDependencies": {
    "tailwindcss": "^3.2.7"
}
```

---

## 🗣️ Voice recognition

- Base model in use: `curie`
- Fine-tunned model with more than 150+ lines of data.

### Fine-tuning model

Check docts [here](https://platform.openai.com/docs/guides/fine-tuning/create-a-fine-tuned-model)

1. _Check if `training-data` is well formatted_

```bash
 openai tools fine_tunes.prepare_data -f <LOCAL_FILE>
```

2. _Fine-tune a new model_

```bash
openai -k <API_KEY> api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL> --suffix "custom model name"
```

## Do you have recommendations to me? just send me a message 😁
