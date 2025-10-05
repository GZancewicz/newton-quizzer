const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Store extracted PDF content in memory
let pdfContent = '';
let isInitialized = false;

// Extract text from all PDFs on startup
async function initializePDFContent() {
  try {
    const pdfDir = path.join(__dirname, 'material');
    const files = await fs.readdir(pdfDir);
    const pdfFiles = files.filter(f => f.endsWith('.pdf'));

    let allContent = '';
    for (const file of pdfFiles) {
      const dataBuffer = await fs.readFile(path.join(pdfDir, file));
      const data = await pdfParse(dataBuffer);
      allContent += `\n\n=== ${file} ===\n${data.text}`;
    }

    pdfContent = allContent;
    isInitialized = true;
    console.log('PDF content extracted successfully');
  } catch (error) {
    console.error('Error initializing PDF content:', error);
  }
}

// Initialize on startup
initializePDFContent();

// Generate question based on difficulty and previous performance
app.post('/api/generate-question', async (req, res) => {
  try {
    const { difficulty, previousCorrect, topic } = req.body;

    if (!isInitialized) {
      return res.status(503).json({ error: 'Server is still initializing. Please try again.' });
    }

    const difficultyLevel = difficulty || 'medium';

    const prompt = `You are creating a multiple choice physics quiz question about Newton's Laws based on the following material:

${pdfContent}

Generate ONE multiple choice question with the following requirements:
- Difficulty level: ${difficultyLevel} (easy = basic concepts and definitions, medium = application problems, hard = complex scenarios and calculations)
- The question MUST be directly based on content from the provided material
- Include 4 answer options (A, B, C, D)
- Only ONE correct answer
- Make distractors (wrong answers) plausible but clearly incorrect
- Include a brief explanation of why the correct answer is right
${topic ? `- Focus on: ${topic}` : ''}

Format your response as valid JSON:
{
  "question": "The question text",
  "options": {
    "A": "First option",
    "B": "Second option",
    "C": "Third option",
    "D": "Fourth option"
  },
  "correctAnswer": "A",
  "explanation": "Why this answer is correct",
  "difficulty": "${difficultyLevel}",
  "topic": "Newton's First Law|Newton's Second Law|Newton's Third Law"
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = message.content[0].text;

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const questionData = JSON.parse(jsonMatch[0]);

    res.json(questionData);
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

// Adaptive difficulty endpoint
app.post('/api/adjust-difficulty', async (req, res) => {
  try {
    const { currentDifficulty, recentPerformance } = req.body;

    // recentPerformance is array of recent answers: [true, false, true, true, false]
    const correctCount = recentPerformance.filter(x => x).length;
    const accuracy = correctCount / recentPerformance.length;

    let newDifficulty = currentDifficulty;

    if (accuracy >= 0.8 && currentDifficulty === 'easy') {
      newDifficulty = 'medium';
    } else if (accuracy >= 0.8 && currentDifficulty === 'medium') {
      newDifficulty = 'hard';
    } else if (accuracy <= 0.4 && currentDifficulty === 'hard') {
      newDifficulty = 'medium';
    } else if (accuracy <= 0.4 && currentDifficulty === 'medium') {
      newDifficulty = 'easy';
    }

    res.json({
      newDifficulty,
      accuracy: Math.round(accuracy * 100)
    });
  } catch (error) {
    console.error('Error adjusting difficulty:', error);
    res.status(500).json({ error: 'Failed to adjust difficulty' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    initialized: isInitialized
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
