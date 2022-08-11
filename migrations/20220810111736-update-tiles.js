module.exports = {
  async up(db) {
    await db.collection("tiles").updateOne(
      {
        name: "Elite X II",
      },
      {
        $set: {
          colors: [
            { name: "Violets", value: "#834085" },
            { name: "Purple", value: "#C96BBF" },
            { name: "Cinnabar", value: "#EB4335" },
            { name: "Maroon", value: "#B59F7A" },
            { name: "Cherokee", value: "#F1CB87" },
            { name: "Orange", value: "#E18E11" },
            { name: "Selective Yellow", value: "#FBBC05" },
            { name: "Golden Fizz", value: "#EBD935" },
            { name: "Mint", value: "#44BC84" },
            { name: "Elegant Blue", value: "#38CCCC" },
            { name: "Ice Blue", value: "#80C4E5" },
            { name: "Cornflower Blue", value: "#558BE7" },
            { name: "Haze Blue", value: "#7088B1" },
            { name: "Fun Blue", value: "#2C4E8A" },
            { name: "Cello", value: "#344C5C" },
            { name: "Light Grey", value: "#E1E1E1" },
            { name: "Linen Grey", value: "#B6B6B6" },
            { name: "Black", value: "#000000" },
          ],
          updatedAt: new Date(),
        },
      },
      {
        $unset: {
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
        },
      },
    );
  },
};
