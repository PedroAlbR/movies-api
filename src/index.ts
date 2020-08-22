import express from "express";
import cors from "cors";
import * as db from "./api/db";
import routes from "./api/routes";
import { API_PORT } from "./api/constants";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

db.connect().then(() => app.listen(API_PORT, () =>
  console.log(`server started at http://localhost:${API_PORT}`)
)).catch((error: Error) => console.log(error.message));

