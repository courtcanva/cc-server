module.exports = {
  async up(db) {
    await db.collection("deposits").insertOne({ depositRatio: 0.2 });
  },
};
