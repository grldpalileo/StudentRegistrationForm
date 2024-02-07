
      const form = document.getElementById("form");
      const firstname = document.getElementById("firstname");
      const lastname = document.getElementById("lastname");
      const birthdate = document.getElementById("Birthdate");
      const username = document.getElementById("username");
      const email = document.getElementById("email");
      const contactNumber = document.getElementById("contact");
      const program = document.getElementById("program");
      const address = document.getElementById("address");
      const password = document.getElementById("password");
      const cpassword = document.getElementById("cpassword");

      var regexp = /^[a-z]+$/;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        validate();
      });

      const isEmail = (emailVal) => {
        var atSymbol = emailVal.indexOf("@");
        if (atSymbol < 1) return false;
        var dot = emailVal.lastIndexOf(".");
        if (dot <= atSymbol + 2) return false;

        if (dot === emailVal.length - 1) return false;
        return true;
      };

      const validate = () => {
        const firstnameVal = firstname.value.trim();
        const lastnameVal = lastname.value.trim();
        const birthdateVal = birthdate.value.trim();

        const usernameVal = username.value.trim();
        const emailVal = email.value.trim();
        const addressVal = address.value.trim();
        const passwordVal = password.value.trim();
        const cpasswordVal = cpassword.value.trim();

        const genderOptions = document.getElementsByName("gender");
        let isGenderSelected = false;
        genderOptions.forEach((option) => {
         if (option.checked) {
            isGenderSelected = true;
        }
        });
            if (!isGenderSelected) {
             setErrorMsg(document.querySelector(".gender-radio"), "Please select a gender");
             } else {
             setSuccessMsg(document.querySelector(".gender-radio"));
             }
        };

        const validateContactNumber = () => {
            const contactNumberVal = contactNumber.value.trim();
          
            if (contactNumberVal === "") {
              setErrorMsg(contactNumber, "Contact Number cannot be blank");
            } else if (!/^\d{10}$/g.test(contactNumberVal)) {
              setErrorMsg(contactNumber, "Invalid Contact Number. Please enter a 10-digit number");
            } else {
              setSuccessMsg(contactNumber);
            }
          };

          form.addEventListener("submit", (event) => {
            event.preventDefault();
            validate();
            validateContactNumber(); 
          });

        if (firstnameVal === "") {
          setErrorMsg(firstname, "Firstname cannot be blank");
        } else if (firstnameVal.length > 30) {
          setErrorMsg(
            firstname,
            "Firstname must be less than or equal 30 characters"
          );
        } else {
          setSuccessMsg(firstname);
        }

        if (lastnameVal === "") {
          setErrorMsg(lastname, "Lastname cannot be blank");
        } else if (lastnameVal.length > 30) {
          setErrorMsg(
            lastname,
            "lastname must be less than or equal 30 characters"
          );
        } else {
          setSuccessMsg(lastname);
        }

        if (birthdateVal === "") {
          setErrorMsg(birthdate, "Birthdate cannot be blank");
        } else {
          setSuccessMsg(birthdate);
        }

        if (usernameVal === "") {
          setErrorMsg(username, "Username cannot be blank");
        } else if (usernameVal.length > 10) {
          setErrorMsg(
            username,
            "Username must be less than or equal 10 characters"
          );
        } else if (!usernameVal.match(regexp)) {
          setErrorMsg(
            username,
            "Please Enter Only simple letter without spaces"
          );
        } else {
          setSuccessMsg(username);
        }

        if (emailVal === "") {
          setErrorMsg(email, "email cannot be blank");
        } else if (!isEmail(emailVal)) {
          setErrorMsg(email, "Not a valid Email");
        } else {
          setSuccessMsg(email);
        }

        if (addressVal === "") {
          setErrorMsg(address, "address cannot be blank");
        } else {
          setSuccessMsg(address);
        }

        if (passwordVal === "") {
          setErrorMsg(password, "Password cannot be blank");
        } else if (passwordVal.length < 6 || passwordVal.length > 15) {
          setErrorMsg(password, "Minimum 6 characters,Maximum 15");
        } else {
          setSuccessMsg(password);
        }

        if (cpasswordVal === "") {
          setErrorMsg(cpassword, "Confirm password cannot be blank");
        } else if (passwordVal !== cpasswordVal) {
          setErrorMsg(cpassword, "Passwords are not matching");
        } else {
          setSuccessMsg(cpassword);
        }
      
      function setErrorMsg(input, errormsgs) {
        const formControl = input.parentElement;
        const small = formControl.querySelector("small");
        formControl.className = "form-control error";
        small.innerText = errormsgs;
      }

      function setSuccessMsg(input, successmsgs) {
        const formControl = input.parentElement;
        formControl.className = "form-control success";
      }

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


      
    