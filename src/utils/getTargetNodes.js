async function getTargetNodes(htmlTxt,tag,attr,type){
    console.log(`Prepare to parse the response`);
    console.log(`Search target <${tag} ${attr}= ' * .${type}' >`);
    try{    
      let parser = new DOMParser();
      //將html txt 轉換為 DOM格式
      let htmlDoc = await parser.parseFromString(htmlTxt,'text/html');
      //查詢目標節點
      let section = await htmlDoc.body.querySelectorAll(`${CSS.escape(tag)}[${CSS.escape(attr)}$=${CSS.escape(type)}]`);
      console.log(`Found ${section.length} nodes`);
      //擷取圖片網址
      let result = Array.from(section)
                        .map((elem) => (elem.getAttribute(`${attr}`)));
      
      return result;
    }catch(err){
      console.err('Error in parse Dom',err)
    }
}

export default getTargetNodes;