FROM node:16.13 as builder

WORKDIR /app
COPY . .
COPY package.json .
RUN yarn install
RUN yarn build

FROM node:16.13

WORKDIR /app

RUN adduser  --disabled-password --no-create-home will

RUN chown will /usr/local

RUN yarn add express

COPY --from=builder /app/dist .

COPY . .

USER will
