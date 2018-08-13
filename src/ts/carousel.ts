module bitart {
    export class Carousel {
        private VERSION: string = '0.0.8';
        private carousel: JQuery;
        private speed: number;
        private step: number;
        private time: number;
        private continuous: boolean;
        private static: boolean;
        private paused: boolean = false;
        private interval: number = null;
        private running: boolean = false;

        constructor(carousel: JQuery) {
            var _this: Carousel = this;
            this.carousel = carousel;
            this.speed = Number(carousel.attr('ba-speed')) || 500;
            this.step = Number(carousel.attr('ba-step')) || 1;
            this.time = Number(carousel.attr('ba-time')) || 3000;
            this.continuous = this.carousel.attr('ba-type') === "continuous" ? true : false;
            this.static = this.carousel.attr('ba-type') === "static" ? true : false;

            if (this.continuous) {
                this.next();
            } else {
                var slide_previous: JQuery = $("<div class='ba-slide-previous'>&lsaquo;</div>");
                var slide_next: JQuery = $("<div class='ba-slide-next'>&rsaquo;</div>");
                slide_previous.off().click(function () {
                    if (!_this.running) {
                        _this.previous();
                    }
                });
                slide_next.off().click(function () {
                    if (!_this.running) {
                        _this.next();
                    }
                });
                this.carousel.prepend([slide_previous, slide_next]);
                if (!this.static) {
                    this.interval = setInterval(function () {
                        if (!_this.paused && !_this.running) {
                            _this.next();
                        }
                    }, this.time);
                }
                this.carousel.mouseenter(function () {
                    _this.paused = true;
                });
                this.carousel.mouseleave(function () {
                    _this.paused = false;
                    if (_this.continuous && !_this.running) {
                        _this.next();
                    }
                });
            }
        }

        next(count?: number) {
            var _this: Carousel = this;
            var count: number = count || this.step;
            var slides: JQuery = this.carousel.find('.ba-slide');
            var fist: JQuery = $(slides[0]);
            var last: JQuery = $(slides[slides.length - 1]);
            fist.animate({ 'margin-left': -fist.width() }, {
                duration: _this.continuous ? _this.speed : _this.speed / _this.step,
                easing: "linear",
                start: function () {
                    _this.running = true;
                },
                done: function () {
                    _this.running = false;
                },
                complete: function () {
                    fist.css('margin', 0);
                    last.after(fist);
                    if (_this.continuous) {
                        if (!_this.paused) {
                            _this.next();
                        }
                    } else {
                        count--;
                        if (count > 0) {
                            _this.next(count);
                        }
                    }
                }
            });
        }

        previous(count?: number) {
            var _this: Carousel = this;
            var count: number = count || this.step;
            var slide: JQuery = this.carousel.find('.ba-slide');
            var fist: JQuery = $(slide[0]);
            var last: JQuery = $(slide[slide.length - 1]);
            last.css('margin-left', -fist.width());
            fist.before(last);
            last.animate({ 'margin': 0 }, {
                duration: _this.speed / _this.step,
                easing: "linear",
                start: function () {
                    _this.running = true;
                },
                done: function () {
                    _this.running = false;
                },
                complete: function () {
                    count--;
                    if (count > 0) {
                        _this.previous(count);
                    }
                }
            });
        }
    }
    export var carousel: Array<Carousel> = [];
    var _carousel: JQuery = $('.ba-carousel');
    for (let i: number = 0; i < _carousel.length; i++) {
        carousel.push(new Carousel($(_carousel[i])));
    }
}