# Mind Map Web App

This is a full-stack Mind Map Web App project built with React.js, TailwindCSS, Node.js, Express.js, and MongoDB Atlas.

## Features

- User Authentication (Login, Registration)
- Dashboard with User Profile
- Mind Map Editor
- Create, Read, Update, Delete Mind Maps and Nodes
- Drag-and-drop node creation and connection
- Auto-save Mind Maps

## Tech Stack

**Frontend:**
- React.js
- TailwindCSS
- React Router DOM
- Context API

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Folder Structure

```
/mindmap-app
├── /client
│   ├── /public
│   ├── /src
│   │   ├── /assets
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /contexts
│   │   ├── /services
│   │   ├── /utils
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── tailwind.config.js
│   └── package.json
├── /server
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── /middlewares
│   ├── /utils
│   ├── config/
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

## Setup

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account and database

### Frontend Setup

1.  Navigate to the `client` directory: `cd mindmap-app/client`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm start`

### Backend Setup

1.  Navigate to the `server` directory: `cd mindmap-app/server`
2.  Install dependencies: `npm install`
3.  Create a `.env` file and add your MongoDB Atlas connection string and JWT secret:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4.  Start the backend server: `node server.js`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Specify your license here]
