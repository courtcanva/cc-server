module.exports = {
  async up(db) {
    await db.collection("prices").updateOne({}, [
      {
        $set: {
          cementFloorPrice: 15000,
          tilePrices: [
            {
              tile_id: "",
              tileName: "Elite X II",
              deliveryPrice: 1900,
              price: { singleTone: 1200, twoTone: 1500, threeTone: 2000 },
              isDeleted: false,
            },
          ],
          updatedAt: new Date(),
        },
      },
      { $unset: ["tile_id", "deliveryPrice", "tilePrice"] },
    ]);
  },
};
