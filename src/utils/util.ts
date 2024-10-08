import Excel from 'exceljs'
import Tesseract, { ImageLike,createWorker } from 'tesseract.js';
interface DataItem {
  month: number;
  count: number;
  jiezhen: string;
}
//图片识别文字

// 通过月份获得月尾和月头的日期
export function getMonthRange(monthSelect) {
  const firstDay = monthSelect.startOf('month').format('YYYY-MM-DD');
  const lastDay = monthSelect.endOf('month').format('YYYY-MM-DD');
  return [firstDay, lastDay];
}
export function handleTesseract(file: File,handleResult:(params:string)=>{}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      try {
        const worker = await createWorker('chi_sim');
        const result = await worker.recognize(e.target!.result as ImageLike).then((result) => {
          console.log('result.data.text==>',result.data.text)
          const dateArray = handleResult(result.data.text);
          resolve(dateArray);
        });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });

}
export function downloadLink(workbook,filename){
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
  });

}
//计算累计
export function calculateStatistics(data) {
  const monthlyTotals = Array(12).fill(0);
  const townTotals = {};

  for (const item of data) {
    const { jiezhen, value } = item;

    // 统计每个街镇每个月的数据
    if (!townTotals[jiezhen]) {
      townTotals[jiezhen] = Array(12).fill(0);
    }

    for (let i = 0; i < value.length; i++) {
      const monthlyValue = value[i];
      townTotals[jiezhen][i] += monthlyValue;
      monthlyTotals[i] += monthlyValue;
    }
  }

  return {
    monthlyTotals,
    townTotals,
  };
}

export function CalByMonthAndJiezhen(data: any) {
  const result: any = [];
  // 遍历原始数据，根据街镇进行分组
  const groupedData = data.reduce((acc: Record<string, DataItem[]>, item: DataItem) => {
    if (!acc[item.jiezhen]) {
      acc[item.jiezhen] = [];
    }
    acc[item.jiezhen].push(item);
    return acc;
  }, {});
  const nextHandleData = [];

  // 将分组后的数据转换为目标格式
  for (const jiezhen in groupedData) {
    let total = 0;

    const groupedItems = groupedData[jiezhen];
    const value: (number | string)[] = [];

    // 初始化 value 数组
    for (let i = 0; i <= 11; i++) {
      value.push(0);
    }

    // 填充对应月份的值
    for (const item of groupedItems) {
      value[item.month - 1] = item.count;
      total += item.count;
    }
    nextHandleData.push({
      jiezhen,
      value,
      total,
    });

    result.push({
      jiezhen,
      ...Object.fromEntries(months.map((month, index) => [month, value[index]])),
      total,
    });
  }
  const totalCal = calculateStatistics(nextHandleData);
  result.push({
    jiezhen: '合计',
    ...Object.fromEntries(months.map((month, index) => [month, totalCal.monthlyTotals[index]])),
    total: totalCal.monthlyTotals.reduce((pre, cur) => {
      return pre + cur;
    }, 0),
  });
  return result;
}


export function genWorkbook(headersWithWidth){
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1', {
    pageSetup: {
      orientation: 'landscape',
      showGridLines: true,
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 1,
      horizontalCentered: true,
      verticalCentered: true,
      paperSize: 9,
    },
  });
  worksheet.columns = headersWithWidth
  const headers = headersWithWidth.map((item) => item.header);

  return {
    workbook,
    headers,
    worksheet
  }

}
export function calculateEndDate(startDate: string, months: String): string {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + Number(months));
  endDate.setDate(0);
  return endDate.toISOString().slice(0,10);
}
export const colorList = [
  '#25b1bf',
  '#acc2ef',
  '#3D5A80',
  '#2E8B57',
  '#c21d03',
  '#fd5732',
  '#fd5732',
  '#fd5732',
];
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
