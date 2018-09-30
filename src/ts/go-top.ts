module bitart {
    export class GoTop {

        private VERSION: string = '0.0.1';
        private go_top: JQuery;
        private speed: number;
        private offset: number;

        constructor(go_top) {
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
    }

    export var go_top: Array<GoTop> = [];
    var _go_top: JQuery = $('.ba-go-top');
    for (let i: number = 0; i < _go_top.length; i++) {
        go_top.push(new GoTop($(_go_top[i])));
    }
}