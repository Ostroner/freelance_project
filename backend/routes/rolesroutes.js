import express from "express";
import {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
} from "../controllers/rolesController.js";

const router = express.Router();

// CREATE
router.post("/", createRole);

// READ
router.get("/", getAllRoles);
router.get("/:id", getRoleById);

// UPDATE
router.put("/:id", updateRole);

// DELETE
router.delete("/:id", deleteRole);

export default router;