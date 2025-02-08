FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY ./abi /abi

COPY ./ponder /app
WORKDIR /app

RUN pnpm install --frozen-lockfile

EXPOSE 42069

CMD [ "pnpm", "start" ]
