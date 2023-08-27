export const mockOrder = {
  user_id: "user123",
  status: "unpaid",
  depositRatio: 0.02,
  isExpired: false,
  expireDay: 7,
  expiredAt: new Date(),
  items: [
    {
      image: "test",
      constructionDrawing: "test",
      design: {
        designName: "Court Canva 1",
        courtType: "basketball",
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
  ],
};

export const mockOrderArray = [{ ...mockOrder }, { ...mockOrder }, { ...mockOrder }];

export const mockOrderInDatabase = {
  ...mockOrder,
  _id: "6320bd57f3dee2ee6deeecf2",
  createdAt: "2022-09-13T17:26:43.520Z",
  updatedAt: "2022-09-14T10:39:11.476Z",
  __v: 0,
};

export const mockOrderArrayWithTotal = {
  data: [{ ...mockOrder }, { ...mockOrder }, { ...mockOrder }],
  total: 3,
};

export const mockExpireDay = {
  _id: "646c53e0b18b324ebb5af060",
  expireDays: 7,
  createdAt: "2023-05-23T05:49:20.501Z",
  updatedAt: "2023-05-23T05:49:20.501Z",
};
