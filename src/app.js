const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body
    console.log(techs);
    const repositorie = {id: v4(), title, url, techs, likes: 0 };
    repositories.push(repositorie);
    return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
 
  if(repositorieIndex < 0){
      return response.status(400).json({error: "repositorio não encontado"})
  }else{
      const { title, url, techs } = request.body;
      repositories[repositorieIndex] = {id, title, url, techs};
      const result = repositories[repositorieIndex];
      return response.json(result);
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
     return response.status(400).json({ error: "Id não encontrado!"});
  }else{
     repositories.splice(repositorieIndex, 1);
     return response.status(204).json({message: "Repositorio deletado com sucesso!"});
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

    if(repositorieIndex < 0){
        return response.status(400).json({error : "Id não encontrado!"});
    }else{
        repositories[repositorieIndex].likes += 1;
        return response.json({message: "Você curtiu esse repositorio!"});
    }
});

module.exports = app;
