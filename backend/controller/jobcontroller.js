import { Job, Application, user } from "../tables/foreignkey.js";

// Create a new job
export const createJob = async (req, res) => {
    const { title, description, budget, userId } = req.body;
    try {
        const newJob = await Job.create({ title, description, budget, userId });
        res.status(201).json({
            message: "Job created successfully",
            job: newJob,
        });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ error: "Failed to create job" });
    }
};

// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            include: [{
                model: user,
                as: 'creator',
                attributes: ['id', 'name', 'email']
            }]
        });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
};
