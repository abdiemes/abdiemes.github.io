$(document).ready(function(){
    $('body').append('<div id="page-loader"></div>');
});
$(window).on("beforeunload", function() {
    $('#page-loader').fadeIn(500).delay(1000).fadeOut(1000);
    $('#header .menu.desktop').removeClass('on');
});
function lazyload() {
    var loadingBG = '#f2f2f2';
    $('img[data-src]').each(function() {
        $(this).attr('style', 'display: block;max-width:100%;opacity: 0;');
        var data_img = $(this).attr('data-src');
        $(this)
            .attr('src', data_img)
            .wrap('<div class="lazy-img-wrap" style="background:' + loadingBG + '"></div>');
        $(this).bind('load', function() {
            $(this).animate({
                    opacity: "1"
                }, 1000)
                .unwrap()
                .removeAttr('data-src');
        });
    });

    $('*[data-bg]').each(function() {
        var data_bg = $(this).attr('data-bg');
        $(this)
            .attr('style', 'position:relative;')
            .prepend('<div class="lazy-bg-placeholder" style="position:absolute;z-index:auto;top:0;left:0;right:0;bottom:0;background:' + loadingBG + '"><img src="' + data_bg + '" style="display:none;"/></div>');
        $('.lazy-bg-placeholder img', this).bind('load', function() {
            $(this)
                .parents('*[data-bg]')
                .attr('style', 'background-image:url(' + data_bg + ');position:relative;')
                .removeAttr('data-bg')
                .find('.lazy-bg-placeholder').fadeOut(1000, function() {
                    $(this).remove();
                });
        });
    });
}
$(window).bind('load', function() {
    lazyload();
});

if ($('.slide').html() != undefined) {
    $('.slide').owlCarousel({
        loop: true,
        autoplay: true,
        autoHeight: true,
        lazyLoad: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        margin: 0,
        nav: false,
        navText: ["<i class='icon ion-ios-arrow-back'></i>", "<i class='icon ion-ios-arrow-forward'></i>"],
        items: 1,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive: {
            769: {
                mouseDrag: false,
                touchDrag: false,
                pullDrag: false,
            },
        },
    });
}

if ($('#gallery .owl-carousel').html() != undefined) {
    $('#gallery .owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoHeight: true,
        lazyLoad: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        margin: 0,
        nav: false,
        navText: ["<i class='icon ion-ios-arrow-back'></i>", "<i class='icon ion-ios-arrow-forward'></i>"],
        items: 2,
        dots: false,
        // animateOut: 'fadeOut',
        // animateIn: 'fadeIn',
        responsive: {
            769: {
                items: 5,
                // mouseDrag: false,
                // touchDrag: false,
                // pullDrag: false,
            },
        },
    });
}
$(function() {
  if ($('#sidebar').length) { // Ganti "#sidebar" dengan ID tertentu
    var el = $('#sidebar');
    var stickyTop = $('#sidebar').offset().top;
    var stickyHeight = $('#sidebar').height();
    var headerHeight = $('#header').height() + 20;
    $(window).scroll(function() {
      var limit = $('#gallery').offset().top - stickyHeight - headerHeight; // Jarak berhenti di "#footer-wrapper"
      var windowTop = $(window).scrollTop();
      if (stickyTop < windowTop) {
        el.css({
          position: 'fixed',
          top: 20, // Jarak atau margin sticky dari atas
          width: 300 // Jarak atau margin sticky dari atas
        });
      } else {
        el.css('position', 'static');
      }
      if (limit < windowTop) {
        var diff = limit - windowTop;
        el.css({
          top: diff
        });
      }
    });
  }
});
$('.slide-testi').owlCarousel({
    loop: true,
    rtl:true,
    autoplay: true,
    autoHeight: true,
    lazyLoad: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    margin:0,
    responsiveClass:true,
    dots:false,
    nav: false,
    responsive:{
        0:{
            items:1,
            // nav:false
        },
        600:{
            items:3,
            // nav:false
        },
        1000:{
            items:3,
            // nav:false,
            // loop:false
        }
    }
})
$('a').each(function() {
    var url = $(this).attr('href');
    if (url == window.location) {
        $(this).addClass('current');
    }
});
$(function() {
    var d = new Date();
    var n = d.getFullYear();
    document.getElementById("thisYear").innerHTML = n;
});

