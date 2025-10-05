import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [recentPerformance, setRecentPerformance] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setShowExplanation(false);

    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty })
      });

      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error('Error fetching question:', error);
      alert('Failed to load question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    setShowExplanation(true);
    setTotalQuestions(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    // Update recent performance
    const newPerformance = [...recentPerformance, isCorrect].slice(-5);
    setRecentPerformance(newPerformance);

    // Adjust difficulty after 5 questions
    if (newPerformance.length === 5) {
      try {
        const response = await fetch('/api/adjust-difficulty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentDifficulty: difficulty,
            recentPerformance: newPerformance
          })
        });

        const data = await response.json();
        if (data.newDifficulty !== difficulty) {
          setDifficulty(data.newDifficulty);
          setTimeout(() => {
            alert(`Difficulty adjusted to ${data.newDifficulty}! Keep it up!`);
          }, 100);
        }
        setRecentPerformance([]);
      } catch (error) {
        console.error('Error adjusting difficulty:', error);
      }
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      default: return '#2196f3';
    }
  };

  const getOptionClass = (option) => {
    if (!showExplanation) {
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
              <span className="stat-label">Difficulty</span>
              <span className="stat-value" style={{ color: getDifficultyColor() }}>
                {difficulty.toUpperCase()}
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
                  disabled={showExplanation}
                >
                  <span className="option-letter">{key}</span>
                  <span className="option-text">{value}</span>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className={`explanation ${selectedAnswer === question.correctAnswer ? 'correct-bg' : 'incorrect-bg'}`}>
                <h3>
                  {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                </h3>
                <p><strong>Explanation:</strong> {question.explanation}</p>
              </div>
            )}

            <div className="button-group">
              {!showExplanation ? (
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
          <p>Based on Newton's Laws educational material</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
