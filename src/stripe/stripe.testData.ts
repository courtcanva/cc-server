import { Stripe } from "stripe";

export const mockPaymentOrderData = {
  paymentInfo: {
    orderId: Object(1),
    name: "Tay",
    email: "123@abc.com",
    phone: "444444444",
    billingAddress: {
      city: "Brisbane",
      country: "AU",
      line1: "123 Zack Street",
      line2: "",
      postalCode: "1111",
      state: "QLD",
    },
    constructionAddress: {
      city: "Brisbane",
      country: "AU",
      line1: "123 Zack Street",
      line2: "",
      postalCode: "1111",
      state: "QLD",
    },
    currency: "aud",
    amountTotal: "1000.00",
    sessionId: "123",
  },
  order: {
    user_id: "user123",
    status: "unpaid",
    depositRatio: 0.02,
    items: [
      {
        image: "test",
        constructionDrawing: "test",
        design: {
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
  },
};

export const mockCreateCheckoutSession = {
  order_Id: "123",
  user_id: "123",
  items: [],
  depositRatio: 0.1,
};

export const mockUpdatePaymentInfo = {
  name: "Zack",
};

export const mockPaymentInfo = {
  orderId: Object("6320bd57f3dee2ee6deeecf2"),
  name: "Zack",
  email: "123@abc.com",
  phone: "444444444",
  billingAddress: {
    city: "Brisbane",
    country: "AU",
    line1: "123 Zack Street",
    line2: "",
    postalCode: "1111",
    state: "QLD",
  },
  constructionAddress: {
    city: "Brisbane",
    country: "AU",
    line1: "123 Zack Street",
    line2: "",
    postalCode: "1111",
    state: "QLD",
  },
  currency: "aud",
  amountTotal: "11451419.19",
  sessionId: "111",
};

export const mockPaymentInfoDb = {
  ...mockPaymentInfo,
  _id: Object("1"),
  createdAt: "2022-09-13T17:26:43.520Z",
  updatedAt: "2022-09-14T10:39:11.476Z",
  __v: 0,
};

export const mockOrder = {
  user_id: "user123",
  status: "unpaid",
  depositRatio: 0.02,
  items: [
    {
      image: "test",
      constructionDrawing: "test",
      design: {
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
