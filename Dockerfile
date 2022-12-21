# FROM node:13.12.0-alpine as builder

# WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

# COPY package.json ./
# COPY package-lock.json ./

# RUN npm ci --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# COPY . ./
# RUN npm run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]    

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
