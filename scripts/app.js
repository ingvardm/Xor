define(["handlers"], function(handlers){
    return {
        init: function(){
            handlers.onInit();
            $(window).on("hashchange", handlers.onHashChange);
            $("#levels > li").on("click", handlers.levelClick);
        }
    };
});
