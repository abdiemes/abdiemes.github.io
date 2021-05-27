window.addEventListener("load", function() {
    jQuery(".formWA input, .formWA textarea").on('keypress', function() {
	    if (event.keyCode === 13) {
	        jQuery(this).parents(".formWA").find('.submit').trigger('click');
	    }
	});

	jQuery('.formWA .wajib').each(function() {
	    title = jQuery(this).attr('placeholder');
	    label = jQuery(this).parents('label');
	    jQuery('<span class="validasi"><b>' + title + '</b> (dibutuhkan)</span>').appendTo(label);
	});
	
	jQuery('.formWA .wajib').keyup(function() {
	    if (jQuery(this).val() != '') {
	        jQuery(this).removeClass('focus');
	        jQuery(this).parents('label').find('.validasi').removeClass('show');
	    }
	});

	jQuery(".formWA select").change(function() {
	    jQuery(this).removeClass('focus');
	    jQuery(this).parents('label').find('.validasi').removeClass('show');
	});

}, false);

jQuery('.formWA .submit').on('click', function(){
    kirimWA(jQuery(this).parents('.poptamv').attr('id'));
    return false;
});

function kirimWA(id) {

    var validasi = true;

    jQuery('#'+id+' .wajib').each(function() {
        if ($.trim(jQuery(this).val()) == '' || $.trim(jQuery(this).val()) == 'default') {
            jQuery(this).addClass('focus');
        }
    });
    jQuery('#'+id+' .wajib').each(function() {

        if ($.trim(jQuery(this).val()) == '') {

            validasi = false;

            jQuery(this).parents('label').find('.validasi').addClass('show');
            jQuery(this).focus();
            return false;
        } else if ($.trim(jQuery(this).val()) == 'default') {

            validasi = false;

            jQuery(this).parents('label').find('.validasi').addClass('show');
            return false;
        }
    });

    if (validasi === true) {

        var parameter = '';
        var url_wa = 'https://web.whatsapp.com/send';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            url_wa = 'whatsapp://send';
        }

        if(id === 'celebrate') {

    		var kode_area = 62,
    		no_wa = 85770173363,
    		_receiver = 'Mona dan Abdi',
    		_salam = 'Halo. Assalamu\'alaikum';

            var sender = jQuery('#'+id+' .sender').val(),
            pesan = jQuery('#'+id+' .pesan').val();

            var parameter = url_wa + '?phone=' + kode_area + no_wa + '&text=' +
                _salam + ' ' + _receiver + '.%0A%0A' +
                'Saya *' + sender + '*, mau mengucapkan *' + pesan + '*.%0A%0A' +
                'via _' + location.href + '_';
        }

        // alert(parameter);
        jQuery(this).attr('href', parameter);

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
        popupWindow.focus();
        return false;
    }
}