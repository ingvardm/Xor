define(["jquery","handlers"], function($, handlers){
    return {
        init: function(){
            $("#start-button").on("click", handlers.showLevelsScreen);
        }
    };
});
