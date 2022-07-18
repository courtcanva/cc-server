module.exports = {
  async up(db) {
    await db.collection("prices").updateOne(
      {
        court_spec: [
          { court: "Pro Full Court", installationPrice: 25799 },
          { court: "Full Court", installationPrice: 23799 },
          { court: "Pro Half Court", installationPrice: 15799 },
          { court: "Half Court", installationPrice: 13799 },
          { court: "Medium Court", installationPrice: 9799 },
          { court: "Small Court", installationPrice: 5799 },
        ],
      },
      [
        { $set: { deliveryPrice: [{ tile_id: "tile001", price: 1900 }], tilePrice: 12000 } },
        { $unset: ["tiles", "court_spec"] },
      ],
    );
  },
};
