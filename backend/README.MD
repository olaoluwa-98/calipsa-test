# Calipsa Test Backend

This repository houses backend code for Calipsa test.

## Table of Contents

- [Calipsa Test Backend](#calipsa-test-backend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Dependencies](#dependencies)
    - [Getting the Source](#getting-the-source)
    - [Installation & Usage](#installation--usage)
    - [API Documentation](#api-documentation)
    - [Running Tests](#running-tests)
      - [Other Tests](#other-tests)
  - [How to Get Help](#how-to-get-help)
  - [Further Reading](#further-reading)
  - [License](#license)
  - [Authors](#authors)


## Getting Started

### Dependencies

This project uses [Express](https://expressjs.com/) v4.16.1. It has the following dependencies.

- [Node.js >= 8.0.0](https://nodejs.org/en/download)
- [MySQL Database](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en)

### Getting the Source

This project is [hosted on GitHub](https://github.com/olaoluwa-98/calipsa-test). You can clone this project directly using this command:

```sh
git clone git@github.com:/olaoluwa-98/calipsa-test.git
```

### Installation & Usage

After cloning the repository, create a `.env` file from `.env.example` and set your local .env variables.

```sh
cp .env.example .env
```

Install the dependencies

```sh
npm install
```

Run migration using

```sh
npm run migrate:latest
```

Run migration rollback

```sh
npm run migrate:rollback
```

After running migrations, you should run the commands below to load the alarms data & a sample user into the database

```sh
npm run load-data
npm run create-user
```

The user's credentials are:

- username: elonmusk
- password: spacex

Run dev server

```sh
npm run dev
```

### API Documentation

The endpoints in this project are documented at: https://documenter.getpostman.com/view/2022647/Tzm9iEMv

### Running Tests

There are currently no unit tests for this project but it's a work in progress

#### Other Tests

There's a pre-commit hook that formats your code when you commit changes. It's automatically installed when you run `npm install`

**[Back to top](#table-of-contents)**

## How to Get Help

Notice a bug? please open an issue. Need more clarification on any part of the code base? Contact [Emmanuel](http://github.com/olaoluwa-98).

## Further Reading

- [Express](https://expressjs.com/)

**[Back to top](#table-of-contents)**

## License

This project's license is yet to be decided.

**[Back to top](#table-of-contents)**

## Authors

- **[Emmanuel Awotunde](https://github.com/olaoluwa-98)**


**[Back to top](#table-of-contents)**
