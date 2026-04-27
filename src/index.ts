import { createServer } from "./server.ts";

const app = createServer();

const PORT = 3000;
await app.listen({ port: PORT, host: "0.0.0.0" });

app.log.info(`Server is running on http://localhost:${PORT}`);
