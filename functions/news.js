const fetch = require("node-fetch");
const API_ENDPOINT = "https://api.nytimes.com/svc/topstories/v2";
const API_KEY = process.env.API_KEY || "";

exports.handler = async (event, context) => {
    // get the section parameter from lambda endpoint
    // similiar to what we would get back from AWS API Gateway
    const section = event.queryStringParameters.section || "arts";
    try {
        const response = await fetch(`${API_ENDPOINT}/${section}.json?api-key=${API_KEY}`);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: "500 - Failed", error: e })
        }
    }
}