async function parseResToDom(responseTxt,tag,attr,imgtype){
    console.log(`Prepar to parse the response`);
    console.log(`Search target <${tag} ${attr}= ' * .${imgtype}' >`);
    try{    
      let parser = new DOMParser();
      let htmlDoc = await parser.parseFromString(responseTxt,'text/html');
      let section = await htmlDoc.body.querySelectorAll(`${CSS.escape(tag)}[${CSS.escape(attr)}$=${CSS.escape(imgtype)}]`);
      console.log(`Found ${section.length} nodes`);
      let result = Array.from(section).map((elem) => (elem.getAttribute(`${attr}`)));
      
      return result;
    }catch(err){
      console.err('Error in parse Dom',err)
    }
}

export default parseResToDom;
