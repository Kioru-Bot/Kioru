FROM node:12
WORKDIR /kioru/bot

COPY package*.json ./
RUN npm install
COPY . .

CMD [ "node", "index.js" ]