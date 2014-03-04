define(["game"], function(game){
    var levels = game.getLevelsData();
    var gameScreens = [
        "#start-screen",
        "#level-select-screen",
        "#game-screen"];

    function hideAll(){
        gameScreens.forEach(function(screen) {
            $(screen).hide();
        });
    }

    return {
        generateLevelsScreen: function(){
            for(var i=0; i<levels.length; i++){
                $("#levels").append($("<li>" + levels[i].id + "</li>")
                    .data("level",levels[i].id));
            }        
        },

        showScreen: function(screen){
            hideAll();
            if (gameScreens.indexOf(screen) >= 0) { $(screen).show(); } 
            else { $("#start-screen").show(); }
        },
    };
});
