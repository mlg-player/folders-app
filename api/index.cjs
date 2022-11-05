const express = require("express");
const surrealDB = require("./surreal.cjs");
const cors = require("cors");
const { serverPort } = require("./constatns.cjs");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(cors());
app.use(express.json());

//  -----------------------------------
// TODO SOCKETS
io.on("connection", (socket) => {
  console.log("User Connected");
  socket.join("folders");
  console.log(socket.folders);

  socket.on("folders", (message) => {
    console.log(message);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
//  -----------------------------------

app.get("/addFolder", (req, res) => {
  try {
    const { name, id, order } = req.query;
    surrealDB.createTable({
      props: {
        name: name,
        id: id,
      },
      table: "folders",
    });
    res.status(200).send("ok");
  } catch (error) {
    res.status(400).send("error");
  }
});
app.get("/getFolders", async (req, res) => {
  try {
    const select = await surrealDB.query({
      query: `SELECT * from folders`,
      table: "folders",
    });
    res.status(200).send(await select[0].result);
  } catch (error) {
    res.status(400).send("error");
  }
});
app.get("/deleteFolder", async (req, res) => {
  try {
    const select = await surrealDB.delete({
      id: `folders:${req.query.id}`,
    });
    res.status(200).send(await select[0].result);
  } catch (error) {
    res.status(400).send("error");
  }
});

http.listen(serverPort, () => {
  surrealDB.initDB();
  console.log(`server started=${serverPort}`);
});
