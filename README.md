# LinkedIn Scraper

A full-stack application designed to scrape LinkedIn profile data using a Chrome extension and store it in a local PostgreSQL database via a Node.js backend.

## Project Structure

- **backend/**: Node.js Express server with Sequelize and PostgreSQL.
- **extension/**: Chrome extension for scraping profile data.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [Google Chrome](https://www.google.com/chrome/)

## Setup

### Backend

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the server:
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:3000`.

### PostgreSQL Setup

1.  Ensure PostgreSQL is installed and running on your machine.
2.  Create a database for the project (default name is `linkedin`).
3.  Create a `.env` file in the `backend` directory with the following variables:
    ```env
    DB_NAME=linkedin
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_HOST=localhost
    ```
    Replace `your_username` and `your_password` with your actual PostgreSQL credentials.

### Chrome Extension

1.  Open Google Chrome and navigate to `chrome://extensions`.
2.  Enable **Developer mode** in the top right corner.
3.  Click **Load unpacked** in the top left corner.
4.  Select the `extension` directory from this project.

## Usage

1.  Ensure the backend server is running.
2.  Click on the extension icon to open the popup.
3.  Enter a list of LinkedIn profile URLs (one per line).
4.  Click "Start Scraping".
5.  The extension will open each URL, scrape the data, and send it to the backend.
4.  Check the backend console or database to verify the data has been saved.

## API Endpoints

### `POST /profiles`

Saves a new profile to the database.


### `GET /profiles`

Retrieves all saved profiles.

