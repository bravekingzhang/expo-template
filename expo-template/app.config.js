require('dotenv').config();

// 补充 app.json，增加一些动态配置
module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      githubClientId: process.env.GITHUB_CLIENT_ID,
      githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
      router: {
        origin: false
      },
      eas:{
        projectId: "076a0ce0-a539-4e2c-bab1-038b050f140d"
      }
    }
  };
};
