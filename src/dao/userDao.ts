import User from "@/models/entity/User";
import {generateId} from "@/utils/util";
import {dbCtx} from "@/db/db_context";

export const getById = async (id) => {
    return await User.findOne({
        raw: true,
        where: {id}
    });
}

export const getByName = async (name) => {
    return await User.findOne({
        raw: true,
        where: {name}
    });
}

export const getUserByPwd = async (name, pwd) => {
    const db = dbCtx();
    return await db.query(`SELECT * FROM users where name='${name}' and pwd='${pwd}'`, {
        type: db.QueryTypes.SELECT,
        plain: false,
        raw: true,
        // replacements: {
        //     name,
        //     pwd,
        // }
    })
}

export const findAllUsers = async () => {
    return await User.findAll();
}

export const updateUser = async (item, id) => {
    return await User.update(
        {item},
        {where: {id}}
        )
}

export const insertUser = async (item) => {
    item = {
        id: generateId(5),
        ...item,
    }
    return await User.create(item);
}

export const deleteUser = async (id) => {
    return await User.destroy({
        where: {id}
    });
}
