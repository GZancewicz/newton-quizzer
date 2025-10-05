const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Store all questions in memory
let allQuestions = [];
let isInitialized = false;

// Load all questions from JSON files on startup
async function loadQuestions() {
  try {
    const firstLaw = JSON.parse(
      await fs.readFile(path.join(__dirname, 'questions-newtons-first-law.json'), 'utf-8')
    );
    const secondLaw = JSON.parse(
      await fs.readFile(path.join(__dirname, 'questions-newtons-second-law.json'), 'utf-8')
    );
    const thirdLaw = JSON.parse(
      await fs.readFile(path.join(__dirname, 'questions-newtons-third-law.json'), 'utf-8')
    );

    // Combine all questions with topic labels
    allQuestions = [
      ...firstLaw.questions.map(q => ({ ...q, topic: firstLaw.topic })),
      ...secondLaw.questions.map(q => ({ ...q, topic: secondLaw.topic })),
      ...thirdLaw.questions.map(q => ({ ...q, topic: thirdLaw.topic }))
    ];

    isInitialized = true;
    console.log(`Loaded ${allQuestions.length} questions successfully`);
  } catch (error) {
    console.error('Error loading questions:', error);
  }
}

// Initialize on startup
loadQuestions();

// Get a random question
app.get('/api/question', (req, res) => {
  try {
    if (!isInitialized || allQuestions.length === 0) {
      return res.status(503).json({ error: 'Server is still initializing. Please try again.' });
    }

    // Get a random question
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    const question = allQuestions[randomIndex];

    // Format response to match frontend expectations
    const formattedQuestion = {
      question: question.question,
      options: {
        A: question.answers[0].text,
        B: question.answers[1].text,
        C: question.answers[2].text,
        D: question.answers[3].text
      },
      correctAnswer: ['A', 'B', 'C', 'D'][question.answers.findIndex(a => a.correct)],
      topic: question.topic,
      id: question.id
    };

    res.json(formattedQuestion);
  } catch (error) {
    console.error('Error getting question:', error);
    res.status(500).json({ error: 'Failed to get question' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    initialized: isInitialized,
    totalQuestions: allQuestions.length
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
