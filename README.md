# SCiO - DataScribe

This dashboard has been developed using [Diamond-React](https://www.primefaces.org/layouts/diamond-react) application framework.

## Requirements

- NodeJS v14.17.0 LTS: [Download](https://nodejs.org/)
- NPM v7.13.0 LTS: [Download](https://www.npmjs.com/get-npm)

### Setup the environment

Using nodeenv:

    nodeenv --prebuilt -n 14.17.0 env

Then activate the environment:

    . env/bin/activate

And install the proper npm version:

    npm i -g npm@7.13.0

### Dependencies

To install the dependencies:

    npm install

### Configuration

Copy the `.env.example`:

    cp .env.example .env

and fill all the values (`REACT_APP_API_BASE_URL` is the most important one).

### Development locally

To run the application locally:

    npm start

Open `localhost:3000` in your browser (should open automatically).

### Interact with the staging backend server

You first need to generate a local certificate (https). For that you'll need to have `openssl` installed in your system (it usually ships with linux/macos systems):

Run:

    openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365

fill the requested input with some dummy details and then:
  
    openssl rsa -in keytmp.pem -out key.pem
    
Then edit your `/etc/hosts` and add this entry:

    127.0.0.1       scio-datascribe-local.noeticblue.com

In your `.env` file add this to your `HOST` value: `scio-datascribe-local.noeticblue.com`

Every time you need to run the dev server run:

    npm run start-https

Open `scio-datascribe-local.noeticblue.com:3000` in your browser (should open automatically).

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
