function chooseFile() {
    console.log('test'); 
    let text = '';
    document.getElementById('inputfile')
            .addEventListener('change', function() {
            
            var fr=new FileReader();
            fr.onload= function() {
                text = fr.result;
                console.log(text);
                document.getElementById('original_maze')
                        .textContent=fr.result;
            }
              
            fr.readAsText(this.files[0]);

            var array = Array.from(this.files[0]);
            console.log(this.files[0]);
            
            //text = text.split(' ');
            
            console.log(document.getElementById('original_maze')
                .textContent + ' Testi' );
        })

            
}

function mazeSolver() {
    console.log('test'); 
    var maze1 = document.getElementById('original_maze').textContent; 
    console.log(maze1);

    var maze2 = maze1.split("\n");
    console.log(maze2);
    var maze3 = [];
    for(var i=0; i<maze2.length; i++) {
        maze3.push(maze2[i].split(""));
    }
    console.table(maze3);
    var maze = [['X','S','X','X','X','X','X'],
                ['X',' ',' ',' ',' ',' ','X'],
                ['X',' ','X','X','X','X','X'],
                ['X',' ',' ',' ',' ',' ','X'],
                ['X',' ','X','X','X','X','X'],
                ['X',' ',' ',' ',' ',' ','E'],
                ['X','X','X','X','X','X','X']];
                
    console.log(maze);
    
    


    document.getElementById('original_maze').innerHTML = displayMaze(maze3);
    
    var start = findStartEnd(maze3,'^');
    var end = findStartEnd(maze3,'E');
    console.log(start);
    console.log(end);
    
    fillMaze(maze3, start);
   
    document.getElementById('steps').innerHTML = displayMaze(maze3);
    
    followSolution(maze3, end);
    
    document.getElementById('answer').innerHTML = displayMaze(maze3);
}

function followSolution(maze, end) {

    var height = maze.length;
    var width = maze[0].length;

    var cur_step = parseInt( maze[end[0]][end[1]] );
    console.log(cur_step)
    
    maze[end[0]][end[1]] = 'o';
    
    while (cur_step > 1) {
        y = end[0];
        x = end[1];
        console.log(end);
        console.log(cur_step);
        var get_out = 0;
        
        // check each of the neighbours (up down left right)
        for(var ny = -1; ny <= 1; ny++) { // If checking all neighbours this could be max(y-1,0):min(y+1,height)
            for(var nx = -1; nx <= 1; nx++) {
               if (Math.abs(ny) == Math.abs(nx) || y+ny < 0 || y+ny >= height || x+nx < 0 || x+nx >= width )
                    continue;


                if (maze[y+ny][x+nx] == (cur_step-1).toString()) {
                    end = [y+ny, x+nx];
                    cur_step = parseInt( maze[end[0]][end[1]] );
                    maze[y+ny][x+nx] = 'o';
                    get_out = 1;
                    break;
                }

            }
            if (get_out == 1) 
                break;

        }
    
    }
}

function displayMaze(maze) {
    
    var text = [];
    for (var y = 0; y < maze.length; y++)
        text.push(maze[y].join('')+'\n');
    
    return text.join('');
}

function findStartEnd(maze,val) {

    var height = maze.length;
    var width = maze[0].length;
        
    // find start
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            
            if (maze[y][x] == val) {
                // check the four directions
                for (var ny = -1; ny <= 1; ny++) {
                    for (var nx = -1; nx <= 1; nx++) {
                        if (Math.abs(ny) == Math.abs(nx) || y+ny < 0 || y+ny >= height || x+nx < 0 || x+nx >= width)
                            continue;
                        
                        if (maze[y+ny][x+nx] == ' ')
                            return [y+ny, x+nx];
                        
                    }
                }
            }
        }
    }
}

function fillMaze(maze, start) {

    maze[start[0]][start[1]] = '1';
    //document.getElementById('again').innerHTML = displayMaze(maze);
    var height = maze.length;
    var width = maze[0].length;
    
    queue = start;
    
    while (queue.length != 0) {
       
        var y = queue.shift();
        var x = queue.shift();
        var cur_val = parseInt(maze[y][x]);

        // check each of the neighbours
        for (var ny = -1; ny <= 1; ny++) {
            for (var nx = -1; nx <= 1; nx++) {
                if (Math.abs(ny) == Math.abs(nx) || y+ny < 0 || y+ny >= height || x+nx < 0 || x+nx >= width) 
                    continue;

                if (maze[y+ny][x+nx] == ' ') {
                    maze[y+ny][x+nx] = (cur_val+1).toString();
                    queue.push(y+ny);
                    queue.push(x+nx);
                }

            }
        }
        
        
        
    }

}