import { connectDB, db } from "./config/db.js";
import tables from "./tables/usertable.js"
import jobtable from "./tables/jobtable.js"
import rolestable from "./tables/rolestable.js"
import applicationtable from "./tables/applicationtable.js"
import express from "express";
import cors from "cors";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userroutes.js";
import jobRoutes from "./routes/jobroutes.js";
import applicationRoutes from "./routes/applicationroutes.js";
import { user, Job, Application, Roles } from "./tables/foreignkey.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistDir = path.resolve(__dirname, "../frontend/dist");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);

if (existsSync(frontendDistDir)) {
    app.use("/app", express.static(frontendDistDir));

    app.get("/app", (req, res) => {
        res.redirect("/app/");
    });

    app.get("/app/*route", (req, res) => {
        res.sendFile(path.join(frontendDistDir, "index.html"));
    });
}


app.get("/", (req, res) => {
	res.status(200).json({
		message: "Server is running",
		timestamp: new Date().toISOString(),
	});
});

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.post("/seed-roles", async (req, res) => {
    try {
        await Roles.bulkCreate([
            { name: "admin" },
            { name: "user" },
            { name: "freelancer" }
        ]);
        res.status(201).json({ message: "Roles seeded successfully" });
    } catch (error) {
        console.error("Error seeding roles:", error);
        res.status(500).json({ error: "Failed to seed roles" });
    }
});

connectDB().finally(() => {
	app.listen(PORT, () => {
		console.log(`Backend server running on http://localhost:${PORT}`);
        db.sync({ alter: true });
	});
}); 