$('section').mouseup(function(e){
    var menuOn = $("#header .menu.on");
    // Close menu out of button (mobile)
    if(!menuOn.is(e.target) && menuOn.has(e.target).length === 0){
        menuOn.toggleClass('on');
    }
});
window.addEventListener('scroll',function(e){
    var menuOn = $("#header .menu.on");
    // Close menu at scroll (mobile)
    if(!menuOn.is(e.target) && menuOn.has(e.target).length === 0){
        menuOn.toggleClass('on');
    }
});
$(document).ready(function() {
    /* POP ========================================================= */
    $(document).ready(function() {
        $('.pop').each(function() {
            var width = $(this).attr('data-width');
            if (width) {
                $('.pop_wrap', this).css('width', width);
            }
        });
    });
    $(window).click(function() {
        $('.pop').each(function() {
            $(this).removeClass('open');
            $('body').css('overflow', 'auto');

            if ($(this).attr('id') == 'pop-iframe') {
                $(this).find('.pop_iframe').html('');
            }
        });
    });
    $(document).on('click', '[data-pop]', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var id = $(this).attr('data-pop');
        if ($(id).html()) {
            $(id).addClass('open');
            $('body').css('overflow', 'hidden');
        } else {
            alert(id + ' belum dibuat!');
        }
        if (id == '#pop-share') {
            var href = $(this).attr('href'),
                title = $(this).attr('title');
            $(id + ' .pop_title').text(title);
            $(id + ' .pop_content a[href*="_SHARELINK_"]').each(function() {
                var replace_href = $(this).attr('href').replace('_SHARELINK_', href);
                $(this).attr('href', replace_href);
            });
        }
        if (id == '#pop-iframe') {
            var href = $(this).attr('href'),
                title = $(this).attr('title');

            var youtube_id = href.replace('//youtu.be/', '');

            $(id + ' .pop_title').text(title);

            $(id + ' .pop_content .pop_iframe').html('<iframe src="//www.youtube.com/embed/' + youtube_id + '?autoplay=1&rel=0" allowfullscreen></iframe>')
        }
    });
    $(document).on('click', '.pop_wrap', function(e) {
        e.stopPropagation();
    });
    $(document).on('click', '.pop_close', function(e) {
        e.stopPropagation();
        $(this).closest('.pop').removeClass('open');
        $('body').css('overflow', 'auto');

        if ($(this).closest('.pop').attr('id') == 'pop-iframe') {
            $(this).closest('.pop').find('.pop_iframe').html('');
        }
    });
    $(document).on('click', '.pop_content a[href]', function() {
        $(this).closest('.pop').removeClass('open');
    });
    /* POP ========================================================= */
});

$(document).ready(function() {
    $('#about .item a[href*="youtu.be"]').each(function() {
        $(this).attr('data-pop', '#pop-iframe');
        $(this).append('<svg class="youtube_play" viewBox="0 -77 512.00213 512" xmlns="//www.w3.org/2000/svg"><path d="m501.453125 56.09375c-5.902344-21.933594-23.195313-39.222656-45.125-45.128906-40.066406-10.964844-200.332031-10.964844-200.332031-10.964844s-160.261719 0-200.328125 10.546875c-21.507813 5.902344-39.222657 23.617187-45.125 45.546875-10.542969 40.0625-10.542969 123.148438-10.542969 123.148438s0 83.503906 10.542969 123.148437c5.90625 21.929687 23.195312 39.222656 45.128906 45.128906 40.484375 10.964844 200.328125 10.964844 200.328125 10.964844s160.261719 0 200.328125-10.546875c21.933594-5.902344 39.222656-23.195312 45.128906-45.125 10.542969-40.066406 10.542969-123.148438 10.542969-123.148438s.421875-83.507812-10.546875-123.570312zm0 0" fill="#f00" filter="url(#youtube_shadow)"/><path d="m204.96875 256 133.269531-76.757812-133.269531-76.757813zm0 0" fill="#fff"/><defs><filter id="youtube_shadow" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/><feOffset dx="2" dy="2" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>');
    });
});