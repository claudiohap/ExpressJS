import { Sequelize } from "sequelize";
import SQLite from "sqlite3";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
});

export default sequelize;
