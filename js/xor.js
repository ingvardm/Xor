

    function Xor(){
        this.board = [
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0,0,0,0,0],
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
            $("<li></li>", { 
                data: {x: x, y: y},
                "class": (game.board[y][x] === 1) 
                    ? "block on" 
                    : "block" }).appendTo($("#blocks"));
        }
    }

    var selected = [];
    $("#blocks").selectable();
    $("#blocks").on("selectableselected",function(e, ui){
        selected.push(ui.selected);
    });
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
            }

            if (isSquare(selection))
                for (;idx<total;idx++){
                    $(selected[idx]).hasClass("on")
                        ? $(selected[idx]).removeClass("on")
                        : $(selected[idx]).addClass("on");
                }
        }
            
        /* Clear selection buffer */
        selected = [];
    });

    function isSquare(sel){
        return (( sel.x.last - sel.x.first) === (sel.y.last - sel.y.first));
    }

    function printBoard(game){
        for (var i=0;i<game.board.length;i++)
            console.log(game.board[i].toString() + ",");
    }

