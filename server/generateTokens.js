
import twilio from "twilio";
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = (config, identity) => {
  const token = new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret,
    {identity: identity}
  );

  const videoGrant = new VideoGrant();
  token.addGrant(videoGrant);

  return token;
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }

  const token = generateToken(config, identity);
  token.addGrant(videoGrant);
  token.identity = identity;

  return token;
};

export default videoToken;
