// Bootstrap initializers
$(function () {
    /**
     * Tooltips
     */
    $('[data-toggle="tooltip"]').tooltip();


    /**
     * Popovers
     */
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="popover-dismissable"]').popover();


    /**
     * Tags Input
     */
    $('input[type="tags"]').tagsInput({delimiter: [',', ';', ' ']});

    /** Range Slider **/
    //$('input[type="range"]').rangeslider({polyfill: false});


    /**
     * Datepicker
     */
    $('[data-datepicker]').datepicker({
        todayHighlight: true,
        autoclose: true,
        templates: {
            leftArrow: '<i class="lnr-chevron-left"></i>',
            rightArrow: '<i class="lnr-chevron-right"></i>'
        }
    });

    /**
     * Wysiwyg
     */
    $('[data-wysiwyg]').trumbowyg({
        autogrow: true,
        removeformatPasted: true,
        btns: [
            ['viewHTML'],
            ['formatting'],
            'btnGrp-semantic',
            ['superscript', 'subscript'],
            'btnGrp-justify',
            'btnGrp-lists',
            ['horizontalRule'],
            ['removeformat'],
            ['plugin'],
            ['fullscreen']
        ]
    });

    // Modal
    $(document).on('show.bs.modal', '.modal', function () {
        $(this).appendTo('body');
    });

    // Typeahead
    let typeaheadTestSource = [];
    for (let i = 1; i <= 10; i++) { typeaheadTestSource.push('name ' + i); }

    $('[data-typeahead]').each(function () {
        console.log('typeahead setup');
        let opt = $(this).data('typeahead') || {minLength: 2, source: typeaheadTestSource};
        $(this).typeahead(opt);
    });
});
