async function getBlobUrl(urls){
  const crosUrl = 'https://cors-anywhere.herokuapp.com/';
  let requests = urls.map((url)=> fetch(`${crosUrl}${url}`));
  let responses = await Promise.all(requests);
  let parseBlob = responses.map((response) => (response.blob()));
  let results = await Promise.all(parseBlob);
  //使用 URL.createObjectURL 將 blob 轉為同源的圖片網址
  let files = results.map((result) => {
    const blobUrl = window.URL.createObjectURL(result);
    return blobUrl;
  })
  return files;
} 

export default getBlobUrl;