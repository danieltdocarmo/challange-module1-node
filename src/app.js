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

    const repository = {id: v4(), title, url, techs, likes: 0 };
    repositories.push(repository);
    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
 
  if(repositorieIndex < 0){
      return response.status(400).json({error: "repositorio não encontado"})
  }else{
      const { title, url, techs } = request.body;
      repositories[repositorieIndex] = {id, title, url, techs, likes: repositories[repositorieIndex].likes};
      const result = repositories[repositorieIndex];
      return response.json(result);
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
     return response.status(400).json({ error: "Id não encontrado!"});
  }else{
     repositories.splice(repositoryIndex, 1);
     return response.status(204).send();
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

    if(repositorieIndex < 0){
        return response.status(400).json({error : "Id não encontrado!"});
    }else{
        repositories[repositorieIndex].likes += 1;
        return response.json(repositories[repositorieIndex]);
    }
});

module.exports = app;
