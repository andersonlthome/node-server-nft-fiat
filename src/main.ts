require("dotenv").config();

import express, {
  urlencoded,
  json,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import cors from "cors";

const app = express();
const port = 3003;

app.use(cors());

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

try {
  // doesn't work yet without build first, https://tsoa-community.github.io/docs/live-reloading.html
  app.use(
    "/docs",
    swaggerUi.serve,
    async (_req: ExRequest, res: ExResponse) => {
      return res.send(
        swaggerUi.generateHTML(await import("../build/swagger.json"))
      );
    }
  );
} catch (error) {
  console.error("Swagger docs not disponible");
}

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    console.error(
      `Caught Internal Server Error for ${req.path}:`,
      err.name,
      err.message,
      err.cause,
      err.stack
    );
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

app.listen(port, () => console.log(`Server started listening to port ${port}`));
