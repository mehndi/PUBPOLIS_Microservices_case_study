FROM node:alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN npm install
EXPOSE 4103
CMD ["npm","start"]