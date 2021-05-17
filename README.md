# SCiO - DataScribe

This dashboard has been developed using [Diamond-React](https://www.primefaces.org/layouts/diamond-react) application framework.

## Requirements

- NodeJS v14.17.0 LTS: [Download](https://nodejs.org/)

### Dependencies

To install the dependencies:

    npm install

### Development

To run the application locally:

    npm start

Open `localhost:3000` in your browser (should open automatically).

### Testing

To test the project locally:

    npm run test

### Build and run using Docker

Build a new Docker image for the project:

    docker build . -t scio-datascribe

Run the project using Docker:

    docker run -d -p 3000:3000 scio-datascribe

### Production

Use `npm run build` to generate the production-ready app. The `build` folder will contain all needed files.
