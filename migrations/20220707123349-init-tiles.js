module.exports = {
  async up(db) {
    await db.collection("tiles").insertOne({
      name: "Elite X II",
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
      length: 300,
      width: 300,
      height: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });
  },
};
