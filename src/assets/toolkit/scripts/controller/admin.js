$(function () {

	$('#install-form').on('submit', function (e) {
		e.preventDefault();

		// Get the form values
		var frm =  {};
		$(this).find('input, select, textarea').each(function () {
			if (this.name.length > 0) {
				var v = (this.value.length > 0) ? this.value : null;
				if (v !== null) { frm[this.name] = v; }
			}
		});

		// Clear previous errors
		$('body').find('.alert').removeClass('show');
		$(this).find('.has-danger').removeClass('has-danger');
		$(this).find('.form-control-feedback').html('');

		var btn = $(this).find('[type="submit"]');
			btn.html('Submit').attr('disabled', true);

		var reqs = {
			'title': 'Site name is a required field',
			'email': 'Enter the admin account email address',
			'password': 'Enter the admin account password',
			'confirm': 'Confirm the admin account password'
		};

		for (var prop in reqs) {
			if (!frm.hasOwnProperty(prop)) {
				var elm = $('input[name="'+prop+'"]');
					elm.closest('.list-group-item').find('.form-control-feedback').html(reqs[prop]);
					elm.closest('.list-group-item').addClass('has-danger');
					btn.removeAttr('disabled');
					elm.focus();
					return;
			}
		}

		if (frm.password !== frm.confirm) {
			var elm = $('input[name="confirm"]');
				elm.closest('.list-group-item').find('.form-control-feedback').html('Passwords do not match');
				elm.closest('.list-group-item').addClass('has-danger');
				btn.removeAttr('disabled');
				elm.focus();
				return;
		}

		delete frm['confirm'];

		btn.html('Aww Yeah! Let&rsquo;s Install Some Jam&hellip;');
		btn.focus();

		var u = $(this).attr('action');
		var me = $(this);

		$.ajax({
			url: u,
			data: frm,
			method: 'POST',
			dataType: 'json',
			success: function (result) {
				btn.html('Installation Complete!');
				setTimeout(function () { window.location.reload(true); }, 2000);
			},
			error: function (err) {
				btn.removeAttr('disabled');
				$('body').find('.alert').text(err.message).addClass('show');
			}
		});

		setTimeout(function () {
			btn.removeAttr('disabled');
			$('body').find('.alert').text('Request timeout').addClass('show');
		});

		return true;
	});

	/**
	 * Publish later toggle
	 */
	$('#publish-later').hide();
	$(document).on('change', 'input[name="publish"]', function () {
		var t = $('#publish-later');

		if (this.value === 'later' && $(this).is(':checked')) {
			t.slideDown(200);
		} else {
			t.slideUp(250);
		}
	});

	/**
	 * Radio toggles
	 */
	$(document).on('change', '[data-toggle="check"] input', function () {

		var par = $(this).closest('[data-toggle="check"]');

		if (this.type === 'radio') {
			if (par.length > 0) {
				par.find('label').removeClass('active');
				par.find('input').attr('aria-checked', 'false');
			}
		}

		if ($(this).is(':checked')) {
			$(this).closest('label').addClass('active');
			$(this).attr('aria-checked', 'true');
		} else {
			$(this).closest('label').removeClass('active');
			$(this).attr('aria-checked', 'false');
		}

	});

	$(document).on('keyup', '[data-toggle="check"] label', function (e) {
		var k = e.which || e.keyCode || 0;
		if (k === 13) {
			e.preventDefault();
			var elm = $(this).find('input');
				elm.click();
		}
	});

	$('[data-toggle="check"] input:checked').change();



	/**
	 * Datepicker
	 */
	$('[data-datepicker]').datepicker({
		todayHighlight: true,
		autoclose: true,
		templates: {
			leftArrow: '<i class="lnr-chevron-left"></i>',
			rightArrow: '<i class="lnr-chevron-right"></i>'
		}
	});


});
