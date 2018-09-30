var bitart;
(function (bitart) {
    var GoTop = /** @class */ (function () {
        function GoTop(go_top) {
            this.VERSION = '0.0.1';
            var _this = this;
            this.go_top = go_top;
            this.speed = Number(this.go_top.attr('ba-speed')) || 500;
            this.offset = Number(this.go_top.attr('ba-offset')) || Number(0);
            var target = $('body');
            this.go_top.off().click(function () {
                $('html, body').animate({
                    scrollTop: target.offset().top + _this.offset
                }, _this.speed);
            });
        }
        return GoTop;
    }());
    bitart.GoTop = GoTop;
    bitart.go_top = [];
    var _go_top = $('.ba-go-top');
    for (var i = 0; i < _go_top.length; i++) {
        bitart.go_top.push(new GoTop($(_go_top[i])));
    }
})(bitart || (bitart = {}));
