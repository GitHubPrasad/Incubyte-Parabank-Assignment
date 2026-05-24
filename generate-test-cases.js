const ExcelJS = require("exceljs");

async function generateTestCases() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Test Cases");

  // Define columns
  sheet.columns = [
    { header: "Test Case ID", key: "id", width: 15 },
    { header: "Test Scenario", key: "scenario", width: 35 },
    { header: "Test Steps", key: "steps", width: 50 },
    { header: "Test Data", key: "data", width: 35 },
    { header: "Expected Result", key: "expected", width: 40 },
    { header: "Actual Result", key: "actual", width: 40 },
    { header: "Status", key: "status", width: 12 },
  ];

  // Style the header row
  sheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1F4E79" },
    };
    cell.font = { color: { argb: "FFFFFFFF" }, bold: true, size: 12 };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
  sheet.getRow(1).height = 30;

  // Test cases data
  const testCases = [
    {
      id: "TC01",
      scenario: "Successful User Registration",
      steps:
        "1. Navigate to ParaBank home page\n2. Click Register link\n3. Fill all registration fields\n4. Click Register button\n5. Verify success message",
      data: "First Name: Prasad\nLast Name: Patil\nUsername: prasad_<timestamp>\nPassword: Test@1234\nSSN: 123456789",
      expected:
        "User is registered successfully and success message is displayed",
      actual: "User registered successfully - heading displayed",
      status: "PASS",
    },
    {
      id: "TC02",
      scenario: "Successful Login with Registered Credentials",
      steps:
        "1. Navigate to ParaBank home page\n2. Enter registered username\n3. Enter password\n4. Click Log In button\n5. Verify redirect to overview page",
      data: "Username: prasad_<timestamp>\nPassword: Test@1234",
      expected: "User is logged in and redirected to account overview page",
      actual: "User logged in - URL contains overview.htm",
      status: "PASS",
    },
    {
      id: "TC03",
      scenario: "Account Balance Display and Logging After Login",
      steps:
        "1. Navigate to ParaBank home page\n2. Login with valid credentials\n3. Wait for overview page\n4. Read account balance from table\n5. Log balance to console",
      data: "Username: prasad_<timestamp>\nPassword: Test@1234",
      expected: "Account balance is displayed on page and printed to console",
      actual: "Balance: $515.50 logged to console successfully",
      status: "PASS",
    },
    {
      id: "TC04",
      scenario: "Registration Form Validation - Negative Test",
      steps:
        "1. Navigate to ParaBank home page\n2. Click Register link\n3. Leave all fields empty\n4. Click Register button\n5. Verify validation errors",
      data: "All fields: empty",
      expected: "Validation error messages displayed for required fields",
      actual: "Not Automated - Manual Test",
      status: "N/A",
    },
    {
      id: "TC05",
      scenario: "Login with Invalid Credentials - Negative Test",
      steps:
        "1. Navigate to ParaBank home page\n2. Enter invalid username\n3. Enter invalid password\n4. Click Log In button\n5. Verify error message",
      data: "Username: invalid_user\nPassword: wrongpass",
      expected: "Error message displayed - login failed",
      actual: "Not Automated - Manual Test",
      status: "N/A",
    },
  ];

  // Add test case rows
  testCases.forEach((tc, index) => {
    const row = sheet.addRow(tc);
    row.height = 80;

    row.eachCell((cell) => {
      cell.alignment = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      // Alternate row colors
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: index % 2 === 0 ? "FFD6E4F0" : "FFFFFFFF" },
      };
    });

    // Color the status cell
    const statusCell = row.getCell("status");
    statusCell.font = { bold: true };
    if (tc.status === "PASS") {
      statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF92D050" },
      };
    } else if (tc.status === "FAIL") {
      statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF0000" },
      };
    } else {
      statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFC000" },
      };
    }
  });

  // Save the file
  await workbook.xlsx.writeFile("test-cases/TestCases.xlsx");
  console.log(
    "✅ TestCases.xlsx generated successfully in test-cases/ folder!",
  );
}

generateTestCases().catch(console.error);
