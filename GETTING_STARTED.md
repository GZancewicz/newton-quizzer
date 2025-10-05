# Getting Started with Newton Quizzer

## Quick Test Locally

1. **Install dependencies:**
```bash
npm install
cd client && npm install && cd ..
```

2. **Start the backend server:**
```bash
npm run dev
```

3. **In a new terminal, start the React frontend:**
```bash
cd client
npm start
```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Deploy to Render (Recommended)

### Option 1: Using render.yaml (Easiest)
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

## Testing on Your Smartphone

### Option A: Deployed Version (Best)
1. Once deployed to Render, open the URL on your phone's browser
2. For best experience, add to home screen:
   - **iOS**: Tap Share → "Add to Home Screen"
   - **Android**: Tap Menu → "Add to Home Screen"

### Option B: Local Network Testing
1. Make sure your phone and computer are on the same WiFi
2. Find your computer's local IP:
   - **Mac**: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - **Windows**: `ipconfig` (look for IPv4 Address)
3. On your phone, open: `http://YOUR_IP:3000`

## Question Pool

The quiz contains **300 questions** total:
- `questions-newtons-first-law.json` - 100 questions on Newton's First Law
- `questions-newtons-second-law.json` - 100 questions on Newton's Second Law
- `questions-newtons-third-law.json` - 100 questions on Newton's Third Law

All questions are based on the PDF materials in the `material/` folder.

## Troubleshooting

### Server won't start
- Make sure port 3001 is not in use
- Run `npm install` again to ensure all dependencies are installed

### Frontend won't load
- Make sure the backend is running on port 3001
- Check that you're accessing http://localhost:3000

### Blank page after deployment
- Wait a few minutes for the build to complete
- Check Render logs for errors
- Make sure build command completed successfully

## Features

- ✅ 300 multiple-choice questions
- ✅ Mobile-responsive design
- ✅ Score tracking and streaks
- ✅ Accuracy percentage
- ✅ Random question selection
- ✅ Instant feedback on answers
- ✅ Topics labeled (First/Second/Third Law)
- ✅ Touch-friendly UI for smartphones

## Next Steps

1. Test locally to make sure everything works
2. Deploy to Render
3. Share the Render URL with your son
4. Have him add it to his phone's home screen
5. Monitor his progress!

Good luck! 🚀
