import "dotenv/config";
import Fastify from "fastify";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3001),
});

const env = envSchema.parse(process.env);

const app = Fastify({
  logger: true,
});

app.get("/health", async () => {
  return {
    ok: true,
    service: "ramadanops-api",
    env: env.NODE_ENV,
    time: new Date().toISOString(),
  };
});

async function start() {
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
