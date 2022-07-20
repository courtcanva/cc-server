module.exports = {
  async up(db) {
    await db.collection("tiles").updateOne(
      {
        name: "Elite X II",
      },
      {
        $set: {
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
          updatedAt: new Date(),
        },
      },
      {
        $unset: {
          colors: [
            { name: "Light green", value: "#305236" },
            { name: "Forest green", value: "#314B33" },
            { name: "Dark Green", value: "#43554A" },
            { name: "Beige", value: "#5C5046" },
            { name: "Brown", value: "#332828" },
            { name: "Red", value: "#633132" },
            { name: "Sandstone", value: "#B49F7A" },
            { name: "Maroon", value: "#411A20" },
            { name: "Tournament Purple", value: "#1A1F51" },
            { name: "Gray", value: "#5B5D61" },
            { name: "Blue", value: "#162F4E" },
            { name: "Light Blue", value: "#2B5178" },
            { name: "Dove Grey", value: "#8E9196" },
            { name: "Ice Blue", value: "#80C4E5" },
            { name: "Yellow", value: "#F1CB87" },
            { name: "Orang", value: "#C66B54" },
            { name: "Bright Red", value: "#AA3A34" },
            { name: "Black", value: "#000000" },
          ],
        },
      },
    );
  },
};
