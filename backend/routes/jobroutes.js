import express from "express";
import { createJob, getJobs } from "../controller/jobcontroller.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getJobs);

export default router;
