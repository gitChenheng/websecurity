import * as Sequelize from "sequelize";

export const key_value={
    // key: {
    //     type:Sequelize.INTEGER,
    //     autoIncrement:true,
    //     primaryKey:true,
    //     allowNull: false
    // },
    name: {
        type:Sequelize.STRING(100),
        allowNull: false
    },
};
