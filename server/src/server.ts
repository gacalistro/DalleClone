import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = fastify({
  bodyLimit: 1024 * 1024 * 5, // Set Body limit to 5MB
});

app.register(routes);
app.register(cors);

app.listen({ port: 3000, host: "0.0.0.0" }, (err, adress) =>
  console.log(`Server running on ${adress}`)
);
