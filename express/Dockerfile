FROM node:lts-alpine

WORKDIR /app

COPY . /app

RUN npm i --production

EXPOSE 3000

CMD node index.js
