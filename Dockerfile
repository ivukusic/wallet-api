FROM node:16.13.0
WORKDIR /usr/src/app

# Copy over required files for install
COPY package.json ./
COPY yarn.lock ./
COPY .env ./

# Install dependencies
RUN yarn install

# Copy over remaining files not listed in .dockerfile
COPY . .

# Build server
RUN yarn build

# Expose port 8000 from the container
EXPOSE 8000/tcp

CMD ["yarn", "start_prod"]