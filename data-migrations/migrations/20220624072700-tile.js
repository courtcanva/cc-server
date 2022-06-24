module.exports = {
  async up(db, client) {
    await db.collection("tiles").updateOne(
      { name: "Elite X II" },
      {
        $set: {
          colors: {
            "Light green": "#305236",
            "Forest green": "#314B33",
            "Dark Green": "#43554A",
            Beige: "#5C5046",
            Brown: "#332828",
            Red: "#633132",
            Sandstone: "#B49F7A",
            Maroon: "#411A20",
            "Tournament Purple": "#1A1F51",
            Gray: "#5B5D61",
            Blue: "#162F4E",
            "Light Blue": "#2B5178",
            "Dove Grey": "#8E9196",
            "Ice Blue": "#80C4E5",
            Yellow: "#F1CB87",
            Orang: "#C66B54",
            "Bright Red": "#AA3A34",
            Black: "#000000",
          },
          length: 300,
          width: 300,
          height: 15,
        },
      },
    );
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db;
    await db.collection("tiles").updateOne(
      { name: "Elite X II" },
      {
        $set: {
          colors: {
            "Light green": "#305236",
            "Forest green": "#314B33",
            "Dark Green": "#43554A",
            Beige: "#5C5046",
            Brown: "#332828",
            Red: "#633132",
            Sandstone: "#B49F7A",
            Maroon: "#411A20",
            "Tournament Purple": "#1A1F51",
            Gray: "#5B5D61",
            Blue: "#162F4E",
            "Light Blue": "#2B5178",
            "Dove Grey": "#8E9196",
            "Ice Blue": "#80C4E5",
            Yellow: "#F1CB87",
            Orang: "#C66B54",
            "Bright Red": "#AA3A34",
            Black: "#000000",
          },
          length: 300,
          width: 300,
          height: 15,
        },
      },
    );
  },
};
