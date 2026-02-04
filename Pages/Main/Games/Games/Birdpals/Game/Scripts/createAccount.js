document.getElementById('createAccount').addEventListener('click', create);
function create() {
	var eMail = document.getElementById('input-e');
	var username = document.getElementById('input-u');
	var password = document.getElementById('input-p'); // Feel free to add a function that the password input.value appear as ***** to the player
	var confirmedpassword = document.getElementById('input-cp'); //Gets the confirmed password

	if(username.value != "" && password.value != "" && eMail.value != ""){
			if(password.value == confirmedpassword.value){
					console.log(username.value);
					let registerRequest = {
						TitleId: '238E6',
						Email: eMail.value,
						Username: username.value,
						Password: password.value,
						DisplayName: username.value,
					}
					PlayFabClientSDK.RegisterPlayFabUser(registerRequest, registerCallback);
			}
			else{
					alert("It appears the Password fields do not match."); //When the "Confirm Password" and "Password" fields do not contain the same text, display an error.
			}
	}
	else{
			alert("Please fill out the Email, Username and Password fields.") //When there isn't any text in the username & password fields, display error.
	}


	function registerCallback(result, error) {
		if (result !== null) {
			PlayFab.settings.titleId = '238E6';
			let PlayFabId = result.data.PlayFabId;
			PlayFabClientSDK.AddOrUpdateContactEmail({EmailAddress: eMail.value, PlayFabId: PlayFabId}, (result, error) => {
				if(result !== null){
					console.log('Contact email added for ' + username.value);
					alert('Your account was created! Please check your e-mail to verify your account.')
				}else if (error !== null){
					console.log('Something went wrong... ' + error);
				}
			})

		} else if (error !== null) {
			console.log(error);
			if(error.errorDetails != undefined){
				if(error.errorDetails.Email != undefined){
					alert(error.errorDetails.Email[0]);
				}
				if(error.errorDetails.Username != undefined){
					alert(error.errorDetails.Username[0]);
				}
				if(error.errorDetails.Password != undefined){
					alert(error.errorDetails.Password[0]);
				}
			}else{
				alert(error.errorMessage);
			}
		}
	}

}
$(document).ready(function() {

	$('.submit_on_enter').keydown(function(event) {
	  // enter has keyCode = 13, change it if you want to use another button
	  if (event.keyCode == 13) {
		create();
		return false;
	  }
	});

  });