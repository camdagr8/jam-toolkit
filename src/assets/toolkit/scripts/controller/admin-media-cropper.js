"use strict";
const swiper        = require('swiper');
const noUiSlider    = require('nouislider');
const log           = console.log.bind(console);

$(function() {

    $('#media-editor-modal').on('shown.bs.modal', function () {
        let image = $('#cropper-img')[0];

        if (!image.hasOwnProperty('cropper')) {

            let crop = new Cropper(image, {
                preview         : '.crop-preview-original',
                rotatable       : true,
                scalable        : true,
                zoom            : 1,
                zoomable        : true,
                zoomOnWheel     : false,
                zoomOnTouch     : true,
                autoCropArea    : .9,
                dragMode        : 'crop',
                viewMode        : 2,
                strict: false
            });

            image['swiper'] = new Swiper('#media-editor-modal .swiper-container', {
                direction                : 'vertical',
                autoHeight               : true,
                slidesPerView            : 'auto',
                spaceBetween             : 15,
                keyboardControl          : true,
                paginationClickable      : true,
                nextButton               : '.swiper-button-next',
                prevButton               : '.swiper-button-prev',
                mousewheelControl        : true,
                mousewheelSensitivity    : 0,
                freeModeMomentumRatio    : 5,
                slideToClickedSlide      : true,
                loop                     : false
            });
        }
    });

    $('[data-slider]').each(function () {
        let min = $(this).attr('min') || 0;
        let max = $(this).attr('max') || 100;
        let val = $(this).attr('value') || 0;
        let dir = $(this).data('slider') || 'horizontal';

        noUiSlider.create(this, {
            start: Number(val),
            connect: [true, false],
            orientation: dir,
            range: {
                'min': Number(min),
                'max': Number(max)
            }
        });

        this.noUiSlider.on('update', function (values, handle) {
            let i = $('#cropper-img')[0];
            if (i.hasOwnProperty('cropper')) {
                let value = values[handle];
                i.cropper.zoomTo(value);
            }
        });
    });

    $(document).on('mousedown', '[data-rotate]', function () {
        let d = $(this).data();
        let i = $(d.rotate)[0];

        if (this.hasOwnProperty('__ival')) {
            clearInterval(this.__ival);
        }

        if (i.hasOwnProperty('cropper')) {
            let dir = d['rotateDirection'];
            let v = 5;
            let amt = (dir === 'left') ? v * -1 : v;

            i.cropper.rotate(amt);

            this.__ival = setInterval(function () {
                i.cropper.rotate(amt);
            }, 100);
        }
    });

    $(document).on('mouseout', '[data-rotate]', function () {
        if (this.hasOwnProperty('__ival')) {
            clearInterval(this.__ival);
        }
    });

    $(document).on('mouseup', '[data-rotate]', function () {
        if (this.hasOwnProperty('__ival')) {
            clearInterval(this.__ival);
        }
    });

    $(document).on('click', '[data-flip]', function () {
        let d = $(this).data();
        let i = $(d.flip)[0];

        if (i.hasOwnProperty('cropper')) {
            let dir = String(d['flipDirection']).toLowerCase();
            let stat = i.cropper.getData();

            if (dir === 'horizontal') {
                let x = stat.scaleX * -1;
                i.cropper.scaleX(x);
            } else {
                let y = stat.scaleY * -1;
                i.cropper.scaleY(y);
            }
        }
    });

    $(document).on('click', '#media-editor-modal .thumbs .swiper-slide', function () {
        let url = $(this).find('img').attr('src');
        $(this).parent().find('.active').removeClass('active');

        if (url) {
            let i = $('#cropper-img')[0];
            if (i.hasOwnProperty('cropper')) { i.cropper.replace(url); }
            $(this).parent().find('.swiper-slide').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('#media-editor-modal').modal('show');
});


