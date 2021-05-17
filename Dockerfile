FROM node:14.17.0-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm rebuild node-sass

EXPOSE 3000

CMD ["npm", "start"]
