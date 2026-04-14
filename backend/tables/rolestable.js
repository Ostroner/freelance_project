import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Roles = db.define("Roles", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    tableName: "roles"
});

export default Roles;