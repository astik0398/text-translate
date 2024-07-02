import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Translate.css";
import volume from "../assets/volume.svg";

const Translate = () => {
  const [languages, setLanguages] = useState([]);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourecText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [detectedSourceText, setDetectedSourceText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState('')

  useEffect(() => {
    const response = axios.get("https://libretranslate.com/languages");
    response.then(function (res) {
      setLanguages(res.data);
    });
  }, []);

  function handleTranlateText() {
    let response = axios.post(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourecText}|${targetText}`
    );
    response.then(function (res) {
        setTargetLanguage(res.data.matches[0].target)
      setTranslatedText(res.data.responseData.translatedText);
    });
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSourceSpeech(){
    let utterance = new SpeechSynthesisUtterance(text)

    speechSynthesis.speak(utterance)
  }

  function handleTargetSpeech(){
    console.log(targetLanguage);
    let utterance = new SpeechSynthesisUtterance(translatedText)
    utterance.lang = targetLanguage
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="container">
      <div className="main-div">
        <div className="left-div">
          <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
            <select
              onChange={(e) => setSourceText(e.target.value)}
              value={detectedSourceText}
              name=""
              id=""
            >
              <option value="">From</option>
              {languages?.map((item) => (
                <option value={item.code}>{item.name}</option>
              ))}
            </select>

            <img onClick={handleSourceSpeech} width={"25px"} src={volume} alt="" />
          </div>
          <textarea
            onChange={handleChange}
            placeholder="Enter your text"
            rows={20}
            cols={60}
            name=""
            id=""
          ></textarea>
        </div>

        <div className="right-div">
          <div style={{ display: "flex", gap: "20px", marginTop: "15px" }}>
            <select
              onChange={(e) => setTargetText(e.target.value)}
              name=""
              id=""
            >
              <option value="">To</option>
              {languages?.map((item) => (
                <option value={item.code}>{item.name}</option>
              ))}
            </select>

            <img onClick={handleTargetSpeech} width={"25px"} src={volume} alt="" />
          </div>
          <textarea
            readOnly
            value={translatedText}
            placeholder="Enter your text"
            rows={20}
            cols={60}
            name=""
            id=""
          ></textarea>
        </div>
      </div>

      <button onClick={handleTranlateText} style={{ marginTop: "20px" }}>
        Translate
      </button>
    </div>
  );
};

export default Translate;
