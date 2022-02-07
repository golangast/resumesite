; (function ($, window, document, undefined) {
    var chatBubble = "chatBubble",
        defaults = {
            typingSpeed: 40, // speed in words per minute
            delay: 1000 // delay between adding messages
        };
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = chatBubble;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            var self = this;

            $(self.element).addClass('cb__list');

            var messages = this.options.messages;
            var count = messages.length;
            var typingSpeed = this.options.typingSpeed || this.defaults.typingSpeed;
            var delay = this.options.delay || this.defaults.delay;

            var i = 0;

            function addMessage() {
                self.addMessage(self.element, messages[i], typingSpeed).then(function () {
                    window.setTimeout(function () {
                        i++;
                        if (i < count) addMessage();
                        window.setTimeout(function () {
                            $('#messages li:nth-child(' + i + ')').children().remove();
                            if (i == 2) {
                                $('#messages').append('<a href="/home"><center><h2>Lets go to town!</h2></center></a>');
                            }
                        }, 3000);
                    }, delay);
                });
            }

            addMessage();
        },

        addMessage: function (el, message, typingSpeed) {

            var $listItem = $('<li></li>');
            var $bubble = $('<div class="bubble typing">...</div>');
            var words = message.split(' ').length;
            var speed = (words / typingSpeed) * 6000;

            if (speed < 1000) speed = 1000;
            if (speed > 10000) speed = 10000;

            $listItem.html($bubble);
            $(el).append($listItem);

            return new Promise(function (resolve, reject) {
                window.setTimeout(function () {
                    $bubble.html(message).removeClass('typing');
                    resolve(true);

                }, speed);

            });
        }
    };

    $.fn[chatBubble] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + chatBubble)) {
                $.data(this, "plugin_" + chatBubble,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

var messages = ['Welcome to my site', ' My name is Zachary Endrulat and I enjoy working in the web.', 'Hope you enjoy the site.'];
$('#messages').chatBubble({
    messages: messages,
    typingSpeed: 40,
    delay: 1000
});
