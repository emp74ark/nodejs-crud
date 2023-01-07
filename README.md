# CRUD API

## General

- [Task description](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)
- Deadline: 2023-01-24 00:59
- [Scorring rules](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md)
- Self check: 192/202 (see description bellow)

## Description

### Prepare to start

```bash
git clone https://github.com/emp74ark/nodejs-crud
cd nodejs-crud
npm install
```

rename **.env.exaple** to **.env**

### Start

**Developement mode:**

```bash
npm run start:dev
```

**Run single instance:**

```bash
npm run start:single
```
and similar mode, but with prebuild to js:
```bash
npm run start:js
```

**Run in "multi-mode":**

```bash
npm run start:multi
```

Every instance runs on localhost:port, where port = port number from .env + n (based on CPU cores number)

**Production mode:**
Build bundle (single file) and run it.

```bash
npm run start:prod
```

Run tests:

```bash
npm run test
```

### Scroring

#### Basic Scope

- **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for
  installing, running and using the application
- **+10** **GET** `api/users` implemented properly
- **+10** **GET** `api/users/${userId}` implemented properly
- **+10** **POST** `api/users` implemented properly
- **+10** **PUT** `api/users/{userId}` implemented properly
- **+10** **DELETE** `api/users/${userId}` implemented properly
- **+6** Users are stored in the form described in the technical requirements
- **+6** Value of `port` on which application is running is stored in `.env` file

#### Advanced Scope

- **+30** Task implemented on Typescript
- **+10** Processing of requests to non-existing endpoints implemented properly
- **+10** Errors on the server side that occur during the processing of a request should be handled and processed
  properly
- **+10** Development mode: `npm` script `start:dev` implemented properly
- **+10 - 50% = 5** Production mode: `npm` script `start:prod` implemented properly (building the bundled file is not implemented)

#### Hacker Scope

- **+30** There are tests for API (not less than **3** scenarios)
- **+50 - 50% = 25** There is horizontal scaling for application with a **load balancer** (no load balancer on PORT
  4000)

#### Forfeits

- None

## Todo

- implement load balancer according to task rules