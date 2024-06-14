import twilio from "twilio";
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

// Function to generate Twilio access token
const generateToken = (config, identity) => {
  if (!identity) {
    throw new Error('identity is required to be specified in options');
  }
  
  const token = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret,
    { identity: identity }
  );

  // Creating new video grant
  const videoGrant = new VideoGrant();
  // Adding video grant to the token
  token.addGrant(videoGrant);

  return token;
};

// Function to generate Twilio video token
const videoToken = (identity, room, config) => {
  if (!identity) {
    throw new Error('Identity is required for generating token');
  }
  
  let videoGrant;
  // Checking if room is provided
  if (room) {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }

  // Generating token with provided identity and config
  const token = generateToken(config, identity);
  // Adding video grant to the token
  token.addGrant(videoGrant);

  return token;
};

export default videoToken;
