$(document).ready(function() {

	$(".day").hover(
        function () {
          $(this).addClass("is-active");
        },
        function () {
          $(this).removeClass("is-active");
        }
      );

      $( "button" ).click(
        function () {
            $(this).addClass("is-select");
        });
});