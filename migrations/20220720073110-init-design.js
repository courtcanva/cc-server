module.exports = {
  async up(db) {
    await db.collection("designs").insertMany([
      {
        user_id: "user123",
        designName: "CourtCanvas1",
        tileColor: [
          {
            location: "threePoint",
            color: "#72818B",
          },
          {
            location: "courtArea",
            color: "#B61313",
          },
          {
            location: "topKeyArea",
            color: "#B61313",
          },
          {
            location: "border",
            color: "#195955",
          },
          {
            location: "keyArea",
            color: "#2C4E8A",
          },
          {
            location: "circleArea",
            color: "#606F14",
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
      },
      {
        user_id: "user123",
        designName: "CourtCanvas2",
        tileColor: [
          {
            location: "threePoint",
            color: "#72818B",
          },
          {
            location: "courtArea",
            color: "#B61313",
          },
          {
            location: "topKeyArea",
            color: "#B61313",
          },
          {
            location: "border",
            color: "#195955",
          },
          {
            location: "keyArea",
            color: "#2C4E8A",
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
      },
    ]);
  },
};
