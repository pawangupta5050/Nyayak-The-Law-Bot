# Nyayak - The Law Bot

Nyayak is a Law Bot designed to provide legal information and assistance. This project is built using Node.js and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Docker](#docker)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Nyayak is an intelligent bot that helps users navigate through legal queries by providing relevant information and resources. It leverages a combination of natural language processing and a comprehensive legal database to deliver accurate and timely legal assistance.

## Features

- Answer legal questions based on a predefined database
- Provide links to relevant legal documents and resources
- User-friendly interface
- Scalable and easily extensible

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your computer. You can download it from [here](https://nodejs.org/).
- MongoDB installed and running on your machine or a remote MongoDB service. You can download it from [here](https://www.mongodb.com/try/download/community).
- Docker installed on your computer. You can download it from [here](https://www.docker.com/products/docker-desktop).

## Installation

To install Nyayak, follow these steps:

1. Clone the repository
    ```sh
    git clone https://github.com/yourusername/nyayak-law-bot.git
    ```
2. Navigate to the project directory
    ```sh
    cd nyayak-law-bot
    ```
3. Install the necessary dependencies
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory and add your API KEY, SECRET KEY, and MongoDB URL
    ```env
    API_KEY=your_google_api_key
    SECRET_KEY=your_secret_key
    MONGO_URL=your_mongodb_url
    ```

## Usage

To start the server, run the following command:

```sh
npm start
```

By default, the server will run on http://localhost:8000.

## Docker

To use Docker to run Nyayak, follow these steps:

1. Ensure Docker is installed and running on your machine.

2. Build the Docker image:
    ```sh
    docker compose up
    ```

3. Watch the changes on the Docker:
    ```sh
    docker compose watch
    ```

This will start the server in a Docker container, and it will be accessible at http://localhost:8000.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Contact

If you have any questions or feedback, feel free to contact me at:

- GitHub: [pawangupta5050](https://github.com/pawangupta5050)
- Email: pawangupta200301@gmail.com
