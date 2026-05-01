/**
 * Simple logging service for tracking user actions and errors.
 * Ready for integration with monitoring dashboards (e.g., Sentry, LogRocket).
 */

type LogLevel = "info" | "warn" | "error";

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    if (process.env.NODE_ENV === "development") {
      switch (level) {
        case "info":
          console.log(formattedMessage, data || "");
          break;
        case "warn":
          console.warn(formattedMessage, data || "");
          break;
        case "error":
          console.error(formattedMessage, data || "");
          break;
      }
    }

    // In a real-world scenario, you would send this to a monitoring service here
    // e.g., monitorService.send({ timestamp, level, message, data });
  }

  public info(message: string, data?: any) {
    this.log("info", message, data);
  }

  public warn(message: string, data?: any) {
    this.log("warn", message, data);
  }

  public error(message: string, data?: any) {
    this.log("error", message, data);
  }

  /**
   * Specifically for tracking user journey progress
   */
  public trackAction(actionName: string, metadata?: any) {
    this.info(`User Action: ${actionName}`, metadata);
  }
}

export const logger = Logger.getInstance();
