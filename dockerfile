# build step
FROM node:16-alpine as build

WORKDIR /app_build
COPY . ./

# build react app
RUN npm install && npm run build

# use nginx as web server
FROM nginx:1.23-alpine as run
# copy react app from build to nginx static folder
COPY --from=build /app_build/build /usr/share/nginx/html