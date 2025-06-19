const axios = require("axios");

async function sendSMS(toNumber, otp) {
  const payload = {
    route: "q", // promotional route
    message: `Your Fresh Flesh OTP is ${otp}`,
    language: "english",
    flash: 0,
    numbers: toNumber,
  };

  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      payload,
      {
        headers: {
          authorization: "dSiTA2x59kPYEvO70z1btIgcpyhMlXDBNj6U3oawHRq4VLeQfsGKgeRpI9ctDbV3B8rwNzOlPhqCMm1Q",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("❌ SMS send error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = sendSMS;
