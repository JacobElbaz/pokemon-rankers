# Pokemon Rankers

Welcome to Pokemon Rankers! This project is a web application where users can vote for their favorite Pokemon and view the most popular Pokemon based on community votes.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Pokemon Rankers is a web-based platform designed for Pokemon enthusiasts to come together and determine the most beloved Pokemon in the community. Users can vote for their favorite Pokemon from a selection of pairs and view the top-voted Pokemon in real-time.

## Project Structure

The project repository is structured into two main folders:

- **backend**: Contains the server-side code written in Node.js with Express. This folder handles data management, authentication, and API endpoints for the application.
- **frontend**: Contains the client-side code written in HTML, CSS, and JavaScript. This folder includes the user interface and interacts with the backend server to display Pokemon data and handle user interactions.

## Features

- Users can vote for their favorite Pokemon from a selection of pairs.
- Real-time updates of the most popular Pokemon based on community votes.
- Separate backend and frontend components for better organization and scalability.
- Simple and intuitive user interface for easy navigation and voting.

## Installation

To run the Pokemon Rankers project locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/pokemon-rankers.git

2. Navigate to the project directory:

    ```bash 
    cd pokemon-rankers

3. Install dependencies for the backend:

    ```bash 
    cd backend 
    npm install

4. Install dependencies for the frontend:

    ```bash
    cd ../frontend 
    npm install

5. Set up environment variables: 
    
    Create a `.env` file in the root directory and add the following: 
    ```bash 
    PORT=3000
    MONGO_DB_URI=<your-mongodb-uri>
Replace `<your-mongodb-uri>` with your MongoDB connection string. 

## Usage

To start the development servers for both the backend and frontend, use the following commands:

    # Start the backend server 
    cd ../backend 
    npm start
    
    #Start the frontend server
    cd ../frontend 
    npm run dev

The backend server should now be running at `http://localhost:5000`, and the frontend server should be running at `http://localhost:3000`.

## Contributing

Contributions to Pokemon Rankers are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch to your fork.
4. Submit a pull request with a detailed description of your changes.
