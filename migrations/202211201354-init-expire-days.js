module.exports = {
  async up(db) {
    await db.collection("expiredays").insertOne({
      expireDays: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
};
