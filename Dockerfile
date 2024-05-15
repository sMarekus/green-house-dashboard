# Stage 1: Development
FROM node:18-slim as development

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start-watch"]

# Stage 2: Production
FROM node:18-slim as build

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

VOLUME /usr/src/app/build
