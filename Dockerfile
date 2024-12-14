FROM node:12.22.9

WORKDIR /app

COPY package*.json ./

RUN npm config set strict-ssl false

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
