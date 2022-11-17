module.exports = {
  async up(db) {
    await db.collection("deposits").insertOne({
      depositRate: 0.2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
};
