# Health App

## Overview
Health App is a mobile application built with Expo and React Native, deployed using Expo Application Services (EAS). The app allows users to log their food intake, receive a breakdown of their nutritional health, and get personalized suggestions to improve their diet. Initially, we are using Supabase as our backend for the MVP, but we plan to transition to AWS after launch.

## Features
- **Food Logging**: Users can enter their meals manually.
- **Health Breakdown**: Analyzes nutritional intake and provides insights.
- **Personalized Suggestions**: AI-driven recommendations based on dietary habits.
- **Subscription Model**: Integrated with Superwall for managing premium features.
- **Device-Based Authentication**: No user accounts, authentication is based on device identifiers.

## Tech Stack
- **Frontend**: React Native (Expo)
- **Backend (MVP)**: Supabase
- **Backend (Future)**: AWS
- **Subscriptions**: Superwall
- **Deployment**: EAS (Expo Application Services)

## Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/ryanschwartz88/health-app.git
   cd health_app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory and add:
     ```sh
     SUPABASE_URL=your-supabase-url
     SUPABASE_ANON_KEY=your-supabase-anon-key
     SUPERWALL_API_KEY=your-superwall-api-key
     ```
4. Start the development server:
   ```sh
   npx expo start
   ```

## Deployment
To deploy with EAS:
```sh
npx eas build --platform ios/android
npx eas submit --platform ios/android
```

## Roadmap
- [ ] Implement food logging
- [ ] Develop health breakdown and insights
- [ ] Integrate Superwall for subscriptions
- [ ] Migrate backend from Supabase to AWS
- [ ] Implement AI-driven recommendations

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

