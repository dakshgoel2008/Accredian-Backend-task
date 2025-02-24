const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createReferral = async (name, email, phone) => {
    return await prisma.referral.upsert({
        where: { email },
        update: { name, phone }, // Update existing entry
        create: { name, email, phone }, // Create new entry if email doesn't exist
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
