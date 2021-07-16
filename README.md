# FooBarTory

## Installation

To install all dependencies you only need to run

```
npm install
```
The software require Node.js 14 or above

## Tests

To run the tests you need to run

```
npm run test
```

## Run

To run the code simply run
```
node main.js
```

You can customize the value in the `config/default.json` file.
One config to change to accelerate the game is the `speed` property.
* 1 is the default speed (1s = 1s)
* 10 is 10 time the default speed (1s = 10s in game)

## Architecture

The sofware is splitted in multiples files
* `main` is used to run the programme
* `factory` is used to instanciate the factory which then will create the worker. The factory also handle all the tasks that need coordinations and inventory knowledge
* `robot` is used and instanciate as a worker. It can only talk with the main thread with message.
* `foo`, `bar`, `foobar` are the classes of each products
* `utils` is a simple file providing some functions

## Feedbacks

The code tooks a bit more than 3h to do. As this was the recommanded time I did not want to use more time to complete the testing
What is missing:
* test should be added on factory / robot (spend a bit of time to find a good way to mock a worker)
* a better way to handle error
* improve try/catch on all promises (as they can be unhandled rejection)
* have better logs / way to follow what is happening
* optimize the brain as this is currently really dummy
* allow user to override the default config with a CLI
