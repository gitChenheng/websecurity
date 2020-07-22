import {Table, Column} from "sequelize-typescript";
import { STRING, INTEGER} from "sequelize";
import BaseEntity from "./BaseEntity";

@Table({tableName: "kvs"})
export default class KVEntity extends BaseEntity{

    @Column(INTEGER)
    key: number;

    @Column(STRING)
    value: string;

}
