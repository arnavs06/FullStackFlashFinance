import React, { useState } from 'react';
import '../styles/Math.css';

const MCQuestion = () => {
  const questions = [
    {
      question: "Which financial statement shows a company’s profitability over a period of time?",
      answers: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "Statement of Shareholders' Equity"],
      correctAnswer: "Income Statement"
    },
    {
      question: "What is the most commonly used valuation multiple in investment banking?",
      answers: ["EV/EBITDA", "P/E Ratio", "Price-to-Book Ratio", "Dividend Yield"],
      correctAnswer: "EV/EBITDA"
    },
    {
      question: "What does 'WACC' stand for in financial modeling?",
      answers: [
        "Weighted Average Capital Cost",
        "Weighted Asset Cost of Capital",
        "Weighted Average Cost of Capital",
        "Working Assets and Capital Cost"
      ],
      correctAnswer: "Weighted Average Cost of Capital"
    },
    {
      question: "If a company has a negative Net Working Capital, what does this usually indicate?",
      answers: [
        "The company has strong liquidity",
        "The company may struggle to pay short-term liabilities",
        "The company is generating high free cash flow",
        "The company has too much cash on hand"
      ],
      correctAnswer: "The company may struggle to pay short-term liabilities"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setFeedback(answer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect. Please try again.');
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setFeedback('');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handlePreviousQuestion = () => {
    setSelectedAnswer(null);
    setFeedback('');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
  };

  return (
    <section className="questions-section">
      <h2>Investment Banking Interview Questions</h2>
      <div className="question-card">
        <h3 className="question-title">{currentQuestion.question}</h3>
        <div className="answer-section">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className={`submit-btn ${selectedAnswer === answer ? 'selected' : ''}`}
              onClick={() => handleAnswerClick(answer)}
              disabled={feedback !== ''}
            >
              {answer}
            </button>
          ))}
        </div>
        {feedback && <p className={`feedback ${feedback === 'Correct!' ? 'correct' : 'incorrect'}`}>{feedback}</p>}
        <div className="navigation-buttons">
          <button onClick={handlePreviousQuestion} className="prev-next-btn" disabled={currentIndex === 0}>
            Previous Question
          </button>
          <button onClick={handleNextQuestion} className="prev-next-btn">
            Next Question
          </button>
        </div>
      </div>
    </section>
  );
};

export default MCQuestion;
