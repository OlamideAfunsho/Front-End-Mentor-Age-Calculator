document
  .getElementById("calculate-button")
  .addEventListener("click", validateAndCalculate);

const currentYear = new Date().getFullYear();

// Add event listeners to hide the error message when the user starts typing
document.getElementById("day").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    hideError("day");
  }
});
document.getElementById("month").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    hideError("month");
  }
});
document.getElementById("year").addEventListener("input", function () {
  if (this.value.trim() !== "") {
    hideError("year");
  }
});

function validateAndCalculate() {
  const day = document.getElementById("day").value.trim();
  const month = document.getElementById("month").value.trim();
  const year = document.getElementById("year").value.trim();

  let isValid = true;

  // Validate the day field
  if (day === "") {
    showError("day", "This field is required");
    isValid = false;
  } else if (!/^\d+$/.test(day)) {
    showError("day", "Only number entries are allowed!");
    isValid = false;
  }

  // Validate the month field
  if (month === "") {
    showError("month", "This field is required");
    isValid = false;
  } else if (!/^\d+$/.test(month)) {
    showError("month", "Only number entries are allowed!");
    isValid = false;
  } else if (month < 1 || month > 12) {
    showError("month", "Must be a valid month");
    isValid = false;
  }

  // Validate the year field
  if (year === "") {
    showError("year", "This field is required");
    isValid = false;
  } else if (!/^\d+$/.test(year)) {
    showError("year", "Only number entries are allowed!");
    isValid = false;
  } else if (parseInt(year) > currentYear) {
    showError("year", "Date must be in the past");
    isValid = false;
  }

  // Check if all inputs are valid dates
  if (isValid && !isValidDate(day, month, year)) {
    if (day !== "" && !isValidDay(day, month, year)) {
      showError("day", "Must be a valid day");
      isValid = false;
    }
    // No need to show error for the month here as it's already validated above
    if (year !== "" && parseInt(year) <= currentYear && !isValidYear(year)) {
      showError("year", "Must be a valid year");
      isValid = false;
    }
  }

  if (isValid) {
    calculateAge(day, month, year);
  } else {
    resetAgeResult();
  }
}

function isValidDate(day, month, year) {
  const date = new Date(`${year}-${month}-${day}`);
  return (
    date.getDate() == day &&
    date.getMonth() + 1 == month &&
    date.getFullYear() == year
  );
}

function isValidDay(day, month, year) {
  const date = new Date(`${year}-${month}-01`);
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  return day >= 1 && day <= daysInMonth;
}

function showError(field, message) {
  const inputContainer = document.getElementById(field).parentElement;
  inputContainer.classList.add("input-error");
  inputContainer.querySelector(".error-message").textContent = message;
}

function hideError(field) {
  const inputContainer = document.getElementById(field).parentElement;
  inputContainer.classList.remove("input-error");
  inputContainer.querySelector(".error-message").textContent = "";
}

function calculateAge(day, month, year) {
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageDays = currentDate.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  document.getElementById("years").textContent = ageYears;
  document.getElementById("months").textContent = ageMonths;
  document.getElementById("days").textContent = ageDays;
}

function resetAgeResult() {
  document.getElementById("years").textContent = "--";
  document.getElementById("months").textContent = "--";
  document.getElementById("days").textContent = "--";
}
