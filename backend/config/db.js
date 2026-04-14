import { Sequelize } from "sequelize";

const db = new Sequelize(
    {
        host: "127.0.0.1",
        username: "root",
        password: "Alwayscool12345",
        database: "freelance",
        dialect: "mysql",
        port: 3306
    }

)

async function connectDB() {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
    }
}

export { db, connectDB };