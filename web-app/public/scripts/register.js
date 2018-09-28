var apiUrl = location.protocol + '//' + location.host + "/api/";

console.log('at register.js');

// check user input and call server to register builder
$('.register-builder').click( () => {
    var email = $('.email-id input').val();
    var cardId = $('.card-id input').val();
    var name = $('.name input').val();

    var inputData = '{' + '"email" :"' + email + '", ' + '"name" :"' + name + '", "cardId" : "' + cardId + '"}';
    console.log(inputData);

    // ajax call to add into database
    $.ajax({
        type: 'POST',
        url: apiUrl + 'registerBuilder',
        data: inputData,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: () => {
            // display loading
            document.getElementById('registration').style.display = "none";
            document.getElementById('loader').style.display = "block";
        },
        success: (data) => {
            // remove loader
            document.getElementById('loader').style.display = "none";

            // check data for error
            if(data.error) {
                document.getElementById('registration').style.display = "block";
                alert(data.error);
                return;
            } else {
                // notify successful registration
                document.getElementById('successful-registration').style.display = "block";
                document.getElementById('registration-info').style.display = "none";
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            // reload on error
            alert('Error: try again');
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);
        }
    })
})

// check user input and call server to register agent
$('.register-agent').click( () => {
    var email = $('.email input').val();
    var name = $('.name input').val();
    var service = $('.service input').val();

    var inputData = '{' + '"email" :' + email + '", ' + '"name" :' + name + '", ' + '"service" :' + service + '}';
    console.log(inputData);

    // ajax call to add into database
    $.ajax({
        type: 'POST',
        url: apiUrl + 'registerAgent',
        data: inputData,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: () => {
            // display loading
            document.getElementById('registration').style.display = "none";
            document.getElementById('loader').style.display = "block";
        },
        success: (data) => {
            // remove loader
            document.getElementById('loader').style.display = "none";

            // check data for error
            if(data.error) {
                document.getElementById('registration').style.display = "block";
                alert(data.error);
                return;
            } else {
                // notify successful registration
                document.getElementById('successful-registration').style.display = "block";
                document.getElementById('registration-info').style.display = "none";
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            // reload on error
            alert('Error: try again');
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);
        }
    })
})

// check user input and call server to create a project
$('.create-project').click( () => {
    //var projectId = uuid();
    var name = $('.name input').val();
    var builderEmail = $('.email input').val();

    var inputData = '{' + '"email" :' + builderEmail + '", ' + '"name" :' + name + '}';
    console.log(inputData);

    // ajax call to add into database
    $.ajax({
        type: 'POST',
        url: apiUrl + 'registerAgent',
        data: inputData,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: () => {
            // display loading
            document.getElementById('registration').style.display = "none";
            document.getElementById('loader').style.display = "block";
        },
        success: (data) => {
            // remove loader
            document.getElementById('loader').style.display = "none";

            // check data for error
            if(data.error) {
                document.getElementById('registration').style.display = "block";
                alert(data.error);
                return;
            } else {
                // notify successful registration
                document.getElementById('successful-registration').style.display = "block";
                document.getElementById('registration-info').style.display = "none";
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            // reload on error
            alert('Error: try again');
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);
        }
    })
})
