FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json

RUN npm i

COPY pages .

COPY components .

CMD ["npm", "run", "dev"]
