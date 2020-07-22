import fs from "fs";
import Router from "koa-router";
import ACTION from "@/constans/decorator";

const router = new Router();
const files = fs.readdirSync(`${process.cwd()}/src/controllers/`);

for (const f of files) {
    (() => {
        import(`${process.cwd()}/src/controllers/${String(f)}`).then((o) => {
            const o_len = Object.keys(o).length;
            if (o_len) {
                for (const n of Object.keys(o)) {
                    if (o[n].type !== ACTION.CTRL){
                        continue;
                    }
                    const _props = Object.getOwnPropertyDescriptors(o[n])
                    if (!_props.name)
                        continue;
                    const _name = _props.name.value;
                    const _method = Object.getOwnPropertyNames(_props.prototype.value);
                    if (_method){
                        const Instance = new o[n]();
                        for (const p of _method) {
                            if (p === "constructor" || p === "method")
                                continue;
                            let class_url = _name.split("Controller")[0]
                            class_url = class_url.replace(class_url[0], class_url[0].toLowerCase());
                            const method = Instance[p].method || ACTION.GET;
                            const reqPrefix = Instance[p].reqPrefix || "/";
                            const finalUrl = `${reqPrefix}${class_url}/${p}`;
                            if (method && method.toUpperCase() === ACTION.POST) {
                                router.post(finalUrl, Instance[p]);
                            } else {
                                router.get(finalUrl, Instance[p]);
                            }
                        }
                    }
                }
            }
        })
    })()
}

export default () => {
    router.allowedMethods();
    return router.routes();
};
