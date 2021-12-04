$(document).ready(function() {

    $("'[class]'").hover(function() {
        //Mouse enter
        let current_class = $(this).attr('class');
        
        $('[class="'+current_class+'"]').addClass('is-active');

    }, function() {
        //Mouse leave
        $('[class]').removeClass('is-active');
    });

});