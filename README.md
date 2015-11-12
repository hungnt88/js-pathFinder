# js-pathFinder
Setting matrix finder
var pathFinder = new PathFinder();
var map =  [ [0, 1, 1, 0, 0, 0, 1, 1, 0 ],
              [1, 1, 1, 1, 1, 1, 1, 1, 1 ],
              [1, 1, 1, 1, 1, 1, 1, 1, 1 ],
              [1, 1, 1, 1, 1, 1, 1, 1, 1 ],
              [0, 0, 1, 1, 1, 1, 1, 0, 0 ],
              [1, 1, 1, 1, 1, 1, 1, 1, 1 ],
              [1, 1, 1, 1, 1, 1, 1, 1, 1 ],
              [1, 1, 1, 1, 1, 1, 1, 1, 1 ],
              [0, 1, 1, 0, 0, 0, 1, 1, 0 ] ];
  //note : value = 0 cannot throught (setting : pathFinder.setWall(0);
pathFinder.setMap([map]);
pathFinder.moveToward({x:1,y:1},{x:8,y:8});
