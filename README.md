1. Set up and installation
    - To install the required packages, run the following command
        ```
        npm install
        ```
    - Modify the .env variables as required. Please have a .env.development and .env.test files. These will be used for development and testing purposes respectively
    - Don't forget to create the database on your Postgres server
    - After setting up the .env files and creating the database, run the following command
        ```
        npm run start
        ```
        * Note: The commands used are compatible for MacOS and Linux systems. Please replace the clean command in package.json if you are using different Operating system Windows
        

2. Accessing the documentation
    - Please go to ```[BASE_URL]/docs```. ```BASE_URL``` of the current setup is http://localhost:4000

3. Run tests
    * Make sure to have .env.test file setup
    - Run the following command:
        ```
        npm run test
        ```
