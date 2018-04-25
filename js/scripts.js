
$(function() {


	$('.card-header').click(function() {
		if ($(this).hasClass('opened')) {
			$(this).removeClass('opened');
		} else {
			$('.card-header').removeClass('opened');
			$(this).addClass('opened');
		}
		
	});

	$('.my-tooltip').tooltip();


	$('.js-scrollToPlans').click(function(event) {
		event.preventDefault;
		var top = $('.step1').offset().top;
		$('body,html').animate({scrollTop: top-100}, 1000);
	});

	
	// FORM VALIDATION

	// restricting numbers
	$('.card-firstName, .card-lastName').keypress(function(key) { ;
		if((key.charCode >= 33 && key.charCode <= 64) || (key.charCode >= 91 && key.charCode <= 96) || (key.charCode >= 123 && key.charCode <= 127)) return false;
	});


	// jquery input mask
	$('.card-number').mask("0000 0000 0000 0000");
	$('.card-date').mask("AZ / 00", {
		translation: {
			'A': {
				pattern: /[0-1]/, optional: true	
			},
			'Z': {
				pattern: /[0-2]/, optional: true
			}
		}
	});
	$('.card-cvv').mask("000");
	$('.card-postal').mask("000");


	// tarrif plan click behaviour
	var choise = 0;
	$('.tarrifs-item').on('click', function() {
		var top;
		$('.tarrifs-item').removeClass('recommend current');
		$(this).addClass('recommend current');
		appendTarrifInfo();
		if(choise && $("#login-form").valid()) {top = $('.step3').offset().top;}
		else {top = $('#login-collapse').offset().top;}
		$('body,html').animate({scrollTop: top-100}, 1000);
		choise = 1;
	});


	// tarrif plan hovering
	$(".tarrifs-item").mouseenter( function(){
		$(".tarrifs-item").removeClass('recommend');	
		$(this).addClass('recommend');
	});
	$('.tarrifs').mouseleave(function(){
		if(!choise) {
			$(".tarrifs-item").removeClass('recommend');	
			$(".tarrifs-item").eq(0).addClass('recommend');
		} else {
			$(".tarrifs-item").removeClass('recommend');	
			$(".tarrifs-item.current").addClass('recommend');
		}
	});


	// changing info in payment card
	function appendTarrifInfo() {
		if($('.tarrifs-item1').hasClass('recommend')) {
			$('.tarrif-info').text('NovaVPN 1 year plan ($65.00 one-time payment)');
		} else if($('.tarrifs-item2').hasClass('recommend')) {
			$('.tarrif-info').text('NovaVPN 6 months plan ($46.15 one-time payment)');
		} else if($('.tarrifs-item3').hasClass('recommend')) {
			$('.tarrif-info').text('NovaVPN 1 month plan ($10.99 automatically charged every month)');
		}
	}



	$("#login-form").validate({
			rules: {
				email: {
					required: true,
					email: true
				},
				password: {
					required: true
				},
				password_confirm: {
					required: true,
					equalTo: "#password"
				}
			},
			messages: {
				email: "Please enter a valid email address",
				password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 5 characters long"
				},
				password_confirm: {
					required: "Please provide a password",
					minlength: "Your password must be at least 5 characters long",
					equalTo: "Please enter the same password as above"
				}
			}
		});

	$('#step-accordion').removeClass('collapse');

	$(".payment-form1 form").validate({
			rules: {
				inputFirstName1: "required",
				inputLastName1: "required",
				inputCardNumber1: {
						required: true,
						minlength: 19
					},
				inputExpirationDate1: {
						required: true,
						minlength: 7
					},
				inputCvv1: {
					required: true,
					minlength: 3
				},
				inputPostalCode1: {
					required: true,
					minlength: 3
				}
			},
			messages: {
				inputFirstName1: "Please enter your firstname",
				inputLastName1: "Please enter your lastname",
				inputCardNumber1: {
					required: "Please provide a card number",
					minlength: "The number must contain at least 16 numbers"
				},
				inputExpirationDate1: {
					required: "Please provide an expiration date",
					minlength: "The number must contain at least 4 numbers"
				},
				inputCvv1: {
					required: "Please provide a cvv number",
					minlength: "The number must contain at least 3 numbers"
				},
				inputPostalCode1: {
					required: "Please provide a postal code",
					minlength: "The number must contain at least 3 numbers"
				}
			}
		});


	// test redirecting to payment page
	$('.js-redirect').click(function(event) {
		event.preventDefault;
		if($(this).closest('form').valid()) {
			location.replace("payment.html");
		}
	});
	

});