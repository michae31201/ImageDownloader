async function fetchUrl(url){
  console.log(`preper to fetch ${url} `);
  try{
    const crosUrl = 'https://cors-anywhere.herokuapp.com/';
    let request = await fetch(`${crosUrl}${url}`);
    let text = await request.text();
    //console.log(text)
    return text;
  }catch(err){
    console.error("Fail to Fetch or response",err)
  }
}

export default fetchUrl;

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