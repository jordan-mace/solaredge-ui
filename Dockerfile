FROM node:alpine

COPY package.json package-lock.json ./

RUN npm install
COPY ./public ./public
COPY ./src ./src
COPY . .

RUN npm run build

WORKDIR /build
EXPOSE 3000

ENTRYPOINT [ "npx", "serve" ]