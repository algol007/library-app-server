# Library-App REST-API

This is a simple API for library app using node.js

## Getting Started

npm install

// to generate folder /config, /migrations, /models, /seeders
npx sequelize-cli init

// to create table if you want add more tables
npx sequelize-cli model:generate --name (tb_name) --attributes field1:(data_type),field2:(data_type)

// insert table into database
npx sequelize-cli db:migrate

## Versioning

git repository (https://github.com/algol007/arkademy-week3)

## Authors

- **Ady Rahmansyah** - _Arkademy Batch 15_ - [Ady Rahmansyah](https://github.com/algol007)

## License

This project is licensed under the AR License - see the [LICENSE](https://www.instagram.com/ady_rahmansyah/) for details
