module.exports = {
  async up(db) {
    await db.collection("teammembers").insertMany([
      {
        name: "Eason Li",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/H_GECIUL0K7eKA8zqG6Sweason-li.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/eason-li-dev/",
        githubUrl: "https://github.com/GitHubEason",
        emailAddress: "easonli0216@gmail.com",
        priority: 4,
      },
      {
        name: "Beryl Zhou",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/z1OkyVohuZ2shaiYC-8noberyl-zhou.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/biyu-zhou-beryl/",
        githubUrl: "https://github.com/Beryl-Zhou",
        emailAddress: "beryl.zhou815@gmail.com",
        priority: 3,
      },
      {
        name: "Jenna Wan",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/SBSIQhT9mQYSvnw5cK-7xjenna-wan.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/jenna-wan/",
        githubUrl: "https://github.com/jennawan",
        emailAddress: "jennawan.au@gmail.com",
        priority: 3,
      },
      {
        name: "Emily Gong",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/_lqgauGbnAqR26hZPHjjFemily-gong.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/emily-gong-dev/",
        githubUrl: "https://github.com/EmilyGong111",
        emailAddress: "emily.gong.dev@gmail.com",
      },
      {
        name: "Steven Liu",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/gWE6nboIT4HZztoT6O0Xlsteven-liu.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/steven-liu-dev/",
        githubUrl: "https://github.com/stevenliu986",
        emailAddress: "stevenliu986@gmail.com",
      },
      {
        name: "Korn Zhou",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/_3HLoZv8TJ2nHGwbaafMYkorn-zhou.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/korn-zhou/",
        githubUrl: "https://github.com/Kornzk",
        emailAddress: "zk930602@gmail.com",
      },
      {
        name: "Arina Ke",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/pOdmzyfaKVy2et23kTlY0arina-ke.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/arina-ke/",
        githubUrl: "https://github.com/stkwn",
        emailAddress: "arina.ke@gmail.com",
      },
      {
        name: "John Jiao",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/x6Q1mcZI3LxeiuU6ZjU0Vjohn-jiao.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/johnjiao/",
        githubUrl: "https://github.com/Jzeva",
        emailAddress: "jzeva1213@gmail.com",
      },
      {
        name: "Jin Tai",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/-Rxg3-fpKSxrJMv3UmmqXjin-tai.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/jin-tai/",
        githubUrl: "https://github.com/Fuchih",
        emailAddress: "t19887348@hotmail.com",
      },
      {
        name: "Bowen Li",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/AelsjjIljqoQn3DG85-aYbowen-li.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/bowen-bowenli/",
        githubUrl: "https://github.com/BowenLi61",
        emailAddress: "bowenlixxx61@gmail.com",
      },
      {
        name: "Olivia Xu",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/ACXkEHTwNqkNgPHxeE1AWolivia-xu.jpg",
        role: "Developer",
        linkedInUrl: "https://www.linkedin.com/in/olivia-xu-devops",
        emailAddress: "oliviaxu.devops@gmail.com",
      },
      {
        name: "Kiki Pang",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/Tvpbe-dgXEka4GIMq-NRSkiki-pang.jpg",
        role: "DevOps",
        linkedInUrl: "https://www.linkedin.com/in/qiqi-pang/",
        githubUrl: "https://github.com/ki-ki-316",
        emailAddress: "wwwkiki0316@gmail.com",
        priority: 4,
      },
      {
        name: "Sunny Lin",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/NY6xSmkePgEYF7Mxg4UBgsunny-lin.jpg",
        role: "DevOps",
        linkedInUrl: "https://www.linkedin.com/in/sunny-lin-devops/",
        githubUrl: "https://github.com/SunnyLLL",
        emailAddress: "sunnylinql@gmail.com",
        priority: 1,
      },
      {
        name: "Kylie Wang",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/b1NtY1Lr9pa9XxuSty17nkylie-wang.jpg",
        role: "DevOps",
        linkedInUrl: "https://www.linkedin.com/in/qianyu-wang-2020/",
        emailAddress: "qianyuwang@outlook.com",
        priority: 1,
      },
      {
        name: "Sunny Yang",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/1Kuhh6RpLdP_Yxt5zSgWrsunny-yang.jpg",
        role: "DevOps",
        linkedInUrl: "https://www.linkedin.com/in/sunnyyangyyc/",
        githubUrl: "https://github.com/sunnyyangyyc",
        emailAddress: "6sunnywork@gmail.com",
        priority: 1,
      },
      {
        name: "Timmy Lin",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/Kj7tQqTeWmOxS8aUzFwiMtimmy-lin.jpg",
        role: "DevOps",
        linkedInUrl: "https://www.linkedin.com/in/timmy-lin/",
        githubUrl: "https://github.com/timmyBeef",
        emailAddress: "tim.lin028@gmail.com",
        priority: 1,
      },
      {
        name: "Eden Wang",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/ldqfdzJaWZsnxDpjWaLKzeden-wang.jpg",
        role: "DevOps",
        linkedInUrl: "https://www.linkedin.com/in/eden-wang-86981b241/",
        emailAddress: "Edenwang0080@gmail.com",
        priority: 1,
      },
      {
        name: "Heath Chen",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/89u6O6mZ5nIDpQCbgK9ydheath-chen.jpg",
        role: "BA",
        linkedInUrl: "https://www.linkedin.com/in/heath-chen-7611a0150/",
        emailAddress: "joechen95315@gmail.com",
      },
      {
        name: "Jie Wei",
        profileImgUrl:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/team-page-image/7t0YLc4rw_xXTlfdFsBZzjie-wei.jpg",
        role: "UI",
        linkedInUrl: "https://www.linkedin.com/in/jie-wei-987b841aa/",
      },
    ]);
  },
};
