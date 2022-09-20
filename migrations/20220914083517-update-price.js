module.exports = {
  async up(db) {
    await db.collection("prices").updateOne(
      {
        tile_id: "tile001",
      },
      [
        {
          $set: {
            cementFloorPrice: 15000,
            tilePrices: [
              {
                tile_id: "",
                tileName: "Elite X II",
                deliveryPrice: 1900,
                price: 12000,
                isDeleted: false,
              },
            ],
            updatedAt: new Date(),
          },
        },
        { $unset: ["tile_id", "deliveryPrice", "tilePrice"] },
      ],
    );
  },
};
