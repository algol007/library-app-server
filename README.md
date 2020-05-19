# Library-App Simple REST API

[![Release Version](https://img.shields.io/badge/release-v.1.0-blue)](https://github.com/algol007/arkademy-week5.server/releases/tag/1.0) [![Node JS](https://img.shields.io/badge/Dependencies-Express%20JS-green)](https://nodejs.org/en/)
![GitHub repo size](https://img.shields.io/github/repo-size/algol007/arkademy-week5.server)
![GitHub contributors](https://img.shields.io/github/contributors/algol007/arkademy-week5.server)
![GitHub stars](https://img.shields.io/github/stars/algol007/arkademy-week5.server?style=social)
![GitHub forks](https://img.shields.io/github/forks/algol007/arkademy-week5.server?style=social)

<p align="center">
  <a href="https://nodejs.org/">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of Contents
- [Prerequiste](#prerequiste)
- [Instalation](#installation)
- [Link Collection Postman](#link-collection-postman)
- [Structure Folder](#structure-folder)
- [Contributing](#contributing)

## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.
- Redis - Download and Install [Redis](https://redis.io/)

## Installation
### Clone
```
$ https://github.com/algol007/arkademy-week5.server.git
$ cd arkademy-week5.server
$ npm install
```

### Create Environment Variable
```
$ touch .env
$ nano .env
```

```
PORT = YOUR_PORT
SECRET_KEY = YOUR_SECRET_KEY

EMAIL = YOUR_EMAIL
PASS = YOUR_PASSWORD

DB_USER = YOUR_DB_USERNAME
DB_PASS = YOUR_DB_PASSWORD
DB_NAME = YOUR_DB_NAME

BASE_URL = YOUR_SERVER_URL
CLIENT_URL = YOUR_CLIENT_URL
```

### Start Development Server
```
$ npm run serve
```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
1. Create your Feature Branch  ```git checkout -b [feature]```
2. Commit your Changes ```git commit -m 'Add some feature'```
3. Push to the Branch ```git push origin [feature]```
4. Open a Pull Request
