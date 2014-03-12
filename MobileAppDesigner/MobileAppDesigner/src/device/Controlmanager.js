﻿define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/properties/InputProperty", "src/device/DesignerControlFactory"], function(require, exports, App, Log, InputProperty, DesignerControlFactory) {
    var ControlManager = (function () {
        function ControlManager() {
            this.log = new Log("ControlManager");
            this.idIndex = 1;
            this.idList = [];
            this.propertiesMap = [];
            this.log.Debug("constructor");
            this.controlFactory = new DesignerControlFactory();
        }
        ControlManager.prototype.Init = function () {
            var _this = this;
            this.log.Debug("Init");

            //this.CreatePage("MainPage");
            $("#MainPage").on('drop', function (event) {
                return _this.OnDrop(event);
            });
            $("#MainPage").on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
        };

        /* Pages */
        ControlManager.prototype.CreatePage = function (pageId) {
            var _this = this;
            this.log.Debug("CreatePage: " + pageId);
            this.log.DebugObj(this.idList);
            if (this.ContainsId(pageId)) {
                this.log.Warn("Page id alredy exists");

                //TODO: show notification
                alert('Id already exists');
                return false;
            }
            this.idList.push(pageId);
            var newPage = $('<div data-role="page"></div>');
            newPage.attr('id', pageId);
            newPage.on('drop', function (event) {
                return _this.OnDrop(event);
            });
            newPage.on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
            $('body').append(newPage);
            this.SelectPage(pageId);
            return true;
        };

        ControlManager.prototype.SelectPage = function (pageId) {
            this.log.Debug("SelectPage: " + pageId);
            $.mobile.changePage('#' + pageId);
        };

        /* Controls */
        ControlManager.prototype.CreateControl = function (controlId) {
            this.log.Debug("CreateControl: " + controlId);
            this['Create' + controlId]();
        };

        ControlManager.prototype.CreateButton = function () {
            var bt = this.controlFactory.CreateButton(this.GetNewId());
            this.propertiesMap[bt.Properties.Id] = bt.Properties;
            $(event.currentTarget).append(bt.Element);
        };

        ControlManager.prototype.CreateInput = function () {
            var _this = this;
            var input = $('<input type="text">');

            var prop = new InputProperty(this.GetNewId());
            input.attr('id', prop.Id);

            this.propertiesMap[prop.Id] = prop;
            $(event.currentTarget).append(input);

            input.on('click', function (event) {
                _this.log.Debug('input click', $(event.target));
                App.Instance.Designer.ShowProperty($(event.target).data('prop'));
            });

            //$(event.currentTarget).trigger('create');
            input = input.textinput();
            input.data('prop', prop);
        };

        /* Id */
        ControlManager.prototype.GetNewId = function () {
            var id = 'id' + this.idIndex++;
            if (this.ContainsId(id)) {
                this.log.Warn('id: ' + id + ' already exists');
                id = 'id' + this.idIndex++;
            }
            this.idList.push(id);
            return id;
        };

        ControlManager.prototype.ContainsId = function (id) {
            return this.idList.indexOf(id) >= 0;
        };

        ControlManager.prototype.ChangeId = function (id, newId) {
            this.log.Debug("ChangeId, id=" + id + ", newId=" + newId);

            this.idList.push(newId);
            delete this.idList[this.idList.indexOf(id)];
            this.propertiesMap[newId] = this.propertiesMap[id];
            this.propertiesMap[newId].Id = newId;
            delete this.propertiesMap[id];
        };

        ControlManager.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop, event: ", event);
            event.preventDefault();
            var controlId = event.originalEvent.dataTransfer.getData("Text");
            this.CreateControl(controlId);
        };

        ControlManager.prototype.OnDragOver = function (e) {
            //this.log.Debug("OnDragOver");
            e.preventDefault();
        };

        ControlManager.prototype.ChangeProperty = function (propertyId, propertyType, controlType, newValue) {
            this.log.Debug("OnChangeProperty, propertyId: " + propertyId + " propertyType: " + propertyType + " controlType: " + controlType + " value: " + newValue);
            switch (controlType) {
                case 1 /* Button */:
                    this.ChangeButtonProperty(propertyId, propertyType, newValue);
                    break;
                case 2 /* Input */:
                    this.ChangeInputProperty(propertyId, propertyType, newValue);
                    break;
            }
        };

        ControlManager.prototype.ChangeButtonProperty = function (propertyId, propertyType, newValue) {
            switch (propertyType) {
                case 1 /* Id */:
                    if (this.ContainsId(newValue)) {
                        //TODO: show notification
                        alert('Id already exists');
                    } else {
                        $('#' + propertyId).attr('id', newValue);
                        this.ChangeId(propertyId, newValue);
                    }
                    break;
                case 0 /* Text */:
                    $('#' + propertyId).children('.ui-btn-inner').children('.ui-btn-text').text(newValue);
                    break;
                case 2 /* Inline */:
                    var cond = newValue == "true";
                    $('#' + propertyId).buttonMarkup({ inline: cond });
                    break;
                case 3 /* Corners */:
                    var cond = newValue == "true";
                    $('#' + propertyId).buttonMarkup({ corners: cond });
                    break;
                case 4 /* Mini */:
                    var cond = newValue == "true";
                    $('#' + propertyId).buttonMarkup({ mini: cond });
                    break;
                case 5 /* Theme */:
                    $('#' + propertyId).buttonMarkup({ theme: newValue });
                    break;
            }
        };

        ControlManager.prototype.ChangeInputProperty = function (propertyId, propertyType, newValue) {
            this.log.Debug("ChangeInputProperty");
            switch (propertyType) {
                case 1 /* Id */:
                    if (this.ContainsId(newValue)) {
                        //TODO: show notification
                        alert('Id already exists');
                    } else {
                        $('#' + propertyId).attr('id', newValue);
                        this.ChangeId(propertyId, newValue);
                    }
                    break;
                case 4 /* Mini */:
                    var cond = newValue == "true";

                    //Not work
                    $('#' + propertyId).textinput({ mini: cond });
                    break;
                case 5 /* Theme */:
                    break;
            }
        };
        return ControlManager;
    })();

    
    return ControlManager;
});
//# sourceMappingURL=ControlManager.js.map
