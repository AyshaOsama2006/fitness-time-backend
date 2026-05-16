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
        console.log("SUBSCRIPTION ERROR:", err);
res.status(500).json({
  message: err.message,
  stack: err.stack
});
    }
}

async function createSubscription(req, res) {
    try {
        console.log("✅ Subscription request received");

        if (!req.body.membershipId) {
            return res.status(400).json({ message: 'membershipId is required' });
        }

        const membership = await Membership.findByPk(req.body.membershipId);
        if (!membership) {
            return res.status(400).json({ message: 'Invalid membershipId' });
        }

        const subscription = await Subscription.create({
            membershipId: req.body.membershipId,
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