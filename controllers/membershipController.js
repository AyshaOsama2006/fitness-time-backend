const db = require('../models');
const Membership = db.Membership;

async function getAllMemberships(req, res) {
    try {
        const memberships = await Membership.findAll();
        res.json(memberships);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

async function getMembershipById(req, res) {
    try {
        const membership = await Membership.findByPk(req.params.id);

        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        res.json(membership);

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

async function createMembership(req, res) {
    try {

        if (!req.body.name || !req.body.price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const membership = await Membership.create({
            M_id :req.body.M_id,
            name: req.body.name,
            price: req.body.price,
            DurationMonths: req.body.DurationMonths,
            description: req.body.description
        });

        res.status(201).json(membership);

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

async function updateMembership(req, res) {
    try {
        const membership = await Membership.findByPk(req.params.id);

        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        await membership.update(req.body);

        res.json({ message: 'Membership updated successfully', membership });

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

async function deleteMembership(req, res) {
    try {
        const membership = await Membership.findByPk(req.params.id);

        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        await membership.destroy();

        res.json({ message: 'Membership deleted successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

module.exports = {
    getAllMemberships,
    getMembershipById,
    createMembership,
    updateMembership,
    deleteMembership
};