import { createLogger, format, transports } from "winston";

const { combine, timestamp, colorize, printf } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    logFormat,
  ),
  transports: [
    // Console output
    new transports.Console(),

    // File output - saves all logs
    new transports.File({
      filename: "reports/logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "reports/logs/combined.log",
    }),
  ],
});
