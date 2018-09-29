var apiUrl = location.protocol + '//' + location.host + "/api/";

//check user input and call server
$('.sign-in-builder').click(function() {
  getBuilder();
});

function getBuilder() {

  //get user input data
  var formEmail = $('.email input').val();
  var formCardId = $('.card-id input').val();

  //create json data
  var inputData = '{' + '"email" : "' + formEmail + '", ' + '"cardid" : "' + formCardId + '"}';
  console.log(inputData)

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'builderData',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: () => {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: (data) => {

      //remove loader
      document.getElementById('loader').style.display = "none";

      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {

        //update heading
        $('.heading').html(() => {
          var str = '<h2><b>' + data.name + '</b></h2>';
          str = str + '<h2><b>' + data.email + '</b></h2>';
          return str;
        });

        $('.display-projects').html(() => {
          var projects = data.projectList;
          let str = '<h3><b> + Projects + </b></h3>'
          projects.forEach(project => {
            str = str + '<li>' + project + '</li>'
          });
        })

        // //update partners dropdown for earn points transaction
        // $('.create-project select').html(() => {
        //   var str = '<option value="" disabled="" selected="">select</option>';
        //   var projects = data.projectsList;
        //   for (var i = 0; i < partnersData.length; i++) {
        //     str = str + '<option partner-id=' + partnersData[i].id + '> ' + partnersData[i].name + '</option>';
        //   }
        //   return str;
        // });

        // //update partners dropdown for use points transaction
        // $('.use-partner select').html(function() {
        //   var str = '<option value="" disabled="" selected="">select</option>';
        //   var partnersData = data.partnersData;
        //   for (var i = 0; i < partnersData.length; i++) {
        //     str = str + '<option partner-id=' + partnersData[i].id + '> ' + partnersData[i].name + '</option>';
        //   }
        //   return str;
        // });

        // //update create project transaction
        // $('.create-project-transactions').html(() => {
        //   var str = '';
        //   var transactionData = data.createProjectResult;

        //   for (var i = 0; i < transactionData.length; i++) {
        //     str = str + '<p>timeStamp: ' + transactionData[i].timestamp + '<br />name: ' + transactionData[i].projectName + '<br />email: ' + transactionData[i].builderEmail + '<br />points: ' + transactionData[i].points + '<br />transactionName: ' + transactionData[i].$class + '<br />transactionID: ' + transactionData[i].transactionId + '</p><br>';
        //   }
        //   return str;
        // });

        // //update use points transaction
        // $('.points-redeemed-transactions').html(function() {
        //   var str = '';

        //   var transactionData = data.usePointsResults;

        //   for (var i = 0; i < transactionData.length; i++) {
        //     str = str + '<p>timeStamp: ' + transactionData[i].timestamp + '<br />partner: ' + transactionData[i].partner + '<br />member: ' + transactionData[i].member + '<br />points: ' + transactionData[i].points + '<br />transactionName: ' + transactionData[i].$class + '<br />transactionID: ' + transactionData[i].transactionId + '</p><br>';
        //   }
        //   return str;
        // });

        //remove login section and display member page
        document.getElementById('loginSection').style.display = "none";
        document.getElementById('transactionSection').style.display = "block";
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {

    }
  });
}

