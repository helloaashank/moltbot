# OpenWhen Letters

A digital emotional vault for time-locked letters.

## Project Structure

```
openwhen-letters/
├── App.js                 # Main app entry with navigation
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── LetterCard.js
│   │   └── PremiumBadge.js
│   ├── screens/           # Screen components
│   │   ├── LandingScreen.js
│   │   ├── CreateLetterScreen.js
│   │   ├── LetterLockedScreen.js
│   │   ├── LetterOpenedScreen.js
│   │   └── DashboardScreen.js
│   ├── theme/             # Design tokens
│   │   └── colors.js
│   ├── utils/             # Helper functions
│   │   └── countdown.js
│   └── data/              # Mock data
│       └── mockLetters.js
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# For Expo project
npx expo start

# For React Native CLI
npx react-native run-ios
npx react-native run-android
```

## Design Principles

- **Minimal**: Clean interfaces, focused on content
- **Soft**: Rounded corners, gentle shadows, warm colors
- **Emotional**: Typography and spacing that breathes
- **Intimate**: Personal, safe feeling throughout
- **Not Corporate**: Avoids cold, business-like aesthetics
