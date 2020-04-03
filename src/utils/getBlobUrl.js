async function getBlobUrl(urls){
  //const crosUrl = 'https://cors-anywhere.herokuapp.com/';
  //let requests = urls.map((url)=> fetch(`${crosUrl}${url}`));
 // let requests = getFetchArray(urls)
  let responses = await getFetchResponses(urls);
  let results = await Promise.all(responses.map((response) => (response.blob())));
  //使用 URL.createObjectURL 將 blob 轉為同源的圖片網址
  let files = results.map((result) => {
    const blobUrl = window.URL.createObjectURL(result);
    return blobUrl;
  })
  return files;
} 

async function getFetchResponses(urls){
  let result = [];
  while(urls.length){
    let tmp = urls.splice(0,10);
    let fetchArray = tmp.map(url => fetch(`/.netlify/functions/fetchImage?site=${url}`));
    result = result.concat(await Promise.all(fetchArray));
  }
  return result;
}

export default getBlobUrl;