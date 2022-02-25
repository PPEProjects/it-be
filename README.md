
## Getting started

### 1. install 
```
Install npm dependencies:

```
cd prisma-graphql

```
npm install
```

</details>

### 2. Create and seed the database

 ### setup .env
  rename file .env-example --> .env
   ```
   setup url your database

    USER: The name of your database user
    PASSWORD: The password for your database user
    PORT: The port where your database server is running (typically 3306 for MySQL)
    DATABASE: The name of the database
    
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
  ```
Run the following command to create your SQLite database file. This also creates the `User` and `Info` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npm run create-db; npm run pg-schema; npm run pg-usercore
```
## OR

```
npm run migrate
```
 ### UPDATE DATABASE 

  ```
   npm run migrate
  ```

When `npm run migrate` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```


