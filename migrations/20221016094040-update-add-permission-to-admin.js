module.exports = {
  async up(db) {
    await db.collection("admins").updateMany({}, { $set: { permission: "" } });

    await db
      .collection("admins")
      .updateOne({ email: "court.canva@gmail.com" }, { $set: { permission: "Super" } });
  },

  async down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection("admins").updateMany({}, { $unset: { permission: null } });
  },
};
