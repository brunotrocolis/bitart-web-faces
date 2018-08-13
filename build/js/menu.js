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
