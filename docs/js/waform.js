window.addEventListener("load", function() {
    $(".formWA input, .formWA textarea").on('keypress', function() {
	    if (event.keyCode === 13) {
	        $(this).parents(".formWA").find('.submit').trigger('click');
	    }
	});

	/* $('.formWA .wajib').each(function() {
	    title = $(this).attr('placeholder');
	    label = $(this).parents('label');
	    $('<span class="validasi"><b>' + title + '</b> (dibutuhkan)</span>').appendTo(label);
	}); */
	
	$('.formWA .wajib').keyup(function() {
	    if ($(this).val() != '') {
	        $(this).removeClass('focus');
	        $(this).parents('label').find('.validasi').removeClass('show');
	    }
	});

	$(".formWA select").change(function() {
	    $(this).removeClass('focus');
	    $(this).parents('label').find('.validasi').removeClass('show');
	});

}, false);

$('.formWA .submit').on('click', function(){
    kirimWA($(this).parents('.poptamv').attr('id'));
    return false;
});

function kirimWA(id) {

    var validasi = true;

    $('#'+id+' .wajib').each(function() {
        if ($.trim($(this).val()) == '' || $.trim($(this).val()) == 'default') {
            $(this).addClass('focus');
        }
    });
    $('#'+id+' .wajib').each(function() {

        if ($.trim($(this).val()) == '') {

            validasi = false;

            $(this).parents('label').find('.validasi').addClass('show');
            $(this).focus();
            return false;

        } else if ($.trim($(this).val()) == 'default') {

            validasi = false;

            $(this).parents('label').find('.validasi').addClass('show');
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

            var sender = $('#'+id+' .sender').val(),
            pesan = $('#'+id+' .pesan').val();

            var parameter = url_wa + '?phone=' + kode_area + no_wa + '&text=' +
                _salam + ' ' + _receiver + '.%0A%0A' +
                'Saya *' + sender + '*, mau mengucapkan *' + pesan + '*.%0A%0A';
        }

        // alert(parameter);
        $(this).attr('href', parameter);

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
        popupWindow.focus();
        return false;
    }
}