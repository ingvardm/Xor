requirejs.config({
    baseUrl: "scripts",
    paths: {
        "jquery": "lib/jquery-2.0.1.min",
        "jquery-ui": "lib/jquery-ui-1.10.3.custom.min" 
    }
});

require(["game"],function(game){
    game.init();
});
