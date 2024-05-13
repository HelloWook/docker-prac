FROM node:18.17.1

WORKDIR /backend

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 3500

CMD ["nodemon", "-L", "app.js"]  # npx 불필요
