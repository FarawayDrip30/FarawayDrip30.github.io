const loginButton = document.getElementById('loginButton');
const createAccountButton = document.getElementById('createAccountButton');
loginButton.addEventListener('click', logIn);
createAccountButton.addEventListener('click', createAccount);
function logIn() {
	var eMail = document.getElementById('input-e');
	var password = document.getElementById('input-p');
		PlayFabClientSDK.LoginWithEmailAddress(			//Log in directly to Playfab
			{
			TitleId: "238E6",
			Email: eMail.value,
			Password: password.value
			}, function (result, error) {
				if(result != null){
					ticket = result.data.SessionTicket;
					playerId = result.data.PlayFabId;
					sessionStorage.setItem('ticket',ticket);
					sessionStorage.setItem('playerId',playerId);
					window.location.href = "play.html";
				}else if(error != null){
				//You can get what was the error by the error var and show something to the client
				//For example, if(error == "InvalidUsername"){ show to that client that the username is invalid}  To know what are the errors test with accounts that doesn't exist
				if(error.errorDetails == undefined){
					alert(error.errorMessage);
				}else{
					let details = Object.values(error.errorDetails)[0];
					if(error.error == "AccountBanned"){
						let reason = Object.keys(error.errorDetails)[0];
						if(details != "Indefinite"){
							details = details[0] + '.000Z';
							details = new Date(details).toString();
						}
						let alertMessage = error.errorMessage + ". Reason of ban: " + reason + ". Ban expires at: " + details;
						alert(alertMessage);
					}else{
						alert(details);
					}
					
				}
				
			}
		})
}
function createAccount(){
	window.location.href = "createAccount.html";
}
$(document).ready(function() {

	$('.input').keydown(function(event) {
	  // enter has keyCode = 13, change it if you want to use another button
	  if (event.keyCode == 13) {
		logIn();
		return false;
	  }
	});
  
  });