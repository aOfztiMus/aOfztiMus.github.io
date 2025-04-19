(function($) {
    'use strict';
    $(document).ready(function() {
        // Menu Expanded
        $(".sub-menu-trigger").on('click', function(e) {
            $("sm-clean").toggleClass("menu-active");
            $("#header").toggleClass("header-expanded");
        });

        AOS.init({
            duration: 3000,
        });


        // Smartmenus
        $(function() {
            $('#main-menu').smartmenus();
        });
    });
})(jQuery);
