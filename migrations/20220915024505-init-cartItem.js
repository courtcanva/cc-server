module.exports = {
  async up(db) {
    await db.collection("cartitems").insertMany([
      {
        user_id: "107705953378907352660",
        designName: "Court Canva 1",
        tileColor: [
          {
            location: "threePoint",
            color: "#7088B1",
          },
          {
            location: "courtArea",
            color: "#E18E11",
          },
          {
            location: "topKeyArea",
            color: "#B6B6B6",
          },
          {
            location: "border",
            color: "#834085",
          },
          {
            location: "keyArea",
            color: "#2C4E8A",
          },
          {
            location: "circleArea",
            color: "#B6B6B6",
          },
        ],
        courtSize: {
          name: "Pro Full Court",
          length: 28000,
          width: 15000,
          threePointLine: 900,
          threePointRadius: 6600,
          centreCircleRadius: 1800,
          restrictedAreaLength: 5790,
          restrictedAreaWidth: 4800,
          sideBorderWidth: 1000,
          lengthOfCorner: 1575,
          lineBorderWidth: 200,
          designName: "Court Canva 1",
        },
        quotation: "67445.40",
        quotationDetails: [
          {
            color: "#7088B1",
            quantity: 1273,
          },
          {
            color: "#E18E11",
            quantity: 2572,
          },
          {
            color: "#B6B6B6",
            quantity: 231,
          },
          {
            color: "#834085",
            quantity: 1000,
          },
          {
            color: "#2C4E8A",
            quantity: 624,
          },
        ],
      },
      {
        user_id: "107705953378907352660",
        designName: "Court Canva 2",
        tileColor: [
          {
            location: "threePoint",
            color: "#44BC84",
          },
          {
            location: "courtArea",
            color: "#558BE7",
          },
          {
            location: "topKeyArea",
            color: "#EB4335",
          },
          {
            location: "border",
            color: "#834085",
          },
          {
            location: "keyArea",
            color: "#2C4E8A",
          },
          {
            location: "circleArea",
            color: "#EB4335",
          },
        ],
        courtSize: {
          name: "Pro Half Court",
          length: 14000,
          width: 15000,
          threePointLine: 900,
          threePointRadius: 6600,
          centreCircleRadius: 1800,
          restrictedAreaLength: 5790,
          restrictedAreaWidth: 4800,
          sideBorderWidth: 0,
          lengthOfCorner: 1575,
          lineBorderWidth: 200,
          designName: "Court Canva 1",
        },
        quotation: "27782.70",
        quotationDetails: [
          {
            color: "#44BC84",
            quantity: 632,
          },
          {
            color: "#558BE7",
            quantity: 1295,
          },
          {
            color: "#EB4335",
            quantity: 119,
          },
          {
            color: "#834085",
            quantity: 0,
          },
          {
            color: "#2C4E8A",
            quantity: 304,
          },
        ],
      },
      {
        user_id: "107705953378907352660",
        designName: "Court Canva 3",
        tileColor: [
          {
            location: "threePoint",
            color: "#FBBC05",
          },
          {
            location: "courtArea",
            color: "#EBD935",
          },
          {
            location: "topKeyArea",
            color: "#EB4335",
          },
          {
            location: "border",
            color: "#834085",
          },
          {
            location: "keyArea",
            color: "#558BE7",
          },
          {
            location: "circleArea",
            color: "#EB4335",
          },
        ],
        courtSize: {
          name: "Medium Court",
          length: 10000,
          width: 7000,
          threePointLine: 900,
          threePointRadius: 6600,
          centreCircleRadius: 1800,
          restrictedAreaLength: 5790,
          restrictedAreaWidth: 4800,
          sideBorderWidth: 0,
          lengthOfCorner: 1575,
          lineBorderWidth: 200,
          designName: "Court Canva 1",
        },
        quotation: "9260.90",
        quotationDetails: [
          {
            color: "#FBBC05",
            quantity: 263,
          },
          {
            color: "#EBD935",
            quantity: 189,
          },
          {
            color: "#EB4335",
            quantity: 60,
          },
          {
            color: "#834085",
            quantity: 0,
          },
          {
            color: "#558BE7",
            quantity: 304,
          },
        ],
      },
    ]);
  },
};
