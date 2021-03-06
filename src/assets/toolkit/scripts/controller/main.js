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
});
