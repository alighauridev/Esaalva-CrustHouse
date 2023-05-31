const axios = require("axios");
require("dotenv").config();

const { EASYPAISA_CREDENTIALS, TOKEN_URL, EASYPAISA_API_URL } = process.env;

async function getAccessToken() {
    try {
        const response = await axios.post(
            TOKEN_URL,
            {},
            {
                headers: {
                    Credentials: EASYPAISA_CREDENTIALS,
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error.message);
        return null;
    }
}

async function initiateTransaction(signature, request) {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        console.error("Error: No access token found");
        return null;
    }

    try {
        const response = await axios.post(
            EASYPAISA_API_URL,
            { signature, request },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Credentials: EASYPAISA_CREDENTIALS,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error initiating transaction:", error.message);
        return null;
    }
}

module.exports = { initiateTransaction };
