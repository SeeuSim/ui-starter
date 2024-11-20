import express from "express";
import { StatusCodes } from "http-status-codes";
import pinoLogger from "pino";
import pino from "pino-http";

export const logger = pinoLogger();

const server = express();
server.use(pino());

server.get("/health", (_req, res) => {
  res.status(StatusCodes.OK).json("Healthy");
  return;
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  logger.info("App listening on: " + String(port));
});
