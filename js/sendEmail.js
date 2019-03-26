document.addEventListener('DOMContentLoaded', function () {

  var sendId = '6GHLq8MN8icjmOQmvo7'
  letter.prep('user_' + sendId + 'ng');

  var nameInput = document.querySelector('#contact-name');
  var emailInput = document.querySelector('#contact-email');
  var subjectInput = document.querySelector('#contact-subject');
  var messageInput = document.querySelector('#contact-message');
  var policyCheckboxInput = document.querySelector('#contact-accept-policy');

  var sendButton = document.querySelector('#send-value');

  sendButton.addEventListener('click', sendMessage);

  function addBlurListenersForFormInputs() {
    nameInput.addEventListener('blur', addTouchedInput);
    emailInput.addEventListener('blur', addTouchedInput);
    messageInput.addEventListener('blur', addTouchedInput);
    policyCheckboxInput.addEventListener('blur', addTouchedInput);
  }

  addBlurListenersForFormInputs();


  var invalidInputs = [];

  function addTouchedInput() {
    this.classList.add('touched');
    this.removeEventListener('blur',addTouchedInput);
  }

  function addClass(arr, cssClass) {
    arr.forEach(function (element) {
      element.classList.add(cssClass);
    });
  }

  function removeClass(arr, cssClass) {
    arr.forEach(function (element) {
      element.classList.remove(cssClass);
    });
  }

  function sendMessage(e) {
    e.preventDefault();

    addClass([nameInput, emailInput, messageInput, policyCheckboxInput],'touched');

    var enableSubmit = function () {
      sendButton.disabled = false; //("disabled");
    }

    var validForm = isValid(nameInput) & (isEmail(emailInput) && isValid(messageInput)) && policyCheckboxInput.checked;

    // disable send for 60 seconds if form is valid
    if (validForm) {
      sendButton.disabled = true;
    }

    // enable send button after 60 seconds
    setTimeout(function () {
      enableSubmit()
    }, 60000);

    if (validForm) {
      letter.send("gmail9129", "template_n5ExgOcP", {
          to_name: emailInput.value,
          from_name: nameInput.value,
          subject: subjectInput.value,
          message_html: messageInput.value
        })
        .then(
          function (response) {
            console.log("SUCCESS", response);
            nameInput.value = '';
            emailInput.value = '';
            subjectInput.value = '';
            messageInput.value = '';
            policyCheckboxInput.checked = false;
            Swal.fire("Thank you!", "Your message was successfully sent. We will answer you within 24 hours! If you want send another message please wait 60 seconds.", "success");

            removeClass([nameInput, emailInput, messageInput, policyCheckboxInput],'touched');
            addBlurListenersForFormInputs();
          },
          function (error) {
            console.log("FAILED", error);
          }
        );

    } else {
      Swal.fire("Attention!", "You didn't fill required field(s) to send the message!", "warning")
      .then( function() {
          setTimeout(function() {
            if(invalidInputs.length > 0) invalidInputs[0].focus();
          }, 750);
        }
        );
    }
  }

    function deleteFromInvalidInputs(isValid, input) {
      if (isValid && invalidInputs.indexOf(input) >= 0) {
        invalidInputs.splice( invalidInputs.indexOf(input), 1 );
      }
    }

  function isValid(input) {
    var isValid = input.value.trim().length > 0;
    if (!isValid && invalidInputs.indexOf(input) < 0) {
      invalidInputs.push(input);
    }
    deleteFromInvalidInputs(isValid, input);
    return isValid;
  }

  function isEmail(emailInput) {
    if (emailInput != null && emailInput != undefined && emailInput.value.length > 0) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

      deleteFromInvalidInputs(pattern.test(emailInput.value), emailInput);

      return pattern.test(emailInput.value);
    } else {
      if (invalidInputs.indexOf(emailInput) < 0) {
        invalidInputs.push(emailInput);
      }
      return false;
    }
  }

}, false);
