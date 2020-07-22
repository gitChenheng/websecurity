import {signIn, signInBySqlQuery, addUser} from "@/services/userSer";
import {Ctrl, Api, Get, Post, View} from "@/decorators/action";
import JSONResult from "@/utils/JSONResult";

@Ctrl
export class UserController{
    @View
    public async login(ctx){
        ctx.type = "text/html;charset=utf-8";
        ctx.response.body = `<form action="/api/user/signIn" method="post">
            <p>Name: <input name="name" value=""></p>
            <p>pwd: <input name="pwd" type="text"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
    }

    @Api
    @Post
    public async signIn(ctx){
        const body = ctx.request.body;
        //..
        try {
            // //mysql query
            // const res = await signInBySqlQuery(body.name, body.pwd);
            // if (res.length){
            //     ctx.rest(JSONResult.ok(res));
            // } else{
            //     ctx.rest(JSONResult.err("name or pwd is incorrect"))
            // }

            //map hash
            const res = await signIn(body.name, body.pwd);
            if (res){
                ctx.rest(JSONResult.ok(res));
            }else {
                ctx.rest(JSONResult.err("name or pwd is incorrect"))
            }
        }catch (e) {
            throw e
        }
    }

    @Api
    @Post
    public async register(ctx){
        const body = ctx.request.body;
        try {
            const res = await addUser(body);
            if (res)
                ctx.rest(JSONResult.ok())
        }catch (e) {
            throw e;
        }
    }
}
