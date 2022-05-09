# Cypress 
---

E2E testing project using Cypress


### Install Cypress

```
npm install cypress --save-dev
```


### Install all dependencies

```
npm install
```


### Setting up credentials

There are 2 environment variables such as `email` and `password`:

- __Example 01:__ Passing by EXPORT command line:

```
export CYPRESS_email=XXXXXXXXX
export CYPRESS_password=XXXXXXXXX
```

- __Example 02:__ Passing by execution command line in `package.json`:

Fill the credentials in the tag __cy:env:credentials__:

```
--env email=XXXXXXXXX,password=XXXXXXXXX
```



### Running the tests

- Verify that Cypress is installed correctly and is executable:
```
npm run cy:verify
```

- Open Cypress dashboard:
```
npm run cy:open
```

- Chrome browser:
```
npm run cy:chrome
```

- Firefox browser:
```
npm run cy:firefox
```


### Run all tests in Docker

Cypress provides public [docker images](https://hub.docker.com/u/cypress) to run the tests. So, The docker image that will be used is "_cypress/included_"


- Dockerfile
```
docker build -t cypress-docker-image-e2e-tests .
```

- Docker Compose

__Note:__ Must be set the environment variables in __docker-compose.yml__ by inputting the valid credentials in `CYPRESS_email` and `CYPRESS_password`
```
docker-compose up
```

- Docker Compose - To run the tests in a specific browser pass the service name, such as:
```
docker-compose up chrome
docker-compose up firefox
```

- List all docker containers
```
docker image ls
```