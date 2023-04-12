
export function generate_head(company_name:string){
  return "<html><body><p style='text-align:center;font-size:24px;'>"+ company_name+"章程修正案</p ><p style='font-size:16px;'>"
}
export function add_title(title: string) {
  return "<html><body><p style='text-align:center;font-size:24px;'>" +
    title +
    "</p ><p style='font-size:16px;'>";
}
export function add_underLine(content:string){
  return "<span style='text-decoration:underline;'>"+content+"</span>"
}
export function add_p(content:string){
  return "<p>"+content+"</p>"
}
export function add_qianzi(content:string){
 return "<p>.</p><p>.</p><div style='text-align:left;font-size:16px;'><span style='margin-right:100px'>"+content+"(签字、盖章):________</span>";
}
export function add_date(){
  return "<p style='text-align:right;font-size:16px;'><span style='margin-right:20px'>________年________月________日</span></p></body></html>";
  }

export function formatDate(date_string: string) {
  const date = new Date(date_string)
  const year = date.getFullYear(); // 获取年份，例如 2023
  const month = date.getMonth() + 1; // 获取月份，注意月份从 0 开始，需要加 1，例如 4
  const day = date.getDate(); // 获取日期，例如 11

  // 将年月日拼接成字符串形式
  const formatDate = `${year}年${month}月${day}日`;
  console.log(formatDate)
  return formatDate;
}
export function generate_firstLine_description(company_category:string){
  switch (company_category){
    case '一人有限公司':
      return "<p style='font-size:16px;'>根据《公司法》及股东决定，对章程修改如下：</p ><p style='font-size:16px;'>"
    case '股份有限公司':
      return "<p style='font-size:16px;'>根据《公司法》及股东会决议，对章程修改如下：</p ><p style='font-size:16px;'>"
    default:
      return '公司性质参数错误，请修改：'
  }

}

export function generate_download_link(content:string,filename:string){
  const blob = new Blob([content], {type: "application/msword"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename + ".doc";

  // 添加链接到页面中并触发下载
  document.body.appendChild(link);
  link.click();

  // 释放URL对象
  URL.revokeObjectURL(link.href);
}

export function generate_tiaokuan(tiaokuan:string,origin_content:string,modify_content:string){
  switch (tiaokuan){
    case '经营范围':
      return "章程第二章第三条"+"原为："+"<span style='text-decoration:underline;'>"+origin_content+"</span>"+"</p><p style='font-size:16px;text-indent:2em;'>现将该条修改为："+"<span style='text-decoration:underline;'>"+modify_content+"</span></p>"+"<p style='font-size:16px;'>"
    case  '住所':
      return "章程第一章第二条"+"原为："+"<span style='text-decoration:underline;'>公司住所："+origin_content+"</span>"+"</p><p style='font-size:16px;text-indent:2em;'>现将该条修改为："+"<span style='text-decoration:underline;'>公司住所："+modify_content+"</span></p>"+"<p style='font-size:16px;'>"
    default:
      return '经营范围输入有误，请修改'
  }
}