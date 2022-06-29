FROM node:16

WORKDIR "/app"

COPY ["package.json", "package-lock.json*", "./"]
COPY ["server/package.json", "server/package-lock.json*", "./server/"]
COPY ["client/package.json", "client/package-lock.json*", "./client/"]

RUN npm run install

COPY . .

RUN npm run build

ENV PORT=${PORT:-8080}
EXPOSE $PORT

CMD [ "npm", "start" ]
