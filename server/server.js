const express = require("express");
const socketIo = require("socket.io");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
// const GameCollection = require("./games.js");
const port = 4545;

app.configure(() => {
  app.use(express.static(__dirname + "/../game"));
});

server.listen(port, () => {
  console.log(`Rodando no link: http://localhost:${port}`);
});

const Responses = {
  SUCCES: 0,
  GAME_EXIST: 1,
  GAME_NOT_EXIST: 2,
  GAME_FULL: 3,
};

Requests = {
  CREATE_GAME: "create-game",
  JOIN_GAME: "join-game",
};

io.sockets.on("connection", (socket) => {
  socket.on(Requests.CREATE_GAME, (gameName) => {
    if (games.createGame(gameName)) {
      games.getName(gameName).addPlayer(socket);
      socket.emit("response", Responses.SUCCES);
    } else {
      socket.emit("response", Responses.GAME_EXIST);
    }
  });

  socket.on(Requests.CREATE_GAME, (gameName) => {
    const game = games.getName(gameName);
    if (!game) {
      socket.emit("responses", Responses.GAME_NOT_EXIST);
    } else {
      if (game.addPlayer(socket)) {
        socket.emit("response", Responses.SUCCES);
      } else {
        socket.emit("response", Responses.GAME_FULL);
      }
    }
  });
});
