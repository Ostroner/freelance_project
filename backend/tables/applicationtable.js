import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import user from "./usertable.js";
import Job from "./jobtable.js";

const Application = db.define("Application", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jobId: {
        type: DataTypes.INTEGER,
        references: {
            model: Job,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    },
    coverLetter: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "applications"
});

user.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(user, { foreignKey: 'userId' });

Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

export default Application;