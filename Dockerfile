FROM arm64v8/node:16.13 as builder

WORKDIR /code
COPY . .
COPY  package.json .
COPY yarn.lock .
RUN yarn install
RUN npm run build

FROM arm64v8/node:16.13

WORKDIR /code

RUN adduser  --disabled-password --no-create-home will

RUN yarn add express

COPY --from=builder /code/dist .

COPY . .

USER will

CMD ["yarn", "serve"]
