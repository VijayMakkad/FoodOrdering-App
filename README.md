# Food Ordering App

Welcome to the Food Ordering App! This is a full-stack project developed using React Native with TypeScript for the frontend, Supabase for the backend, and Expo for the development environment. This document will guide you through the setup and usage of the app.

## Features
-**IOS DEVELOPMENT**
- **User Authentication**: Allow users to sign up and log in securely.
- **Browse Menu**: Users can view the list of available food items.
- **Add to Cart**: Users can add items to their shopping cart.
- **Place Order**: Users can place an order and view order history.
- **Real-time Updates**: Order status updates are displayed in real-time.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version >= 12.x)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## Getting Started

Follow these steps to set up and run the Food Ordering App locally:

### 1. Clone the Repository

```bash
git clone https://github.com/VijayMakkad/food-ordering-app.git
cd food-ordering-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Supabase

Create a Supabase account and set up a new project. Obtain your Supabase URL and Public API Key.

Copy the `.env.example` file to `.env` and update the following environment variables with your Supabase credentials:

```dotenv
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_public_api_key
```

### 4. Start the Development Server

```bash
expo start
```

This will start the Expo development server. You can run the app on an iOS or Android simulator/emulator or on your physical device using the Expo Go app.

## Tech Stack

- **Frontend**:
  - React Native
  - TypeScript
  - Expo
  - React Navigation

- **Backend**:
  - Supabase (PostgreSQL as a Service)
  
## Folder Structure

```
food-ordering-app/
├── assets/                # Images and other assets
├── src/                   # Source code
│   ├── components/        # Reusable components
│   ├── screens/           # App screens
│   ├── navigation/        # Navigation configuration
│   ├── services/          # API services (Supabase client)
│   ├── types/             # TypeScript types/interfaces
│   └── App.tsx            # Root component
├── .env.example           # Environment variables template
└── package.json           # Project dependencies and scripts
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out our Food Ordering App! If you have any questions or need further assistance, please don't hesitate to reach out. Happy coding! 🍔🍕🌮
