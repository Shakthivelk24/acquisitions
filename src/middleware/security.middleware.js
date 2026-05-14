import aj from '#config/arcjet.js';
import logger from '#config/logger.js';
import { slidingWindow } from '@arcjet/node';

const securityMiddleware = async (req, res, next) => {
  try {
    const role = req.user?.role || 'guest';

    let limit;
    let message;

    switch (role) {
      case 'admin':
        limit = 20;
        message = 'Admin rate limit exceeded (20 req/1m). Slow down!';
        break;

      case 'user':
        limit = 10;
        message = 'User rate limit exceeded (10 req/1m). Please wait!';
        break;

      case 'guest':
      default:
        limit = 5;
        message = 'Guest rate limit exceeded (5 req/1m). Try again later!';
        break;
    }

    const client = aj.withRule(
      slidingWindow({
        mode: 'LIVE',
        interval: '1m',
        max: limit,
        name: `${role}-rate-limit`,
      })
    );

    const decision = await client.protect(req);

    // Bot protection
    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn(
        `Bot request denied for role: ${role}, IP: ${req.ip}, User-Agent: ${req.get(
          'User-Agent'
        )}, Path: ${req.path}`
      );

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Bot traffic is not allowed',
      });
    }

    // Shield protection
    if (decision.isDenied() && decision.reason.isShield()) {
      logger.warn(
        `Shield request denied for role: ${role}, IP: ${req.ip}, User-Agent: ${req.get(
          'User-Agent'
        )}, Path: ${req.path}, Method: ${req.method}`
      );

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Shield traffic is not allowed',
      });
    }

    // Rate limit protection
    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn(
        `Rate limit request denied for role: ${role}, IP: ${req.ip}, User-Agent: ${req.get(
          'User-Agent'
        )}, Path: ${req.path}`
      );

      return res.status(429).json({
        error: 'Too Many Requests',
        message,
      });
    }

    next();
  } catch (error) {
    logger.error(`Security middleware error: ${error.message}`);

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong in security middleware',
    });
  }
};

export default securityMiddleware;