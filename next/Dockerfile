FROM node:lts-alpine

WORKDIR /app
COPY . /app

RUN npm ci --production --no-optional

CMD ["npm", "start"]
