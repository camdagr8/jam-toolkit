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
        autoclose:      true,
        templates:      {
            leftArrow:  '<i class="lnr-chevron-left"></i>',
            rightArrow: '<i class="lnr-chevron-right"></i>'
        }
    });

    /**
     * Wysiwyg
     */
    $('[data-wysiwyg]').trumbowyg({
        autogrow:           true,
        removeformatPasted: true,
        btns:               [
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
    for (let i = 1; i <= 10; i++) {
        let num = (i < 10) ? '0' + i : num;
        typeaheadTestSource.push('name ' + num);
        typeaheadTestSource.push('test ' + num);
        typeaheadTestSource.push('blah ' + num);
    }

    $('[data-typeahead-input]').each(function () {
        let opt = $(this).data('typeahead-input') || {minLength: 0, hint: true, highlight: true, limit: 10};
        let source = (opt.hasOwnProperty('source')) ? opt.source : typeaheadTestSource;

        if (Array.isArray(source)) {
            source.sort();
        }

        let bh = new Bloodhound({
            sufficient: 0,
            local             : source,
            datumTokenizer    : Bloodhound.tokenizers.whitespace,
            queryTokenizer    : Bloodhound.tokenizers.whitespace
        });

        this.__bhf = function (q, sync) {
            if (q.length < 1) {
                sync(bh.get(...source));
            } else {
                bh.search(q, sync);
            }
        };

        delete opt.source;
        $(this).typeahead(opt, {name: $(this).attr('name'), source: this.__bhf});
    });

    $(document).on('click', '[data-typeahead-toggle]', function () {
        let th = $(this).closest('.input-group').find('.tt-input[data-typeahead-input]');
        if (th.length > 0) {
            th.focus();
        }
    });
});
