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
