import {Sequelize, Model, Table, Column, PrimaryKey, AutoIncrement, AllowNull} from "sequelize-typescript";
import { STRING, DATE, INTEGER, TINYINT, BIGINT, TEXT, BOOLEAN } from "sequelize";

@Table({tableName: "users"})
export default class User extends Model<User>{

    @PrimaryKey
    @Column(STRING)
    public id: string;

    @AllowNull
    @Column(STRING)
    public shareid: string;

    @AllowNull
    @Column(STRING)
    public openid: string;

    @AllowNull
    @Column(INTEGER)
    public role: number;

    @AllowNull
    @Column(STRING)
    public name: string;

    @AllowNull
    @Column(TEXT)
    public avatarUrl: string;

    @AllowNull
    @Column(STRING)
    public city: string;

    @AllowNull
    @Column(STRING)
    public province: string;

    @AllowNull
    @Column(STRING)
    public country: string;

    @AllowNull
    @Column(STRING)
    public language: string;

    @AllowNull
    @Column(STRING)
    public phone: string;

    @AllowNull
    @Column(STRING)
    public pwd: string;

    @AllowNull
    @Column(BOOLEAN)
    public gender: boolean;

    @AllowNull
    @Column(BIGINT)
    public credit: number;

    @AllowNull
    @Column({type: Sequelize.DECIMAL(20, 2)})//总长，小数点右边长度
    public balance: number;

    @AllowNull
    @Column(DATE)
    public lastSignInTime: Date;

    @AllowNull
    @Column(INTEGER)
    public continueSign: number;

    @AllowNull
    @Column(TEXT)
    public achieve: string;

    @AllowNull
    @Column(INTEGER)
    public authority: number;

    @AllowNull
    @Column(TEXT)
    public address: string;

}
