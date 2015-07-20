class SonarSensorItem extends SensorItem {
    private scanningRegion: RaphaelPath;
    private sonarRange = 255;
    private regionStartX: number;
    private regionStartY: number;
    private regionTransformationString = "";


    constructor(robotItem: RobotItem, worldModel: WorldModel, sensorType: DeviceInfo, pathToImage: string) {
        super(robotItem, worldModel, sensorType, pathToImage);
        var paper : RaphaelPaper = worldModel.getPaper();
        this.scanningRegion = paper.path();
        this.drawRegion();
    }

    transform(transformationString: string) {
        super.transform(transformationString);
        this.drawRegion();
        //   this.scanningRegion.transform(this.regionTransformationString + transformationString);
    }

    private rotateVector(toRotate : TwoDPosition, center : TwoDPosition, angle : number) : TwoDPosition {
        var dx = toRotate.x - center.x;
        var dy = toRotate.y - center.y;
        var angleInRad = angle * Math.PI / 180;
        var newDx = dx * Math.cos(angleInRad) - dy * Math.sin(angleInRad);
        var newDy = dx * Math.sin(angleInRad) + dy * Math.cos(angleInRad);
        return new TwoDPosition(center.x + newDx, center.y + newDy);
    }

    updateTransformationString(): void {
        super.updateTransformationString();
        console.log("AA");
        this.drawRegion();
     //   this.regionTransformationString = this.scanningRegion.transform();
    }

    rotate(angle: number) {
        super.rotate(angle);

        var regionRotationX = this.image.matrix.x(this.regionStartX, this.regionStartY);
        var regionRotationY = this.image.matrix.y(this.regionStartX, this.regionStartY);

        this.scanningRegion.transform(this.regionTransformationString + "R" + angle + "," +
            regionRotationX + "," + regionRotationY);
    }

    remove(): void {
        super.remove();
        this.scanningRegion.remove();
    }

    private drawRegion() : void {
        var worldModel : WorldModel = this.robotItem.getWorldModel();
        this.scanningRegion.remove();
        var paper : RaphaelPaper = worldModel.getPaper();

        var angleInRad = this.angle * Math.PI / 180;
        this.regionStartX = this.center.x + (this.width) * Math.cos(angleInRad);
        this.regionStartY = this.center.y + (this.width) * Math.sin(angleInRad);

        var regAngle = 20;
        var halfRegAngleInRad = regAngle / 2 * (Math.PI / 180);

        var rangeInPixels = this.sonarRange * Constants.pixelsInCm;

        var regionTopX = this.regionStartX + Math.cos(halfRegAngleInRad) * rangeInPixels;
        var regionTopY = this.regionStartY - Math.sin(halfRegAngleInRad) * rangeInPixels;

        var regionBottomX = regionTopX;
        var regionBottomY = this.regionStartY + Math.sin(halfRegAngleInRad) * rangeInPixels;


        var newRegionTop : TwoDPosition = this.rotateVector(new TwoDPosition(regionTopX, regionTopY), new TwoDPosition(this.regionStartX, this.regionStartY), this.angle - regAngle / 2);
        regionTopX = newRegionTop.x;
        regionTopY = newRegionTop.y;


        var newRegionBottom : TwoDPosition = this.rotateVector(new TwoDPosition(regionBottomX, regionBottomY), new TwoDPosition(this.regionStartX, this.regionStartY), this.angle + regAngle / 2);
        regionBottomX = newRegionBottom.x;
        regionBottomY = newRegionBottom.y

        this.scanningRegion = paper.path("M" + this.regionStartX + "," + this.regionStartY +
            "L" + regionTopX + "," + regionTopY +
            "L" + regionBottomX + "," + regionBottomY + "L" + this.regionStartX + "," + this.regionStartY +
            "Z");
        this.scanningRegion.attr({fill: "#c5d0de", stroke: "#b1bbc7", opacity: 0.5});

    }

}