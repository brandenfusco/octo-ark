FROM node:4-onbuild

RUN apt-get update && apt-get install -y \
  libasound2 \
  libgconf-2-4 \
  libgtk2.0-0 \
  libnss3 \
  libxss1 \
  libxtst6 \
  curl \
  && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get update && apt-get install -y \
  && rm -rf /var/lib/apt/lists/* && \
  echo "updating npm ...." && \
  curl -L https://npmjs.org/install.sh | sh

# copy in application
COPY /src /src
WORKDIR /src
RUN npm install

# set container runtime
ENV \
CMD ["./node_modules/.bin/cucumber.js"]