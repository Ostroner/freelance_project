import express from "express";
import { applyForJob, getApplicants } from "../controller/applicationcontroller.js";

const router = express.Router();

router.post("/:jobId/apply", applyForJob);
router.get("/:jobId/applicants", getApplicants);

export default router;
