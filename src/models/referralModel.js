const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createReferral = async (name, email, phone, referrerEmail, referrerName, courseName) => {
    return await prisma.referral.upsert({
        where: { email },
        update: { name, phone, referrerEmail, referrerName, courseName },
        create: { name, email, phone, referrerEmail, referrerName, courseName },
    });
};

const getAllReferrals = async () => {
    return await prisma.referral.findMany();
};

process.on("beforeExit", async () => {
    await prisma.$disconnect();
});

module.exports = { createReferral, getAllReferrals };
