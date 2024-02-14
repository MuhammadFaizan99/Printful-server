// callback.js

const axios = require('axios');
const qs = require('qs');
const { dbConnect } = require('../connection'); // Adjust the path as needed

async function callback(req, res) {
  try {
    

    const connection = dbConnect(); // Create a MySQL connection

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

    // Save the tokens and other information to the MySQL database
    const { access_token, refresh_token, companyId, locationId, userId } = response.data;

    const insertQuery = `
      INSERT INTO tokens (access_token, refresh_token, companyId, locationId, userId)
      VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(insertQuery, [
      access_token,
      refresh_token,
      companyId,
      locationId,
      userId,
    ], function (error, results, fields) {
      if (error) {
        console.error('Error inserting data into the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      connection.end(); // Close the connection

      return res.json({ data: response?.data });
    });
  } catch (error) {
    console.error('Error handling GHL callback:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = callback;