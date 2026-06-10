import React, { useState } from "react";
import { questions } from "./data/questions";
import { results } from "./data/results";
import "./App.css";

function App() {
  const [step, setStep] = useState(0); // 0: 메인, 1~4: 질문, 5: 결과
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, P: 0, J: 0 });

  const handleAnswer = (type, choice) => {
    const newScores = { ...scores };
    const charA = type[0];
    const charB = type[1];

    if (choice === "A") {
      newScores[charA] = (newScores[charA] || 0) + 1;
    } else {
      newScores[charB] = (newScores[charB] || 0) + 1;
    }
    setScores(newScores);

    setStep(step + 1);
  };

  const getResultKey = () => {
    const EorI = scores.E >= scores.I ? "E" : "I";
    const SorN = scores.S >= scores.N ? "S" : "N";
    const TorF = scores.T >= scores.F ? "T" : "F";
    const PorJ = scores.P >= scores.J ? "P" : "J";
    return `${EorI}${SorN}${TorF}${PorJ}`;
  };

  const resetTest = () => {
    setStep(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, P: 0, J: 0 });
  };

  // 1. 메인 화면
  if (step === 0) {
    return (
      <div className="card">
        <h1>🍽️ 오늘 저녁 뭐 먹지?</h1>
        <p className="subtitle">내 취향 분석 기반 찰떡 저녁 메뉴 추천!</p>
        <button className="btn-main" onClick={() => setStep(1)}>테스트 시작하기 🚀</button>
      </div>
    );
  }

  // 2. 결과 화면
  if (step > questions.length) {
    const resultKey = getResultKey();
    const result = results[resultKey] || { title: "맛있는 음식 🍕", desc: "다 맛있어 보여요!" };
    return (
      <div className="card">
        <h2 className="result-badge">✨ 당신을 위한 찰떡 메뉴 ✨</h2>
        <h1 className="result-title">{result.title}</h1>
        <p className="result-desc">{result.desc}</p>
        <button className="btn-reset" onClick={resetTest}>다시 고르기 🔄</button>
      </div>
    );
  }

  // 3. 질문 화면
  const currentQuestion = questions[step - 1];
  return (
    <div className="card">
      <p className="step-indicator">Q.{step} / {questions.length}</p>
      <h2 className="question-title">{currentQuestion.question}</h2>
      <div className="btn-group">
        <button className="btn-choice" onClick={() => handleAnswer(currentQuestion.choices[0].type, "A")}>
          {currentQuestion.choices[0].text}
        </button>
        <button className="btn-choice" onClick={() => handleAnswer(currentQuestion.choices[1].type, "B")}>
          {currentQuestion.choices[1].text}
        </button>
      </div>
    </div>
  );
}

export default App;
