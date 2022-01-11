import express, { request, response } from "express";

const app = express();

app.get('/', (request, response) => {
  return response.json({ hello: "world!" });
});

app.listen(3000, () => console.log("Node server is running"))