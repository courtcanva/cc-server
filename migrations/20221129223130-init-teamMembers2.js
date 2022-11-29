module.exports = {
  async up(db) {
    await db.collection("teammembers").insertMany([
      {
        name: "Cecilia Lei",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/1JucBbnVMxEZRHIp3Hh81WechatIMG94.jpeg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/cecilia-lei-developer/",
        githubUrl: "https://github.com/Cecilia0109",
        emailAddress: "qinger.lei0109@gmail.com",
        priority: 4,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Zack Chen",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/aL4MRY4EyBvn5teJ5BmlOzack.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/zhihan-chen-zack",
        githubUrl: "https://github.com/ZhihanChenZack",
        emailAddress: "zackchen5813@gmail.com",
        priority: 3,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shawn Shi",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/QwY0UmjpyGvUImKBic279ShawnShi.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/xuan-shi71/",
        githubUrl: "https://github.com/Double-Twelve",
        emailAddress: "shawnshi71@gmail.com",
        priority: 2,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Taylor Shen",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/pcafiAeMm1IzvA41imYlMtaylor.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/tianyi-shen-taylor/",
        githubUrl: "https://github.com/STY1997",
        emailAddress: "tianyishen97@foxmail.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Evelyn Zeng",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/d7686jLxHu0gmecnNq38nevelynzeng.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/evelyn-zeng/",
        githubUrl: "https://github.com/Evezzm",
        emailAddress: "evelyn.zm.zeng@gmail.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tim Tang",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/3qMcV_CyS4A4B3rsj18-6tim.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/zhuocun-tang/",
        githubUrl: "https://github.com/zhuocun",
        emailAddress: "zhuocun.tang@outlook.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pengcheng Yu",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/_ajPV3Vl9ox32E9D4xT_npeng.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/pengcheng-yu/",
        githubUrl: "https://github.com/PengchengYuGithub",
        emailAddress: "ypc624@outlook.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jason Cao",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/QQtLhbxGg6TCgBn9JDCbVjson.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/guanlin-cao/",
        githubUrl: "https://github.com/GLC-coder",
        emailAddress: "jason2019au@gmail.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shawn Wang",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/sYabvUm1hsP_oZAgUFyyJshawnWang.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/shuzheng-wang",
        githubUrl: "https://github.com/ShawnWang86b",
        emailAddress: "shawn.wang86b@gmail.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lee Li",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/eh0KkWP0kCKIew3bZho7Zlee.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/xunli-308715206",
        githubUrl: "https://github.com/xunli253",
        emailAddress: "xunli253@gmail.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wang Seven",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/ttQut92F4mV7oj-YaK2Axseven.jpg",
        role: "Developer",
        linkedInUrl: "http://www.linkedin.com/in/longcan-wang",
        githubUrl: "https://github.com/wwwseven",
        emailAddress: "longcan7w@gmail.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Derek Zhu",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/THyZXHbKAzeyruCL-tkcADerek.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/zhu-derek/",
        githubUrl: "https://github.com/RedRe4per",
        emailAddress: "s3582474@gmail.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jason Liu",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/qh4gqtE_Bdu-nTwwrZ5xnjsonLiu.jpg",
        role: "Business Analyst",
        linkedInUrl: "https://www.linkedin.com/in/jason-liu-267054196/",
        emailAddress: "zexinliu6@gmail.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kissinger Hu",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/J13OpliS-2TK8XSKeQtsxweina.jpg",
        role: "UI/UX Designer",
        linkedInUrl: "https://www.linkedin.com/in/weinahu",
        emailAddress: "huweina98@gmail.com",
        priority: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
