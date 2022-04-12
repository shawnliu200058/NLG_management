import * as XLSX from 'xlsx'
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'
export class ExcelService {
  constructor() {}
  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}-${new Date().getTime()}.xlsx`
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json)
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    }
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName))
  }
}

// export function exportExcelFile(
//   array: any[],
//   sheetName = '表1',
//   fileName = 'example.xlsx'
// ) {
//   const jsonWorkSheet = XLSX.utils.json_to_sheet(array)
//   const workBook: any = {
//     SheetNames: [sheetName],
//     Sheets: {
//       [sheetName]: jsonWorkSheet
//     }
//   }
//   return XLSX.writeFile(workBook, fileName)
// }

// function getLength(obj: any) {
//   let count: number = 0
//   for (const i in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, i)) {
//       count += 1
//     }
//   }

//   return count
// }

// export function exportExcel(json: any, name: string) {
//   /* convert state to workbook */
//   const data = []
//   const keyArray = []
//   // eslint-disable-next-line no-restricted-syntax
//   for (const key1 in json) {
//     if (Object.prototype.hasOwnProperty.call(json, key1)) {
//       const element = json[key1]
//       const rowDataArray = []
//       for (const key2 in element) {
//         if (Object.prototype.hasOwnProperty.call(element, key2)) {
//           const element2 = element[key2]
//           rowDataArray.push(element2)
//           if (keyArray.length < getLength(element)) {
//             keyArray.push(key2)
//           }
//         }
//       }
//       data.push(rowDataArray)
//     }
//   }
//   data.splice(0, 0, keyArray)
//   const ws = XLSX.utils.aoa_to_sheet(data)
//   const wb = XLSX.utils.book_new()
//   XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
//   /* generate file and send to client */
//   XLSX.writeFile(wb, `${name}.xlsx`)
// }
