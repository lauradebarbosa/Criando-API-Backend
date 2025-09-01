import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/usuarios", async (req, res) => {
  const users =  await prisma.user.findMany();
  res.status(200).json(users);
});

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    },
  });

  res.status(201).send("POST ok");
});

app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: { id: req.params.id },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    },
  });

  res.status(201).send("PUT editado com sucesso");
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id },
  });

  res.status(201).send("DELETE ok");
});

app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});

// Criando API de usuários com Node.js e Banco de Dados
