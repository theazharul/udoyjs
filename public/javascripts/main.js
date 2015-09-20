$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip();   

	$("select").multipleSelect({
            onOpen: function() {
                $eventResult.text('Select opened!');
            },
            onClose: function() {
                $eventResult.text('Select closed!');
            },
            onCheckAll: function() {
                $eventResult.text('Check all clicked!');
            },
            onUncheckAll: function() {
                $eventResult.text('Uncheck all clicked!');
            },
            onFocus: function() {
                $eventResult.text('focus!');
            },
            onBlur: function() {
                $eventResult.text('blur!');
            },
            onOptgroupClick: function(view) {
                var values = $.map(view.children, function(child){
                    return child.value;
                }).join(', ');
                $eventResult.text('Optgroup ' + view.label + ' ' + 
                    (view.checked ? 'checked' : 'unchecked') + ': ' + values);
            },
            onClick: function(view) {
                $eventResult.text(view.label + '(' + view.value + ') ' + 
                    (view.checked ? 'checked' : 'unchecked'));
            }
        });

	/** reset pasword */	
		function checkEmail(email)
		{
			var atpos = email.indexOf("@");
			var dotpos = email.lastIndexOf(".");

			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) 
			{
				return false;
			}
			return true;
		}

		function resetPassword()
		{           
			var email = document.forms["resetpassword"]["email"].value;
			var emailIsValid = checkEmail(email);

			if (!emailIsValid)
			{
				window.alert("Not a valid e-mail address");
				return false;
			}

			Parse.User.requestPasswordReset(email, {
						success:function() {
							window.alert("Password reset link has been sent to "+ email);
							return true;
						},
						error:function(error) {
							window.alert(error.message);
							return false;
						}
					});
		}

});
     function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result)
                        .width(120)
                        .height(110);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
