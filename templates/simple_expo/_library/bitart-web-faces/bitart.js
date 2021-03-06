var bitart;
(function (bitart) {
    var Alert = /** @class */ (function () {
        function Alert(config) {
            var config = {
                message: config.message || config,
                type: config.type || 'info',
                time: config.time || null,
                closeable: config.closeable === undefined ? true : config.closeable,
                image: config.image || null,
                container: $(config.container || 'body')
            };
            var container = config.container;
            var alert = $("<div></div>");
            alert.addClass('ba-alert');
            alert.attr('ba-type', config.type);
            if (config.image) {
                var image = $("<img/>");
                image.attr('src', config.image);
                alert.append(image);
            }
            var message = $("<p>" + config.message + "</p>");
            alert.append(message);
            if (config.closeable) {
                var close = $("<div>⨯</div>");
                close.addClass('ba-alert-close');
                close.off().click(function () {
                    alert.hide('fast');
                });
                alert.prepend(close);
            }
            if (config.time) {
                setTimeout(function () {
                    alert.hide('fast');
                }, config.time);
            }
            $(container[0]).append(alert);
        }
        return Alert;
    }());
    bitart.Alert = Alert;
    bitart.alert = [];
    function addAlert(config) {
        bitart.alert.push(new Alert(config));
    }
    bitart.addAlert = addAlert;
})(bitart || (bitart = {}));
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
var bitart;
(function (bitart) {
    var DropDownItem = /** @class */ (function () {
        function DropDownItem(drop_down_item) {
            this.VERSION = '0.0.3';
            var _this = this;
            this.drop_down_item = drop_down_item;
            this.drop_down_box = drop_down_item.find('div');
            this.drop_down_item.hover(function () {
                _this.drop_down_box.slideToggle('fast');
            });
        }
        return DropDownItem;
    }());
    bitart.DropDownItem = DropDownItem;
    var Menu = /** @class */ (function () {
        function Menu(menu) {
            this.VERSION = '0.0.3';
            this.item = [];
            this.menu = menu;
            var item = menu.find('.ba-menu-item');
            for (var i = 0; i < item.length; i++) {
                var $item = $(item[i]);
                if ($item.attr('ba-type') === 'drop-down') {
                    this.item[i] = new DropDownItem($item);
                }
                else {
                    this.item[i] = $($item[i]);
                }
            }
        }
        return Menu;
    }());
    bitart.Menu = Menu;
    bitart.menu = [];
    var _menu = $('.ba-menu');
    for (var i = 0; i < _menu.length; i++) {
        bitart.menu.push(new Menu($(_menu[i])));
    }
})(bitart || (bitart = {}));
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
