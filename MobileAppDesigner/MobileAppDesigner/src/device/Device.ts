import App = require("src/Application");
import Log = require("src/util/log/Log");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");
import ControlManager = require("src/device/ControlManager");
import Property = require("src/properties/Property");
import ButtonProperty = require("src/properties/ButtonProperty");

class Device {

    private log = new Log("Device");

    private eventManager: EventManager;
    private controlManager: ControlManager;


    constructor() {
        this.log.Debug("constructor");
        this.eventManager = new EventManager((<any>parent).$('body'));
        this.controlManager = new ControlManager();
    }

    public Init(): void {
        this.log.Debug("Init");
        this.controlManager.Init();               
    }


    public get EventManager(): EventManager {
        return this.eventManager;
    }

    public get ControlManager(): ControlManager {
        return this.controlManager;
    }
}

export = Device;