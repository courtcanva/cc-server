module.exports = {
  async up(db) {
    await db
      .collection("tiles")
      .updateOne({ name: "Elite X II" }, [{ $set: { tile_id: "tile001" } }]);
  },
};
