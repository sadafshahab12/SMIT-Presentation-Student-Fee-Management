// Get the generate receipt button
const generateReceiptButton = document.querySelector(".generate-btn");
const downloadBtn = document.querySelector(".download-btn");
downloadBtn.style.display = "none";

let receiptId = localStorage.getItem("receiptId") || 1;
// Add an event listener to the generate receipt button
generateReceiptButton.addEventListener("click", () => {
  generateReceipt();
  // scrollToReceipt();
});

let studentReceipt = document.querySelector(".student-receipt");
studentReceipt.style.display = "none";
// Function to generate the receipt
function generateReceipt() {
  // Get the input fields
  const firstNameInput = document.querySelector(".f-name");
  const lastNameInput = document.querySelector(".l-name");
  const studentGrNoInput = document.querySelector(".gr-num");
  const studentClassSelect = document.querySelector(".stud-class");
  const feeAmountSelect = document.querySelector(".amount");
  const feeMonthCheckboxes = document.querySelectorAll(".month");
  const monthlyFeeCheckbox = document.getElementById("monthly-fee");
  const annualChargeCheckbox = document.getElementById("annual-charge");
  const labChargeCheckbox = document.getElementById("lab-charge");
  const examFeeCheckbox = document.getElementById("exam-fee");
  const feeFineInput = document.getElementById("feefine");
  const feeSubmissionDateInput = document.getElementById("feedate");

  // Get the receipt elements
  const studentIdElement = document.querySelector(".std-id");
  const studentGrNoElement = document.querySelector(".std-gr");
  const studentNameElement = document.querySelector(".std-name");
  const studentFatherNameElement = document.querySelector(".std-fname");
  const studentClassElement = document.querySelector(".std-class");
  const feeSubmissionDateElement = document.querySelector(".fee-submit-date");
  const feeMonthElement = document.querySelector(".fee-month");
  const monthlyFeeAmountElement = document.querySelector(".monthly-fee-amount");
  const annualFeeAmountElement = document.querySelector(".annual-fee-amount");
  const labFeeAmountElement = document.querySelector(".lab-fee-amount");
  const examFeeAmountElement = document.querySelector(".exam-fee-amount");
  const fineFeeAmountElement = document.querySelector(".fine-fee-amount");
  const totalAmountElement = document.querySelector(".total-amount");

  // Set the receipt data
  studentIdElement.textContent = receiptId;
  let ftitleCase = firstNameInput.value;
  let splittedF = ftitleCase.split(" ");
  let convertedFtitleCase = splittedF.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  let joinFtitleCase = convertedFtitleCase.join(" ");

  let ltitleCase = lastNameInput.value;
  let splittedL = ltitleCase.split(" ");
  let convertedLtitleCase = splittedL.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  let joinLtitleCase = convertedLtitleCase.join(" ");
  studentGrNoElement.textContent = studentGrNoInput.value;
  studentNameElement.textContent = `${joinFtitleCase} `;
  studentFatherNameElement.textContent = `${joinLtitleCase}`;
  // Hardcoded for demonstration purposes
  studentClassElement.textContent = studentClassSelect.value;
  feeSubmissionDateElement.textContent = feeSubmissionDateInput.value;
  const selectedMonths = Array.from(feeMonthCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  feeMonthElement.textContent = selectedMonths.join(", ");

  // Calculate monthly fee amount
  const monthlyFeeAmount = monthlyFeeCheckbox.checked
    ? parseInt(feeAmountSelect.value) * selectedMonths.length
    : 0;
  monthlyFeeAmountElement.textContent = monthlyFeeAmount.toString();
  annualFeeAmountElement.textContent = annualChargeCheckbox.checked
    ? parseInt(feeAmountSelect.value).toString()
    : 0;
  labFeeAmountElement.textContent = labChargeCheckbox.checked
    ? parseInt(feeAmountSelect.value).toString()
    : 0;
  examFeeAmountElement.textContent = examFeeCheckbox.checked
    ? parseInt(feeAmountSelect.value).toString()
    : 0;
  fineFeeAmountElement.textContent = feeFineInput.value;
  // Calculate total amount
  const totalAmount = [
    monthlyFeeAmount,
    parseInt(annualFeeAmountElement.textContent),
    parseInt(labFeeAmountElement.textContent),
    parseInt(examFeeAmountElement.textContent),
    parseInt(fineFeeAmountElement.textContent),
  ].reduce((a, b) => a + b, 0);
  totalAmountElement.textContent = totalAmount.toString();

  const receiptData = {
    id: receiptId,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    studentGrNo: studentGrNoInput.value,
    studentClass: studentClassSelect.value,
    feeAmount: feeAmountSelect.value,
    feeMonth: selectedMonths,
    monthlyFeeAmount: monthlyFeeAmount,
    annualFeeAmount: annualChargeCheckbox.checked
      ? parseInt(feeAmountSelect.value)
      : 0,
    labFeeAmount: labChargeCheckbox.checked
      ? parseInt(feeAmountSelect.value)
      : 0,
    examFeeAmount: examFeeCheckbox.checked
      ? parseInt(feeAmountSelect.value)
      : 0,
    fineFeeAmount: feeFineInput.value,
    totalAmount: totalAmount,
  };

  localStorage.setItem(`receipt-${receiptId}`, JSON.stringify(receiptData));
  receiptId++;
  localStorage.setItem("receiptId", receiptId);

  downloadBtn.style.display = "inline";
  studentReceipt.style.display = "block";
  let form = document.querySelector(".form");
  form.style.display = "none";
  let heading = document.querySelector(".student-fee-manage-head");
  heading.style.display = "none";
  let receiptLink = document.querySelectorAll(".receipt-links li")[1];
  receiptLink.classList.add("active");
  let receiptLink0 = document.querySelectorAll(".receipt-links li")[0];
  receiptLink0.classList.remove("active");
}

downloadBtn.addEventListener("click", downloadReceipt);

function downloadReceipt() {
  downloadBtn.style.display = "none";
  let dashboard = document.querySelector(".right-side");
  dashboard.style.display = "none";
  let heading = document.querySelector(".student-fee-manage-head");
  heading.style.display = "none";
  let form = document.querySelector(".form");
  form.style.display = "none";
  window.print();
  setTimeout(() => {
    dashboard.style.display = "block";
    downloadBtn.style.display = "inline";
  }, 1500);
}

let receiptLink0 = document.querySelectorAll(".receipt-links li")[0];

receiptLink0.addEventListener("click", () => {
  let heading = document.querySelector(".student-fee-manage-head");
  heading.style.display = "block";
  let form = document.querySelector(".form");
  form.style.display = "block";
  let studentReceipt = document.querySelector(".student-receipt");
  studentReceipt.style.display = "none";
  const downloadBtn = document.querySelector(".download-btn");
  downloadBtn.style.display = "none";
});
