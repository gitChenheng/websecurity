import con_gl from "../../constans/general";
import * as koaRequest from "koa2-request";
import {get,set,show_cache} from "../../utils/cache";
const wx={
    js_code2_session:async (js_code)=>{
        const jscode2session=await koaRequest({
            url: `https://api.weixin.qq.com/sns/jscode2session`,
            method: 'GET',
            qs: {
                appid:con_gl.APP_ID,
                secret:con_gl.APP_SECRET,
                js_code,
                grant_type:'authorization_code',
            }
        });
        return jscode2session.body;
    },
    at_server:async ()=>{
        const at=await koaRequest({
            url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${con_gl.APP_ID}&secret=${con_gl.APP_SECRET}`,
            method: 'GET',
        });
        return JSON.parse(at.body);
    },
    get_access_token:async ()=>{
        let cache_access_token=get(con_gl.ACCESS_TOKEN);
        if(cache_access_token){
            return JSON.parse(cache_access_token);
        }else{
            const at=await wx.at_server();
            set(con_gl.ACCESS_TOKEN,JSON.stringify(at),1200);
            return at;
        }
    },
    msg_sec_check:async (access_token,content)=>{
        const msg_sec_res=await koaRequest({
            url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${access_token}`,
            method: 'POST',
            body:JSON.stringify({content})
        });
        return JSON.parse(msg_sec_res.body);
    },
    img_sec_check:async (access_token,content)=>{
        const img_sec_check=await koaRequest({
            url: `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${access_token}`,
            method: 'POST',
        });
        return img_sec_check.body;
    },
}
export default wx;
