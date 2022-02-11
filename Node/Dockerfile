# pull official base image
FROM node:lts-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH "/app/node_modules/.bin:$PATH"
# add app
COPY . ./
# install app dependencies
RUN npm install

#start import

CMD ["sh", "messagesToQuestions.sh"]
