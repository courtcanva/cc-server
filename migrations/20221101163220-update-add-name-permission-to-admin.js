module.exports = {
  async up(db) {
    await db
      .collection("admins")
      .updateOne(
        { email: "court.canva@gmail.com" },
        { $set: { permission: "Super", name: "Canva" } },
      );
  },

  async down(db) {
    await db
      .collection("admins")
      .updateOne({ email: "court.canva@gmail.com" }, { $unset: { permission: null, name: null } });
  },
};
