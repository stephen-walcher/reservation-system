FROM node:8-slim

ENV PROJECT_PATH "/usr/local/src/backend"

WORKDIR ${PROJECT_PATH}

ADD ./src ${PROJECT_PATH}

RUN mkdir -p ${PROJECT_PATH}/build && \
    mkdir -p ${PROJECT_PATH}/node_modules && \
    mkdir -p /home/node/.cache/yarn && \
    chown node:node -R ${PROJECT_PATH} /home/node && \
    yarn && \
    wget https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64.deb && \
    dpkg -i dumb-init_*.deb

USER node

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run-script", "start"]
