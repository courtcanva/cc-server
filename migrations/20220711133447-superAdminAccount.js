module.exports = {
  async up(db) {
    await db.collection("admins").insertOne({
      email: "court.canva@gmail.com",
      password:
        "$argon2id$v=19$m=4096,t=3,p=1$oQnmDYZ5hDvX7icgfxz9fA$yHvCJuWo9FUeJqb0Iy8fxBN/r4q5CCskQwkT5ci/28M",
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      hashedRefreshToken: null,
    });
  },
};
