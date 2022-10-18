module.exports = {
  async up(db) {
    await db
      .collection("courtspecs")
      .updateOne({ name: "Pro Full Court" }, { $set: { isHidden: false, updatedAt: new Date() } });
    await db
      .collection("courtspecs")
      .updateOne({ name: "Full Court" }, { $set: { isHidden: false, updatedAt: new Date() } });
    await db
      .collection("courtspecs")
      .updateOne({ name: "Pro Half Court" }, { $set: { isHidden: false, updatedAt: new Date() } });
    await db
      .collection("courtspecs")
      .updateOne({ name: "Half Court" }, { $set: { isHidden: false, updatedAt: new Date() } });
    await db
      .collection("courtspecs")
      .updateOne({ name: "Medium Court" }, { $set: { isHidden: false, updatedAt: new Date() } });
    await db
      .collection("courtspecs")
      .updateOne({ name: "Small Court" }, { $set: { isHidden: false, updatedAt: new Date() } });
  },
};
