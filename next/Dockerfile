FROM node:lts-alpine

WORKDIR /app

COPY package* ./

RUN npm i --production

COPY server.js .
COPY pages .
COPY components .
COPY lib .

CMD ["npm", "run", "dev"]
