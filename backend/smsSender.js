// File: backend/smsSender.js
const axios = require("axios");

async function sendSMS(toNumber, message) {
  const payload = {
    sender_id: "FSTSMS",
    language: "english",
    route: "q", // 'q' or 'qt' depending on template type
    numbers: toNumber,
    message: message, // Use your approved message template ID
    variables_values: "CustomerName|OrderDetails", // only used if message is template with variables
  };

  try {
    const response = await axios.post("https://www.fast2sms.com/dev/bulkV2", payload, {
      headers: {
        Authorization: "dSiTA2x59kPYEvO70z1btIgcpyhMlXDBNj6U3oawHRq4VLeQfsGKgeRpI9ctDbV3B8rwNzOlPhqCMm1Q",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    console.error("❌ SMS send error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = sendSMS;
