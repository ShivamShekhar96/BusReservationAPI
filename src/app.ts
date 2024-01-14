import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import routes from "./routes/routes";
import { initDB } from "./db";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(routes);

const port = process.env.PORT || 4000;

initDB();

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.listen(port, () => console.log("Example app is listening on port 4000."));
