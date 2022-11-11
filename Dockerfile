FROM node:16.15-alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build

EXPOSE 3000

CMD npm start
