FROM node:12-alpine as build
WORKDIR /app

COPY package.json /app/package.json

RUN npm install --only=prod

COPY public/ /app/public/

COPY src /app/src/
COPY tsconfig.json package-lock.json /app/

EXPOSE 3000  
RUN npm run build
CMD ["npm", "start"]
