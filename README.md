# Newton's Laws Quiz App

An interactive, adaptive quiz application that helps students learn Newton's Laws of Motion through AI-generated multiple-choice questions based on educational PDF materials.

## Features

- 🤖 **AI-Powered Questions**: Questions generated from actual physics curriculum PDFs using Claude AI
- 📱 **Mobile-Optimized**: Fully responsive design that works great on smartphones
- 🎯 **Adaptive Difficulty**: Automatically adjusts question difficulty based on performance
- 🔥 **Progress Tracking**: Real-time scoring, streak tracking, and performance metrics
- 📚 **Content-Based**: All questions are derived directly from the uploaded PDF materials
- 🚀 **Easy Deployment**: Ready to deploy on Render with one-click setup

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd newton-quizzer
```

2. Install dependencies:
```bash
npm install
cd client && npm install && cd ..
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

4. Run the development server:
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client && npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for Render.

## How It Works

1. **PDF Parsing**: On startup, the server extracts text content from all PDFs in the `material/` folder
2. **Question Generation**: When a user requests a question, the API sends the PDF content to Claude AI with specific instructions for the current difficulty level
3. **Adaptive Learning**: After every 5 questions, the system analyzes performance and adjusts difficulty accordingly
4. **Mobile-First**: The UI is designed with touch interactions and smartphone screens in mind

## Project Structure

```
newton-quizzer/
├── material/           # PDF files with educational content
├── client/            # React frontend
│   ├── src/
│   │   ├── App.js    # Main quiz component
│   │   └── App.css   # Mobile-responsive styles
│   └── public/
├── server.js          # Express backend with AI integration
├── render.yaml        # Render deployment configuration
└── package.json       # Server dependencies
```

## Technologies Used

- **Backend**: Node.js, Express, pdf-parse
- **Frontend**: React
- **AI**: Anthropic Claude 3.5 Sonnet
- **Deployment**: Render
- **Styling**: CSS with mobile-first responsive design

## License

MIT