module.exports = {
  async up(db) {
    await db
      .collection("admins")
      .updateOne(
        { email: "court.canva@gmail.com" },
        { $set: { permission: "super", name: "Canva" } },
      );
  },
};
