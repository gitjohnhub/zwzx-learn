
export function generate_head(company_name:string){
  return "<html><body><p style='text-align:center;font-size:24px;'>"+ company_name+"章程修正案</p ><p style='font-size:16px;'>"
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

export function generate_tiaokuan(tiaokuan:string,origin_content:string,modify_content:string){
  switch (tiaokuan){
    case '经营范围':
      return "<li>章程第二章第三条"+"原为："+"<span style='text-decoration:underline;'>"+origin_content+"</span>"+"</p><p style='font-size:16px;text-indent:2em;'>现将该条修改为："+"<span style='text-decoration:underline;'>"+modify_content+"</span></p>"+"<p style='font-size:16px;'></li>"
    case  '住所':
      return "<li>章程第一章第二条"+"原为："+"<span style='text-decoration:underline;'>公司住所："+origin_content+"</span>"+"</p><p style='font-size:16px;text-indent:2em;'>现将该条修改为："+"<span style='text-decoration:underline;'>公司住所："+modify_content+"</span></p>"+"<p style='font-size:16px;'></li>"
    default:
      return '经营范围输入有误，请修改'
  }
}