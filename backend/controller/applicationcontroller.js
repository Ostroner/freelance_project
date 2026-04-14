import { Application, user, Job } from "../tables/foreignkey.js";

// Apply for a job
export const applyForJob = async (req, res) => {
    const { userId, coverLetter } = req.body;
    const { jobId } = req.params;
    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        const existingApplication = await Application.findOne({
            where: { userId, jobId },
        });

        if (existingApplication) {
            return res.status(400).json({ error: "You have already applied for this job" });
        }

        const newApplication = await Application.create({ userId, jobId, coverLetter });
        res.status(201).json({
            message: "Applied for job successfully",
            application: newApplication,
        });
    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ error: "Failed to apply for job" });
    }
};

// Get all applicants for a job
export const getApplicants = async (req, res) => {
    const { jobId } = req.params;
    try {
        const job = await Job.findByPk(jobId, {
            include: [{
                model: Application,
                as: 'applications',
                include: [{
                    model: user,
                    as: 'applicant',
                    attributes: ['id', 'name', 'email']
                }]
            }]
        });

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        res.status(200).json(job.applications);
    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ error: "Failed to fetch applicants" });
    }
};
