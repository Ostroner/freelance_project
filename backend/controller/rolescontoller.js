import Roles from "../models/rolestable.js";

// CREATE ROLE
export const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        const role = await Roles.create({ name });

        res.status(201).json({
            message: "Role created successfully",
            data: role
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating role",
            error: error.message
        });
    }
};

// GET ALL ROLES
export const getAllRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll();

        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching roles",
            error: error.message
        });
    }
};

// GET SINGLE ROLE
export const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Roles.findByPk(id);

        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching role",
            error: error.message
        });
    }
};

// UPDATE ROLE
export const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const role = await Roles.findByPk(id);

        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        role.name = name;
        await role.save();

        res.status(200).json({
            message: "Role updated successfully",
            data: role
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating role",
            error: error.message
        });
    }
};

// DELETE ROLE
export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Roles.findByPk(id);

        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        await role.destroy();

        res.status(200).json({
            message: "Role deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting role",
            error: error.message
        });
    }
};