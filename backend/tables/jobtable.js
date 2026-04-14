import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import user from "./usertable.js";

const Job = db.define("Job", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: "jobs"
});

user.hasMany(Job, { foreignKey: 'userId' });
Job.belongsTo(user, { foreignKey: 'userId' });

export default Job;