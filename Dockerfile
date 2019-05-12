FROM node:10.15.3-alpine as builder

ENV NODE_ENV=production
WORKDIR /build
COPY package.json yarn.lock /build/
RUN yarn install --production && yarn cache clean

FROM node:10.15.3-alpine

ENV NODE_ENV=production
ENV PORT 3000
WORKDIR /app/
COPY --from=builder /build/node_modules /app/node_modules
COPY . /app
EXPOSE 3000
CMD ["yarn", "start"]
