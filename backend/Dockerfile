FROM node:18.17.1

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3500
CMD ["npm", "run", "server"]