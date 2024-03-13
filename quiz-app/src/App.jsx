import { useState } from "react";
import "./App.css";
import questions from "./Constants/questions.json";
import QuestionComponent from "./Components/QuestionComponent";
import ResultComponent from "./Components/ResultComponent";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleNextQuestion = (isCorrect) => {
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswers([...userAnswers, isCorrect]);
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
  };

  return (
    <div className="App">
      <h1>World Quiz</h1>
      {currentQuestion < questions.length && (
        <QuestionComponent
          question={questions[currentQuestion]}
          onAnswerClick={handleNextQuestion}
        />
      )}
      {currentQuestion === questions.length && (
        <ResultComponent
          userAnswers={userAnswers}
          questions={questions}
          resetQuiz={handleResetQuiz}
        />
      )}
    </div>
  );
}

export default App;
