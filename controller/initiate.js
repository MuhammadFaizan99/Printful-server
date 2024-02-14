require('dotenv').config()

async function initiateAuth(req, res) {
  const options = {
     requestType: "code",
    redirectUri: "http://localhost:3000/oauth/callback",
    clientId: process.env.CLIENT_ID,
    scopes: ["businesses.readonly","businesses.write"],
  };

  return res.redirect(
    `https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=${
      options.requestType
    }&redirect_uri=${options.redirectUri}&client_id=${
      options.clientId
    }&scope=${options.scopes.join(' ')}`
  );
}
module.exports = initiateAuth;
