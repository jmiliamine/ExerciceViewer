FROM node:latest
WORKDIR /data
RUN \
    apt-get install git &&\
    git clone https://github.com/Saradoc62/viewer-ts.git &&\
    cd ./viewer-ts && npm install && npm run build
EXPOSE 1234
ENTRYPOINT ["npm", "run", "start"]