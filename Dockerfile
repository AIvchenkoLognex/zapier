# syntax=docker/dockerfile:1.2.1@sha256:e2a8561e419ab1ba6b2fe6cbdf49fd92b95912df1cf7d313c3e2230a333fdbcc
FROM docker.infra.lognex/nodejs:16.19.0-1.0-release

WORKDIR /app
COPY ./ /app/
ENV NODE_OPTIONS="--max_old_space_size=4096 $NODE_OPTIONS"

RUN --mount=type=cache,target=/app/node_modules \
    --mount=type=secret,id=npmrc,dst=/app/.npmrc \
    --mount=type=secret,id=zap,dst=/root/.zapierrc \
    npm install zapier-platform-cli
#CMD ["sleep","3600"]
#ENTRYPOINT exec "push.sh"

