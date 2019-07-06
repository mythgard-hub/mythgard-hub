FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]
