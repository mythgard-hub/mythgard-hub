FROM node:lts-alpine

WORKDIR /app

COPY package* ./

RUN npm i

COPY server.js .
COPY pages .
COPY components .

CMD ["npm", "run", "dev"]
