import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";

import "./shared/container";

const app = express();

app.use(express.json());
//o primeiro passa o server e o segundo, um arquivo json com toda a documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
console.log(swaggerUi.serve);

app.use(router);

app.listen(3333, () => console.log("Server is running"));