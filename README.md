# Short-Url Project

This project is a URL shortening service. It provides functionality to create short URLs that redirect to longer URLs.

## Project Structure

- `index.js`: Main entry point of the application.
- `config/`: Configuration files, including database connection.
- `controllers/`: Contains controller logic for handling requests.
- `models/`: Database models.
- `routers/`: Route definitions for the application.
- `views/`: View templates (EJS) for rendering pages.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.

## Usage

Run the application with:

```
node index.js
```

The application will start and listen for incoming requests.

## Notes

- Make sure to configure your database connection in `config/connection.js`.
- The project uses EJS as the templating engine for views.
