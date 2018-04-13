FROM node:8.4.0-alpine

# Prepare app directory
WORKDIR /app
COPY . /app

# Install app dependecies
RUN yarn install --pure-lockfile \
    && yarn build

ENV NODE_ENV=production
ENV PORT=80

CMD [ "node", "./index.js" ]

EXPOSE 80
