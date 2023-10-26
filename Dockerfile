FROM node:18 AS build
WORKDIR /usr/local/app

COPY ./ /usr/local/app
RUN npm install

RUN npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/instagram-clone /usr/share/nginx/html

EXPOSE 80