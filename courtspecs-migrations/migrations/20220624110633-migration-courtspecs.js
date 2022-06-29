module.exports = {
  async up(db, client) {
    await db
      .collection("courtspecs")
      .updateOne({ name: "Pro Full Court 2" }, { $set: { width: 999 } });
  },

  async down(db, client) {
    await db
      .collection("courtspecs")
      .updateOne({ name: "Pro Full Court 2" }, { $set: { width: 10000 } });
  },
};
