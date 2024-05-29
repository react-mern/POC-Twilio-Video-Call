import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import videoToken from './generateTokens.js';
import process from "process";
import 'dotenv/config';

const app = express();

const PORT = 3001;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Twilio configuration
const config = {
  twilio: {
    accountSid: process.env.ACCOUNT_SID,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  },
};

// Function to send token response
const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};

// Route to generate token for GET request
app.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

// Route to generate token for POST request
app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.listen(PORT, () =>
  console.log(`Express server is running on localhost:${PORT}`)
);
