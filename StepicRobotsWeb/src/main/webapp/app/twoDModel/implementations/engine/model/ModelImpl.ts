class ModelImpl implements Model {
    private worldModel : WorldModel;
    private settings : Settings;
    private robotModels : RobotModel[] = [];

    constructor() {
        var model = this;
        model.worldModel = new WorldModelImpl();
    }

    getWorldModel() : WorldModel {
        return this.worldModel;
    }

    getRobotModels() : RobotModel[] {
        return this.robotModels;
    }

    getSetting() : Settings {
        return this.settings;
    }

    addRobotModel(robotModel: TwoDRobotModel): void {
        var model = this;
        $(document).ready(function() {
            var robot:RobotModel = new RobotModelImpl(model.worldModel, robotModel, new TwoDPosition(300, 300));
            model.robotModels.push(robot);
        });
    }

    private parsePositionString(positionStr: string): TwoDPosition {
        var splittedStr = positionStr.split(":");
        var x = parseFloat(splittedStr[0]);
        var y = parseFloat(splittedStr[1]);
        return new TwoDPosition(x, y);
    }

    private min(a: number, b: number): number {
        return (a < b) ? a : b;
    }

    private findMinPos(xml): TwoDPosition {
        var minX = 2000;
        var minY = 2000;

        var walls = xml.getElementsByTagName("wall");

        if (walls) {
            for (var i = 0; i < walls.length; i++) {
                var beginPosStr: string = walls[i].getAttribute('begin');
                var beginPos = this.parsePositionString(beginPosStr);
                minX = this.min(beginPos.x, minX);
                minY = this.min(beginPos.y, minY);

                var endPosStr: string = walls[i].getAttribute('end');
                var endPos = this.parsePositionString(endPosStr);
                minX = this.min(endPos.x, minX);
                minY = this.min(endPos.y, minY);
            }
        }

        var lines = xml.getElementsByTagName("colorFields")[0].getElementsByTagName("line");

        if (lines) {
            for (var i = 0; i < lines.length; i++) {
                var beginPosStr: string = lines[i].getAttribute('begin');
                var beginPos: TwoDPosition = this.parsePositionString(beginPosStr);
                var endPosStr: string = lines[i].getAttribute('end');
                var endPos: TwoDPosition = this.parsePositionString(endPosStr);
                var width: number = parseInt(lines[i].getAttribute('stroke-width'));

                minX = this.min(beginPos.x - width, minX);
                minY = this.min(beginPos.y - width, minY);
                minX = this.min(endPos.x - width, minX);
                minY = this.min(endPos.y - width, minY);
            }
        }

        var regions = xml.getElementsByTagName("region");

        if (regions) {
            for (var i = 0; i < regions.length; i++) {
                var x = parseFloat(regions[i].getAttribute('x'));
                var y = parseFloat(regions[i].getAttribute('y'));
                minX = this.min(x, minX);
                minY = this.min(y, minY);
            }
        }

        var robots = xml.getElementsByTagName("robot");

        for (var i = 0; i < robots.length; i++) {
            var posString = robots[i].getAttribute('position');
            var pos = this.parsePositionString(posString);
            minX = this.min(pos.x, minX);
            minY = this.min(pos.y, minY);

            var sensors = robots[i].getElementsByTagName("sensor");
            for (var j = 0; j < sensors.length; j++) {
                var posString = sensors[j].getAttribute('position');
                var pos = this.parsePositionString(posString);
                minX = this.min(pos.x, minX);
                minY = this.min(pos.y, minY);
            }

            var startPosition = robots[i].getElementsByTagName("startPosition")[0];
            if (startPosition) {
                var x = parseFloat(startPosition.getAttribute('x'));
                var y = parseFloat(startPosition.getAttribute('y'));
            }
        }

        return new TwoDPosition(minX, minY);
    }

    deserialize(xml): void {
        var minPos: TwoDPosition = this.findMinPos(xml);
        var offsetX = (minPos.x < 0) ? (-minPos.x + 100) : 100;
        var offsetY = (minPos.y < 0) ? (-minPos.y + 100) : 100;
        this.worldModel.deserialize(xml, offsetX, offsetY);

        var robots = xml.getElementsByTagName("robot");

        for (var i = 0; i < robots.length; i++) {
            this.robotModels[i].deserialize(robots[i], offsetX, offsetY);
        }
    }
}