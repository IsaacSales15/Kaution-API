import express from "express";
import { router } from "./router";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(router);

app.use(
  cors()
);

app.listen(3000, () => console.log("Server running on port 3000"));
