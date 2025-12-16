import { rateLimit, ipKeyGenerator } from "express-rate-limit";

export const rateLimiter = (num) =>
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15min window
    max: num, //attempt within 15min window
    message: "Too many requests, please try again later ",
    standardHeaders: true, // return rate limit info in headers
    keyGenerator: (req) => {
      //use ip address + user agent to identify clients
      return `${ipKeyGenerator(req.ip)}-${
        req.headers["user-agent"] || "unknown-user-agent"
      }`;
    },
    legacyHeaders:false //disables x-Rate-Limit headers
  });
