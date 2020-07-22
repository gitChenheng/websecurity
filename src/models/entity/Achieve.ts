import {Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull} from "sequelize-typescript";
import { STRING, DATE, INTEGER, TINYINT, BIGINT, TEXT } from "sequelize";
import KVEntity from "../common/KVEntity";

@Table({tableName: "achieves"})
export default class Achieve extends KVEntity{

    @Column(INTEGER)//成就点数
    public point: number;

    @AllowNull
    @Column(TEXT)//达成条件
    public conditions: string;

}
