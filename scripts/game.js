define(["jquery","jquery-ui"],function($){
   var clicks = 0;
    function Xor(){
        this.board = [
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0]
        ];
    }

    Xor.prototype = {

    };

    var game = new Xor();

    for (var y=0;y<12;y++){
        for (var x=0;x<12;x++)
        {
            /* jshint -W014 */
            $("#blocks").append($("<li></li>", { 
                data: {x: x, y: y},
                "class": (game.board[y][x] === 1)
                    ? "block on" 
                    : "block" }));
        }
    }

    var selected = [];
    $("#blocks").selectable({
        selected: function(e, ui){
            selected.push(ui.selected);
        }
    });

    /* jshint -W098 */
    $("#blocks").on("selectablestop", function(e, ui){
        var idx = 0;
        var total = selected.length;
        if (total > 3){
            /* At least 4 blocks */

            var selection = { 
                x: {first: parseInt($(selected[0]).data("x")),
                    last: parseInt($(selected[total -1]).data("x"))},
                y: {first: parseInt($(selected[0]).data("y")),
                    last:  parseInt($(selected[total -1]).data("y"))}
            };

            if (isSquare(selection)){
                clicks++;
                /* jshint -W030 */
                for (;idx<total;idx++){
                    var blk = $(selected[idx]); 
                    if (blk.hasClass("on")) {
                        $(selected[idx]).removeClass("on")
                        game.board[blk.data("y")][blk.data("x")] = 0;
                    } else {
                        $(selected[idx]).addClass("on");
                        game.board[blk.data("y")][blk.data("x")] = 1;
                    }
                }
            }
        }
            
        /* Clear selection buffer */
        selected = [];
    });

    function isSquare(sel){
        return (( sel.x.last - sel.x.first) === (sel.y.last - sel.y.first));
    }

    function printBoard(game){
        var whole = "";
        for (var i=0;i<game.board.length;i++){
            whole += game.board[i].toString() + ",\n";
        }
        console.log(whole);
        console.log("clicks: " + clicks);
    }

    pb = printBoard;
    g = game;

});