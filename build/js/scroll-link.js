var bitart;
(function (bitart) {
    var ScrollLink = /** @class */ (function () {
        function ScrollLink(scroll_link) {
            this.VERSION = '0.0.1';
            var _this = this;
            this.scroll_link = scroll_link;
            this.speed = Number(this.scroll_link.attr('ba-speed')) || 500;
            this.offset = Number(this.scroll_link.attr('ba-offset')) || Number(0);
            var href = this.scroll_link.attr('href');
            if (href !== undefined && href.substring(0, 1) === '#') {
                this.target = $(href);
                this.scroll_link.off().click(function () {
                    $('html, body').animate({
                        scrollTop: _this.target.offset().top + _this.offset
                    }, _this.speed);
                });
            }
        }
        return ScrollLink;
    }());
    bitart.ScrollLink = ScrollLink;
    bitart.scroll_link = [];
    var _scroll_link = $('.ba-scroll-link');
    for (var i = 0; i < _scroll_link.length; i++) {
        bitart.scroll_link.push(new ScrollLink($(_scroll_link[i])));
    }
})(bitart || (bitart = {}));
