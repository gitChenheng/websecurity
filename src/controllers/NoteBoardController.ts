import fs from "fs";
import {getAllNotes, addNote} from "@/services/noteBoardSer";
import {Ctrl, Api, Get, Post, View} from "@/decorators/action";
import JSONResult from "@/utils/JSONResult";
import {filterXSS} from "xss";

@Ctrl
export class NoteBoardController{
    @Api
    @Get
    public async getNoteBoard(ctx){
        try {
            const res = await getAllNotes();
            ctx.rest(JSONResult.ok(res));
        }catch (e) {
            throw e
        }
    }

    @Api
    @Post
    public async pushNote(ctx){
        try {
            const body = ctx.request.body;
            const content = filterXSS(body.content);
            const res = await addNote({content});
            if (res)
                ctx.rest(JSONResult.ok());
        }catch (e) {
            throw e;
        }
    }

    @View
    public async xss(ctx){
        const fileSteamToStr = fs.readFileSync(`${process.cwd()}/src/public/templates/xss.html`).toString();
        ctx.type = "text/html;charset=utf-8";
        ctx.response.body = fileSteamToStr;
    }

    @View
    public async clickHandle(ctx){
        const fileSteamToStr = fs.readFileSync(`${process.cwd()}/src/public/templates/clickHandle.html`).toString();
        ctx.type = "text/html;charset=utf-8";
        // ctx.set("X-FRAME-OPTIONS", "DENY");
        ctx.response.body = fileSteamToStr;
    }

}
