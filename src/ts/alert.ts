module bitart {
    export class Alert {
        constructor(config: any) {

            var config: any = {
                message: config.message || config,
                type: config.type || 'info',
                time: config.time || null,
                closeable: config.closeable === undefined ? true : config.closeable,
                image: config.image || null,
                container: $(config.container || 'body')
            };

            var container: JQuery = config.container;

            var alert: JQuery = $("<div></div>");
            alert.addClass('ba-alert');
            alert.attr('ba-type', config.type);
            if (config.image) {
                var image: JQuery = $("<img/>");
                image.attr('src', config.image);
                alert.append(image);
            }
            var message: JQuery = $("<p>" + config.message + "</p>");
            alert.append(message);
            if (config.closeable) {
                var close: JQuery = $("<div>⨯</div>");
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
    }
    export var alert: Array<Alert> = [];
    export function addAlert(config) {
        alert.push(new Alert(config));
    }
}