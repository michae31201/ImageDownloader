async function getBlobUrl(urls){
  //const crosUrl = 'https://cors-anywhere.herokuapp.com/';
  //let requests = urls.map((url)=> fetch(`${crosUrl}${url}`));
  let requests = getFetchArray(urls)
  let responses = await getResponseArray(requests);
  let parseBlob = responses.map((response) => (response.blob()));
  let results = await Promise.all(parseBlob);
  //使用 URL.createObjectURL 將 blob 轉為同源的圖片網址
  let files = results.map((result) => {
    const blobUrl = window.URL.createObjectURL(result);
    return blobUrl;
  })
  return files;
} 

function getFetchArray(urls){
  let result = [];
  while(urls.length){
    let tmp = urls.splice(0,10);
    result.push(tmp.map((url)=> fetch(`/.netlify/functions/fetchImage?site=${url}`)));
  }
  return result;
}
async function getResponseArray(requests){
  let result = [];
  for(let req of requests){
    result = result.concat(await Promise.all(req));
  }
  return result;


}

export default getBlobUrl;