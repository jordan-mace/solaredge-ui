FROM node:alpine

COPY package.json . 
COPY package-lock.json .

RUN npm install
COPY webpack.config.js .
COPY tsconfig.json .
COPY .babelrc .

COPY /public ./public
COPY /src ./src

WORKDIR /dist
EXPOSE 3000

ENTRYPOINT npm run build && npm run serve