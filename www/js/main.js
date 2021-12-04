$(document).ready(function() {

	$(".day").hover(
        function () {
          $(this).addClass("is-active");
        },
        function () {
          $(this).removeClass("is-active");
        }
      );
});