async function getImageUrls(htmlTxt, tag, attr, type) {
  console.log(`Prepare to parse the response`);
  console.log(`Search target <${tag} ${attr}= ' * .${type}' >`);
  let result;
  try {
    const parser = new DOMParser();
    // 將html txt 轉換為 DOM格式
    const htmlDoc = await parser.parseFromString(htmlTxt, "text/html");
    // 查詢目標節點
    const searchCondition = type
      .split(",")
      .map((typeName) => {
        return `${CSS.escape(tag)}[${CSS.escape(attr)}$=${CSS.escape(typeName.toLowerCase())}],
                ${CSS.escape(tag)}[${CSS.escape(attr)}$=${CSS.escape(typeName.toUpperCase())}]`;
      })
      .join(",");
    const section = await htmlDoc.body.querySelectorAll(searchCondition);
    console.log(`Found ${section.length} nodes`);
    // 擷取圖片網址
    result = Array.from(section).map((elem) => elem.getAttribute(`${attr}`));
  } catch (err) {
    console.err("Error in parse Dom", err);
  }
  return result;
}

export default getImageUrls;
