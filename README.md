# Client - AI Interviewer

Hosted using [render](https://render.com/).

Live endpoint:

https://ai-interviewer-gh3q.onrender.com/

🧙‍♂️

## 🚂 Run it locally

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
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "recordrtc": "^5.6.2"
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
