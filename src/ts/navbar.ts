module bitart {
    export class Navbar {

        private VERSION: string = '0.0.1';
        private navbar: JQuery;

        constructor(navbar: JQuery) {
            this.navbar = navbar;
            var menu: JQuery = this.navbar.find('.ba-menu');
            var toggle: JQuery = $("<div class='ba-toggle-menu'></div>");
            menu.before(toggle);
            toggle.off().click(function () {
                $(this).next().slideToggle('fast');
            });
        }
    }

    export var navbar: Array<Navbar> = [];
    var _navbar: JQuery = $('.ba-navbar');
    for (let i: number = 0; i < _navbar.length; i++) {
        navbar.push(new Navbar($(_navbar[i])));
    }
}