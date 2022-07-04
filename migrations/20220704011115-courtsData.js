module.exports = {
  async up(db) {
    await db.collection("courtspecs").insertMany([
      {
        name: "Pro Full Court",
        length: 28000,
        width: 15000,
        centreCircleRadius: 1800,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4900,
        sideBorderWidth: 1200,
        lineBorderWidth: 200,
        description: "PRO Full Court",
      },
      {
        name: "Full Court",
        length: 28000,
        width: 15000,
        centreCircleRadius: 1800,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4900,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Full Court",
      },
      {
        name: "Pro Half Court",
        length: 14000,
        width: 15000,
        centreCircleRadius: 1800,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4800,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Pro Full Court",
      },
      {
        name: "Half Court",
        length: 10000,
        width: 15000,
        centreCircleRadius: 0,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4800,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Half Court",
      },
      {
        name: "Medium Court",
        length: 10000,
        width: 7000,
        centreCircleRadius: 0,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4800,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Medium Court",
      },
      {
        name: "Small Court",
        length: 9000,
        width: 5000,
        centreCircleRadius: 0,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4800,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Small Court",
      },
    ]);
  },

  async down(db) {
    await db.collection("courtspecs").insertMany([
      {
        name: "Pro Full Court",
        length: 28000,
        width: 15000,
        centreCircleRadius: 1800,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4900,
        sideBorderWidth: 1200,
        lineBorderWidth: 200,
        description: "PRO Full Court",
      },
      {
        name: "Full Court",
        length: 28000,
        width: 15000,
        centreCircleRadius: 1800,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4900,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Full Court",
      },
      {
        name: "Pro Half Court",
        length: 14000,
        width: 15000,
        centreCircleRadius: 1800,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4800,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Pro Full Court",
      },
      {
        name: "Half Court",
        length: 10000,
        width: 15000,
        centreCircleRadius: 0,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4800,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Half Court",
      },
      {
        name: "Medium Court",
        length: 10000,
        width: 7000,
        centreCircleRadius: 0,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4800,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Medium Court",
      },
      {
        name: "Small Court",
        length: 9000,
        width: 5000,
        centreCircleRadius: 0,
        threePointRadius: 6600,
        threePointLine: 900,
        lengthOfCorner: 1575,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4800,
        sideBorderWidth: 0,
        lineBorderWidth: 200,
        description: "Small Court",
      },
    ]);
  },
};
