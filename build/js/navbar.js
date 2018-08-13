var bitart;
(function (bitart) {
    var Navbar = /** @class */ (function () {
        function Navbar(navbar) {
            this.VERSION = '0.0.1';
            this.navbar = navbar;
            var menu = this.navbar.find('.ba-menu');
            var toggle = $("<div class='ba-toggle-menu'></div>");
            menu.before(toggle);
            toggle.off().click(function () {
                $(this).next().slideToggle('fast');
            });
        }
        return Navbar;
    }());
    bitart.Navbar = Navbar;
    bitart.navbar = [];
    var _navbar = $('.ba-navbar');
    for (var i = 0; i < _navbar.length; i++) {
        bitart.navbar.push(new Navbar($(_navbar[i])));
    }
})(bitart || (bitart = {}));
