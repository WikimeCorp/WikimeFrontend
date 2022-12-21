FROM node:12-alpine as build
WORKDIR /app
COPY . ./
# COPY package.json ./
RUN npm install

EXPOSE 3000  
RUN npm run build
CMD ["npm", "start"]
