const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createReferral = async (name, email, phone) => {
    return await prisma.referral.create({
        data: { name, email, phone },
    });
};

// fetching the referrals from database.
const getAllReferrals = async () => {
    return await prisma.referral.findMany();
};

module.exports = {
    createReferral,
    getAllReferrals,
};
