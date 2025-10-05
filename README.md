# Newton's Laws Quiz App

An interactive quiz application that helps students learn Newton's Laws of Motion through 300 multiple-choice questions based on educational materials.

## Features

- 📱 **Mobile-Optimized**: Fully responsive design that works great on smartphones
- 🔥 **Progress Tracking**: Real-time scoring, streak tracking, and accuracy metrics
- 📚 **300 Questions**: 100 questions each for Newton's First, Second, and Third Laws
- 🎯 **Random Questions**: Questions are randomly selected from the pool
- 🚀 **Easy Deployment**: Ready to deploy on Render
- ⚡ **No API Keys Required**: All questions are pre-generated and stored in JSON files

## Quick Start

### Prerequisites
- Node.js 18+ installed

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

3. Run the development server:
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client && npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Web Service"
4. Connect your repository
5. Use these settings:
   - **Build Command**: `npm install && cd client && npm install && npm run build`
   - **Start Command**: `npm start`
6. Click "Create Web Service"

That's it! No environment variables or API keys needed.

## Project Structure

```
newton-quizzer/
├── material/                          # Original PDF files
├── questions-newtons-first-law.json   # 100 questions on 1st Law
├── questions-newtons-second-law.json  # 100 questions on 2nd Law
├── questions-newtons-third-law.json   # 100 questions on 3rd Law
├── client/                            # React frontend
│   ├── src/
│   │   ├── App.js                    # Main quiz component
│   │   └── App.css                   # Mobile-responsive styles
│   └── public/
├── server.js                          # Express backend
└── package.json                       # Dependencies
```

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React
- **Question Storage**: JSON files (no database needed)
- **Deployment**: Render
- **Styling**: CSS with mobile-first responsive design

## License

MIT