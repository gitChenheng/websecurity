import {findAllUsers, insertUser, getByName, getUserByPwd} from "@/dao/userDao";
import {_compare, _hash} from "@/utils/hash";
import {sign} from "@/middlewares/jwt";
import redis from "@/server/redis";

export const getAllUsers = async () => {
    return await findAllUsers();
}

export const signInBySqlQuery = async (name, pwd) => {
    return await getUserByPwd(name, pwd);
}

export const signIn = async (name, pwd) => {
    const user = await getByName(name);
    const hashResult = await _compare(String(pwd), String(user.pwd));
    // const date = new Date();
    // if (hashResult) {
    //     const userInfo = {
    //         uid: id,
    //         timestamp: date.getTime()
    //     };
    //     const token = sign(userInfo);
    //     await newRedis.set(token, JSON.stringify(userInfo));
    //     await newRedis.expire(token, 30 * 24 * 60 * 60);
    //     return token;
    // }
    if (hashResult){
        return user;
    }else{
        return false;
    }
}

export const addUser = async (obj: any) => {
    const pwd = await _hash(String(obj.pwd));
    return await insertUser({
        ...obj,
        pwd,
    });
}
