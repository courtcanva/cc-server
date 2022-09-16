module.exports = {
  async up(db) {
    await db.collection("prices").updateOne(
      {
        tile_id: "tile001",
      },
      [
        {
          $set: {
            cementFloorPrice: 1500,
            tilesPrice: [
              {
                tile_id: "1234564789",
                tileName: "Elite X II",
                deliveryPrice: 1900,
                tilePrice: 12000,
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
