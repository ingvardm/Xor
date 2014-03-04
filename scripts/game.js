define(["text!../data/levels.json"], function(levels_data){
    var levels = JSON.parse(levels_data);
    var board, selection =[], 
        clicks;

    function createBoard(){
        var x,y;
        $("#blocks").empty();
        for(y=0; y<12; y++){
            for(x=0; x<12; x++){
                $("#blocks").append(
                    $("<li></li>", { 
                        data: { x: x, y: y }, 
                        "class": (board[y][x] === 1) 
                            ? "block on" 
                            : "block" })); 
            }
        }
    }

    function bindLocalEvents(){
        $("#blocks").selectable();
        $("#blocks").off("selectableselected");
        $("#blocks").off("selectablestop");


        $("#blocks").on("selectableselected", function(e, ui){
            selection.push(ui.selected);
        });
        
        $("#blocks").on("selectablestop", function(e, ui){
            if (selection.length > 3){
                /* At least 4 blocks */
                if (isSquare(selection)){
                    clicks++;
                    redrawBlocks();
                    if ($(".on").length === 0) {
                        /* Level complete ! */
                        window.location.hash = "#level-select-screen";
                    } 
                }
            }
            
            /* Always clear selection buffer */
            selection = [];
        }); 
    }

    function redrawBlocks(){
        /* jshint -W030 */
        for (var idx=0; idx<selection.length; idx++){
            var blk = $(selection[idx]); 
            if (blk.hasClass("on")) {
                $(selection[idx]).addClass("off");
                $(selection[idx]).removeClass("on");
                board[blk.data("y")][blk.data("x")] = 0;
            } else {
                $(selection[idx]).removeClass("off");
                $(selection[idx]).addClass("on");
                board[blk.data("y")][blk.data("x")] = 1;
            }
        }
    }

    /* Selection edges */
    function getEdges(sel){
        return { 
            /* [0] is First , [1] is Last */
            x: [$(sel[0]).data("x"), $(sel[sel.length -1]).data("x")], 
            y: [$(sel[0]).data("y"), $(sel[sel.length -1]).data("y")]
        };   
    }

    /* Selection square */
    function isSquare(sel){
        /* When (Last - First) on each axis are equal, means square */
        var edges = getEdges(sel);
        return (( edges.x[1] - edges.x[0]) === (edges.y[1] - edges.y[0]));
    }


    return {
        getLevelsData: function(){
            return levels;
        },

        loadLevel: function(level){
            clicks = 0;
            board = $.grep(levels, function(l){ return l.id === level; })[0].data;
            createBoard(level);
            bindLocalEvents();
        }
    };
});
