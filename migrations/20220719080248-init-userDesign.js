module.exports = {
  async up(db) {
    await db.collection("prices").insertOne({
      design_id: { user_id: "user123", design_name: "CourtCanvas1" },
      tileColor: [
        {
          location: "threePoint",
          color: "#FBBC05",
        },
        {
          location: "courtArea",
          color: "#344C5C",
        },
        {
          location: "topKeyArea",
          color: "#EB4335",
        },
        {
          location: "border",
          color: "#195955",
        },
        {
          location: "keyArea",
          color: "#B59F7A",
        },
        {
          location: "circleArea",
          color: "#EBD935",
        },
      ],
      courtSize: {
        name: "Pro Full Court",
        length: 28000,
        width: 15000,
        centreCircleRadius: 1800,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4900,
        sideBorderWidth: 1000,
        lineBorderWidth: 200,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
};
