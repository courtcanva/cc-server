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
        ],
      },
      court_spec: [
        { court_id: "355235", installationPrice: 25733 },
        { court_id: "354355", installationPrice: 15733 },
        { court_id: "354355", installationPrice: 15733 },
        { court_id: "354355", installationPrice: 15733 },
        { court_id: "354355", installationPrice: 15733 },
        { court_id: "354355", installationPrice: 15733 },
      ],
      isDeleted: false,
    });
  },
};
