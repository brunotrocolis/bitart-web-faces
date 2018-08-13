module bitart {
    export class DropDownItem {

        private VERSION: string = '0.0.3';
        private drop_down_item: JQuery;
        private drop_down_box: JQuery;

        constructor(drop_down_item) {
            var _this = this;
            this.drop_down_item = drop_down_item;
            this.drop_down_box = drop_down_item.find('div');
            this.drop_down_item.hover(function () {
                _this.drop_down_box.slideToggle('fast');
            });
        }
    }

    export class Menu {

        private VERSION: string = '0.0.3';
        private menu: JQuery;
        private item: Array<any> = [];

        constructor(menu: JQuery) {
            this.menu = menu;
            var item: JQuery = menu.find('.ba-menu-item');
            for (let i = 0; i < item.length; i++) {
                var $item: JQuery = $(item[i]);
                if ($item.attr('ba-type') === 'drop-down') {
                    this.item[i] = new DropDownItem($item);
                } else {
                    this.item[i] = $($item[i]);
                }
            }
        }
    }

    export var menu: Array<Menu> = [];
    var _menu: JQuery = $('.ba-menu');
    for (let i: number = 0; i < _menu.length; i++) {
        menu.push(new Menu($(_menu[i])));
    }
}