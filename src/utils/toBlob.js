async function toBlob(urls){
  const crosUrl = 'https://cors-anywhere.herokuapp.com/';
  let requests = urls.map((url)=> fetch(`${crosUrl}${url}`));
  let responses = await Promise.all(requests);
  responses = responses.map((response) => (response.blob()));
  let results = await Promise.all(responses);
  let files = results.map((result) => {
    const blobUrl = window.URL.createObjectURL(result);
    return blobUrl;
  })
  return files;
} 

export default toBlob;