;(function($) {

    $.fn.extend({
        fiftyShadesOfGrey: function (options) {
            options = $.extend({
                startColor: '#808080'
            }, options);


            var RGB = {
                componentToHex: function (c) {
                    var hex = c.toString(16);
                    return hex.length == 1 ? "0" + hex : hex;
                },
                rgbToHex: function(r, g, b) {
                    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
                },
                hexToRgb: function (hex) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : null;
                }
            };

            var draw = function ($el) {
                var startRGB = RGB.hexToRgb(options.startColor);
                var amountOfScales = 50;
                var scale = startRGB.r / amountOfScales;
                var width = $(window).width();
                var height = $(window).height();
                var widthStep = (width / amountOfScales);
                var heightStep = (height / amountOfScales);
                for(var i = 0; i < amountOfScales; i++) {
                    startRGB.r -= scale;

                    var round = Math.floor(startRGB.r);

                    var color = RGB.rgbToHex(round,round,round);

                    width -= widthStep;
                    height -= heightStep;

                    var $box = $('<div style="margin-left: auto; margin-right: auto; background-color: '+color+'; width: '+width+'px; height: '+height+'px">');


                    $el.append($box);
                    $el = $box;
                }
            };

            return this.each(function () {
                var $el = $(this);

                $(window).resize(function () {
                    $el.html('');
                    draw($el);
                });
                draw($el);
            });
        }
    });

})(jQuery);