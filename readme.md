# 

The requirements for this project can be found [here](./requirements.md).

## Project structure

I have structured this project as follows:

- `controllers`: the code to handle the requests for each route
- `middlewares`: the auth middleware
- `models`: the models for the ORM
- `repository`: the repository layer. This is the layer that uses sequelize to access and update data
- `routes`: the configuration for routes and each endpoint. This folder can be versioned to deal with different versions of this API
- `services`: the service layer. Here we have our business rules and validations. This layer access the repository to get and update data.
- `utils`: utility functions

## Assumptions

**In order to get unpaid jobs:**

I am considering that only jobs for valid (`in_progress`) contracts are valid;

**In order to get jobs sum:**

I am considering that only jobs for valid (`in_progress`) contracts are valid;

## Unit tests

I have created unit tests to test the functionality of the service layer. Since this is the most critical part that handles the validations and business rules.

Due to time limitations, I decided to create the tests only for this layer. We do not have 100% of coverage for the entire project, but we have the most critical validations being tested.

To run the tests, just use the command:

```
npm run test
```

## API versioning

This API could be versioned using different levels on the `routes` folder.
For example, we could have the following structure:
- routes
  - v1 
  - v2 

Each route can point to a different controller handler and have a different path. To make things simple here, I decided to not implement this versioning.


## Postman

A Postman collection to interact with the API can be found [here](./docs/Deel.postman_collection.json).

## Improvements

I have mapped some improvements that can be done to this project:

- Split the models into different files
- Create a configuration folder to receive the configurations (like DB config for sequelize)
- Create tests to cover all the application
- Migrating the project to Typescript
- Using a dependency  injection container
