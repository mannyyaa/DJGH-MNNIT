/**
 * Central error handler middleware.
 * Must be registered last with app.use(errorHandler).
 *
 * In production, raw error messages are never returned to the client (audit finding #15).
 * All internal details are logged server-side only.
 */
function errorHandler(err, req, res, next) {
  // Always log the full stack on the server
  console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`)

  const isProd = process.env.NODE_ENV === 'production'

  // Mongoose validation error — field-level message is safe to return
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ message: 'Validation failed.', errors: messages })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    return res.status(409).json({ message: `Duplicate value for ${field}.` })
  }

  // JWT errors — already handled in auth middleware, but catch any that leak
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }

  // CORS errors
  if (err.message && err.message.startsWith('CORS:')) {
    return res.status(403).json({ message: 'Forbidden.' })
  }

  // Default 500 — in production, suppress internal message details (audit finding #15)
  const statusCode = err.status || 500
  const message = isProd && statusCode === 500
    ? 'An unexpected server error occurred.'
    : (err.message || 'An unexpected server error occurred.')

  res.status(statusCode).json({ message })
}

module.exports = errorHandler
