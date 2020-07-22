/**
 * by ch.
 */
import "module-alias/register";
import config from "@/config/config";
import con_gl from "@/constans/general";
import fs from "fs";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import path from "path";
import cors from "@/middlewares/intercepter/cors";
import {verify} from "@/middlewares/jwt";
import rest from "@/middlewares/rest";
import koaBody from "koa-body";
import staticFiles from "koa-static";
import {initGlobalEvents} from "@/utils/util";
import https from "https";
import routeHandler from "../middlewares/routeHandler";
import {createDbContext} from "@/db/db_context";
import helmet from "koa-helmet";

const app = new Koa();
createDbContext();
app.use(helmet());

if (process.env.NODE_ENV === con_gl.ENV_PROD){
    import("koa-sslify").then(enforceHttps => {
        app.use(enforceHttps.default());
    })
}

initGlobalEvents();

app.use(staticFiles(path.join(process.cwd(), "/src/public")));
app.use(cors());
app.use(verify());

app.use(koaBody({
    multipart: true,
    formidable: {maxFileSize: 100 * 1024 * 1024}
}));
app.use(bodyParser());
app.use(rest.restIfy());
app.use(routeHandler());

if (process.env.NODE_ENV === con_gl.ENV_PROD){
    const options = {
        key: fs.readFileSync(`${process.cwd()}/src/https/2_www.denominator.online.key`),
        cert: fs.readFileSync(`${process.cwd()}/src/https/1_www.denominator.online_bundle.crt`)
    };
    const httpsServer = https.createServer(options, app.callback());
    httpsServer.listen(config.node.port, () => {
        console.log(`start at port ${config.node.port}`)
    });
} else {
    app.listen(config.node.port, () => {
        console.log(`start at port ${config.node.port}`)
    })
}



