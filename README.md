# ASK FOR THE MOON TEST

### DOCKER & MongoDB

Run the following from root folder to install necessary mongo image & load the dump:

```bash
docker compose up
```

The db dump contains a single collection for username + password (hashed) storage with an unique index on username.
It contains the Richard user + his sister accounts.

Here are the credentials to use on the website:
Richard => Username: richard & Password: $0R1ch!e33
Sister => Username: sister & Password: weakpswd

Note that richard user is admin and can add more users if needed via the settings menu!

### TO RUN SERVERS LOCALLY

#### First install all dependencies from root folder

##### BACKEND

```bash
cd backend
npm i
```

##### FRONTEND

```bash
cd frontend
npm i
```

#### Then start servers

##### BACKEND

```bash
cd backend
npm run dev
```

##### FRONTEND

```bash
cd frontend
npm start
```
