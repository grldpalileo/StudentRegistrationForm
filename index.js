
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
        const collegeDropdown = document.getElementById("college");
        const programDropdown = document.getElementById("program");
      
        function validateContactNumber() {
          const contactNumberValue = contactNumberInput.value;
      
          if (!/^\d+$/.test(contactNumberValue)) {
            contactNumberInput.setCustomValidity("Contact number should only contain digits");
          } else {
            contactNumberInput.setCustomValidity("");
          }
        }

        collegeDropdown.addEventListener("change", function () {
          const selectedCollege = collegeDropdown.value;
          populateProgramDropdown(selectedCollege);
        });
      
       
        contactNumberInput.addEventListener("input", validateContactNumber);
      
        form.addEventListener("submit", function (event) {
          if (!/^\d+$/.test(contactNumberInput.value)) {
            event.preventDefault();
            alert("Contact number should only contain digits. Please enter a valid contact number.");
          }
        });
      });

      function populateProgramDropdown(college) {
        const programDropdown = document.getElementById("program");
      
        const courses = getCoursesForCollege(college);
      
        programDropdown.innerHTML = "";
      
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Select Program";
        programDropdown.appendChild(defaultOption);
      
        courses.forEach(function (course) {
          const option = document.createElement("option");
          option.value = course;
          option.textContent = course;
          programDropdown.appendChild(option);
        });
      }
      
      function getCoursesForCollege(college) {
        const courseMap = {
          CAF: ["BSA - Bachelor of Science in Accountancy", 
                "BSMA - Bachelor of Science in Management Accounting", 
                "BSBAFM - Bachelor of Science in Business Administration Major in Financial Management"],
          CAL: ["ABELS - Bachelor of Arts in English Language Studies", 
                "BAF - Bachelor of Arts in Filipino", 
                "ABLCS - Bachelor of Arts in Literature and Communication Studies"],
          CBA: ["DBA - Doctor in Business Administration",
                "MBA - Master in Business Administration",
                "BSBAHRM - Bachelor of Science in Business Administration major in Human Resource Management",  
                "BSBAMM  - Bachelor of Science in Business Administration major in Marketing Management",
                "BSENTREP - Bachelor of Science in Entrepreneurship",
                "BSOA - Bachelor of Science in Office Administration"],
          COC: ["BADPR - Bachelor in Advertising and Public Relations",
                "BA Broadcasting - Bachelor of Arts in Broadcasting",
                "BACR - Bachelor of Arts in Communication Research",
                "BAJ - Bachelor of Arts in Journalism"],
          CCIS: ["BSIT - Bachelor of Science in Information Technology",
                "BSCS - Bachelor of Science in Computer Science"],
          COED: ["PhDEM - Doctor of Philosophy in Educational Management",
                "MAEM-EL- Master of Arts in Education Management (MAEM) with Specialization in Educational Leadership",
                "MAEM-IL- Master of Arts in Education Management (MAEM) with Specialization in Instructional Leadership",
                "MBE - Master in Business Education",
                "MLIS - Master of Library and Information Science",
                "MAELT - Master of Arts in English Language Teaching",
                "MAED-MED - Master of Arts in Education Major in Mathematics Education",
                "MAPES - Master of Arts in Physical Education and Sports",
                "MAED-TCA - Master of Arts in Education Major in Teaching in the Challenged Areas",
                "PBDE - Post-Baccalaureate Diploma in Education",
                "BTLEd-HE - Bachelor of Technology and Livelihood Education Major in Home Economics",
                "BTLEd-IA - Bachelor of Technology and Livelihood Education Major in Industrial Arts",
                "BTLEd-ICT - Bachelor of Technology and Livelihood Education (BTLEd) major in Information and Communication Technology",
                "BLIS - Bachelor of Library and Information Science",
                "BSED-Eng - Bachelor of Secondary Education Major in English",
                "BSED-Fil - Bachelor of Secondary Education Major in Filipino",
                "BSED-Math - Bachelor of Secondary Education Major in Mathematics",
                "BSED-Sci - Bachelor of Secondary Education Major in Science",
                "BSED-Soc - Bachelor of Secondary Education Major in Social Studies",
                "BEEd - Bachelor of Elementary Education",
                "BECEd - Bachelor of Early Childhood Education"],
          CEA: ["BSCE - Bachelor of Science in Civil Engineering",
                "BSME - Bachelor of Science in Mechanical Engineering",
                "BSEE - Bachelor of Science in Electrical Engineering",
                "BSIE - Bachelor of Science in Industrial Engineering",
                "BSCpE - Bachelor of Science in Computer Engineering",
                "BSECE - Bachelor of Science in Electronics Engineering",
                "BSRE - Bachelor of Science in Railway Engineering",
                "BSArch - Bachelor of Science in Architecture",
                "BSA - Bachelor of Science in Architecture",
                "BSID - Bachelor of Science in Interior Design",
                "BSEP - Bachelor of Science in Environmental Planning"],
        CTHTM: ["BSHM - Bachelor of Science in Hospitality Management",
                "BSTM - Bachelor of Science in Tourism Management",
                "BTRM- Bachelor of Science in Transportation Management"],
        CL:    ["JD- Juris Doctor"],
        CHK:   ["BPE - Bachelor of Physical Education",
                "BSESS - Bachelor of Science in Exercises and Sports"],
        CPSPA: ["DPA- Doctor in Public Administration",
                "MPA - Master in Public Administration", 
                "BPA - Bachelor of Public Administration",
                "BAIS - Bachelor of Arts in International Studies", 
                "BAPE - Bachelor of Arts in Political Economy",
                "BAPS - Bachelor of Arts in Political Science",],
        CS:    ["BSFT - Bachelor of Science Food Technology",
                "BSAPMATH - Bachelor of Science in Applied Mathematics", 
                "BSBIO - Bachelor of Science in Biology", 
                "BSCHEM - Bachelor of Science in Chemistry", 
                "BSMATH- Bachelor of Science in Mathematics",
                "BSND - Bachelor of Science in Nutrition and Dietetics",
                "BSPHY - Bachelor of Science in Physics",
                "BSSTAT - Bachelor of Science in Statistics",],
        CSSD:  ["BAH - Bachelor of Arts in History",
                "BAS - Bachelor of Arts in Sociology",  
                "BSC - Bachelor of Science in Cooperatives", 
                "BSE - Bachelor of Science in Economics",
                "BSPSY - Bachelor of Science in Psychology",],
        ITECH: ["DCvET - Diploma in Civil Engineering Technology",
                "DCET - Diploma in Computer Engineering Technology",
                "DEET - Diploma in Electrical Engineering Technology", 
                "DECET - Diploma in Electronics Engineering Technology", 
                "DICT - Diploma in Information Communication Technology", 
                "DMET - Diploma in Mechanical Engineering Technology",
                "DOMT - Diploma in Office Management Technology", 
                "DRET - Diploma in Railway Engineering Technology",]
        };
      
        return courseMap[college] || [];
      }
      
      function resetForm() {
        document.getElementById("form").reset();
        document.getElementById("txtage").value = "";
        document.getElementById("program").innerHTML.reset();
        document.getElementById("program") = "";
        document.getElementById("college") = "";
      }
      
    
