# Fillout Takehome Assessment

This project is my submission for the takehome assessment for the Senior Full Stack Engineer role at Fillout. The main technologies used are ExpressJS and TypeScript. This was a fun project to work on and I hope that I will be able to develop on Fillout's products in the near future.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Design Decisions](#design-decisions)
3. [Production URL](#production-url)

### Quick Start

Install dependencies:

```console
$ npm install
```

Create a .env file with the appropriate values

```console
FILLOUT_API_KEY=<insert_your_key>
```

Start the development server:

```console
$ npm run dev
```

Run unit tests:

```console
$ npm run test
```

### Design Decisions

There were a few scenarios/requirements that were unclear to me so I made a few assumptions about the desired behavior which I've listed below:

1. Handling `null` values for mathematical operations
   a. For simplicity, I decided to use the `null` values verbatim for comparisons. This may result in undesired behavior, namely when comparing:

   1. integers: `null < 5`, `null > 10`
   2. dates: `new Date(null) < new Date('2024-03-12')`, `new Date(null) > new Date('2024-03-12')`

   Depending on business requirements a potential solution would be to validate that both the question value and filter value are the same type (both null or both numbers) before doing the comparison.

2. Validating input
   a. For simplicity, I am assuming that the user input values for the `filter` parameter will always be valid types, i.e. `string | number`
3. Filtered pagination results
   a. Ideally, the _entire_ result set would first be filtered based on the `filters` query parameter and then the other query parameters would apply additional filtering, e.g. `limit`, `beforeDate`, `afterDate`, etc. For simplicity, I decided to apply the filtering via the `filters` query parameter _after_ applying the other filters via the Fillout API. This may result in undesired behavior:
   1. For example, say the Fillout API has an entire dataset defined below:
   ```console
   responses: [
     {
       // other response properties, e.g. submissionId, submissionTime, etc
       questions: {
         value: 1,
       },
     },
     {
       // other response properties, e.g. submissionId, submissionTime, etc
       questions: {
         value: 5,
       },
     },
   ]
   ```
   For the application I developed, if you apply query parameters of `limit: 1` and `filters: equals 5` this would result in 0 responses because we first limit the response to 1, i.e. `responses[0]`, and then filter to see if the question value equals 5. Ideally, we would first filter via "equals 5" to get `responses[1]` and then limit the result to 1. However, this would require developing the additional filtering logic for the other query parameters which will add additional time and effort for this takehome assessment.

### Production URL

The application is hosted via `render.com` and can be accessed at:

```console
https://fillout-takehome-5dhb.onrender.com/v1/api/forms/cLZojxk94ous/filteredResponses
```
