(function () {
    $(window).scroll(function () {
        var scroll = $(this).scrollTop();
        if (scroll > 0) {
            $('.logo').height('32px');
            $('.suporte').height('69px');
            $("header").css("box-shadow", "0 0 1rem #2b2b2b4F");
        } else {
            $('.logo').height('100px');
            $('.suporte').height('137px');
            $("header").css("box-shadow", "none");
        }

        $('a').removeAttr('ba-status');
        if (scroll >= $('#contacts').offset().top - 350) {
            $("a[href='#contacts']").attr('ba-status', 'active');
        } else if (scroll >= $('#clients').offset().top  - 350) {
            $("a[href='#clients']").attr('ba-status', 'active');
        } else if (scroll >= $('#products').offset().top  - 350) {
            $("a[href='#products']").attr('ba-status', 'active');
        } else if (scroll >= 0) {
            $("a[href='#home']").attr('ba-status', 'active');
        }
    });
})();