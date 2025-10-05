# Deployment Instructions for Render

## Prerequisites
1. A Render account (sign up at https://render.com)
2. An Anthropic API key (get one at https://console.anthropic.com)

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial quiz app deployment"
git push origin main
```

### 2. Deploy on Render

#### Option A: Using render.yaml (Recommended)
1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml`
5. Add your environment variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key

#### Option B: Manual Setup
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: newton-quizzer
   - **Environment**: Node
   - **Build Command**: `npm install && cd client && npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV` = `production`
     - `ANTHROPIC_API_KEY` = Your API key

5. Click "Create Web Service"

### 3. Wait for Deployment
- Render will build and deploy your app (usually takes 3-5 minutes)
- You'll get a URL like: `https://newton-quizzer.onrender.com`

## Local Development

### 1. Install Dependencies
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Anthropic API key
```

### 3. Run Development Servers

In one terminal (backend):
```bash
npm run dev
```

In another terminal (frontend):
```bash
cd client
npm start
```

The app will be available at http://localhost:3000

## Testing on Smartphone

### For deployed version:
1. Open your Render URL on your smartphone browser
2. Add to home screen for app-like experience:
   - **iOS**: Tap Share → Add to Home Screen
   - **Android**: Tap Menu → Add to Home Screen

### For local testing:
1. Make sure your phone is on the same WiFi network
2. Find your computer's IP address:
   - **Mac/Linux**: `ifconfig | grep inet`
   - **Windows**: `ipconfig`
3. Access from phone: `http://YOUR_IP:3000`

## Features
- ✅ Mobile-responsive design optimized for smartphones
- ✅ Adaptive difficulty (adjusts based on performance)
- ✅ Multiple choice questions from PDF material
- ✅ Streak tracking and scoring
- ✅ AI-powered question generation
- ✅ Progressive difficulty adjustment

## Troubleshooting

### Build fails on Render
- Check that `ANTHROPIC_API_KEY` is set in environment variables
- Verify the repository is connected correctly

### Questions not loading
- Check the Logs in Render dashboard
- Verify API key is valid and has credits

### Mobile display issues
- Clear browser cache
- Try different browsers (Chrome, Safari, Firefox)
