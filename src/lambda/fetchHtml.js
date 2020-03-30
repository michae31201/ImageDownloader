import fetch from 'node-fetch';

exports.handler = async function(event, context, callback) {
    const site = event.queryStringParameters.site;
    let web;
    try {
      const result = await fetch(site)
      web = await result.text()
    } catch (error) {
      console.log('error', error)
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message
        })
      }
    }
  
    callback(null,{
        statusCode:200,
        body:web
    })
  };