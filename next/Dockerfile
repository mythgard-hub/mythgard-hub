FROM node:lts-alpine

WORKDIR /app

COPY package* ./

RUN npm i --production

COPY server.js .
COPY pages .
COPY components .
COPY lib .
COPY server-routes .
COPY next.config.js .

CMD ["npm", "run", "dev"]
