const db = require('../models');
const Subscription = db.Subscription;
const Membership = db.Membership;

async function getAllSubscriptions(req, res) {
    try {
        const subscriptions = await Subscription.findAll({
            include: Membership
        });

        res.json(subscriptions);

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

async function getSubscriptionById(req, res) {
    try {
        const subscription = await Subscription.findByPk(req.params.id, {
            include: Membership
        });

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        res.json(subscription);

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

async function createSubscription(req, res) {
    try {

        if (!req.body.membership_id) {
            return res.status(400).json({ message: 'membership_id is required' });
        }

        const membership = await Membership.findByPk(req.body.membership_id);
        if (!membership) {
            return res.status(400).json({ message: 'Invalid membership_id' });
        }

        const subscription = await Subscription.create({
            membership_id: req.body.membership_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            status: req.body.status
        });

        res.status(201).json(subscription);

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

async function updateSubscription(req, res) {
    try {
        const subscription = await Subscription.findByPk(req.params.id);

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        await subscription.update(req.body);

        res.json({ message: 'Subscription updated successfully', subscription });

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

async function deleteSubscription(req, res) {
    try {
        const subscription = await Subscription.findByPk(req.params.id);

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        await subscription.destroy();

        res.json({ message: 'Subscription deleted successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

module.exports = {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription
};