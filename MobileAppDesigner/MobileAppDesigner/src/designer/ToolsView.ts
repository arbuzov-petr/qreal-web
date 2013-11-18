﻿import Log = require("src/util/log/Log");
import Controller = require("src/designer/Controller");
import EventManager = require("src/util/events/EventManager");

class ToolsView {

    private log = new Log("ToolsView");

    private controls = [
        {
            id: 'Button',
            title: 'Button',
            tool: 'button'
        }
    ];

    private controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;
    }

    public Init() {
        this.log.Debug("Init");
        $('#toolTmpl').tmpl(this.controls).appendTo('#controls');

        var toolItems = $('.tool-item');

        toolItems.on('dragstart', event => this.OnDragStart(event));
        toolItems.on('drag', event => this.OnDrag(event));
        toolItems.on('dragend', () => this.OnDragend());
    }

    public OnDragStart(event) {
        this.log.Debug("OnDragStart: ");
        event.originalEvent.dataTransfer.setData("ControlId", $(event.target).closest('div').attr('id'));
    }

    public OnDrag(event) {
        //this.log.Debug("OnDrag: " + event);
    }

    public OnDragend() {
        this.log.Debug("OnDragend");
    }
}

export = ToolsView;