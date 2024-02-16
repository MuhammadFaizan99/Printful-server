// callback.js
const axios = require('axios');
const qs = require('qs');
const {GhlToken} = require('../model/ghlSchema'); 

async function callback(req, res) {
  try {
    const data = qs.stringify({
      'client_id': process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET,
      'grant_type': 'authorization_code',
      'code': req.query.code,
      'user_type': 'Location',
      'redirect_uri': 'http://localhost:3000/oauth/callback'
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://services.leadconnectorhq.com/oauth/token',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    const response = await axios.request(config).catch(err => {});

    // Save the tokens and other information to the MongoDB database
    const { access_token, refresh_token, companyId, locationId, userId } = response.data;

    const ghlToken = new GhlToken({
      access_token,
      refresh_token,
      companyId,
      locationId,
      userId
    });

    await ghlToken.save();

    return res.json({ data: response?.data });
  } catch (error) {
    console.error('Error handling GHL callback:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = callback;