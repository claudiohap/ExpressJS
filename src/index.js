import dotenv from "dotenv";
dotenv.config();

import express from "express";
import User from "./users.js";
import sequelize from "./sequileze.js";

const app = express();
const PORT = process.env.PORT;

sequelize.sync({ alter: true });

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Hola mundo",
  });
});

app.get("/user", async (req, res) => {
  try {
    const usersAll = await User.findAll();
    return res.send(usersAll);
  } catch (error) {
    console.error({ error });
    return res.send({ error: "Error al obtener los usuarios" });
  }
});

app.post("/user", async (req, res) => {
  try {
    const userData = req.body;
    const userName = userData.name;
    const userBirthday = new Date(userData.birthday);

    const newUser = await User.create({
      username: userName,
      birthday: userBirthday,
    });

    return res.send(newUser);
  } catch (error) {
    console.error({ error });
    return res.send({ error: "Error al crear un nuevo usuario" });
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
