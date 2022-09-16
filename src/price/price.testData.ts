export const mockPrice = {
  cementFloorPrice: 15000,
  tilesPrice: [
    {
      tile_id: "123456",
      tileName: "Elite X II",
      deliveryPrice: 1900,
      tilePrice: 12000,
      isDeleted: false,
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const removePrice = {
  cementFloorPrice: 15000,
  tilesPrice: [
    {
      tile_id: "123456",
      tileName: "Elite X II",
      deliveryPrice: 1900,
      tilePrice: 12000,
      isDeleted: true,
    },
  ],
};
