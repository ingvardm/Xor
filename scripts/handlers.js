define(["views","game"], function(views, game){
    return {
        onInit: function(){
            views.generateLevelsScreen();
        },

        onHashChange: function() {
            console.log("changing screens");
            views.showScreen(window.location.hash);
        },

        levelClick: function(){
            game.loadLevel($(this).data("level"));
            window.location.hash = "#game-screen";
        }    
    };
});
