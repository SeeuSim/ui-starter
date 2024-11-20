import express from "express";
import pinoLogger from "pino";
import pino from "pino-http";

export const logger = pinoLogger();

const server = express();
server.use(pino());

const port = process.env.PORT || 8000;
server.listen(port, () => {
  logger.info("App listening on: " + String(port));
});
