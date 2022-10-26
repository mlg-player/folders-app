const express = require("express");
const surrealDB = require("./surreal.cjs");
const cors = require("cors");
const { serverPort } = require("./constatns.cjs");

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(serverPort, () => {
  surrealDB.initDB();
  console.log(`server started=${serverPort}`);
});
