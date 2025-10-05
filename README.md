# Newton's Laws Quiz App

An interactive quiz application that helps students learn Newton's Laws of Motion through 300 multiple-choice questions based on educational materials.

## Features

- 📱 **Mobile-Optimized**: Fully responsive design that works great on smartphones
- 🔥 **Progress Tracking**: Real-time scoring, streak tracking, and accuracy metrics
- 📚 **300 Questions**: 100 questions each for Newton's First, Second, and Third Laws
- 🎯 **Topic Selection**: Practice all laws together or focus on one specific law
- 🔄 **Random Questions**: Questions are randomly selected from each topic's pool
- 🚀 **Easy Deployment**: Ready to deploy on Render
- ⚡ **No API Keys Required**: All questions are pre-generated and stored in JSON files

## Quick Start

### Prerequisites
- Node.js 18+ installed

### Local Development

1. **Install dependencies:**
```bash
npm install
cd client && npm install && cd ..
```

2. **Start the backend server (Terminal 1):**
```bash
npm run dev
```

3. **Start the React frontend (Terminal 2):**
```bash
cd client
npm start
```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Deploy to Render

### Option 1: Using Blueprint (Recommended)
1. Push your code to GitHub
2. Go to https://dashboard.render.com
3. Click "New +" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and deploy
6. Wait 3-5 minutes for build to complete
7. Your app will be live at: `https://newton-quizzer.onrender.com`

### Option 2: Manual Setup
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: newton-quizzer
   - **Environment**: Node
   - **Build Command**: `npm install && cd client && npm install && npm run build`
   - **Start Command**: `npm start`
5. Click "Create Web Service"

**No environment variables or API keys needed!**

## Testing on Smartphone

### Deployed Version (Best Experience)
1. Once deployed to Render, open the URL on your phone's browser
2. Add to home screen for an app-like experience:
   - **iOS**: Tap Share → "Add to Home Screen"
   - **Android**: Tap Menu → "Add to Home Screen"

### Local Network Testing
1. Make sure your phone and computer are on the same WiFi
2. Find your computer's local IP:
   - **Mac**: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - **Windows**: `ipconfig` (look for IPv4 Address)
3. On your phone, open: `http://YOUR_IP:3000`

## How It Works

### Question Pool
The quiz contains **300 questions** total:
- `questions-newtons-first-law.json` - 100 questions on Newton's First Law (Inertia)
- `questions-newtons-second-law.json` - 100 questions on Newton's Second Law (F=ma)
- `questions-newtons-third-law.json` - 100 questions on Newton's Third Law (Action-Reaction)

All questions are based on the PDF materials in the `material/` folder.

### Topic Selection
Users can choose to practice:
- **All Laws** - Random questions from all 300
- **1st Law** - Only questions about Newton's First Law
- **2nd Law** - Only questions about Newton's Second Law
- **3rd Law** - Only questions about Newton's Third Law

Stats (score, streak, accuracy) reset when switching between topics.

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
├── package.json                       # Backend dependencies
└── render.yaml                        # Render deployment config
```

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React
- **Question Storage**: JSON files (no database needed)
- **Deployment**: Render
- **Styling**: CSS with mobile-first responsive design

## Troubleshooting

### Server won't start
- Make sure port 3001 is not in use: `lsof -ti:3001 | xargs kill -9`
- Run `npm install` again to ensure all dependencies are installed

### Frontend won't load
- Make sure the backend is running on port 3001
- Check that you're accessing http://localhost:3000
- Check browser console for errors

### Blank page after deployment
- Wait a few minutes for the build to complete
- Check Render logs for errors
- Verify build command completed successfully

### Questions not loading
- Check the Render dashboard logs
- Verify all 3 JSON question files were deployed
- Test the `/api/health` endpoint

## License

MIT
