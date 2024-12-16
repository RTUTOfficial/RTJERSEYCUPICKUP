const SPREADSHEET_ID =  url('https://docs.google.com/spreadsheets/d/1u0gyl_DIz9ygj6wgyBE609QHNQwFIh7pu4WK81s1pKc/edit?gid=0#gid=0'); // ใส่ ID ของ Google Sheets
const SHEET_NAME = 'Order'; // ชื่อชีทใน Google Sheets

// ฟังก์ชัน Web App ที่แสดง HTML หน้าเว็บ
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

// ฟังก์ชันค้นหาข้อมูลใน Google Sheets
function searchData(query) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i].join(' ').includes(query)) {  // ค้นหาข้อความในทุกคอลัมน์
      return { row: i + 1, name: data[i][1], phone: data[i][0], product: data[i][2] };
    }
  }
  return { error: "ไม่พบข้อมูลที่ตรงกับคำค้นหา" };
}

// ฟังก์ชันบันทึกวันที่นัดรับและสถานที่
function savePickupDetails(row, date, location) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  sheet.getRange(Number(row), 4).setValue(date);    // บันทึกวันที่นัดรับในคอลัมน์ที่ 4
  sheet.getRange(Number(row), 5).setValue(location); // บันทึกสถานที่นัดรับในคอลัมน์ที่ 5
  return { success: true, message: "บันทึกวันที่และสถานที่สำเร็จ" };
}
