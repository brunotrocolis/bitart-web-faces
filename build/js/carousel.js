var bitart;
(function (bitart) {
    var Carousel = /** @class */ (function () {
        function Carousel(carousel) {
            this.VERSION = '0.0.8';
            this.paused = false;
            this.interval = null;
            this.running = false;
            var _this = this;
            this.carousel = carousel;
            this.speed = Number(carousel.attr('ba-speed')) || 500;
            this.step = Number(carousel.attr('ba-step')) || 1;
            this.time = Number(carousel.attr('ba-time')) || 3000;
            this.continuous = this.carousel.attr('ba-type') === "continuous" ? true : false;
            this.static = this.carousel.attr('ba-type') === "static" ? true : false;
            if (this.continuous) {
                this.next();
            }
            else {
                var slide_previous = $("<div class='ba-slide-previous'>&lsaquo;</div>");
                var slide_next = $("<div class='ba-slide-next'>&rsaquo;</div>");
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
        Carousel.prototype.next = function (count) {
            var _this = this;
            var count = count || this.step;
            var slides = this.carousel.find('.ba-slide');
            var fist = $(slides[0]);
            var last = $(slides[slides.length - 1]);
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
                    }
                    else {
                        count--;
                        if (count > 0) {
                            _this.next(count);
                        }
                    }
                }
            });
        };
        Carousel.prototype.previous = function (count) {
            var _this = this;
            var count = count || this.step;
            var slide = this.carousel.find('.ba-slide');
            var fist = $(slide[0]);
            var last = $(slide[slide.length - 1]);
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
        };
        return Carousel;
    }());
    bitart.Carousel = Carousel;
    bitart.carousel = [];
    var _carousel = $('.ba-carousel');
    for (var i = 0; i < _carousel.length; i++) {
        bitart.carousel.push(new Carousel($(_carousel[i])));
    }
})(bitart || (bitart = {}));
