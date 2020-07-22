import {Table, Column, Model, PrimaryKey, AutoIncrement} from "sequelize-typescript";
import {INTEGER, STRING} from "sequelize";
import BaseEntity from "../common/BaseEntity";

@Table({tableName: "note_board"})
export default class NoteBoard extends BaseEntity{

    @Column(STRING)
    public content: string;

}

