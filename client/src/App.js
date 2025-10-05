import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('all');

  useEffect(() => {
    fetchQuestion();
  }, [selectedTopic]);

  const fetchQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setShowResult(false);

    try {
      const url = selectedTopic === 'all'
        ? '/api/question'
        : `/api/question?topic=${encodeURIComponent(selectedTopic)}`;
      const response = await fetch(url);
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error('Error fetching question:', error);
      alert('Failed to load question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    // Reset stats when switching topics
    setScore(0);
    setStreak(0);
    setTotalQuestions(0);
  };

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    setShowResult(true);
    setTotalQuestions(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const getOptionClass = (option) => {
    if (!showResult) {
      return selectedAnswer === option ? 'option selected' : 'option';
    }

    if (option === question.correctAnswer) {
      return 'option correct';
    }

    if (option === selectedAnswer && option !== question.correctAnswer) {
      return 'option incorrect';
    }

    return 'option disabled';
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>⚛️ Newton's Laws Quiz</h1>

          <div className="topic-selector">
            <button
              className={`topic-btn ${selectedTopic === 'all' ? 'active' : ''}`}
              onClick={() => handleTopicChange('all')}
            >
              All Laws
            </button>
            <button
              className={`topic-btn ${selectedTopic === "Newton's First Law" ? 'active' : ''}`}
              onClick={() => handleTopicChange("Newton's First Law")}
            >
              1st Law
            </button>
            <button
              className={`topic-btn ${selectedTopic === "Newton's Second Law" ? 'active' : ''}`}
              onClick={() => handleTopicChange("Newton's Second Law")}
            >
              2nd Law
            </button>
            <button
              className={`topic-btn ${selectedTopic === "Newton's Third Law" ? 'active' : ''}`}
              onClick={() => handleTopicChange("Newton's Third Law")}
            >
              3rd Law
            </button>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat-label">Score</span>
              <span className="stat-value">{score}/{totalQuestions}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Streak</span>
              <span className="stat-value">{streak} 🔥</span>
            </div>
            <div className="stat">
              <span className="stat-label">Accuracy</span>
              <span className="stat-value">
                {totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%
              </span>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading question...</p>
          </div>
        ) : question ? (
          <div className="quiz-card">
            <div className="question-header">
              <span className="topic-badge">{question.topic}</span>
            </div>

            <h2 className="question">{question.question}</h2>

            <div className="options">
              {Object.entries(question.options).map(([key, value]) => (
                <button
                  key={key}
                  className={getOptionClass(key)}
                  onClick={() => handleAnswerSelect(key)}
                  disabled={showResult}
                >
                  <span className="option-letter">{key}</span>
                  <span className="option-text">{value}</span>
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`explanation ${selectedAnswer === question.correctAnswer ? 'correct-bg' : 'incorrect-bg'}`}>
                <h3>
                  {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                </h3>
                <p>
                  {selectedAnswer === question.correctAnswer
                    ? 'Great job! You got it right!'
                    : `The correct answer is ${question.correctAnswer}.`}
                </p>
              </div>
            )}

            <div className="button-group">
              {!showResult ? (
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                >
                  Submit Answer
                </button>
              ) : (
                <button className="next-btn" onClick={fetchQuestion}>
                  Next Question →
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="error">
            <p>Failed to load question</p>
            <button onClick={fetchQuestion}>Try Again</button>
          </div>
        )}

        <footer className="footer">
          <p>Based on Newton's Laws educational material • 300 Questions</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
