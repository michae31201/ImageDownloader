async function getTargetHTML(url) {
  console.log(`Prepare to get ${url} `);
  let htmlText;
  try {
    // const crosUrl = 'https://cors-anywhere.herokuapp.com/';
    // let response = await fetch(`${crosUrl}${url}`);
    const response = await fetch(`/.netlify/functions/fetchHtml?site=${url}`);
    htmlText = await response.text();
    // console.log(text)
  } catch (err) {
    console.error("Fail to Fetch or response", err);
  }
  return htmlText;
}

export default getTargetHTML;

/*
async function fetchUrl(url,tag,attr,imgtype){
  console.log(`preper to fetch ${url} `);
  console.log(`setting is ${tag} ${attr} ${imgtype}`);
  try{
    const crosUrl = 'https://cors-anywhere.herokuapp.com/';
    let request = await fetch(`${crosUrl}${url}`);
    let text = await request.text(); 
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(text,'text/html');
    let section = htmlDoc.body.querySelectorAll(`${CSS.escape(tag)}[${CSS.escape(attr)}$=${CSS.escape(imgtype)}]`);
    console.log(`fetched ${section.length} nodes`);
    return Array.from(section).map((elem) => (elem.getAttribute(`${attr}`)));
  }catch(err){
    console.error("Fail to Fetch or response",err)
  }
}

export default fetchUrl;
*/
