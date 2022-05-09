# pull image
FROM cypress/included:9.6.0

# make directory inside container
RUN mkdir /app
WORKDIR /app

# copy cypress code from host to container
COPY . /app

# install package
RUN npm install

# Verify Cypress installation worked
RUN npm run cy:verify

ENTRYPOINT [ "npm",  "run" ]
