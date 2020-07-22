import ACTION from "@/constans/decorator";

export function Ctrl(target) {
    target.type = ACTION.CTRL;
}

export function Get(target, descriptor) {
    target[descriptor].method = ACTION.GET;
}

export function Post(target, descriptor) {
    target[descriptor].method = ACTION.POST;
}

export function Api(target, descriptor) {
    target[descriptor].reqPrefix = "/api/";
}

export function View(target, descriptor) {
    target[descriptor].method = ACTION.GET;
    target[descriptor].reqPrefix = "/";
}
