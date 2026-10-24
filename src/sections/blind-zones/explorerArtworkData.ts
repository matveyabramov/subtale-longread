// Exact endpoints from Stage 0.2 registers. Crops stay normalized to each runtime bitmap.
export const iceFragments = [
  {
    "ids": {
      "A": "10:1935",
      "B": "10:1597"
    },
    "x": 30,
    "y": 397,
    "width": 501,
    "height": 337,
    "order": {
      "A": 5,
      "B": 0
    },
    "asset": "idiom-ice-upper-left",
    "mask": null,
    "crop": [
      [
        0.4636995494365692,
        0,
        0.00020405784016475081
      ],
      [
        0,
        0.5588722825050354,
        0
      ]
    ]
  },
  {
    "ids": {
      "A": "10:1936",
      "B": "10:1628"
    },
    "x": 415,
    "y": 853,
    "width": 232,
    "height": 147,
    "order": {
      "A": 6,
      "B": 6
    },
    "asset": "idiom-ice-lower-middle",
    "mask": null,
    "crop": [
      [
        0.21472714841365814,
        0,
        0.3565400540828705
      ],
      [
        0,
        0.24378108978271484,
        0.7562189102172852
      ]
    ]
  },
  {
    "ids": {
      "A": "10:1937",
      "B": "10:1629"
    },
    "x": 657,
    "y": 397,
    "width": 424,
    "height": 299,
    "order": {
      "A": 7,
      "B": 7
    },
    "asset": "idiom-ice-upper-right",
    "mask": "idiom-ice-upper-right-mask",
    "crop": [
      [
        0.3924323618412018,
        0,
        0.5805226564407349
      ],
      [
        0,
        0.49585404992103577,
        3.5232549316861804e-15
      ]
    ]
  },
  {
    "ids": {
      "A": "10:1940",
      "B": "10:1632"
    },
    "x": 504,
    "y": 499,
    "width": 203,
    "height": 379,
    "order": {
      "A": 8,
      "B": 8
    },
    "asset": "idiom-ice-center",
    "mask": "idiom-ice-center-mask",
    "crop": [
      [
        0.18788623809814453,
        0,
        0.43798828125
      ],
      [
        0,
        0.6285240650177002,
        0.16749586164951324
      ]
    ]
  },
  {
    "ids": {
      "A": "10:1945",
      "B": "10:1637"
    },
    "x": 900,
    "y": 646,
    "width": 210,
    "height": 145,
    "order": {
      "A": 9,
      "B": 9
    },
    "asset": "idiom-ice-right-small",
    "mask": "idiom-ice-right-small-mask",
    "crop": [
      [
        0.19436506927013397,
        0,
        0.8054308891296387
      ],
      [
        0,
        0.24046432971954346,
        0.4129352867603302
      ]
    ]
  },
  {
    "ids": {
      "A": "10:1950",
      "B": "10:1642"
    },
    "x": 354,
    "y": 685,
    "width": 133,
    "height": 116,
    "order": {
      "A": 10,
      "B": 10
    },
    "asset": "idiom-ice-left-small",
    "mask": "idiom-ice-left-small-mask",
    "crop": [
      [
        0.12309788167476654,
        0,
        0.30008161067962646
      ],
      [
        0,
        0.19237148761749268,
        0.4776119589805603
      ]
    ]
  },
  {
    "ids": {
      "A": "10:1953",
      "B": "10:1645"
    },
    "x": 30,
    "y": 727,
    "width": 393,
    "height": 273,
    "order": {
      "A": 11,
      "B": 11
    },
    "asset": "idiom-ice-lower-shared",
    "mask": "idiom-ice-lower-left-mask",
    "crop": [
      [
        0.36374035477638245,
        0,
        0.00020405784016475081
      ],
      [
        0,
        0.4527363181114197,
        0.5472636818885803
      ]
    ]
  },
  {
    "ids": {
      "A": "10:1958",
      "B": "10:1650"
    },
    "x": 653,
    "y": 735,
    "width": 457,
    "height": 265,
    "order": {
      "A": 12,
      "B": 12
    },
    "asset": "idiom-ice-lower-shared",
    "mask": "idiom-ice-lower-right-mask",
    "crop": [
      [
        0.42297545075416565,
        0,
        0.576820433139801
      ],
      [
        0,
        0.4394693076610565,
        0.5605306625366211
      ]
    ]
  }
] as const;

// The repeated descendant matrices in the import describe the same frame projection, not extra rotations.
export const punLayers = [
  {
    "ids": {
      "A": "10:1975",
      "B": "10:2012"
    },
    "width": 735,
    "height": 985
  },
  {
    "ids": {
      "A": "10:1976",
      "B": "10:2013"
    },
    "width": 735,
    "height": 985
  },
  {
    "ids": {
      "A": "10:1977",
      "B": "10:2014"
    },
    "width": 735,
    "height": 985
  },
  {
    "ids": {
      "A": "10:1978",
      "B": "10:2015"
    },
    "width": 735,
    "height": 984
  },
  {
    "ids": {
      "A": "10:1979",
      "B": "10:2016"
    },
    "width": 735,
    "height": 984
  }
] as const;
export const punMatrices = {
  "A": [
    [
      1,
      0,
      50
    ],
    [
      0,
      1,
      200
    ]
  ],
  "B": [
    [
      0.8254373669624329,
      -0.564493715763092,
      392.1650390625
    ],
    [
      0.564493715763092,
      0.8254373669624329,
      78.5205078125
    ]
  ]
} as const;

export const snowflakes = [
  {
    "id": "10:1591",
    "x": 328,
    "y": 321,
    "width": 522,
    "height": 699,
    "order": 5
  },
  {
    "id": "10:1592",
    "x": 76,
    "y": 283,
    "width": 232,
    "height": 311,
    "order": 6
  },
  {
    "id": "10:1593",
    "x": 870,
    "y": 198,
    "width": 232,
    "height": 311,
    "order": 7
  },
  {
    "id": "10:1594",
    "x": 902,
    "y": 655,
    "width": 168,
    "height": 224,
    "order": 8
  },
  {
    "id": "10:1595",
    "x": 126,
    "y": 732,
    "width": 110,
    "height": 147,
    "order": 9
  }
] as const;
