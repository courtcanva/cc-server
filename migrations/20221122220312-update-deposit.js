module.exports = {
  async up(db) {
    await db.collection("deposits").updateOne(
      {
        depositRate: 0.2,
      },
      { $set: { depositRate: 0.02, updatedAt: new Date() } },
    );
  },
};
