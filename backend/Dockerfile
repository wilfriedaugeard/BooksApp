FROM node:latest

WORKDIR /app/backend

COPY package.json /app/backend

RUN npm install

COPY . /app/backend

EXPOSE 3000

CMD npm start