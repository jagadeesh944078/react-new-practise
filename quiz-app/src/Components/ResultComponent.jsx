const ResultComponent = ({ userAnswers, questions, resetQuiz = () => {} }) => {
  const correctAnswers = userAnswers.filter((answer) => answer).length;

  return (
    <div className="results">
      <h1>Result</h1>
      <div>
        you answered {correctAnswers} out {questions.length}
        <span onClick={resetQuiz}>click here to reset</span>
      </div>

      <ul>
        {questions.map((question, index) => (
          <li key={question.question} data-correct={userAnswers[index]}>
            Q{index + 1}.{question.question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultComponent;
