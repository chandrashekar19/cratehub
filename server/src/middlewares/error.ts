import type { NextFunction, Request, Response } from "express"

export class AppError extends Error {
  constructor(public message: string, public status: number = 500) {
    super(message)
    this.name = "AppError"
  }
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || (err.name === "ZodError" ? 400 : 500)
  const message = err.message || "Internal Server Error"

  if (process.env.NODE_ENV !== "production") {
    console.error(`[Error] ${status} - ${message}`, err)
  }

  res.status(status).json({
    message,
    status,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  })
}
