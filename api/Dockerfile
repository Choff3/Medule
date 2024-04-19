FROM node:latest

ENV FHIR_SERVER_ENDPOINT='https://demo.kodjin.com/fhir'
ENV NODE_ENV=production
ENV PUBLIC_URL='medule.tech'

WORKDIR /app

COPY . .

RUN npm install

CMD npx nodemon index