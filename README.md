# Cloud Computing

## Exercise 2 - "Flea Market"

### Master Branch
Represents the deployed settings on Heroku and so does not run locally on your machine. The API index is available under following [link](https://hidden-tundra-33627.herokuapp.com/api/articles).

### Develop Branch
For local testing of the endpoints - see Usage.

## Usage:

0. Make sure Postgres is installed on your machine.
1. Install dependencies - `npm install`
2. Run - `psql -f fleamarket.sql`
3. Run the development server - `npm start`

## API Documentation

To view the API Docs on develop, navigate to `/api-docs/` to view the Swagger generated documentation.
On master, the Doc is availabe under this [link](https://hidden-tundra-33627.herokuapp.com/api-docs/).

## Notes

Base structure of the project cloned from Michael Herman. 
Checkout: "mjhea0/node-postgres-promises" or the [blog post](http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.WJNOqLYrJE4).

