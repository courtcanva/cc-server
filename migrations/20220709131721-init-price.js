module.exports = {
  async up(db) {
    await db.collection("prices").insertOne({
      tiles: {
        tile_id: "123457",
        deliveryPrice: 1234,
        tilePrice: [
          { colorName: "Light green", price: 1234 },
          { colorName: "Forest green", price: 5678 },
          { colorName: "Dark Green", price: 4537 },
          { colorName: "Beige", price: 7537 },
          { colorName: "Brown", price: 4265 },
          { colorName: "Red", price: 1299 },
          { colorName: "Sandstone", price: 1399 },
          { colorName: "Maroon", price: 1499 },
          { colorName: "TourcolorNament Purple", price: 1599 },
          { colorName: "Gray", price: 1699 },
          { colorName: "Blue", price: 1799 },
          { colorName: "Light Blue", price: 1899 },
          { colorName: "Dove Grey", price: 1999 },
          { colorName: "Ice Blue", price: 1599 },
          { colorName: "Yellow", price: 4699 },
          { colorName: "Orang", price: 1799 },
          { colorName: "Bright Red", price: 2088 },
          { colorName: "Black", price: 3999 },
        ],
      },
      court_spec: [
        { court_id: "62c432cfb8a9c5f61f03831f", installationPrice: 25733 },
        { court_id: "62c432cfb8a9c5f61f038320", installationPrice: 15733 },
        { court_id: "62c432cfb8a9c5f61f038324", installationPrice: 15733 },
        { court_id: "62c432cfb8a9c5f61f038321", installationPrice: 15733 },
        { court_id: "62c432cfb8a9c5f61f038322", installationPrice: 15733 },
        { court_id: "62c432cfb8a9c5f61f038323", installationPrice: 15733 },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });
  },
};
