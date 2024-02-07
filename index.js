
      function formatDate(date) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }

      function getAge(dateString) {
        var birthdate = new Date().getTime();
        if (
          typeof dateString === "undefined" ||
          dateString === null ||
          String(dateString) === "NaN"
        ) {
          birthdate = new Date().getTime();
        }
        birthdate = new Date(dateString).getTime();
        var now = new Date().getTime();

        var n = (now - birthdate) / 1000;
        if (n < 604800) {
          var day_n = Math.floor(n / 86400);
          if (
            typeof day_n === "undefined" ||
            day_n === null ||
            String(day_n) === "NaN"
          ) {
            return "";
          } else {
            return day_n + " day" + (day_n > 1 ? "s" : "") + " old";
          }
        } else if (n < 2629743) {
          var week_n = Math.floor(n / 604800);
          if (
            typeof week_n === "undefined" ||
            week_n === null ||
            String(week_n) === "NaN"
          ) {
            return "";
          } else {
            return week_n + " week" + (week_n > 1 ? "s" : "") + " old";
          }
        } else if (n < 31562417) {
          var month_n = Math.floor(n / 2629743);
          if (
            typeof month_n === "undefined" ||
            month_n === null ||
            String(month_n) === "NaN"
          ) {
            return "";
          } else {
            return month_n + " month" + (month_n > 1 ? "s" : "") + " old";
          }
        } else {
          var year_n = Math.floor(n / 31556926);
          if (
            typeof year_n === "undefined" ||
            year_n === null ||
            String(year_n) === "NaN"
          ) {
            return (year_n = "");
          } else {
            return year_n + " year" + (year_n > 1 ? "s" : "") + " old";
          }
        }
      }

      function getAgeVal(pid) {
        var birthdate = formatDate(
          document.getElementById("birthdate").value
        );
        var count = document.getElementById("birthdate").value.length;
        if (count == "10") {
          var age = getAge(birthdate);
          var str = age;
          var res = str.substring(0, 1);
          if (res == "-" || res == "0") {
            document.getElementById("birthdate").value = "";
            document.getElementById("txtage").value = "";
            $("#birthdate").focus();
            return false;
          } else {
            document.getElementById("txtage").value = age;
          }
        } else {
          document.getElementById("txtage").value = "";
          return false;
        }
      }
     
      function terms_changed(termsCheckBox) {
        if (termsCheckBox.checked) {
          document.getElementById("submit_button").disabled = false;
        } else {
          document.getElementById("submit_button").disabled = true;
        }
      }

      document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("form");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("cpassword");
        const submitButton = document.getElementById("submit_button");
      
        function checkPasswordMatch() {
          const passwordValue = passwordInput.value;
          const confirmPasswordValue = confirmPasswordInput.value;
      
          if (passwordValue !== confirmPasswordValue) {

            confirmPasswordInput.setCustomValidity("Passwords do not match");
          } else {
            confirmPasswordInput.setCustomValidity("");
          }
        }
      
        passwordInput.addEventListener("input", checkPasswordMatch);
        confirmPasswordInput.addEventListener("input", checkPasswordMatch);
      
        document.getElementById("terms_and_conditions").addEventListener("change", function () {
          submitButton.disabled = !this.checked;
        });
      
        form.addEventListener("submit", function (event) {
          if (passwordInput.value !== confirmPasswordInput.value) {
            event.preventDefault();
            alert("Passwords do not match. Please make sure your passwords match.");
          }
        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("form");
        const contactNumberInput = document.getElementById("contact");
        const submitButton = document.getElementById("submit_button");
    
        function validateContactNumber() {
          const contactNumberValue = contactNumberInput.value;
        
          if (!/^\d+$/.test(contactNumberValue)) {
            contactNumberInput.setCustomValidity("Contact number should only contain digits");
          } else {
            contactNumberInput.setCustomValidity("");
          }
        }
    
        contactNumberInput.addEventListener("input", validateContactNumber);
      
        form.addEventListener("submit", function (event) {
          if (!/^\d+$/.test(contactNumberInput.value)) {
            event.preventDefault();
            alert("Contact number should only contain digits. Please enter a valid contact number.");
          }
        });
      });
      
      

      
    