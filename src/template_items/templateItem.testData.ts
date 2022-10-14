export const mockTemplateItem = {
  user_id: "123456",
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
    },
  },
};

export const mockTemplateItemArray = [
  {
    user_id: "123456",
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
      },
      image: "www.youtube.com",
      description: "Basketball Full Court Small Family first choice",
      tags: {
        CourtCategory: "full pro court",
        CourtSize: "basketball",
      },
      isOfficial: true,
      status: "punished",
    },
  },
  {
    user_id: "123456",
    design: {
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
    },
    image: "www.youtube.com",
    description: "Basketball Full Court",
    tags: {
      CourtCategory: "full court",
      CourtType: "basketball",
    },
  },
  {
    user_id: "123456",
    design: {
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
    },
    image: "www.tennis.com",
    description: "Basketball Full Court Small Family first choice",
    tags: {
      CourtCategory: "full pro court",
      CourtSize: "tennis",
    },
    isOfficial: false,
    status: "punished",
  },
];

export const mockNewTemplateItem = {
  user_id: "123456",
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
    },
  },
  image: "url123",
  description: "Basketball Full Court",
  tags: {
    CourtCategory: "full pro court",
    CourtType: "tennis",
  },
};

export const mockTemplateItemInDatabase = {
  _id: "6320bd57f3dee2ee6deeecf2",
  user_id: "user123",
  designName: "CourtCanvas1.a",
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
  image: "www.tennis.com",
  description: "Basketball Full Court Big Family first choice",
  tags: {
    CourtCategory: "full pro court",
    CourtSize: "tennis",
  },
  isOfficial: false,
  status: "published",
  createdAt: "2022-10-11T04:15:29.050+00:00",
  updatedAt: "2022-10-11T04:27:36.677+00:00",
  isDeleted: false,
  __v: 0,
};
