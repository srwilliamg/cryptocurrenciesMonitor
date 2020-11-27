# Cryptocurrencies monitor

## Main technologies used
- NodeJS
- Sequelize
- Postgres
- Mocha

## How to install:
- Rename *.env.example* to *.env* and change the default values
- Execute __npm install__
- For local: execute __npm install --also-dev__
- make sure to execute __npm install -g sequelize sequelize-cli__
- execute __sequelize db:create__ to create the database.
- execute __sequelize db:migrate__
- to add seed data execute __npm run seed__ 
- execute server __npm run dev__ or __npm start__

### Unit test with coverage
- __npm install -g mocha sinon nodemon__
- execute __npm test__
### Postman endpoints
- In postman you could import the file call 'endpoints_Test.postman_collection.json' to test the endpoint

## Endpoints Doc
- ### Authentication
  > Login an user
  - __POST__ /auth/login
  - In the body of the petition you should send the next structure:
  `
  {
    "username": "will",
    "password": "1234"
  }
  `
  - As response you get the user data and __TOKEN__ to send in the other endpoints
  - example: __POST__ localhost:3000/auth/login

  > Logout an user
  - __POST__ /auth/logout
  - In the body of the petition you should send the next structure:
  `
  {
    "token": "TOKEN"
  }
  `
  - example: __POST__ localhost:3000/auth/logout

  > Authenticate a token
  - __POST__ /auth/authenticate-token
  - In the body of the petition you should send the next structure:
  `
  {
    "token": "TOKEN"
  }
  `
  - example: __POST__ localhost:3000/auth/authenticate-token

- ### Users
  > List all coins of a user
  - __GET__ /users/coins
  - You should add in the Headers (Authorization, TOKEN)
  - You should add query param limit, should be a number a higher than 26
  - example: __GET__ localhost:3000/users/coins?limit=30

  > Create user
  - __POST__ /users
  - In the body of the petition you should send the next structure:
  `
  {
    "name": "test3",
    "last_name": "test3",
    "username": "test3",
    "password": "1249i98fdj",
    "preferred_currency": "peso"
  }
  `
    - preferred_currency: value should be __euro__, __dolar__ or __peso__.
    - password: min-length: 8, max-length: 40

  - example: __POST__ localhost:3000/coins/1irstgold/

- ### Coins
  > List all coins from Gecko 
  - __GET__ /coins/
  - You should add in the Headers (Authorization, TOKEN)
  - Here you get the __coinGeckoId__ used in the endpoint *Create coin*
  - example: __GET__ localhost:3000/coins

  > Create coin
  - __POST__ /coins/*{coinGeckoId}*
  - You should add in the Headers (Authorization, TOKEN)
  - *coinGeckoId*: coin id obtained from coinGecko
  - example: __POST__ localhost:3000/coins/1irstgold/

  > Delete coin
  - __DELETE__ /coins/*{coinId}*
  - You should add in the Headers (Authorization, TOKEN)
  - *coinId*: coin id got it in the endpoint CoinList
  - example: __DELETE__ localhost:3000/coins/1
