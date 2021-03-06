import fetch from "node-fetch";

exports.handler = async function fetchImage(event) {
  const { site } = event.queryStringParameters;
  let image;
  try {
    const result = await fetch(site);
    image = await result.buffer();
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
    headers: {
      "Content-type": "image/jpeg",
    },
    body: image.toString("base64"),
    isBase64Encoded: true,
  };
};
