module.exports = {
  async up(db) {
    await db.collection("tiles").insertOne({
      name: "Elite X II",
      colors: [
        { name: "Light green", value: "#305236" },
        { name: "Forest green", value: "#314B33" },
        { name: "Dark Green", value: "#43554A" },
        { name: "Blue Stone", value: "#195955" },
        { name: "Fiji Green", value: "#606F14" },
        { name: "Pale Oyster", value: "#9D8B6B" },
        { name: "Maroon", value: "#B59F7A" },
        { name: "Golden Fizz", value: "#EBD935" },
        { name: "Selective Yellow", value: "#FBBC05" },
        { name: "Slate Grey", value: "#72818B" },
        { name: "Cello", value: "#344C5C" },
        { name: "Fun Blue", value: "#2C4E8A" },
        { name: "Cornflower Blue", value: "#558BE7" },
        { name: "Ice Blue", value: "#80C4E5" },
        { name: "Cherokee", value: "#F1CB87" },
        { name: "Cinnabar", value: "#EB4335" },
        { name: "Fire Brick", value: "#B61313" },
        { name: "Black", value: "#000000" },
      ],
      length: 300,
      width: 300,
      height: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });
  },
};
