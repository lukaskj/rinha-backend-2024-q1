import "reflect-metadata";

import Koa from "koa";
import { useKoaServer } from "routing-controllers";
import { UserController } from "./controllers/user-controller";

const server = new Koa();

const app = useKoaServer(server, {
  cors: false,
  controllers: [UserController],
});

app.listen(3000);
