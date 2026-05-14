import logger from '#config/logger.js';
import { jwttoken } from '#utils/jwt.js';

export const authenticateToken = (req, res, next) => {
  try {
    // Debug logs
    console.log('Cookies:', req.cookies);
    console.log('JWT Secret:', process.env.JWT_SECRET);

    // Get token from cookies
    const token = req.cookies?.token;

    console.log('Token:', token);

    // Check token exists
    if (!token) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'No access token provided',
      });
    }

    // Verify token
    const decoded = jwttoken.verify(token);

    console.log('Decoded User:', decoded);

    // Attach user to request
    req.user = decoded;

    logger.info(
      `User authenticated: ${decoded.email} (${decoded.role})`
    );

    next();
  } catch (e) {
    console.error('Authentication Error:', e);

    logger.error(e.message);

    // JWT-specific errors
    if (
      e.name === 'JsonWebTokenError' ||
      e.name === 'TokenExpiredError' ||
      e.message === 'Failed to authenticate token'
    ) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid or expired token',
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: e.message,
    });
  }
};

export const requireRole = allowedRoles => {
  return (req, res, next) => {
    try {
      // Check authenticated user
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
          message: 'User not authenticated',
        });
      }

      // Check role authorization
      if (!allowedRoles.includes(req.user.role)) {
        logger.warn(
          `Access denied for user ${req.user.email} with role ${req.user.role}. Required roles: ${allowedRoles.join(', ')}`
        );

        return res.status(403).json({
          error: 'Access denied',
          message: 'Insufficient permissions',
        });
      }

      next();
    } catch (e) {
      console.error('Role Verification Error:', e);

      logger.error(e.message);

      return res.status(500).json({
        error: 'Internal server error',
        message: 'Error during role verification',
      });
    }
  };
};