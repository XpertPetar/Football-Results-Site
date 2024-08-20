import { apiUrl, apiKey } from "../../src/Global";

const axios = require("axios");

exports.handler = async (event, context) => {
    const endpoint = event.path.replace("/.netlify/functions/proxy/", ""); // Extracts the endpoint from the path
    try {
        const response = await axios.get(`${apiUrl}${endpoint}`, {
            headers: { "X-Auth-Token": apiKey }
        });
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow all origins
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: error.response ? error.response.status : 502,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: error.message
        };
    }
};
