FROM node:18.19.0-alpine3.19 AS build

ENV NODE_ENV=development
WORKDIR /usr/web

COPY package.json /usr/web/package.json
COPY package-lock.json /usr/web/package-lock.json
RUN npm install

COPY .env /usr/web/.env
COPY .eslintrc.cjs /usr/web/.eslintrc.cjs
COPY tsconfig.json /usr/web/tsconfig.json
COPY vite.config.ts /usr/web/vite.config.ts
COPY tsconfig.node.json /usr/web/tsconfig.node.json
COPY .prettierrc.json /usr/web/.prettierrc.json

COPY index.html /usr/web/index.html

COPY src /usr/web/src

RUN npm run build

FROM build
ARG NODE_ENV=production

EXPOSE 80

WORKDIR /
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY vite.config.ts vite.config.ts

COPY --from=build /usr/web/dist dist
COPY --from=build /usr/web/.env .env

CMD ["npm", "run", "preview",  "--", "--host", "0.0.0.0", "--port", "80"]
