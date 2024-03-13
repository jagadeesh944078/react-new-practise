const QuestionComponent = ({ question, onAnswerClick = () => {} }) => {
  return (
    <div className="question">
      <div>{question.question}</div>
      <ul className="options">
        {question.answerOptions.map((option) => (
          <li key={option.text}>
            <button onClick={() => onAnswerClick(option.isCorrect)}>
              {option.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionComponent;
