var ShortestPathStep = function (pos) {
    this.position = pos;
    this.gScore = 0;
    this.hScore = 0;
    this.parent = false;


}
ShortestPathStep.prototype.isEqual = function (step) {
    if (this.position.x == step.position.x && this.position.y == step.position.y) {
        return true;
    }
    return false;
}

ShortestPathStep.prototype.fScore = function () {
    return this.gScore + this.hScore;
}

/* class A* path finder*/
var PathFinder = function () {
    this.openSteps = [];
    this.closedSteps = [];
    //map is matrix value
    this.map = [];
    //can not wal through wall
    this.wall = 0;
}

PathFinder.prototype.moveToward = function (fromPosition, toPosition) {
    if (fromPosition.x == toPosition.x && fromPosition.y == toPosition.y) {
        return;//same position
    }
    var pathFinder = false;
    this.openSteps = [];
    this.closedSteps = [];
    this.insertInOpenSteps(new ShortestPathStep(fromPosition));
    do {
        //lay gia tri fScore nho nhat (do mang sap xep theo thu tu fscore)
        //lay gia tri cua phan tu dau tien
        var currentStep = this.openSteps.shift();
        //them vao mang close
        this.closedSteps.push(currentStep);
        //kiem tra  currentStep trung voi to POsition
        if (currentStep.isEqual({position: toPosition})) {
            pathFinder = true;
            var tempStep = currentStep;
            cc.log('path finder');
            do {
                cc.log(tempStep);
                tempStep = tempStep.parent;//quay lai
            } while (!tempStep)

            break;
        }

        var adjSteps = this.walkableOfPosition(currentStep.position);
        for (var k in adjSteps) {
            var step = new ShortestPathStep(adjSteps[k]);

            if (this.inclosedSteps(step)) {
                continue;
            }
            var moveCost = this.costToMoveFromStep(currentStep, step);
            var index = this.inOpenSteps(step);
            if (!index) {
                //ko nam trong open list , them vao open
                step.parent = currentStep;
                step.gScore = currentStep.gScore + moveCost;
                step.hScore = this.computeHScore(step.position, toPosition);

                this.insertInOpenSteps(step);

            } else {
                //nam trong open list
                // lay gia tri da duoc tinh toan score trong open list
                step = index;
                //kiem tra g score
                if (currentStep.gScore + moveCost < step.gScore) {
                    step.gScore = currentStep.gScore + moveCost;
                    //xoa khoi  list open vi thay doi gscore

                    this.removeFromOpensteps(step);
                    //add lai de mang sap xep lai
                    this.insertInOpenSteps(step);

                }

            }

        }

    } while (this.openSteps.length > 0);

    if (!pathFinder) {
        //not found
        return false;
    } else {
        //found
        var path = [];
        var step = currentStep;
        do {
            if (step.parent) { // Don't add the last step which is the start position (remember we go backward, so the last one is the origin position ;-)
                path.unshift(step);
            }
            step = step.parent; // Go backward
        } while (step);
        return path;
    }

}


PathFinder.prototype.insertInOpenSteps = function (step) {
    var stepScore = step.fScore();
    var count = this.openSteps.length;
    var i = 0;
    for (i; i < count; i++) {
        if (stepScore <= this.openSteps[i].fScore()) {
            break;
        }
    }
    this.openSteps[i] = step;
}

PathFinder.prototype.computeHScore = function (fromPosition, toPosition) {
    return Math.abs(toPosition.x - toPosition.x) + Math.abs(toPosition.y - fromPosition.y);
}

PathFinder.prototype.costToMoveFromStep = function (fromStep, toStep) {
    return ((fromStep.position.x != toStep.position.x) && (fromStep.position.y != toStep.position.y)) ? 14 : 10;
}

PathFinder.prototype.walkableOfPosition = function (position) {
    var temp = [];
    //top walkable
    var p = {x: position.x, y: position.y - 1};
    if (this.isValidPosition(p) && !this.isWall(p)) {
        temp.push(p);
    }
    //left walkable
    p = {x: position.x - 1, y: position.y};
    if (this.isValidPosition(p) && !this.isWall(p)) {
        temp.push(p);
    }
    //bottom walkable
    p = {x: position.x, y: position.y + 1};
    if (this.isValidPosition(p) && !this.isWall(p)) {
        temp.push(p);
    }

    //right walkable
    p = {x: position.x + 1, y: position.y};
    if (this.isValidPosition(p) && !this.isWall(p)) {
        temp.push(p);
    }
    return temp;
}

//check position is valid
PathFinder.prototype.isValidPosition = function (position) {

    if (this.map[position.x] && this.map[position.x][position.y]) {
        return true;
    }
    return false;
}

//check position can not walk
PathFinder.prototype.isWall = function (position) {
    //gia tri nho hon wall la ko the di qua
    if (this.map[position.x][position.y] <= this.wall) {
        return true;
    }
    return false
}

//kiem tra xem vi tri co nam trong close array hay ko
PathFinder.prototype.inclosedSteps = function (step) {
    for (var k in this.closedSteps) {
        if (this.closedSteps[k].isEqual(step)) {
            return this.closedSteps[k];
        }
    }
    return false;
}

//kiem tra xem vi tri co nam trong open array hay ko
PathFinder.prototype.inOpenSteps = function (step) {
    for (var k in this.openSteps) {
        if (this.openSteps[k].isEqual(step)) {
            return this.openSteps[k];
        }
    }
    return false;
}

//xoa khoi mang open array
PathFinder.prototype.removeFromOpensteps = function (step) {
    for (var k in this.openSteps) {
        if (this.openSteps[k].isEqual(step)) {
            return this.openSteps.splice(k, 1);
        }
    }
    return false;
}


PathFinder.prototype.setMap = function (map) {
    this.map = map;
}

PathFinder.prototype.setwall = function (wall) {
    this.wall = wall;
}