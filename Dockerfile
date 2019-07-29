FROM node:10

WORKDIR /usr/src/jackubot

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run build

EXPOSE 8080 

CMD ["node", "dist/index.js"]