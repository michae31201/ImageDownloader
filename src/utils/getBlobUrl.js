async function getFetchResponses(urls) {
  let result = [];
  while (urls.length) {
    const tmp = urls.splice(0, 10);
    const fetchArray = tmp.map((url) => fetch(`/.netlify/functions/fetchImage?site=${url}`));
    result = result.concat(await Promise.all(fetchArray));
  }
  return result;
}

async function getBlobUrl(urls) {
  // const crosUrl = 'https://cors-anywhere.herokuapp.com/';
  // let requests = urls.map((url)=> fetch(`${crosUrl}${url}`));
  // let requests = getFetchArray(urls)
  const responses = await getFetchResponses(urls);
  const results = await Promise.all(responses.map((response) => response.blob()));
  // 使用 URL.createObjectURL 將 blob 轉為同源的圖片網址
  const files = results.map((result) => {
    const blobUrl = window.URL.createObjectURL(result);
    return blobUrl;
  });
  return files;
}

export default getBlobUrl;
