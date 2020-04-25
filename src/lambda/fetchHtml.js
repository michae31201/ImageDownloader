import fetch from "node-fetch";

exports.handler = async function fetchHtml(event) {
  const { site } = event.queryStringParameters;
  let web;
  try {
    const result = await fetch(site);
    web = await result.text();
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: web,
  };
};
