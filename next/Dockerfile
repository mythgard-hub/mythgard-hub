FROM node:lts-alpine

WORKDIR /app
COPY . /app

RUN npm i --production --no-optional && npm run build

CMD ["npm", "start"]
