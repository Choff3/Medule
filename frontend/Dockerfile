FROM node:latest

ENV REACT_APP_API_ENDPOINT="http://localhost:5001"
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "start"]