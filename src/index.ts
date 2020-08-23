import express from "express";
import cors from "cors";
import logger from "clay-log";
import * as db from "./api/db";
import routes from "./api/routes";
import { API_PORT } from "./constants";

const log = logger.init({ name: __filename });
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

db.connect().then(() => app.listen(API_PORT, () =>
  log('info', `Server started at http://localhost:${API_PORT}`)
)).catch((error: Error) => log('error', error.message));

