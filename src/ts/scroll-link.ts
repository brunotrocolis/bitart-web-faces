module bitart {
    export class ScrollLink {

        private VERSION: string = '0.0.1';
        private scroll_link: JQuery;
        private speed: number;
        private offset: number;
        private target: JQuery;

        constructor(scroll_link) {
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
    }

    export var scroll_link: Array<ScrollLink> = [];
    var _scroll_link: JQuery = $('.ba-scroll-link');
    for (let i: number = 0; i < _scroll_link.length; i++) {
        scroll_link.push(new ScrollLink($(_scroll_link[i])));
    }
}