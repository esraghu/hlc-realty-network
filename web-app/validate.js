module.exports = {

  /*
  * Validata builder registration fields ensuring the fields meet the criteria
  * @param {String} email
  * @param {String} Name
  */

  validateBuilderRegistration: async (email, name) => {
    var response = {};

    if (!validateEmail(email)) {
      response.error = "Enter valid email";
      console.log(response.error);
      return response;
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      response.error = "name must be letters only";
      console.log(response.error);
      return response;
    } else {
      console.log('Valid Entries');
      return response;
    }
  }, 

/*
  * Validata agent registration fields ensuring the fields meet the criteria
  * @param {String} email
  * @param {String} Name
  * @param {service} - No Validation required.
  */

  validateAgentRegistration: async function (email, name) {

    var response = {};

    if (!validateEmail(email)) {
      response.error = "Enter valid email";
      console.log(response.error);
      return response;
    }  else if (!/^[a-zA-Z]+$/.test(name)) {
      response.error = "First name must be letters only";
      console.log(response.error);
      return response;   
    }  else {
      console.log("Valid Entries");
      return response;
    }
  }
}

//stackoverflow
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(re.test(email));
  return re.test(email);
}