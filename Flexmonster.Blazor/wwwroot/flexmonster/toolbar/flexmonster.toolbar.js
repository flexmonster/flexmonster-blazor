/** 
 * Flexmonster Pivot Table & Charts [https://www.flexmonster.com/]
 * February 2021 (v. ${PIVOT_VERSION_NUMBER})
 * Copyright (c) 2021 Flexmonster. All rights reserved.
 *
 * Flexmonster Pivot Table & Charts commercial licenses may be obtained at
 * https://www.flexmonster.com/pivot-table-editions-and-pricing/
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
var FlexmonsterToolbar = function (pivotContainer, pivot, _, width, labels, dataSourceType, accessibility) {
    this.pivot = pivot;
    this.pivotContainer = pivotContainer;
    this.width = (typeof width == "number" || (width.indexOf("px") < 0 && width.indexOf("%") < 0)) ? width + "px" : width;
    this.Labels = labels;
    this.dataSourceType = dataSourceType || 5;
    this.accessibility = accessibility;
}
FlexmonsterToolbar.prototype.getTabs = function () {
    var tabs = [];
    var Labels = this.Labels;
    // Connect tab
    tabs.push({
        title: Labels.connect,
        id: "fm-tab-connect",
        icon: this.icons.connect,
        kibana: false,
        menu: [{
            title: Labels.connect_local_csv,
            id: "fm-tab-connect-local-csv",
            handler: this.connectLocalCSVHandler,
            mobile: false,
            icon: this.icons.connect_csv
        },
        {
            title: Labels.connect_local_json,
            id: "fm-tab-connect-local-json",
            handler: this.connectLocalJSONHandler,
            mobile: false,
            icon: this.icons.connect_json
        },
        {
            title: this.osUtils.isMobile ? Labels.connect_remote_csv_mobile : Labels.connect_remote_csv,
            id: "fm-tab-connect-remote-csv",
            handler: this.connectRemoteCSV,
            icon: this.icons.connect_csv_remote
        },
        {
            title: this.osUtils.isMobile ? Labels.connect_remote_json_mobile : Labels.connect_remote_json,
            id: "fm-tab-connect-remote-json",
            handler: this.connectRemoteJSON,
            icon: this.icons.connect_json_remote
        },
        {
            title: this.osUtils.isMobile ? Labels.connect_olap_mobile : Labels.connect_olap,
            id: "fm-tab-connect-olap",
            handler: this.connectOLAP,
            flat: false,
            icon: this.icons.connect_olap
        },
        {
            title: this.osUtils.isMobile ? Labels.connect_elastic_mobile : Labels.connect_elastic,
            id: "fm-tab-connect-elastic",
            handler: this.connectElastic,
            flat: false,
            icon: this.icons.connect_elastic
        }
        ]
    });

    // Open tab
    tabs.push({
        title: Labels.open,
        id: "fm-tab-open",
        icon: this.icons.open,
        kibana: false,
        menu: [{
            title: Labels.local_report,
            id: "fm-tab-open-local-report",
            handler: this.openLocalReport,
            mobile: false,
            icon: this.icons.open_local
        },
        {
            title: this.osUtils.isMobile ? Labels.remote_report_mobile : Labels.remote_report,
            id: "fm-tab-open-remote-report",
            handler: this.openRemoteReport,
            icon: this.icons.open_remote
        }
        ]
    });

    // Save tab
    tabs.push({
        title: Labels.save,
        id: "fm-tab-save",
        handler: this.saveHandler,
        mobile: false,
        kibana: false,
        icon: this.icons.save
    });

    // Export tab
    tabs.push({
        title: Labels.export,
        id: "fm-tab-export",
        mobile: false,
        icon: this.icons.export,
        menu: [{
            title: Labels.export_print,
            id: "fm-tab-export-print",
            handler: this.printHandler,
            icon: this.icons.export_print
        },
        {
            title: Labels.export_html,
            id: "fm-tab-export-html",
            handler: this.exportHandler,
            args: "html",
            icon: this.icons.export_html
        },
        {
            title: Labels.export_csv,
            id: "fm-tab-export-csv",
            handler: this.exportHandler,
            args: "csv",
            icon: this.icons.export_csv
        },
        {
            title: Labels.export_excel,
            id: "fm-tab-export-excel",
            handler: this.exportHandler,
            args: "excel",
            icon: this.icons.export_excel
        },
        {
            title: Labels.export_image,
            id: "fm-tab-export-image",
            handler: this.exportHandler,
            args: "image",
            icon: this.icons.export_image
        },
        {
            title: Labels.export_pdf,
            id: "fm-tab-export-pdf",
            handler: this.exportHandler,
            args: "pdf",
            icon: this.icons.export_pdf
        },
        ]
    });
    tabs.push({
        divider: true
    });

    // Grid tab
    tabs.push({
        title: Labels.grid,
        id: "fm-tab-grid",
        handler: this.gridHandler,
        icon: this.icons.grid
    });

    // Charts tab
    tabs.push({
        title: Labels.charts,
        id: "fm-tab-charts",
        onShowHandler: this.checkChartMultipleMeasures,
        icon: this.icons.charts,
        menu: [{
            title: Labels.charts_column,
            id: "fm-tab-charts-column",
            handler: this.chartsHandler,
            args: "column",
            icon: this.icons.charts
        },
        {
            title: Labels.charts_bar_horizontal,
            id: "fm-tab-charts-bar-horizontal",
            handler: this.chartsHandler,
            args: "bar_h",
            icon: this.icons.charts_bar
        },
        {
            title: Labels.charts_line,
            id: "fm-tab-charts-line",
            handler: this.chartsHandler,
            args: "line",
            icon: this.icons.charts_line
        },
        {
            title: Labels.charts_scatter,
            id: "fm-tab-charts-scatter",
            handler: this.chartsHandler,
            args: "scatter",
            icon: this.icons.charts_scatter
        },
        {
            title: Labels.charts_pie,
            id: "fm-tab-charts-pie",
            handler: this.chartsHandler,
            args: "pie",
            icon: this.icons.charts_pie
        },
        {
            title: Labels.charts_stacked_column,
            id: "fm-tab-charts-stacked-column",
            handler: this.chartsHandler,
            args: "stacked_column",
            flat: false,
            icon: this.icons.charts_stacked_column
        },
        {
            title: Labels.charts_column_line,
            id: "fm-tab-charts-column-line",
            handler: this.chartsHandler,
            args: "column_line",
            icon: this.icons.charts_column_line
        },
        {
            title: Labels.charts_multiple,
            id: "fm-tab-charts-multiple",
            handler: this.chartsMultipleHandler,
            flat: false,
            mobile: false,
            type: "checkbox"
        }
        ]
    });
    tabs.push({
        divider: true
    });

    // Format tab
    tabs.push({
        title: Labels.format,
        id: "fm-tab-format",
        icon: this.icons.format,
        rightGroup: true,
        menu: [{
            title: this.osUtils.isMobile ? Labels.format_cells_mobile : Labels.format_cells,
            id: "fm-tab-format-cells",
            handler: this.formatCellsHandler,
            icon: this.icons.format_number
        },
        {
            title: this.osUtils.isMobile ? Labels.conditional_formatting_mobile : Labels.conditional_formatting,
            id: "fm-tab-format-conditional",
            handler: this.conditionalFormattingHandler,
            icon: this.icons.format_conditional
        }
        ]
    });

    // Options tab
    tabs.push({
        title: Labels.options,
        id: "fm-tab-options",
        handler: this.optionsHandler,
        icon: this.icons.options,
        rightGroup: true
    });

    // Fields tab
    tabs.push({
        title: Labels.fields,
        id: "fm-tab-fields",
        handler: this.fieldsHandler,
        icon: this.icons.fields,
        rightGroup: true
    });

    // Fullscreen tab
    if (document["addEventListener"] != undefined) { // For IE8
        tabs.push({
            divider: true,
            rightGroup: true
        });
        tabs.push({
            title: Labels.fullscreen,
            id: "fm-tab-fullscreen",
            handler: this.fullscreenHandler,
            mobile: false,
            icon: this.icons.fullscreen,
            rightGroup: true
        });
    }

    return tabs;
}
FlexmonsterToolbar.prototype.create = function () {
    this.popupManager = new FlexmonsterToolbar.PopupManager(this);
    this.dataProvider = this.getTabs();
    if (this.dataSourceType != 5) {
        this.filterConnectMenu();
    }
    this.init();
}

FlexmonsterToolbar.prototype.dispose = function () {
    this.popupManager = null;
    this.pivot = null;
    this.pivotContainer = null;
    this.Labels = null;
    this.dataProvider = null;
    window.removeEventListener("resize", this._redrawToolbar);
}
FlexmonsterToolbar.prototype.responsiveBreakpoints = [700];
FlexmonsterToolbar.prototype.applyToolbarLayoutClasses = function () {
    if (!this.osUtils.isMobile) {
        var _this = this;
        var addLayoutClasses = function () {
            if (!_this.toolbarWrapper) return;
            var toolbarWidth = _this.toolbarWrapper.getBoundingClientRect().width;
            if (toolbarWidth == 0) {
                return;
            }
            _this.responsiveBreakpoints.forEach(function (bp) {
                if (toolbarWidth < bp) {
                    _this.toolbarWrapper.classList.add("fm-layout-" + bp);
                } else {
                    _this.toolbarWrapper.classList.remove("fm-layout-" + bp);
                }
            });
        };
        addLayoutClasses();
    }
}

FlexmonsterToolbar.prototype.init = function () {
    var _this = this;
    this.container = this.pivotContainer;

    var createToolbar = function () {
        _this.container.style.position = (_this.container.style.position == "") ? "relative" : _this.container.style.position;
        if (!_this.container.querySelector("#fm-toolbar-wrapper")) {
            _this.toolbarWrapper = document.createElement("div");
            _this.toolbarWrapper.id = "fm-toolbar-wrapper";
        }
        if (_this.accessibility === true) {
            _this.toolbarWrapper.classList.add("fm-accessibility");
        }

        _this.listWrapper = document.createElement("div");
        _this.listWrapper.classList.add("fm-list-wrapper");
        _this.listWrapper.style.width = "100%";
        _this.toolbarWrapper.style.width = "100%";
        _this.toolbarWrapper.appendChild(_this.listWrapper);
        _this.toolbar = document.createElement("ul");
        _this.toolbar.setAttribute("role", "menubar");
        _this.toolbar.setAttribute("aria-orientation", "horizontal");

        _this.addClass(_this.toolbarWrapper, "fm-toolbar-ui");
        _this.toolbar.id = "fm-toolbar";

        if (!_this.osUtils.isMobile) { //left group and right group is only supported for desktop version
            var leftGroup = document.createElement("div");
            leftGroup.classList.add("fm-toolbar-group-left");
            _this.toolbar.appendChild(leftGroup);
            var rightGroup = document.createElement("div");
            rightGroup.classList.add("fm-toolbar-group-right");
            _this.toolbar.appendChild(rightGroup);
        }

        createToolbarContentFromTabs(leftGroup, rightGroup, _this.toolbar);

        _this.listWrapper.appendChild(_this.toolbar);
        _this.container.insertBefore(_this.toolbarWrapper, _this.container.firstChild);

        _this.applyToolbarLayoutClasses();

        if (!_this.osUtils.isMobile && (leftGroup.clientWidth + rightGroup.clientWidth > _this.toolbar.clientWidth)) { //checks if we have enouph space for all tabs
            //if there is not enouph space we need to redraw toolbar content with all tabs in root for scrolling
            _this.toolbar.removeChild(leftGroup);
            _this.toolbar.removeChild(rightGroup);
            leftGroup = null;
            rightGroup = null;
            createToolbarContentFromTabs(leftGroup, rightGroup, _this.toolbar);
            _this.toolbar.classList.add("fm-scroll-toolbar");
            //_this.listWrapper.classList.add("fm-scrollable");
        }

        _this.updateLabels(_this.Labels);

        _this.pivot.on("numberformatting", function (data) {
            _this.formatCellsHandler(data.measureName);
        });
        _this.pivot.on("conditionalformatting", function (data) {
            _this.conditionalFormattingHandler(data.measureName);
        });

        if (_this.osUtils.isMobile) {
            _this.addClass(_this.listWrapper, "fm-mobile");
        }
    }

    var createToolbarContentFromTabs = function (leftGroup, rightGroup, toolbar) { //fills toolbar with the defined tabs

        for (var i = 0; i < _this.dataProvider.length; i++) {
            if (_this.isDisabled(_this.dataProvider[i])) continue;
            if (_this.osUtils.isMobile && _this.dataProvider[i].menu != null && _this.dataProvider[i].collapse != true) {
                for (var j = 0; j < _this.dataProvider[i].menu.length; j++) {
                    if (_this.isDisabled(_this.dataProvider[i].menu[j])) continue;
                    toolbar.appendChild(_this.createTab(_this.dataProvider[i].menu[j]));
                }
            } else {
                var tab = (_this.dataProvider[i].divider) ? _this.createDivider(_this.dataProvider[i]) : _this.createTab(_this.dataProvider[i]);
                if (rightGroup && _this.dataProvider[i].rightGroup) {
                    rightGroup.appendChild(tab);
                } else if (leftGroup) {
                    leftGroup.appendChild(tab);
                } else {
                    toolbar.appendChild(tab);
                }
            }
        }
    }

    var clear = function () { // clears old toolbar from DOM
        if (_this.toolbarWrapper) {
            var elementsToDelete = [];
            var children = _this.toolbarWrapper.childNodes;
            for (var i = 0; i < children.length; i++) {
                var classList = children[i].classList;
                if (!(classList.contains("fm-popup") ||
                    classList.contains("fm-modal-overlay") ||
                    classList.contains("fm-popup-modal-overlay"))) {
                    elementsToDelete.push(children[i]);
                }
            }
            for (var i = 0; i < elementsToDelete.length; i++) {
                _this.toolbarWrapper.removeChild(elementsToDelete[i]);
            }
        }
    }

    var enableToolbarScrolling = function () { //enables scrolling if possible
        if (_this.toolbar.scrollWidth - _this.toolbar.clientWidth > 0) {
            _this.leftScrollButton = document.createElement("div");
            _this.leftScrollButton.classList.add("fm-left-scroll-button");
            _this.rightScrollButton = document.createElement("div");
            _this.rightScrollButton.classList.add("fm-right-scroll-button");
            _this.addClass(_this.rightScrollButton, "fm-scroll-arrow");
            _this.addClass(_this.listWrapper, "fm-one-arrow-scroll");

            var changeListWrapperWidth = function (option) {
                if (option == "add") {
                    _this.listWrapper.classList.remove("fm-one-arrow-scroll");
                    _this.listWrapper.classList.add("fm-two-arrow-scroll");
                } else if (option = "remove") {
                    _this.listWrapper.classList.remove("fm-two-arrow-scroll");
                    _this.listWrapper.classList.add("fm-one-arrow-scroll");
                }
            }

            var luft = 40;

            var switchScrollArrows = function () {
                var maxWidth = _this.toolbar.scrollWidth - _this.toolbar.clientWidth;
                var epsillon = 0.3;

                if (_this.toolbar.scrollLeft > 0 && !_this.leftScrollButton.classList.contains("fm-scroll-arrow")) {
                    changeListWrapperWidth("add");
                    _this.addClass(_this.leftScrollButton, "fm-scroll-arrow");
                } else if (_this.toolbar.scrollLeft - luft * epsillon <= 0 && _this.leftScrollButton.classList.contains("fm-scroll-arrow")) {
                    changeListWrapperWidth("remove");
                    _this.leftScrollButton.classList.remove("fm-scroll-arrow");
                }
                if (_this.toolbar.scrollLeft + luft * epsillon >= maxWidth && _this.rightScrollButton.classList.contains("fm-scroll-arrow")) {
                    changeListWrapperWidth("remove");
                    _this.rightScrollButton.classList.remove("fm-scroll-arrow");
                } else if (_this.toolbar.scrollLeft < maxWidth && !_this.rightScrollButton.classList.contains("fm-scroll-arrow")) {
                    changeListWrapperWidth("add");
                    _this.addClass(_this.rightScrollButton, "fm-scroll-arrow");
                }
            }

            var scrollList = function (direction) {
                if (direction == "left") {
                    _this.toolbar.scrollLeft -= luft;
                } else if (direction == "right") {
                    _this.toolbar.scrollLeft += luft;
                }
                switchScrollArrows();
            }

            var scrollLeft = function () {
                scrollList("left");
            }
            var scrollRight = function () {
                scrollList("right");
            }

            _this.toolbar.onscroll = function () {
                switchScrollArrows();
            }

            _this.leftScrollButton.onclick = scrollLeft;
            _this.rightScrollButton.onclick = scrollRight;

            _this.toolbarWrapper.insertBefore(_this.leftScrollButton, _this.toolbarWrapper.firstChild);
            _this.toolbarWrapper.appendChild(_this.rightScrollButton);
        }
    }


    _this._redrawToolbar = function () {
        clear();

        createToolbar();

        enableToolbarScrolling();

        if (_this.isFullscreen()) {
            document.querySelector("#fm-tab-fullscreen > a > div").innerHTML = _this.icons.minimize;
        }
    }

    _this._redrawToolbar();

    window.addEventListener("resize", _this._redrawToolbar);
}

// LABELS
FlexmonsterToolbar.prototype.updateLabels = function (labels) {
    var Labels = this.Labels = labels;

    this.setText(this.pivotContainer.querySelector("#fm-tab-connect .fm-tab-label"), Labels.connect);
    this.setText(this.pivotContainer.querySelector("#fm-tab-connect-local-csv .fm-tab-label"), Labels.connect_local_csv);
    this.setText(this.pivotContainer.querySelector("#fm-tab-connect-local-json .fm-tab-label"), Labels.connect_local_json);
    this.setText(this.pivotContainer.querySelector("#fm-tab-connect-remote-csv .fm-tab-label"), this.osUtils.isMobile ? Labels.connect_remote_csv_mobile : Labels.connect_remote_csv);
    this.setText(this.pivotContainer.querySelector("#fm-tab-connect-remote-json .fm-tab-label"), this.osUtils.isMobile ? Labels.connect_remote_json_mobile : Labels.connect_remote_json);
    this.setText(this.pivotContainer.querySelector("#fm-tab-connect-olap .fm-tab-label"), this.osUtils.isMobile ? Labels.connect_olap_mobile : Labels.connect_olap);
    this.setText(this.pivotContainer.querySelector("#fm-tab-connect-elastic .fm-tab-label"), this.osUtils.isMobile ? Labels.connect_elastic_mobile : Labels.connect_elastic);

    this.setText(this.pivotContainer.querySelector("#fm-tab-open .fm-tab-label"), Labels.open);
    this.setText(this.pivotContainer.querySelector("#fm-tab-open-local-report .fm-tab-label"), Labels.local_report);
    this.setText(this.pivotContainer.querySelector("#fm-tab-open-remote-report .fm-tab-label"), this.osUtils.isMobile ? Labels.remote_report_mobile : Labels.remote_report);

    this.setText(this.pivotContainer.querySelector("#fm-tab-save .fm-tab-label"), Labels.save);

    this.setText(this.pivotContainer.querySelector("#fm-tab-grid .fm-tab-label"), Labels.grid);

    this.setText(this.pivotContainer.querySelector("#fm-tab-charts .fm-tab-label"), Labels.charts);
    this.setText(this.pivotContainer.querySelector("#fm-tab-charts-column .fm-tab-label"), Labels.charts_column);
    this.setText(this.pivotContainer.querySelector("#fm-tab-charts-bar-horizontal .fm-tab-label"), Labels.charts_bar_horizontal);
    this.setText(this.pivotContainer.querySelector("#fm-tab-charts-line .fm-tab-label"), Labels.charts_line);
    this.setText(this.pivotContainer.querySelector("#fm-tab-charts-scatter .fm-tab-label"), Labels.charts_scatter);
    this.setText(this.pivotContainer.querySelector("#fm-tab-charts-pie .fm-tab-label"), Labels.charts_pie);
    this.setText(this.pivotContainer.querySelector("#fm-tab-charts-stacked-column .fm-tab-label"), Labels.charts_stacked_column);
    this.setText(this.pivotContainer.querySelector("#fm-tab-charts-column-line .fm-tab-label"), Labels.charts_column_line);
    this.setText(this.pivotContainer.querySelector("#fm-tab-charts-multiple .fm-tab-label"), Labels.charts_multiple);

    this.setText(this.pivotContainer.querySelector("#fm-tab-format .fm-tab-label"), Labels.format);
    this.setText(this.pivotContainer.querySelector("#fm-tab-format-cells .fm-tab-label"), this.osUtils.isMobile ? Labels.format_cells_mobile : Labels.format_cells);
    this.setText(this.pivotContainer.querySelector("#fm-tab-format-conditional .fm-tab-label"), this.osUtils.isMobile ? Labels.conditional_formatting_mobile : Labels.conditional_formatting);

    this.setText(this.pivotContainer.querySelector("#fm-tab-options .fm-tab-label"), Labels.options);
    this.setText(this.pivotContainer.querySelector("#fm-tab-fullscreen .fm-tab-label"), Labels.fullscreen);

    this.setText(this.pivotContainer.querySelector("#fm-tab-export .fm-tab-label"), Labels.export);
    this.setText(this.pivotContainer.querySelector("#fm-tab-export-print .fm-tab-label"), Labels.export_print);
    this.setText(this.pivotContainer.querySelector("#fm-tab-export-html .fm-tab-label"), Labels.export_html);
    this.setText(this.pivotContainer.querySelector("#fm-tab-export-csv .fm-tab-label"), Labels.export_csv);
    this.setText(this.pivotContainer.querySelector("#fm-tab-export-excel .fm-tab-label"), Labels.export_excel);
    this.setText(this.pivotContainer.querySelector("#fm-tab-export-image .fm-tab-label"), Labels.export_image);
    this.setText(this.pivotContainer.querySelector("#fm-tab-export-pdf .fm-tab-label"), Labels.export_pdf);

    this.setText(this.pivotContainer.querySelector("#fm-tab-fields .fm-tab-label"), Labels.fields);
}
// ICONS
FlexmonsterToolbar.prototype.icons = {
    "connect": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M25 20.9C31.9036 20.9 37.5 18.5719 37.5 15.7C37.5 12.8281 31.9036 10.5 25 10.5C18.0964 10.5 12.5 12.8281 12.5 15.7C12.5 18.5719 18.0964 20.9 25 20.9Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 34.3002C13 34.8519 13.264 35.4186 13.8337 35.9799C14.4056 36.5434 15.2589 37.0721 16.3539 37.5258C18.5418 38.4323 21.5987 39.0002 25 39.0002C28.4013 39.0002 31.4582 38.4323 33.6461 37.5258C34.7411 37.0721 35.5944 36.5434 36.1663 35.9799C36.736 35.4186 37 34.8519 37 34.3002V15.7004C37 15.7004 37 15.7002 37.5 15.7002C38 15.7002 38 15.7004 38 15.7004V34.3002C38 35.1985 37.564 36.0067 36.8681 36.6923C36.1744 37.3757 35.1964 37.9658 34.0289 38.4496C31.6918 39.418 28.4987 40.0002 25 40.0002C21.5013 40.0002 18.3082 39.418 15.9711 38.4496C14.8036 37.9658 13.8256 37.3757 13.1319 36.6923C12.436 36.0067 12 35.1985 12 34.3002V15.7004C12 15.7004 12 15.7002 12.5 15.7002C13 15.7002 13 15.7004 13 15.7004V34.3002Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.8329 14.0324C13.2627 14.5933 13 15.1569 13 15.7004C13 16.2439 13.2627 16.8067 13.8329 17.3676C14.4049 17.9302 15.2583 18.4598 16.3532 18.9153C18.5408 19.8254 21.5976 20.4 25 20.4C28.4024 20.4 31.4592 19.8254 33.6468 18.9153C34.7417 18.4598 35.5951 17.9302 36.1671 17.3676C36.7373 16.8067 37 16.2439 37 15.7004C37 15.1569 36.7373 14.5933 36.1671 14.0324C35.5951 13.4698 34.7417 12.9402 33.6468 12.4847C31.4592 11.5746 28.4024 11 25 11C21.5976 11 18.5408 11.5746 16.3532 12.4847C15.2583 12.9402 14.4049 13.4698 13.8329 14.0324ZM15.9691 11.5614C18.3056 10.5894 21.4988 10 25 10C28.5012 10 31.6944 10.5894 34.0309 11.5614C35.198 12.0469 36.1752 12.6378 36.8683 13.3194C37.5631 14.0028 38 14.808 38 15.7004C38 16.5928 37.5631 17.3972 36.8683 18.0806C36.1752 18.7622 35.198 19.3531 34.0309 19.8386C31.6944 20.8106 28.5012 21.4 25 21.4C21.4988 21.4 18.3056 20.8106 15.9691 19.8386C14.802 19.3531 13.8248 18.7622 13.1317 18.0806C12.4369 17.3972 12 16.5928 12 15.7004C12 14.808 12.4369 14.0028 13.1317 13.3194C13.8248 12.6378 14.802 12.0469 15.9691 11.5614Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.3561 31.5894C18.5448 32.5084 21.6015 33.1004 25 33.1004C28.4013 33.1004 31.4582 32.5325 33.6461 31.626C34.7411 31.1723 35.5944 30.6436 36.1663 30.0801C36.736 29.5188 37 28.9521 37 28.4004H38C38 29.2987 37.564 30.1069 36.8681 30.7925C36.1744 31.4759 35.1964 32.066 34.0289 32.5498C31.6918 33.5182 28.4987 34.1004 25 34.1004C21.4985 34.1004 18.3052 33.4924 15.9689 32.5114C14.802 32.0214 13.8257 31.4287 13.1333 30.7516C12.4403 30.0741 12 29.2782 12 28.4004H13C13 28.9226 13.2597 29.4767 13.8324 30.0366C14.4056 30.5971 15.2605 31.1294 16.3561 31.5894Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.3539 25.126C18.5418 26.0325 21.5987 26.6004 25 26.6004C28.4013 26.6004 31.4582 26.0325 33.6461 25.126C34.7411 24.6722 35.5944 24.1436 36.1663 23.5801C36.736 23.0188 37 22.4521 37 21.9004H38C38 22.7987 37.564 23.6069 36.8681 24.2925C36.1744 24.9759 35.1964 25.566 34.0289 26.0498C31.6918 27.0182 28.4987 27.6004 25 27.6004C21.5013 27.6004 18.3082 27.0182 15.9711 26.0498C14.8036 25.566 13.8256 24.9759 13.1319 24.2925C12.436 23.6069 12 22.7987 12 21.9004H13C13 22.4521 13.264 23.0188 13.8337 23.5801C14.4056 24.1436 15.2589 24.6722 16.3539 25.126Z\" class=\"fill-border\"/></svg>",
    "connect_olap": "<svg width=\"50\" height=\"51\" viewBox=\"0 0 50 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18.7 29.1004V22.1004L24.9 25.9004V32.8004L18.7 29.1004Z\" class=\"fill-background\"/><path d=\"M37.5 32.8004V25.8004L31.3 29.6004V36.5004L37.5 32.8004Z\" class=\"fill-background\"/><path d=\"M31.2 14.8004L24.8 11.4004L18.7 14.8004L24.7 18.4004L31.2 14.8004Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M24.9 25.4004C25.1762 25.4004 25.4 25.6242 25.4 25.9004V40.4004C25.4 40.6765 25.1762 40.9004 24.9 40.9004C24.6239 40.9004 24.4 40.6765 24.4 40.4004V25.9004C24.4 25.6242 24.6239 25.4004 24.9 25.4004Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M31.8 22.1006V36.6006H30.8V22.1006H31.8Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.2 22.1006V36.6006H18.2V22.1006H19.2Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.0715 18.2423C12.2139 18.0057 12.5211 17.9293 12.7577 18.0716L25.0577 25.4716C25.2943 25.614 25.3707 25.9212 25.2284 26.1578C25.086 26.3945 24.7788 26.4709 24.5422 26.3285L12.2422 18.9285C12.0056 18.7862 11.9292 18.4789 12.0715 18.2423Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M24.5499 10.9674C24.702 10.8796 24.8889 10.878 25.0424 10.9632L37.8424 18.0632C38.0024 18.1519 38.1012 18.3209 38.0999 18.5038L37.9999 33.0038C37.9987 33.1805 37.9043 33.3434 37.7516 33.4324L25.0516 40.8324C24.8944 40.924 24.6999 40.923 24.5437 40.8297L12.1437 33.4297C11.9914 33.3389 11.8987 33.1742 11.8999 32.9969L11.9999 18.4969C12.0011 18.3195 12.0963 18.1561 12.2499 18.0674L24.5499 10.9674ZM24.8048 11.9749L12.9979 18.7902L12.9019 32.7177L24.8029 39.8199L37.0019 32.7119L37.0979 18.7937L24.8048 11.9749Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M37.9302 18.2454C38.0709 18.483 37.9923 18.7897 37.7547 18.9303L25.2547 26.3303C25.017 26.471 24.7104 26.3924 24.5697 26.1548C24.429 25.9172 24.5076 25.6105 24.7452 25.4698L37.2452 18.0698C37.4829 17.9291 37.7895 18.0077 37.9302 18.2454Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.4453 21.7701L30.9453 14.3701L31.4547 15.2306L18.9547 22.6306L18.4453 21.7701Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.9547 14.3701L25.2047 18.0701L31.4547 21.7701L30.9453 22.6306L18.4453 15.2306L18.9547 14.3701Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.6547 24.9697L25.1547 32.3697L24.6453 33.2302L12.1453 25.8302L12.6547 24.9697Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M37.6562 25.8294L25.2562 33.2294L24.7438 32.3707L37.1438 24.9707L37.6562 25.8294Z\" class=\"fill-border\"/></svg>",
    "connect_csv": "<svg width=\"50\" height=\"51\" viewBox=\"0 0 50 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M36.5 18.6502H29.3V11.4502\" class=\"fill-background\"/><path d=\"M27.9 36.4502H9.5C8.4 36.4502 7.5 35.5502 7.5 34.4502V27.9502C7.5 26.8502 8.4 25.9502 9.5 25.9502H27.9C29 25.9502 29.9 26.8502 29.9 27.9502V34.4502C29.9 35.5502 29 36.4502 27.9 36.4502Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.2998 15.4502C18.0362 15.4502 17.7776 15.5403 17.5838 15.7341C17.3899 15.928 17.2998 16.1866 17.2998 16.4502V20.6502C17.2998 20.9138 17.3899 21.1724 17.5838 21.3662C17.7776 21.5601 18.0362 21.6502 18.2998 21.6502H21.1998V22.8506H20.3998C20.1236 22.8506 19.8998 23.0744 19.8998 23.3506C19.8998 23.6267 20.1236 23.8506 20.3998 23.8506H22.9998C23.2759 23.8506 23.4998 23.6267 23.4998 23.3506C23.4998 23.0744 23.2759 22.8506 22.9998 22.8506H22.1998V21.6502H24.9998C25.248 21.6502 25.5221 21.5701 25.7291 21.389C25.9403 21.2041 26.0722 20.9131 25.9998 20.5848V16.4502C25.9998 16.1866 25.9097 15.928 25.7159 15.7341C25.522 15.5403 25.2634 15.4502 24.9998 15.4502H18.2998ZM18.2998 20.6502V16.4502H24.9998V20.6502H18.2998Z\" class=\"fill-border\"/><path d=\"M23.9286 29.3014C24.0106 29.0962 24.2434 28.9965 24.4485 29.0785C24.6537 29.1606 24.7534 29.3934 24.6714 29.5985L23.2714 33.0985C23.2113 33.2487 23.0666 33.3479 22.9049 33.3499C22.7431 33.3519 22.5961 33.2562 22.5323 33.1075L21.0323 29.6075C20.9453 29.4044 21.0394 29.1693 21.2424 29.0823C21.4455 28.9952 21.6806 29.0893 21.7676 29.2923L22.8872 31.9047L23.9286 29.3014Z\" class=\"fill-border\"/><path d=\"M13.6 31.2498C13.6 30.7432 13.7662 30.4028 13.9896 30.1884C14.217 29.97 14.5377 29.8498 14.9 29.8498C15.17 29.8498 15.4733 29.9888 15.7172 30.2326C15.8734 30.3889 16.1267 30.3889 16.2829 30.2326C16.4391 30.0764 16.4391 29.8232 16.2829 29.667C15.9268 29.3108 15.4301 29.0498 14.9 29.0498C14.3624 29.0498 13.8331 29.2296 13.4355 29.6112C13.0339 29.9968 12.8 30.5564 12.8 31.2498C12.8 31.9278 12.9994 32.4898 13.3922 32.8826C13.7842 33.2746 14.3207 33.4498 14.9 33.4498C15.5172 33.4498 16.0161 33.1994 16.3829 32.8326C16.5391 32.6764 16.5391 32.4232 16.3829 32.267C16.2267 32.1108 15.9734 32.1108 15.8172 32.267C15.584 32.5002 15.2829 32.6498 14.9 32.6498C14.4794 32.6498 14.1659 32.525 13.9579 32.317C13.7507 32.1098 13.6 31.7718 13.6 31.2498Z\" class=\"fill-border\"/><path d=\"M18.8 29.6506C18.2146 29.6506 18 29.9646 18 30.1506C18 30.3815 18.0548 30.4754 18.1245 30.5358C18.2181 30.6169 18.4172 30.7056 18.8442 30.753C18.8557 30.7543 18.8671 30.7561 18.8785 30.7584C19.3939 30.8614 19.813 30.9999 20.1092 31.2138C20.4338 31.4482 20.6 31.7666 20.6 32.1506C20.6 32.5497 20.395 32.8913 20.0634 33.1182C19.7403 33.3392 19.304 33.4506 18.8 33.4506C18.0977 33.4506 17.6213 33.2122 17.2781 32.9834C17.0943 32.8609 17.0447 32.6125 17.1672 32.4287C17.2897 32.2449 17.5381 32.1952 17.7219 32.3178C17.9788 32.489 18.3023 32.6506 18.8 32.6506C19.196 32.6506 19.4597 32.5619 19.6116 32.458C19.755 32.3598 19.8 32.2515 19.8 32.1506C19.8 32.0345 19.7662 31.9529 19.6408 31.8624C19.4888 31.7526 19.2125 31.6423 18.738 31.5461C18.2727 31.4928 17.8784 31.3812 17.6005 31.1404C17.2952 30.8758 17.2 30.5197 17.2 30.1506C17.2 29.3366 17.9854 28.8506 18.8 28.8506C19.3769 28.8506 19.7383 28.9725 20.1789 29.1928C20.3765 29.2916 20.4566 29.5319 20.3578 29.7295C20.259 29.9271 20.0187 30.0072 19.8211 29.9084C19.4617 29.7286 19.2231 29.6506 18.8 29.6506Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.5 10.9502C14.1068 10.9502 13.1 12.0913 13.1 13.3502V25.4502H9.5C8.12386 25.4502 7 26.5741 7 27.9502V34.4502C7 35.8263 8.12386 36.9502 9.5 36.9502H13.1V38.4502C13.1 39.8433 14.2411 40.8502 15.5 40.8502H34.5C35.8931 40.8502 36.9 39.709 36.9 38.4502V18.4451L29.5091 10.9502H15.5ZM14.1 36.9502V38.4502C14.1 39.2571 14.7588 39.8502 15.5 39.8502H34.5C35.3069 39.8502 35.9 39.1913 35.9 38.4502V19.1502H29.3C29.0239 19.1502 28.8 18.9263 28.8 18.6502V11.9502H15.5C14.6931 11.9502 14.1 12.609 14.1 13.3502V25.4502H27.9C29.2761 25.4502 30.4 26.5741 30.4 27.9502V34.4502C30.4 35.8263 29.2761 36.9502 27.9 36.9502H14.1ZM29.8 18.1502V12.6694L35.2047 18.1502H29.8ZM8 27.9502C8 27.1263 8.67614 26.4502 9.5 26.4502H27.9C28.7239 26.4502 29.4 27.1263 29.4 27.9502V34.4502C29.4 35.2741 28.7239 35.9502 27.9 35.9502H9.5C8.67614 35.9502 8 35.2741 8 34.4502V27.9502Z\" class=\"fill-border\"/></svg>",
    "connect_json": "<svg width=\"50\" height=\"51\" viewBox=\"0 0 50 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M36.5 18.6502H29.3V11.4502\" class=\"fill-background\"/><path d=\"M27.9 36.4502H9.5C8.4 36.4502 7.5 35.5502 7.5 34.4502V27.9502C7.5 26.8502 8.4 25.9502 9.5 25.9502H27.9C29 25.9502 29.9 26.8502 29.9 27.9502V34.4502C29.9 35.5502 29 36.4502 27.9 36.4502Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.2998 14.4502C18.0362 14.4502 17.7776 14.5403 17.5838 14.7341C17.3899 14.928 17.2998 15.1866 17.2998 15.4502V19.6502C17.2998 19.9138 17.3899 20.1724 17.5838 20.3662C17.7776 20.5601 18.0362 20.6502 18.2998 20.6502H21.1997V21.8506H20.3999C20.1238 21.8506 19.8999 22.0744 19.8999 22.3506C19.8999 22.6267 20.1238 22.8506 20.3999 22.8506H22.9999C23.276 22.8506 23.4999 22.6267 23.4999 22.3506C23.4999 22.0744 23.276 21.8506 22.9999 21.8506H22.1997V20.6502H24.9998C25.248 20.6502 25.5221 20.5701 25.7291 20.389C25.9403 20.2041 26.0722 19.9131 25.9998 19.5848V15.4502C25.9998 15.1866 25.9097 14.928 25.7159 14.7341C25.522 14.5403 25.2634 14.4502 24.9998 14.4502H18.2998ZM18.2998 19.6502V15.4502H24.9998V19.6502H18.2998Z\" class=\"fill-border\"/><path d=\"M15 30.1496C15 29.9636 15.2146 29.6496 15.8 29.6496C16.2231 29.6496 16.4617 29.7277 16.8211 29.9074C17.0187 30.0062 17.259 29.9261 17.3578 29.7285C17.4566 29.5309 17.3765 29.2906 17.1789 29.1918C16.7383 28.9715 16.3769 28.8496 15.8 28.8496C14.9854 28.8496 14.2 29.3356 14.2 30.1496C14.2 30.5187 14.2952 30.8748 14.6005 31.1394C14.8784 31.3802 15.2727 31.4918 15.738 31.5451C16.2125 31.6413 16.4888 31.7516 16.6408 31.8614C16.7662 31.952 16.8 32.0336 16.8 32.1496C16.8 32.2505 16.755 32.3589 16.6116 32.457C16.4597 32.561 16.196 32.6496 15.8 32.6496C15.3023 32.6496 14.9788 32.488 14.7219 32.3168C14.5381 32.1943 14.2897 32.2439 14.1672 32.4277C14.0447 32.6115 14.0943 32.8599 14.2781 32.9824C14.6213 33.2112 15.0977 33.4496 15.8 33.4496C16.304 33.4496 16.7403 33.3383 17.0634 33.1172C17.395 32.8903 17.6 32.5487 17.6 32.1496C17.6 31.7657 17.4338 31.4473 17.1092 31.2128C16.813 30.9989 16.3939 30.8605 15.8785 30.7574C15.8671 30.7551 15.8557 30.7533 15.8442 30.7521C15.4172 30.7046 15.2181 30.616 15.1245 30.5348C15.0548 30.4744 15 30.3805 15 30.1496Z\" class=\"fill-border\"/><path d=\"M13.0001 29.0498C13.221 29.0498 13.4001 29.2289 13.4001 29.4498V31.8498C13.4001 32.6932 12.6978 33.3498 11.8001 33.3498C11.2835 33.3498 10.7505 33.0966 10.4672 32.6717C10.3447 32.4879 10.3944 32.2395 10.5782 32.117C10.762 31.9944 11.0103 32.0441 11.1329 32.2279C11.2496 32.403 11.5166 32.5498 11.8001 32.5498C12.3023 32.5498 12.6001 32.2064 12.6001 31.8498V29.4498C12.6001 29.2289 12.7792 29.0498 13.0001 29.0498Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20.2 29.0498C19.0189 29.0498 18.1 30.0566 18.1 31.2498C18.1 32.443 19.0189 33.4498 20.2 33.4498C21.381 33.4498 22.3 32.443 22.3 31.2498C22.3 30.0566 21.381 29.0498 20.2 29.0498ZM18.9 31.2498C18.9 30.4548 19.5032 29.8498 20.2 29.8498C20.8967 29.8498 21.5 30.4548 21.5 31.2498C21.5 32.0449 20.8967 32.6498 20.2 32.6498C19.5032 32.6498 18.9 32.0449 18.9 31.2498Z\" class=\"fill-border\"/><path d=\"M23.265 29.1729C23.424 29.1159 23.6016 29.1648 23.7089 29.2952L25.8001 31.8345V29.5494C25.8001 29.3285 25.9792 29.1494 26.2001 29.1494C26.421 29.1494 26.6001 29.3285 26.6001 29.5494V32.9494C26.6001 33.1183 26.4941 33.2689 26.3352 33.3259C26.1763 33.383 25.9987 33.334 25.8914 33.2037L23.8001 30.6644V32.9494C23.8001 33.1703 23.621 33.3494 23.4001 33.3494C23.1792 33.3494 23.0001 33.1703 23.0001 32.9494V29.5494C23.0001 29.3806 23.1061 29.2299 23.265 29.1729Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.1001 13.3502C13.1001 12.0913 14.107 10.9502 15.5001 10.9502H29.5093L36.9001 18.4451V38.4502C36.9001 39.709 35.8932 40.8502 34.5001 40.8502H15.5001C14.2413 40.8502 13.1001 39.8433 13.1001 38.4502V36.9502H9.5C8.12386 36.9502 7 35.8263 7 34.4502V27.9502C7 26.5741 8.12386 25.4502 9.5 25.4502H13.1001V13.3502ZM14.1001 38.4502V36.9502H27.9C29.2761 36.9502 30.4 35.8263 30.4 34.4502V27.9502C30.4 26.5741 29.2761 25.4502 27.9 25.4502H14.1001V13.3502C14.1001 12.609 14.6932 11.9502 15.5001 11.9502H28.8V18.6502C28.8 18.9263 29.0239 19.1502 29.3 19.1502H35.9001V38.4502C35.9001 39.1913 35.307 39.8502 34.5001 39.8502H15.5001C14.7589 39.8502 14.1001 39.2571 14.1001 38.4502ZM29.8 12.6693V18.1502H35.2048L29.8 12.6693ZM9.5 26.4502C8.67614 26.4502 8 27.1263 8 27.9502V34.4502C8 35.2741 8.67614 35.9502 9.5 35.9502H27.9C28.7239 35.9502 29.4 35.2741 29.4 34.4502V27.9502C29.4 27.1263 28.7239 26.4502 27.9 26.4502H9.5Z\" class=\"fill-border\"/></svg>",
    "connect_csv_remote": "<svg width=\"50\" height=\"51\" viewBox=\"0 0 50 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M36.5 18.6512H29.3V11.4512\" class=\"fill-background\"/><path d=\"M27.9 36.4512H9.5C8.4 36.4512 7.5 35.5512 7.5 34.4512V27.9512C7.5 26.8512 8.4 25.9512 9.5 25.9512H27.9C29 25.9512 29.9 26.8512 29.9 27.9512V34.4512C29.9 35.5512 29 36.4512 27.9 36.4512Z\" class=\"fill-background\"/><path d=\"M22.5 21.6514C22.5 22.2037 22.0523 22.6514 21.5 22.6514C20.9477 22.6514 20.5 22.2037 20.5 21.6514C20.5 21.0991 20.9477 20.6514 21.5 20.6514C22.0523 20.6514 22.5 21.0991 22.5 21.6514Z\" class=\"fill-border\"/><path d=\"M21.5 15.8516C19.7236 15.8516 18.1536 16.505 17.0535 17.6051C16.8582 17.8004 16.5417 17.8004 16.3464 17.6051C16.1511 17.4099 16.1511 17.0933 16.3464 16.898C17.6463 15.5981 19.4763 14.8516 21.5 14.8516C23.4276 14.8516 25.2563 15.6008 26.5535 16.898C26.7488 17.0933 26.7488 17.4099 26.5535 17.6051C26.3582 17.8004 26.0417 17.8004 25.8464 17.6051C24.7436 16.5023 23.1723 15.8516 21.5 15.8516Z\" class=\"fill-border\"/><path d=\"M18.4323 18.9251C19.2672 18.1829 20.3539 17.6514 21.5001 17.6514C22.6708 17.6514 23.7542 18.1018 24.5679 18.8251C24.7743 19.0085 25.0903 18.9899 25.2738 18.7835C25.4573 18.5772 25.4387 18.2611 25.2323 18.0777C24.246 17.2009 22.9294 16.6514 21.5001 16.6514C20.0463 16.6514 18.733 17.3198 17.7679 18.1777C17.5615 18.3611 17.5429 18.6772 17.7264 18.8835C17.9099 19.0899 18.2259 19.1085 18.4323 18.9251Z\" class=\"fill-border\"/><path d=\"M21.4999 19.4512C20.8353 19.4512 20.2454 19.6975 19.72 20.1353C19.5079 20.3121 19.1926 20.2834 19.0158 20.0713C18.839 19.8591 18.8677 19.5438 19.0798 19.3671C19.7544 18.8049 20.5645 18.4512 21.4999 18.4512C22.4283 18.4512 23.2568 18.8009 23.8535 19.3976C24.0487 19.5929 24.0487 19.9095 23.8535 20.1047C23.6582 20.3 23.3416 20.3 23.1464 20.1047C22.7431 19.7014 22.1715 19.4512 21.4999 19.4512Z\" class=\"fill-border\"/><path d=\"M24.7698 29.403C24.8539 29.1987 24.7565 28.9649 24.5523 28.8808C24.348 28.7967 24.1142 28.8941 24.0301 29.0984L22.9873 31.6309L21.8659 29.0892C21.7768 28.8871 21.5406 28.7956 21.3385 28.8847C21.1364 28.9739 21.0448 29.21 21.134 29.4121L22.634 32.8121C22.6987 32.9588 22.8447 33.0527 23.0049 33.0507C23.1652 33.0487 23.3088 32.9512 23.3698 32.803L24.7698 29.403Z\" class=\"fill-border\"/><path d=\"M14.0895 29.9891C13.8661 30.2036 13.7 30.544 13.7 31.0506C13.7 31.5726 13.8507 31.9105 14.0579 32.1177C14.2659 32.3258 14.5794 32.4506 15 32.4506C15.3828 32.4506 15.684 32.301 15.9172 32.0677C16.0734 31.9115 16.3267 31.9115 16.4829 32.0677C16.6391 32.224 16.6391 32.4772 16.4829 32.6334C16.1161 33.0002 15.6172 33.2506 15 33.2506C14.4206 33.2506 13.8842 33.0754 13.4922 32.6834C13.0994 32.2906 12.9 31.7286 12.9 31.0506C12.9 30.3572 13.1339 29.7976 13.5355 29.412C13.933 29.0304 14.4624 28.8506 15 28.8506C15.5301 28.8506 16.0267 29.1116 16.3829 29.4677C16.5391 29.624 16.5391 29.8772 16.3829 30.0334C16.2267 30.1896 15.9734 30.1896 15.8172 30.0334C15.5733 29.7896 15.2699 29.6506 15 29.6506C14.6377 29.6506 14.317 29.7708 14.0895 29.9891Z\" class=\"fill-border\"/><path d=\"M18.2 29.9504C18.2 29.7644 18.4146 29.4504 19 29.4504C19.4231 29.4504 19.6617 29.5285 20.0211 29.7082C20.2187 29.807 20.4589 29.7269 20.5577 29.5293C20.6565 29.3317 20.5764 29.0914 20.3789 28.9926C19.9383 28.7723 19.5769 28.6504 19 28.6504C18.1854 28.6504 17.4 29.1364 17.4 29.9504C17.4 30.3195 17.4952 30.6756 17.8005 30.9402C18.0784 31.181 18.4727 31.2926 18.9379 31.3459C19.4125 31.4421 19.6888 31.5524 19.8408 31.6622C19.9662 31.7527 20 31.8343 20 31.9504C20 32.0513 19.955 32.1597 19.8116 32.2578C19.6596 32.3617 19.396 32.4504 19 32.4504C18.5023 32.4504 18.1787 32.2888 17.9218 32.1176C17.738 31.995 17.4897 32.0447 17.3671 32.2285C17.2446 32.4123 17.2943 32.6607 17.4781 32.7832C17.8212 33.012 18.2977 33.2504 19 33.2504C19.504 33.2504 19.9403 33.139 20.2633 32.918C20.5949 32.6911 20.8 32.3495 20.8 31.9504C20.8 31.5664 20.6337 31.248 20.3092 31.0136C20.0129 30.7997 19.5938 30.6612 19.0784 30.5582C19.0671 30.5559 19.0556 30.5541 19.0441 30.5528C18.6172 30.5054 18.418 30.4167 18.3244 30.3356C18.2547 30.2752 18.2 30.1813 18.2 29.9504Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.1001 13.3512C13.1001 12.0923 14.107 10.9512 15.5001 10.9512H29.3001C29.4339 10.9512 29.5622 11.0048 29.6561 11.1001L36.7561 18.3001C36.8484 18.3937 36.9001 18.5198 36.9001 18.6512V38.4512C36.9001 39.71 35.8932 40.8512 34.5001 40.8512H15.5001C14.2413 40.8512 13.1001 39.8443 13.1001 38.4512V36.9512H9.5C8.12386 36.9512 7 35.8273 7 34.4512V27.9512C7 26.575 8.12386 25.4512 9.5 25.4512H13.1001V13.3512ZM14.1001 38.4512V36.9512H27.9C29.2761 36.9512 30.4 35.8273 30.4 34.4512V27.9512C30.4 26.575 29.2761 25.4512 27.9 25.4512H14.1001V13.3512C14.1001 12.61 14.6932 11.9512 15.5001 11.9512H28.8V18.6512C28.8 18.9273 29.0239 19.1512 29.3 19.1512H35.9001V38.4512C35.9001 39.1923 35.307 39.8512 34.5001 39.8512H15.5001C14.7589 39.8512 14.1001 39.258 14.1001 38.4512ZM29.8 12.6703V18.1512H35.2048L29.8 12.6703ZM9.5 26.4512C8.67614 26.4512 8 27.1273 8 27.9512V34.4512C8 35.275 8.67614 35.9512 9.5 35.9512H27.9C28.7239 35.9512 29.4 35.275 29.4 34.4512V27.9512C29.4 27.1273 28.7239 26.4512 27.9 26.4512H9.5Z\" class=\"fill-border\"/></svg>",
    "connect_json_remote": "<svg width=\"50\" height=\"51\" viewBox=\"0 0 50 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M36.5 18.6502H29.3V11.4502\" class=\"fill-background\"/><path d=\"M27.9 36.4502H9.5C8.4 36.4502 7.5 35.5502 7.5 34.4502V27.9502C7.5 26.8502 8.4 25.9502 9.5 25.9502H27.9C29 25.9502 29.9 26.8502 29.9 27.9502V34.4502C29.9 35.5502 29 36.4502 27.9 36.4502Z\" class=\"fill-background\"/><path d=\"M21.5 22.6504C22.0523 22.6504 22.5 22.2027 22.5 21.6504C22.5 21.0981 22.0523 20.6504 21.5 20.6504C20.9477 20.6504 20.5 21.0981 20.5 21.6504C20.5 22.2027 20.9477 22.6504 21.5 22.6504Z\" class=\"fill-border\"/><path d=\"M17.0535 17.6041C18.1536 16.504 19.7236 15.8506 21.5 15.8506C23.1723 15.8506 24.7436 16.5014 25.8464 17.6041C26.0417 17.7994 26.3582 17.7994 26.5535 17.6041C26.7488 17.4089 26.7488 17.0923 26.5535 16.897C25.2563 15.5998 23.4276 14.8506 21.5 14.8506C19.4763 14.8506 17.6463 15.5971 16.3464 16.897C16.1511 17.0923 16.1511 17.4089 16.3464 17.6041C16.5417 17.7994 16.8582 17.7994 17.0535 17.6041Z\" class=\"fill-border\"/><path d=\"M21.5 17.6504C20.3538 17.6504 19.2671 18.1819 18.4322 18.9241C18.2258 19.1076 17.9097 19.089 17.7263 18.8826C17.5428 18.6762 17.5614 18.3601 17.7678 18.1767C18.7328 17.3189 20.0462 16.6504 21.5 16.6504C22.9292 16.6504 24.2459 17.2 25.2322 18.0767C25.4386 18.2601 25.4571 18.5762 25.2737 18.7826C25.0902 18.989 24.7742 19.0076 24.5678 18.8241C23.7541 18.1008 22.6707 17.6504 21.5 17.6504Z\" class=\"fill-border\"/><path d=\"M19.7201 20.1343C20.2455 19.6965 20.8354 19.4502 21.5 19.4502C22.1717 19.4502 22.7432 19.7005 23.1465 20.1037C23.3417 20.299 23.6583 20.299 23.8536 20.1037C24.0489 19.9085 24.0489 19.5919 23.8536 19.3966C23.2569 18.7999 22.4284 18.4502 21.5 18.4502C20.5647 18.4502 19.7546 18.8039 19.0799 19.3661C18.8678 19.5429 18.8391 19.8581 19.0159 20.0703C19.1927 20.2824 19.508 20.3111 19.7201 20.1343Z\" class=\"fill-border\"/><path d=\"M15.8 29.6506C15.2146 29.6506 15 29.9646 15 30.1506C15 30.3815 15.0548 30.4754 15.1245 30.5358C15.2181 30.6169 15.4172 30.7056 15.8442 30.753C15.8557 30.7543 15.8671 30.7561 15.8785 30.7584C16.3939 30.8614 16.813 30.9999 17.1092 31.2138C17.4338 31.4482 17.6 31.7666 17.6 32.1506C17.6 32.5497 17.395 32.8913 17.0634 33.1182C16.7403 33.3392 16.304 33.4506 15.8 33.4506C15.0977 33.4506 14.6213 33.2122 14.2781 32.9834C14.0943 32.8609 14.0447 32.6125 14.1672 32.4287C14.2897 32.2449 14.5381 32.1952 14.7219 32.3178C14.9788 32.489 15.3023 32.6506 15.8 32.6506C16.196 32.6506 16.4597 32.5619 16.6116 32.458C16.755 32.3598 16.8 32.2515 16.8 32.1506C16.8 32.0345 16.7662 31.9529 16.6408 31.8624C16.4888 31.7526 16.2125 31.6423 15.738 31.5461C15.2727 31.4928 14.8784 31.3812 14.6005 31.1404C14.2952 30.8758 14.2 30.5197 14.2 30.1506C14.2 29.3366 14.9854 28.8506 15.8 28.8506C16.3769 28.8506 16.7383 28.9725 17.1789 29.1928C17.3765 29.2916 17.4566 29.5319 17.3578 29.7295C17.259 29.9271 17.0187 30.0072 16.8211 29.9084C16.4617 29.7286 16.2231 29.6506 15.8 29.6506Z\" class=\"fill-border\"/><path d=\"M13.3999 29.4498C13.3999 29.2289 13.2209 29.0498 12.9999 29.0498C12.779 29.0498 12.5999 29.2289 12.5999 29.4498V31.8498C12.5999 32.2064 12.3022 32.5498 11.7999 32.5498C11.5165 32.5498 11.2495 32.403 11.1328 32.2279C11.0102 32.0441 10.7619 31.9944 10.5781 32.117C10.3943 32.2395 10.3446 32.4879 10.4671 32.6717C10.7504 33.0966 11.2834 33.3498 11.7999 33.3498C12.6977 33.3498 13.3999 32.6932 13.3999 31.8498V29.4498Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.1 31.2498C18.1 30.0566 19.0189 29.0498 20.2 29.0498C21.381 29.0498 22.3 30.0566 22.3 31.2498C22.3 32.443 21.381 33.4498 20.2 33.4498C19.0189 33.4498 18.1 32.443 18.1 31.2498ZM20.2 29.8498C19.5032 29.8498 18.9 30.4548 18.9 31.2498C18.9 32.0449 19.5032 32.6498 20.2 32.6498C20.8967 32.6498 21.5 32.0449 21.5 31.2498C21.5 30.4548 20.8967 29.8498 20.2 29.8498Z\" class=\"fill-border\"/><path d=\"M23.7088 29.2961C23.6014 29.1658 23.4238 29.1169 23.2649 29.1739C23.106 29.2309 23 29.3816 23 29.5504V32.9504C23 33.1713 23.1791 33.3504 23.4 33.3504C23.6209 33.3504 23.8 33.1713 23.8 32.9504V30.6653L25.8912 33.2047C25.9986 33.335 26.1762 33.3839 26.3351 33.3269C26.494 33.2699 26.6 33.1192 26.6 32.9504V29.5504C26.6 29.3295 26.4209 29.1504 26.2 29.1504C25.9791 29.1504 25.8 29.3295 25.8 29.5504V31.8355L23.7088 29.2961Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.5 10.9502C14.1068 10.9502 13.1 12.0913 13.1 13.3502V25.4502H9.5C8.12386 25.4502 7 26.5741 7 27.9502V34.4502C7 35.8263 8.12386 36.9502 9.5 36.9502H13.1V38.4502C13.1 39.8433 14.2411 40.8502 15.5 40.8502H34.5C35.8931 40.8502 36.9 39.709 36.9 38.4502V18.4451L29.5091 10.9502H15.5ZM14.1 36.9502V38.4502C14.1 39.2571 14.7588 39.8502 15.5 39.8502H34.5C35.3069 39.8502 35.9 39.1913 35.9 38.4502V19.1502H29.3C29.0239 19.1502 28.8 18.9263 28.8 18.6502V11.9502H15.5C14.6931 11.9502 14.1 12.609 14.1 13.3502V25.4502H27.9C29.2761 25.4502 30.4 26.5741 30.4 27.9502V34.4502C30.4 35.8263 29.2761 36.9502 27.9 36.9502H14.1ZM29.8 18.1502V12.6694L35.2047 18.1502H29.8ZM8 27.9502C8 27.1263 8.67614 26.4502 9.5 26.4502H27.9C28.7239 26.4502 29.4 27.1263 29.4 27.9502V34.4502C29.4 35.2741 28.7239 35.9502 27.9 35.9502H9.5C8.67614 35.9502 8 35.2741 8 34.4502V27.9502Z\" class=\"fill-border\"/></svg>",
    "connect_elastic": "<svg width=\"50\" height=\"50\" viewBox=\"-14 -14 150 150\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m53.2 68h-32.4c-1.2-3.8-1.8-7.8-1.8-12s0.6-8.2 1.8-12h53.2c6.7 0 12 5.4 12 12s-5.3 12-11.9 12h-20.9zm-1.5 4h-29.4c3.1 7.1 8.2 13.2 14.7 17.4 6.3 4.2 13.9 6.6 22 6.6 13.9 0 26.1-7.1 33.3-17.8-3.7-3.8-8.9-6.2-14.6-6.2h-26zm26-32c5.7 0 10.9-2.4 14.6-6.2-7.2-10.7-19.4-17.8-33.3-17.8-8.1 0-15.7 2.4-22 6.6-6.4 4.2-11.5 10.3-14.7 17.4h55.4z\" class=\"fill-border\" /></svg>",
    "open": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M34.6 20.9H15.6V18.8C15.6 17.9 16.3 17.2 17.2 17.2H33C33.9 17.2 34.6 17.9 34.6 18.8V20.9Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.8 12V20.4031C10.7554 20.459 9.87391 21.386 10.0029 22.5542L10.0031 22.5556L11.8502 40.0004H38.1499L39.997 22.5556L39.9971 22.5543C40.1303 21.3489 39.1877 20.4004 38.1 20.4004L38.1 15.2C38.1 14.045 37.1969 13.1 36.1 13.1H23.9981L20.6981 10H13.7C12.5801 10 11.8 10.9698 11.8 12ZM13.7 11C13.22 11 12.8 11.4302 12.8 12V20.4004H15.1V18.8002C15.1 17.6241 16.0238 16.7002 17.2 16.7002H33C34.1761 16.7002 35.1 17.6241 35.1 18.8002V20.4004H37.1V15.2C37.1 14.555 36.6032 14.1 36.1 14.1H23.602L20.302 11H13.7ZM11.9 21.4004C11.3881 21.4004 10.931 21.8512 10.997 22.4452L10.9973 22.4477L12.7499 39.0004H37.2502L39.0028 22.4477L39.0031 22.4452C39.0691 21.8512 38.612 21.4004 38.1 21.4004H11.9ZM16.1 18.8002C16.1 18.1763 16.5761 17.7002 17.2 17.7002H33C33.6238 17.7002 34.1 18.1763 34.1 18.8002V20.4002H16.1V18.8002Z\" class=\"fill-border\"/></svg>",
    "open_local": "<svg width=\"50\" height=\"51\" viewBox=\"0 0 50 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.4 18.1004V12.9004C12.4 12.1004 13 11.4004 13.8 11.4004H20.6L23.9 14.5004H36.2C37 14.5004 37.7 15.2004 37.7 16.1004V18.2004\" class=\"fill-background\"/><path d=\"M32.1 30.9004V32.2004C32.1 32.9004 31.5 33.5004 30.8 33.5004H19.2C18.5 33.5004 17.9 32.9004 17.9 32.2004V30.9004H32.1Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M24.5001 33.5006H19.2001C18.2239 33.5006 17.4001 32.6767 17.4001 31.7006V23.9006C17.4001 22.9244 18.2239 22.1006 19.2001 22.1006H30.8001C31.7762 22.1006 32.6001 22.9244 32.6001 23.9006V31.7006C32.6001 32.6767 31.7762 33.5006 30.8001 33.5006H25.5001V35.6006H27.4001C27.6762 35.6006 27.9001 35.8244 27.9001 36.1006C27.9001 36.3767 27.6762 36.6006 27.4001 36.6006H22.6001C22.3239 36.6006 22.1001 36.3767 22.1001 36.1006C22.1001 35.8244 22.3239 35.6006 22.6001 35.6006H24.5001V33.5006ZM19.2001 23.1006C18.7762 23.1006 18.4001 23.4767 18.4001 23.9006V30.4004H31.6001V23.9006C31.6001 23.4767 31.2239 23.1006 30.8001 23.1006H19.2001ZM18.4001 31.7006V31.4004H31.6001V31.7006C31.6001 32.1244 31.2239 32.5006 30.8001 32.5006H25.0245C25.0164 32.5002 25.0083 32.5 25.0001 32.5C24.9919 32.5 24.9837 32.5002 24.9756 32.5006H19.2001C18.7762 32.5006 18.4001 32.1244 18.4001 31.7006Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.9001 12.9004V17.6006C10.8139 17.6006 9.87241 18.5465 10.0024 19.7495L11.8416 40.9006H38.1584L39.9977 19.7495C40.1237 18.5836 39.2433 17.6592 38.2001 17.6033V16.1004C38.2001 14.9454 37.2969 14.0004 36.2001 14.0004H24.0981L20.7981 10.9004H13.8001C12.6802 10.9004 11.9001 11.8702 11.9001 12.9004ZM13.8001 11.9004C13.32 11.9004 12.9001 12.3306 12.9001 12.9004V17.6006H37.2001V16.1004C37.2001 15.4554 36.7032 15.0004 36.2001 15.0004H23.7021L20.4021 11.9004H13.8001ZM11.9 18.6006C11.3881 18.6006 10.931 19.0514 10.997 19.6454L10.9983 19.6573L12.7584 39.9006H37.2416L39.003 19.6454C39.069 19.0513 38.612 18.6006 38.1 18.6006H11.9Z\" class=\"fill-border\"/></svg>",
    "open_remote": "<svg width=\"50\" height=\"51\" viewBox=\"0 0 50 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.4 18.1005V12.9005C12.4 12.1005 13 11.4005 13.8 11.4005H20.6L23.9 14.5005H36.2C37 14.5005 37.7 15.2005 37.7 16.1005V18.2005\" class=\"fill-background\"/><path d=\"M25.0999 36.1004C26.094 36.1004 26.8999 35.2945 26.8999 34.3004C26.8999 33.3063 26.094 32.5004 25.0999 32.5004C24.1058 32.5004 23.2999 33.3063 23.2999 34.3004C23.2999 35.2945 24.1058 36.1004 25.0999 36.1004Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.7999 34.3C22.7999 33.0297 23.8296 32 25.0999 32C26.3702 32 27.3999 33.0297 27.3999 34.3C27.3999 35.5703 26.3702 36.6 25.0999 36.6C23.8296 36.6 22.7999 35.5703 22.7999 34.3ZM25.0999 33C24.3819 33 23.7999 33.582 23.7999 34.3C23.7999 35.018 24.3819 35.6 25.0999 35.6C25.8179 35.6 26.3999 35.018 26.3999 34.3C26.3999 33.582 25.8179 33 25.0999 33Z\" class=\"fill-border\"/><path d=\"M17.1616 26.646C19.1675 24.5446 21.9369 23.3008 25.0999 23.3008C28.1617 23.3008 30.9361 24.5441 32.9463 26.5543C33.1416 26.7496 33.4582 26.7496 33.6535 26.5543C33.8487 26.3591 33.8487 26.0425 33.6535 25.8472C31.4637 23.6575 28.4381 22.3008 25.0999 22.3008C21.6628 22.3008 18.6323 23.657 16.4382 25.9555C16.2475 26.1553 16.2549 26.4718 16.4547 26.6625C16.6544 26.8531 16.9709 26.8458 17.1616 26.646Z\" class=\"fill-border\"/><path d=\"M24.9999 26.5C22.8464 26.5 20.87 27.437 19.4535 28.8536C19.2582 29.0488 18.9416 29.0488 18.7464 28.8536C18.5511 28.6583 18.5511 28.3417 18.7464 28.1464C20.3298 26.563 22.5534 25.5 24.9999 25.5C27.428 25.5 29.6639 26.4501 31.1654 28.0588C31.3539 28.2607 31.3429 28.5771 31.1411 28.7655C30.9392 28.9539 30.6228 28.943 30.4344 28.7412C29.1359 27.3499 27.1718 26.5 24.9999 26.5Z\" class=\"fill-border\"/><path d=\"M21.8535 31.2539C22.666 30.4414 23.8412 29.9004 25.0999 29.9004C26.3481 29.9004 27.4256 30.4332 28.2464 31.2539C28.4416 31.4492 28.7582 31.4492 28.9535 31.2539C29.1487 31.0587 29.1487 30.7421 28.9535 30.5468C27.9742 29.5676 26.6517 28.9004 25.0999 28.9004C23.5586 28.9004 22.1338 29.5594 21.1464 30.5468C20.9511 30.7421 20.9511 31.0587 21.1464 31.2539C21.3416 31.4492 21.6582 31.4492 21.8535 31.2539Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.8999 17.6006V12.9004C11.8999 11.8702 12.68 10.9004 13.7999 10.9004H20.7979L24.0979 14.0004H36.1999C37.2968 14.0004 38.1999 14.9454 38.1999 16.1004V17.6033C39.2431 17.6591 40.1236 18.5836 39.9975 19.7495L38.1583 40.9006H11.8415L10.0023 19.7495C9.87228 18.5465 10.8138 17.6006 11.8999 17.6006ZM12.8999 12.9004C12.8999 12.3306 13.3198 11.9004 13.7999 11.9004H20.4019L23.7019 15.0004H36.1999C36.703 15.0004 37.1999 15.4554 37.1999 16.1004V17.6006H12.8999V12.9004ZM10.9969 19.6454C10.9309 19.0514 11.388 18.6006 11.8999 18.6006H38.0999C38.6119 18.6006 39.0688 19.0513 39.0028 19.6454L37.2415 39.9006H12.7583L10.9982 19.6573L10.9969 19.6454Z\" class=\"fill-border\"/></svg>",
    "grid": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M39.5 20.2H10.5V12.6C10.5 11.4 11.4 10.5 12.6 10.5H37.4C38.6 10.5 39.5 11.4 39.5 12.6V20.2V20.2Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 12.6V37.4C10 38.8761 11.1239 40 12.6 40H37.4C38.8761 40 40 38.8761 40 37.4V12.6C40 11.1239 38.8761 10 37.4 10H12.6C11.1239 10 10 11.1239 10 12.6ZM12.6 11C11.6761 11 11 11.6761 11 12.6V19.7H39V12.6C39 11.6761 38.3239 11 37.4 11H12.6ZM39 29.5996V20.7H30.3V29.5996H39ZM29.3 29.5996H20.7V20.7H29.3V29.5996ZM29.3 30.5996V39H20.7V30.5996H29.3ZM30.3 39V30.5996H39V37.4C39 38.3239 38.3239 39 37.4 39H30.3ZM19.7 29.5996V20.7H11V29.5996H19.7ZM11 30.5996H19.7V39H12.6C11.6761 39 11 38.3239 11 37.4V30.5996Z\" class=\"fill-border\"/></svg>",
    "save": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M29.9496 18.5H20.9496C20.0496 18.5 19.3496 17.8 19.3496 16.9V10.5H31.5496V16.9C31.5496 17.8 30.8496 18.5 29.9496 18.5Z\" class=\"fill-background\"/><path d=\"M35.9496 39.5H14.8496V25.9C14.8496 24.6 15.9496 23.5 17.2496 23.5H33.4496C34.7496 23.5 35.8496 24.6 35.8496 25.9V39.5H35.9496Z\" class=\"fill-background\"/><path d=\"M31.55 29.4004H19.25V28.4004H31.55V29.4004Z\" class=\"fill-border\"/><path d=\"M19.25 34.5996H31.55V33.5996H19.25V34.5996Z\" class=\"fill-border\"/><path d=\"M28.5498 12.4004V16.4004H29.5498V12.4004H28.5498Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.7498 10C11.7737 10 10.0498 11.7239 10.0498 13.7V36.2C10.0498 38.2862 11.7839 39.9 13.7498 39.9H14.3496V40H35.9496V39.9H36.2498C38.336 39.9 39.9498 38.166 39.9498 36.2V17C39.9498 16.8757 39.9035 16.7559 39.82 16.6639L33.92 10.1639C33.8253 10.0595 33.6908 10 33.5498 10H13.7498ZM15.3496 38.9H35.3496V25.9C35.3496 24.8761 34.4735 24 33.4496 24H17.2496C16.2258 24 15.3496 24.8761 15.3496 25.9V38.9ZM36.3496 25.9V38.8982C37.8154 38.844 38.9498 37.6024 38.9498 36.2V17.1931L33.3284 11H32.0496V16.9C32.0496 18.0761 31.1258 19 29.9496 19H20.9496C19.7735 19 18.8496 18.0761 18.8496 16.9V11H13.7498C12.3259 11 11.0498 12.2761 11.0498 13.7V36.2C11.0498 37.7138 12.3158 38.9 13.7498 38.9H14.3496V25.9C14.3496 24.3239 15.6735 23 17.2496 23H33.4496C35.0257 23 36.3496 24.3239 36.3496 25.9ZM31.0496 11H19.8496V16.9C19.8496 17.5239 20.3258 18 20.9496 18H29.9496C30.5735 18 31.0496 17.5239 31.0496 16.9V11Z\" class=\"fill-border\"/></svg>",
    "export": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M33.6998 19.2L24.9998 10.5L16.2998 19.2H21.1998V31.8H28.7998V19.2H33.6998Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M25.3534 10.1464C25.1581 9.95118 24.8415 9.95118 24.6463 10.1464L15.9463 18.8464C15.8033 18.9894 15.7605 19.2045 15.8379 19.3913C15.9153 19.5782 16.0976 19.7 16.2998 19.7H20.6998V23H12.1C10.9239 23 10 23.9239 10 25.1V37.9C10 39.0761 10.9239 40 12.1 40H37.9C39.0761 40 40 39.0761 40 37.9V25.1C40 23.9239 39.0761 23 37.9 23H29.2998V19.7H33.6998C33.9021 19.7 34.0844 19.5782 34.1618 19.3913C34.2392 19.2045 34.1964 18.9894 34.0534 18.8464L25.3534 10.1464ZM29.2998 24V31.8C29.2998 32.0761 29.076 32.3 28.7998 32.3H21.1998C20.9237 32.3 20.6998 32.0761 20.6998 31.8V24H12.1C11.4761 24 11 24.4761 11 25.1V37.9C11 38.5239 11.4761 39 12.1 39H37.9C38.5239 39 39 38.5239 39 37.9V25.1C39 24.4761 38.5239 24 37.9 24H29.2998ZM17.5069 18.7L24.9998 11.2071L32.4927 18.7H28.7998C28.5237 18.7 28.2998 18.9239 28.2998 19.2V31.3H21.6998V19.2C21.6998 18.9239 21.476 18.7 21.1998 18.7H17.5069Z\" class=\"fill-border\"/></svg>",
    "export_print": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M32.9462 33.5002H38.0463C39.1463 33.5002 40.0463 32.5002 39.9463 31.5002V22.2002C39.9463 21.1002 39.0463 20.2002 37.9463 20.2002H13.0463C11.9463 20.2002 11.0463 21.1002 11.0463 22.2002V31.5002C11.0463 32.6002 11.9463 33.5002 13.0463 33.5002H18.1462V27.8008H32.9462V33.5002Z\" class=\"fill-background\"/><path d=\"M32.9463 16.0004H28.3463V11.4004L32.9463 16.0004Z\" class=\"fill-background\"/><path d=\"M15.4462 22C15.1701 22 14.9462 22.2239 14.9462 22.5C14.9462 22.7761 15.1701 23 15.4462 23H18.1462C18.4224 23 18.6462 22.7761 18.6462 22.5C18.6462 22.2239 18.4224 22 18.1462 22H15.4462Z\" class=\"fill-border\"/><path d=\"M20.7463 33.5C20.7463 33.2239 20.9701 33 21.2463 33H29.9463C30.2224 33 30.4463 33.2239 30.4463 33.5C30.4463 33.7761 30.2224 34 29.9463 34H21.2463C20.9701 34 20.7463 33.7761 20.7463 33.5Z\" class=\"fill-border\"/><path d=\"M21.2463 35.7002C20.9701 35.7002 20.7463 35.9241 20.7463 36.2002C20.7463 36.4763 20.9701 36.7002 21.2463 36.7002H29.9463C30.2224 36.7002 30.4463 36.4763 30.4463 36.2002C30.4463 35.9241 30.2224 35.7002 29.9463 35.7002H21.2463Z\" class=\"fill-border\"/><path d=\"M20.7463 30.7002C20.7463 30.4241 20.9701 30.2002 21.2463 30.2002H29.9463C30.2224 30.2002 30.4463 30.4241 30.4463 30.7002C30.4463 30.9763 30.2224 31.2002 29.9463 31.2002H21.2463C20.9701 31.2002 20.7463 30.9763 20.7463 30.7002Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.6462 12.7004C17.6462 11.7242 18.4701 10.9004 19.4462 10.9004L22.3618 11.9004H19.4462C19.0224 11.9004 18.6462 12.2765 18.6462 12.7004V19.7002H32.4462V16.5004H28.3463C28.0701 16.5004 27.8463 16.2765 27.8463 16.0004V13.7815L28.8463 14.1245V15.5004H31.7391L31.1552 14.9165L33.3075 15.6547C33.3964 15.7476 33.4462 15.8714 33.4462 16.0004V19.7002H37.9463C39.3224 19.7002 40.4463 20.8241 40.4463 22.2002V31.477C40.5592 32.7766 39.4174 34.0002 38.0463 34.0002H33.4462V40.4008C33.4462 40.6769 33.2224 40.9008 32.9462 40.9008H18.1462C17.8701 40.9008 17.6462 40.6769 17.6462 40.4008V34.0002H13.0463C11.6701 34.0002 10.5463 32.8763 10.5463 31.5002V22.2002C10.5463 20.8241 11.6701 19.7002 13.0463 19.7002H17.6462V12.7004ZM38.0463 33.0002H33.4462V28.3008H35.7462C36.0224 28.3008 36.2462 28.0769 36.2462 27.8008C36.2462 27.5246 36.0224 27.3008 35.7462 27.3008H15.4462C15.1701 27.3008 14.9462 27.5246 14.9462 27.8008C14.9462 28.0769 15.1701 28.3008 15.4462 28.3008H17.6462V33.0002H13.0463C12.2224 33.0002 11.5463 32.3241 11.5463 31.5002V22.2002C11.5463 21.3763 12.2224 20.7002 13.0463 20.7002H37.9463C38.7701 20.7002 39.4463 21.3763 39.4463 22.2002V31.5002C39.4463 31.5168 39.4471 31.5334 39.4487 31.5499C39.5178 32.2405 38.8658 33.0002 38.0463 33.0002ZM18.6462 28.3008V39.9008H32.4462V28.3008H18.6462Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M31.1485 14.9098L33.2998 15.6468L28.6998 11.0469C28.686 11.0331 28.6716 11.0202 28.6564 11.0083C28.6201 10.9795 28.58 10.956 28.5376 10.9385C28.5219 10.9319 28.5059 10.9262 28.4896 10.9214C28.4513 10.9099 28.4115 10.903 28.371 10.901C28.3628 10.9006 28.3545 10.9004 28.3462 10.9004H19.4462L22.365 11.9004H22.3618L27.8463 13.7815V13.7784L28.8463 14.121V14.1245L31.1552 14.9165L31.1485 14.9098ZM31.1485 14.9098L28.8463 12.6075V14.121L31.1485 14.9098ZM27.8463 13.7784L22.365 11.9004H27.8463V13.7784Z\" class=\"fill-border\"/></svg>",
    "export_csv": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M37 18.6502H29.8V11.4502\" class=\"fill-background\"/><path d=\"M28.4 36.4502H10C8.9 36.4502 8 35.5502 8 34.4502V27.9502C8 26.8502 8.9 25.9502 10 25.9502H28.4C29.5 25.9502 30.4 26.8502 30.4 27.9502V34.4502C30.4 35.5502 29.5 36.4502 28.4 36.4502Z\" class=\"fill-background\"/><path d=\"M25.5699 29.7028C25.654 29.4985 25.5566 29.2647 25.3523 29.1806C25.148 29.0965 24.9142 29.1939 24.8301 29.3982L23.7873 31.9308L22.666 29.389C22.5768 29.1869 22.3407 29.0954 22.1385 29.1845C21.9364 29.2737 21.8449 29.5098 21.934 29.712L23.434 33.112C23.4987 33.2586 23.6447 33.3525 23.805 33.3505C23.9652 33.3485 24.1088 33.251 24.1699 33.1028L25.5699 29.7028Z\" class=\"fill-border\"/><path d=\"M14.8895 30.1884C14.6661 30.4028 14.5 30.7432 14.5 31.2498C14.5 31.7718 14.6507 32.1098 14.8579 32.317C15.0659 32.525 15.3794 32.6498 15.8 32.6498C16.1828 32.6498 16.4839 32.5002 16.7172 32.267C16.8734 32.1108 17.1266 32.1108 17.2829 32.267C17.4391 32.4232 17.4391 32.6764 17.2829 32.8326C16.9161 33.1994 16.4172 33.4498 15.8 33.4498C15.2206 33.4498 14.6842 33.2746 14.2922 32.8826C13.8994 32.4898 13.7 31.9278 13.7 31.2498C13.7 30.5564 13.9339 29.9968 14.3355 29.6112C14.733 29.2296 15.2623 29.0498 15.8 29.0498C16.3301 29.0498 16.8267 29.3108 17.1829 29.667C17.3391 29.8232 17.3391 30.0764 17.1829 30.2326C17.0266 30.3889 16.7734 30.3889 16.6172 30.2326C16.3733 29.9888 16.0699 29.8498 15.8 29.8498C15.4377 29.8498 15.117 29.97 14.8895 30.1884Z\" class=\"fill-border\"/><path d=\"M19 30.1506C19 29.9646 19.2146 29.6506 19.8 29.6506C20.2231 29.6506 20.4617 29.7286 20.8211 29.9084C21.0187 30.0072 21.259 29.9271 21.3578 29.7295C21.4566 29.5319 21.3765 29.2916 21.1789 29.1928C20.7383 28.9725 20.3769 28.8506 19.8 28.8506C18.9854 28.8506 18.2 29.3366 18.2 30.1506C18.2 30.5197 18.2952 30.8758 18.6005 31.1404C18.8784 31.3812 19.2727 31.4928 19.738 31.5461C20.2125 31.6423 20.4888 31.7526 20.6408 31.8624C20.7662 31.9529 20.8 32.0345 20.8 32.1506C20.8 32.2515 20.755 32.3598 20.6116 32.458C20.4597 32.5619 20.196 32.6506 19.8 32.6506C19.3023 32.6506 18.9788 32.489 18.7219 32.3178C18.5381 32.1952 18.2897 32.2449 18.1672 32.4287C18.0447 32.6125 18.0943 32.8609 18.2781 32.9834C18.6213 33.2122 19.0977 33.4506 19.8 33.4506C20.304 33.4506 20.7403 33.3392 21.0634 33.1182C21.395 32.8913 21.6 32.5497 21.6 32.1506C21.6 31.7666 21.4338 31.4482 21.1092 31.2138C20.813 30.9999 20.3939 30.8614 19.8785 30.7584C19.8671 30.7561 19.8557 30.7543 19.8442 30.753C19.4172 30.7056 19.2181 30.6169 19.1245 30.5358C19.0548 30.4754 19 30.3815 19 30.1506Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.6001 13.3502C13.6001 12.0913 14.607 10.9502 16.0001 10.9502H30.0093L37.4001 18.4451V38.4502C37.4001 39.709 36.3932 40.8502 35.0001 40.8502H16.0001C14.7413 40.8502 13.6001 39.8433 13.6001 38.4502V36.9502H10C8.62386 36.9502 7.5 35.8263 7.5 34.4502V27.9502C7.5 26.5741 8.62386 25.4502 10 25.4502H13.6001V13.3502ZM14.6001 38.4502V36.9502H28.4C29.7761 36.9502 30.9 35.8263 30.9 34.4502V27.9502C30.9 26.5741 29.7761 25.4502 28.4 25.4502H14.6001V13.3502C14.6001 12.609 15.1932 11.9502 16.0001 11.9502H29.3V18.6502C29.3 18.9263 29.5238 19.1502 29.8 19.1502H36.4001V38.4502C36.4001 39.1913 35.807 39.8502 35.0001 39.8502H16.0001C15.2589 39.8502 14.6001 39.2571 14.6001 38.4502ZM30.3 12.6692V18.1502H35.7048L30.3 12.6692ZM10 26.4502C9.17614 26.4502 8.5 27.1263 8.5 27.9502V34.4502C8.5 35.2741 9.17614 35.9502 10 35.9502H28.4C29.2239 35.9502 29.9 35.2741 29.9 34.4502V27.9502C29.9 27.1263 29.2239 26.4502 28.4 26.4502H10Z\" class=\"fill-border\"/></svg>",
    "export_excel": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M37 18.6502H29.8V11.4502\" class=\"fill-background\"/><path d=\"M28.4 36.4502H10C8.9 36.4502 8 35.5502 8 34.4502V27.9502C8 26.8502 8.9 25.9502 10 25.9502H28.4C29.5 25.9502 30.4 26.8502 30.4 27.9502V34.4502C30.4 35.5502 29.5 36.4502 28.4 36.4502Z\" class=\"fill-background\"/><path d=\"M22.7 29.55C22.1146 29.55 21.9 29.864 21.9 30.05C21.9 30.2809 21.9548 30.3748 22.0245 30.4352C22.1181 30.5163 22.3172 30.605 22.7442 30.6524C22.7557 30.6537 22.7671 30.6555 22.7784 30.6578C23.2938 30.7608 23.7129 30.8993 24.0092 31.1132C24.3338 31.3476 24.5 31.666 24.5 32.05C24.5 32.4491 24.295 32.7907 23.9634 33.0176C23.6403 33.2387 23.204 33.35 22.7 33.35C21.9977 33.35 21.5212 33.1116 21.1781 32.8828C20.9943 32.7603 20.9446 32.5119 21.0672 32.3281C21.1897 32.1443 21.4381 32.0946 21.6219 32.2172C21.8787 32.3884 22.2023 32.55 22.7 32.55C23.096 32.55 23.3597 32.4613 23.5116 32.3574C23.655 32.2593 23.7 32.1509 23.7 32.05C23.7 31.934 23.6662 31.8524 23.5408 31.7618C23.3888 31.652 23.1125 31.5417 22.638 31.4455C22.1727 31.3922 21.7784 31.2806 21.5005 31.0398C21.1952 30.7752 21.1 30.4191 21.1 30.05C21.1 29.236 21.8854 28.75 22.7 28.75C23.2769 28.75 23.6383 28.8719 24.0789 29.0922C24.2765 29.191 24.3565 29.4313 24.2578 29.6289C24.159 29.8265 23.9187 29.9066 23.7211 29.8078C23.3617 29.6281 23.1231 29.55 22.7 29.55Z\" class=\"fill-border\"/><path d=\"M18.6 29.2506C18.6 29.0297 18.4209 28.8506 18.2 28.8506C17.9791 28.8506 17.8 29.0297 17.8 29.2506V32.7506C17.8 32.9715 17.9791 33.1506 18.2 33.1506H20.2C20.4209 33.1506 20.6 32.9715 20.6 32.7506C20.6 32.5297 20.4209 32.3506 20.2 32.3506H18.6V29.2506Z\" class=\"fill-border\"/><path d=\"M13.8556 28.9339C14.0306 28.799 14.2817 28.8314 14.4167 29.0063L15.45 30.3457L16.4833 29.0063C16.6182 28.8314 16.8694 28.799 17.0443 28.9339C17.2192 29.0688 17.2516 29.32 17.1167 29.4949L15.9552 31.0006L17.1167 32.5063C17.2516 32.6812 17.2192 32.9324 17.0443 33.0673C16.8694 33.2023 16.6182 33.1698 16.4833 32.9949L15.45 31.6555L14.4167 32.9949C14.2817 33.1698 14.0306 33.2023 13.8556 33.0673C13.6807 32.9324 13.6483 32.6812 13.7833 32.5063L14.9448 31.0006L13.7833 29.4949C13.6483 29.32 13.6807 29.0688 13.8556 28.9339Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.0001 10.9502C14.607 10.9502 13.6001 12.0913 13.6001 13.3502V25.4502H10C8.62386 25.4502 7.5 26.5741 7.5 27.9502V34.4502C7.5 35.8263 8.62386 36.9502 10 36.9502H13.6001V38.4502C13.6001 39.8433 14.7413 40.8502 16.0001 40.8502H35.0001C36.3932 40.8502 37.4001 39.709 37.4001 38.4502V18.4451L30.0093 10.9502H16.0001ZM14.6001 36.9502V38.4502C14.6001 39.2571 15.2589 39.8502 16.0001 39.8502H35.0001C35.807 39.8502 36.4001 39.1913 36.4001 38.4502V19.1502H29.8C29.5238 19.1502 29.3 18.9263 29.3 18.6502V11.9502H16.0001C15.1932 11.9502 14.6001 12.609 14.6001 13.3502V25.4502H28.4C29.7761 25.4502 30.9 26.5741 30.9 27.9502V34.4502C30.9 35.8263 29.7761 36.9502 28.4 36.9502H14.6001ZM30.3 18.1502V12.6692L35.7048 18.1502H30.3ZM8.5 27.9502C8.5 27.1263 9.17614 26.4502 10 26.4502H28.4C29.2239 26.4502 29.9 27.1263 29.9 27.9502V34.4502C29.9 35.2741 29.2239 35.9502 28.4 35.9502H10C9.17614 35.9502 8.5 35.2741 8.5 34.4502V27.9502Z\" class=\"fill-border\"/></svg>",
    "export_html": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M37 18.6502H29.8V11.4502\" class=\"fill-background\"/><path d=\"M28.4 36.4502H10C8.9 36.4502 8 35.5502 8 34.4502V27.9502C8 26.8502 8.9 25.9502 10 25.9502H28.4C29.5 25.9502 30.4 26.8502 30.4 27.9502V34.4502C30.4 35.5502 29.5 36.4502 28.4 36.4502Z\" class=\"fill-background\"/><path d=\"M25.4 28.75C25.6209 28.75 25.8 28.9291 25.8 29.15V32.25H27.4C27.6209 32.25 27.8 32.4291 27.8 32.65C27.8 32.8709 27.6209 33.05 27.4 33.05H25.4C25.1791 33.05 25 32.8709 25 32.65V29.15C25 28.9291 25.1791 28.75 25.4 28.75Z\" class=\"fill-border\"/><path d=\"M20.1411 28.941C20.0475 28.7883 19.8638 28.7164 19.6914 28.7651C19.5191 28.8137 19.4 28.9709 19.4 29.15V32.65C19.4 32.8709 19.5791 33.05 19.8 33.05C20.0209 33.05 20.2 32.8709 20.2 32.65V30.5681L21.3537 32.4505C21.373 32.4838 21.3973 32.5147 21.4263 32.5418C21.4545 32.5683 21.4861 32.5902 21.5198 32.6072C21.6276 32.6614 21.7576 32.6658 21.8719 32.6113C21.9056 32.5953 21.9373 32.5744 21.9658 32.549C21.9959 32.5223 22.0213 32.4917 22.0416 32.4584L23.3 30.5079V32.65C23.3 32.8709 23.4791 33.05 23.7 33.05C23.9209 33.05 24.1 32.8709 24.1 32.65V29.15C24.1 28.9727 23.9832 28.8165 23.813 28.7663C23.6429 28.7162 23.46 28.7841 23.3639 28.9332L21.7087 31.4987L20.1411 28.941Z\" class=\"fill-border\"/><path d=\"M14.7 29.15C14.7 28.9291 14.5209 28.75 14.3 28.75C14.0791 28.75 13.9 28.9291 13.9 29.15V30.4502H12.1V29.15C12.1 28.9291 11.9209 28.75 11.7 28.75C11.4791 28.75 11.3 28.9291 11.3 29.15V32.65C11.3 32.8709 11.4791 33.05 11.7 33.05C11.9209 33.05 12.1 32.8709 12.1 32.65V31.2502H13.9V32.65C13.9 32.8709 14.0791 33.05 14.3 33.05C14.5209 33.05 14.7 32.8709 14.7 32.65V29.15Z\" class=\"fill-border\"/><path d=\"M17.4 29.55H18.3C18.5209 29.55 18.7 29.3709 18.7 29.15C18.7 28.9291 18.5209 28.75 18.3 28.75H15.7C15.4791 28.75 15.3 28.9291 15.3 29.15C15.3 29.3709 15.4791 29.55 15.7 29.55H16.6V32.65C16.6 32.8709 16.7791 33.05 17 33.05C17.2209 33.05 17.4 32.8709 17.4 32.65V29.55Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.0001 10.9502C14.607 10.9502 13.6001 12.0913 13.6001 13.3502V25.4502H10C8.62386 25.4502 7.5 26.5741 7.5 27.9502V34.4502C7.5 35.8263 8.62386 36.9502 10 36.9502H13.6001V38.4502C13.6001 39.8433 14.7413 40.8502 16.0001 40.8502H35.0001C36.3932 40.8502 37.4001 39.709 37.4001 38.4502V18.4451L30.0093 10.9502H16.0001ZM14.6001 36.9502V38.4502C14.6001 39.2571 15.2589 39.8502 16.0001 39.8502H35.0001C35.807 39.8502 36.4001 39.1913 36.4001 38.4502V19.1502H29.8C29.5238 19.1502 29.3 18.9263 29.3 18.6502V11.9502H16.0001C15.1932 11.9502 14.6001 12.609 14.6001 13.3502V25.4502H28.4C29.7761 25.4502 30.9 26.5741 30.9 27.9502V34.4502C30.9 35.8263 29.7761 36.9502 28.4 36.9502H14.6001ZM30.3 18.1502V12.6692L35.7048 18.1502H30.3ZM8.5 27.9502C8.5 27.1263 9.17614 26.4502 10 26.4502H28.4C29.2239 26.4502 29.9 27.1263 29.9 27.9502V34.4502C29.9 35.2741 29.2239 35.9502 28.4 35.9502H10C9.17614 35.9502 8.5 35.2741 8.5 34.4502V27.9502Z\" class=\"fill-border\"/></svg>",
    "export_image": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.9 33.9512H17.5V19.8506C17.5 18.7506 18.4 17.8506 19.5 17.8506H33.5V13.3512C33.5 12.3512 32.7 11.4512 31.6 11.4512H12.9C11.9 11.4512 11 12.2512 11 13.3512V32.0512C11 33.0512 11.8 33.9512 12.9 33.9512Z\" class=\"fill-background\"/><path d=\"M33.5 25.6508C34.7702 25.6508 35.7999 24.621 35.7999 23.3508C35.7999 22.0805 34.7702 21.0508 33.5 21.0508C32.2297 21.0508 31.2 22.0805 31.2 23.3508C31.2 24.621 32.2297 25.6508 33.5 25.6508Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M33.5 20.5508C31.9536 20.5508 30.7 21.8044 30.7 23.3508C30.7 24.8972 31.9536 26.1508 33.5 26.1508C35.0464 26.1508 36.3 24.8972 36.3 23.3508C36.3 21.8044 35.0464 20.5508 33.5 20.5508ZM31.7 23.3508C31.7 22.3567 32.5059 21.5508 33.5 21.5508C34.4941 21.5508 35.3 22.3567 35.3 23.3508C35.3 24.3449 34.4941 25.1508 33.5 25.1508C32.5059 25.1508 31.7 24.3449 31.7 23.3508Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.9 34.4512H17V38.3506C17 39.7267 18.1239 40.8506 19.5 40.8506H38C39.3761 40.8506 40.5 39.7267 40.5 38.3506V19.8506C40.5 18.4744 39.3761 17.3506 38 17.3506H34V13.3512C34 12.0923 32.9931 10.9512 31.6 10.9512H12.9C11.6412 10.9512 10.5 11.958 10.5 13.3512V32.0512C10.5 33.31 11.5069 34.4512 12.9 34.4512ZM12.9 11.9512C12.1588 11.9512 11.5 12.5443 11.5 13.3512V32.0512C11.5 32.7923 12.0931 33.4512 12.9 33.4512H17V19.8506C17 18.4744 18.1239 17.3506 19.5 17.3506H33V13.3512C33 12.61 32.4069 11.9512 31.6 11.9512H12.9ZM19.5 18.3506C18.6761 18.3506 18 19.0267 18 19.8506V32.8735L25.7528 25.3912C25.9427 25.2079 26.2424 25.2038 26.4373 25.3818L33.4607 31.7989L36.1521 29.1917C36.3461 29.0037 36.6544 29.0038 36.8482 29.192L39.5 31.7658V19.8506C39.5 19.0267 38.8239 18.3506 38 18.3506H19.5ZM39.5 37.3169L34.2003 32.4747L36.4997 30.2472L39.5 33.1593V37.3169ZM39.4707 38.6447L26.1094 26.4368L18 34.2633V38.3506C18 39.1744 18.6761 39.8506 19.5 39.8506H38C38.7233 39.8506 39.3327 39.3294 39.4707 38.6447Z\" class=\"fill-border\"/></svg>",
    "export_pdf": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M37 18.6502H29.8V11.4502\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M30.3 18.1502V11.4502H29.3V18.6502C29.3 18.9263 29.5239 19.1502 29.8 19.1502H37V18.1502H30.3Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.6001 13.3502C13.6001 12.0913 14.607 10.9502 16.0001 10.9502H30.0093L37.4001 18.4451V38.4502C37.4001 39.709 36.3932 40.8502 35.0001 40.8502H16.0001C14.7413 40.8502 13.6001 39.8433 13.6001 38.4502V13.3502ZM16.0001 11.9502C15.1932 11.9502 14.6001 12.609 14.6001 13.3502V38.4502C14.6001 39.2571 15.2589 39.8502 16.0001 39.8502H35.0001C35.807 39.8502 36.4001 39.1913 36.4001 38.4502V18.8553L29.5909 11.9502H16.0001Z\" class=\"fill-border\"/><path d=\"M28.4 36.4502H10C8.9 36.4502 8 35.5502 8 34.4502V27.9502C8 26.8502 8.9 25.9502 10 25.9502H28.4C29.5 25.9502 30.4 26.8502 30.4 27.9502V34.4502C30.4 35.5502 29.5 36.4502 28.4 36.4502Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 26.4502C9.17614 26.4502 8.5 27.1263 8.5 27.9502V34.4502C8.5 35.2741 9.17614 35.9502 10 35.9502H28.4C29.2239 35.9502 29.9 35.2741 29.9 34.4502V27.9502C29.9 27.1263 29.2239 26.4502 28.4 26.4502H10ZM7.5 27.9502C7.5 26.5741 8.62386 25.4502 10 25.4502H28.4C29.7761 25.4502 30.9 26.5741 30.9 27.9502V34.4502C30.9 35.8263 29.7761 36.9502 28.4 36.9502H10C8.62386 36.9502 7.5 35.8263 7.5 34.4502V27.9502Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.1 28.8502C18.3209 28.8502 18.5 29.0293 18.5 29.2502V32.6502C18.5 32.8711 18.3209 33.0502 18.1 33.0502C17.879 33.0502 17.7 32.8711 17.7 32.6502V29.2502C17.7 29.0293 17.879 28.8502 18.1 28.8502Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.1 29.2502C22.1 29.0293 22.2791 28.8502 22.5 28.8502H24.3C24.5209 28.8502 24.7 29.0293 24.7 29.2502C24.7 29.4711 24.5209 29.6502 24.3 29.6502H22.9V32.6502C22.9 32.8711 22.7209 33.0502 22.5 33.0502C22.2791 33.0502 22.1 32.8711 22.1 32.6502V29.2502Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.3 28.8502C14.5209 28.8502 14.7 29.0293 14.7 29.2502V32.6502C14.7 32.8711 14.5209 33.0502 14.3 33.0502C14.0791 33.0502 13.9 32.8711 13.9 32.6502V29.2502C13.9 29.0293 14.0791 28.8502 14.3 28.8502Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.1 30.9502C22.1 30.7293 22.2791 30.5502 22.5 30.5502H24.3C24.5209 30.5502 24.7 30.7293 24.7 30.9502C24.7 31.1711 24.5209 31.3502 24.3 31.3502H22.5C22.2791 31.3502 22.1 31.1711 22.1 30.9502Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.9 29.1502C13.9 28.9293 14.0791 28.7502 14.3 28.7502H15.6C16.3097 28.7502 16.882 29.3114 16.8996 30.0166C16.9568 30.4095 16.8569 30.7768 16.6056 31.0474C16.3525 31.32 15.9871 31.4502 15.6 31.4502H14.3C14.0791 31.4502 13.9 31.2711 13.9 31.0502V29.1502ZM14.7 29.5502V30.6502H15.6C15.8129 30.6502 15.9476 30.5803 16.0194 30.503C16.0863 30.4309 16.138 30.3109 16.1055 30.1159C16.1018 30.0942 16.1 30.0722 16.1 30.0502C16.1 29.7711 15.8791 29.5502 15.6 29.5502H14.7Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.6 29.2502C17.6 29.0293 17.7791 28.8502 18 28.8502H19C20.1209 28.8502 21.1 29.8293 21.1 30.9502C21.1 32.0556 20.2361 33.0502 19 33.0502H18C17.7791 33.0502 17.6 32.8711 17.6 32.6502V29.2502ZM18.4 29.6502V32.2502H19C19.7638 32.2502 20.3 31.6449 20.3 30.9502C20.3 30.2711 19.6791 29.6502 19 29.6502H18.4Z\" class=\"fill-border\"/></svg>",
    "charts": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18.7001 27.0996H14.6001V39.4996H18.7001V27.0996Z\" class=\"fill-background\"/><path d=\"M26.9999 14.5996H22.8999V39.4996H26.9999V14.5996Z\" class=\"fill-background\"/><path d=\"M35.2999 22.9004H31.2V39.5004H35.2999V22.9004Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.5 10C11.1239 10 10 11.1239 10 12.5V37.5C10 38.8761 11.1239 40 12.5 40H31.18C31.1866 40.0003 31.1933 40.0004 31.2 40.0004H35.2999C35.3066 40.0004 35.3133 40.0003 35.3199 40H37.5C38.8761 40 40 38.8761 40 37.5V12.5C40 11.1239 38.8761 10 37.5 10H12.5ZM35.7999 39H37.5C38.3239 39 39 38.3239 39 37.5V12.5C39 11.6761 38.3239 11 37.5 11H12.5C11.6761 11 11 11.6761 11 12.5V37.5C11 38.3239 11.6761 39 12.5 39H14.1001V27.0996C14.1001 26.8235 14.324 26.5996 14.6001 26.5996H18.7001C18.9762 26.5996 19.2001 26.8235 19.2001 27.0996V39H22.3999V14.5996C22.3999 14.3235 22.6238 14.0996 22.8999 14.0996H26.9999C27.276 14.0996 27.4999 14.3235 27.4999 14.5996V39H30.7V22.9004C30.7 22.6242 30.9238 22.4004 31.2 22.4004H35.2999C35.5761 22.4004 35.7999 22.6242 35.7999 22.9004V39ZM34.7999 39H31.7V23.4004H34.7999V39ZM15.1001 38.9996V27.5996H18.2001V38.9996H15.1001ZM23.3999 15.0996V38.9996H26.4999V15.0996H23.3999Z\" class=\"fill-border\"/></svg>",
    "charts_bar": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.5 33.9004H11V37.2004H17.5V33.9004Z\" class=\"fill-background\"/><path d=\"M27.1 27.6004H11V30.8004H27.1V27.6004Z\" class=\"fill-background\"/><path d=\"M33.5 21.0004H11V24.3004H33.5V21.0004Z\" class=\"fill-background\"/><path d=\"M23.8 14.6004H11V17.9004H23.8V14.6004Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.5 13.4004C10.5 12.0242 11.6239 10.9004 13 10.9004H38C39.3761 10.9004 40.5 12.0242 40.5 13.4004V38.4004C40.5 39.7765 39.3761 40.9004 38 40.9004H13C11.6239 40.9004 10.5 39.7765 10.5 38.4004V13.4004ZM13 11.9004C12.1761 11.9004 11.5 12.5765 11.5 13.4004V14.1006H23.8C24.0761 14.1006 24.3 14.3244 24.3 14.6006V17.9006C24.3 18.1767 24.0761 18.4006 23.8 18.4006H11.5V20.5H33.5C33.7761 20.5 34 20.7239 34 21V24.3C34 24.5761 33.7761 24.8 33.5 24.8H11.5V27.1006H27.1C27.3761 27.1006 27.6 27.3244 27.6 27.6006V30.8006C27.6 31.0767 27.3761 31.3006 27.1 31.3006H11.5V33.4004H17.5C17.7761 33.4004 18 33.6242 18 33.9004V37.2004C18 37.4765 17.7761 37.7004 17.5 37.7004H11.5V38.4004C11.5 39.2242 12.1761 39.9004 13 39.9004H38C38.8239 39.9004 39.5 39.2242 39.5 38.4004V13.4004C39.5 12.5765 38.8239 11.9004 38 11.9004H13ZM11.5 17.4006H23.3V15.1006H11.5V17.4006ZM11.5 23.8V21.5H33V23.8H11.5ZM11.5 30.3006H26.6V28.1006H11.5V30.3006ZM11.5 36.7004V34.4004H17V36.7004H11.5Z\" class=\"fill-border\"/></svg>",
    "charts_column_line": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.5 37.2005H14.2V40.4005H17.5V37.2005Z\" class=\"fill-background\"/><path d=\"M23.8001 27.6005H20.6001V40.4005H23.8001V27.6005Z\" class=\"fill-background\"/><path d=\"M30.4001 30.7005H27.1001V40.4005H30.4001V30.7005Z\" class=\"fill-background\"/><path d=\"M36.8 24.4005H33.5V40.4005H36.8V24.4005Z\" class=\"fill-background\"/><path d=\"M15.9 30.7005C16.7837 30.7005 17.5 29.9841 17.5 29.1005C17.5 28.2168 16.7837 27.5005 15.9 27.5005C15.0164 27.5005 14.3 28.2168 14.3 29.1005C14.3 29.9841 15.0164 30.7005 15.9 30.7005Z\" class=\"fill-background\"/><path d=\"M22.3 21.0005C23.1836 21.0005 23.9 20.2841 23.9 19.4005C23.9 18.5168 23.1836 17.8005 22.3 17.8005C21.4163 17.8005 20.7 18.5168 20.7 19.4005C20.7 20.2841 21.4163 21.0005 22.3 21.0005Z\" class=\"fill-background\"/><path d=\"M28.7999 24.3005C29.6836 24.3005 30.4 23.5841 30.4 22.7005C30.4 21.8168 29.6836 21.1005 28.7999 21.1005C27.9163 21.1005 27.2 21.8168 27.2 22.7005C27.2 23.5841 27.9163 24.3005 28.7999 24.3005Z\" class=\"fill-background\"/><path d=\"M35.2001 17.8005C36.0838 17.8005 36.8001 17.0841 36.8001 16.2005C36.8001 15.3168 36.0838 14.6005 35.2001 14.6005C34.3164 14.6005 33.6001 15.3168 33.6001 16.2005C33.6001 17.0841 34.3164 17.8005 35.2001 17.8005Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.4095 27.6411C17.7751 28.019 18 28.5337 18 29.101C18 30.2608 17.0598 31.201 15.9 31.201C14.7402 31.201 13.8 30.2608 13.8 29.101C13.8 27.9412 14.7402 27.001 15.9 27.001C16.1317 27.001 16.3546 27.0385 16.5631 27.1078L20.7712 20.8404C20.417 20.4645 20.2 19.958 20.2 19.4008C20.2 18.241 21.1402 17.3008 22.3 17.3008C23.4598 17.3008 24.4 18.241 24.4 19.4008C24.4 19.575 24.3788 19.7443 24.3388 19.9061L27.2272 21.3091C27.6119 20.8745 28.174 20.6006 28.8 20.6006C29.1725 20.6006 29.5224 20.6976 29.8258 20.8677L33.404 17.2895C33.2111 16.972 33.1 16.5992 33.1 16.2006C33.1 15.0408 34.0402 14.1006 35.2 14.1006C36.3598 14.1006 37.3 15.0408 37.3 16.2006C37.3 17.3604 36.3598 18.3006 35.2 18.3006C34.8013 18.3006 34.4286 18.1895 34.1111 17.9966L30.5573 21.5504C30.774 21.8808 30.9 22.276 30.9 22.7006C30.9 23.8604 29.9598 24.8006 28.8 24.8006C27.6402 24.8006 26.7 23.8604 26.7 22.7006C26.7 22.5261 26.7213 22.3566 26.7614 22.1946L23.8733 20.7918C23.4886 21.2266 22.9263 21.5008 22.3 21.5008C22.0583 21.5008 21.8262 21.46 21.6101 21.3848L17.4095 27.6411ZM14.8 29.101C14.8 28.4935 15.2925 28.001 15.9 28.001C16.0323 28.001 16.1592 28.0243 16.2767 28.0672C16.3128 28.1247 16.3613 28.1757 16.4213 28.2159C16.4928 28.264 16.5723 28.2911 16.6525 28.2987C16.8664 28.4993 17 28.7846 17 29.101C17 29.7085 16.5075 30.201 15.9 30.201C15.2925 30.201 14.8 29.7085 14.8 29.101ZM22.3 18.3008C21.6925 18.3008 21.2 18.7933 21.2 19.4008C21.2 20.0083 21.6925 20.5008 22.3 20.5008C22.9075 20.5008 23.4 20.0083 23.4 19.4008C23.4 18.7933 22.9075 18.3008 22.3 18.3008ZM27.7 22.7006C27.7 22.0931 28.1925 21.6006 28.8 21.6006C29.4075 21.6006 29.9 22.0931 29.9 22.7006C29.9 23.3081 29.4075 23.8006 28.8 23.8006C28.1925 23.8006 27.7 23.3081 27.7 22.7006ZM35.2 15.1006C34.5925 15.1006 34.1 15.5931 34.1 16.2006C34.1 16.8081 34.5925 17.3006 35.2 17.3006C35.8075 17.3006 36.3 16.8081 36.3 16.2006C36.3 15.5931 35.8075 15.1006 35.2 15.1006Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 10.9004C11.6239 10.9004 10.5 12.0242 10.5 13.4004V38.4004C10.5 39.7765 11.6239 40.9004 13 40.9004H20.5859L20.6 40.9006H23.8L23.8141 40.9004H38C39.3761 40.9004 40.5 39.7765 40.5 38.4004V13.4004C40.5 12.0242 39.3761 10.9004 38 10.9004H13ZM36.3 39.9004H34V24.9004H36.3V39.9004ZM37.3 24.4004V39.9004H38C38.8239 39.9004 39.5 39.2242 39.5 38.4004V13.4004C39.5 12.5765 38.8239 11.9004 38 11.9004H13C12.1761 11.9004 11.5 12.5765 11.5 13.4004V38.4004C11.5 39.2242 12.1761 39.9004 13 39.9004H13.7V37.2002C13.7 36.9241 13.9239 36.7002 14.2 36.7002H17.5C17.7762 36.7002 18 36.9241 18 37.2002V39.9004H20.1V27.6006C20.1 27.3244 20.3239 27.1006 20.6 27.1006H23.8C24.0761 27.1006 24.3 27.3244 24.3 27.6006V39.9004H26.6V30.7002C26.6 30.4241 26.8239 30.2002 27.1 30.2002H30.4C30.6761 30.2002 30.9 30.4241 30.9 30.7002V39.9004H33V24.4004C33 24.1242 33.2239 23.9004 33.5 23.9004H36.8C37.0761 23.9004 37.3 24.1242 37.3 24.4004ZM21.1 39.9004H23.3V28.1006H21.1V39.9004ZM14.7 39.9002V37.7002H17V39.9002H14.7ZM27.6 39.9002V31.2002H29.9V39.9002H27.6Z\" class=\"fill-border\"/></svg>",
    "charts_stacked_column": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.5 30.8004H14.2V40.4004H17.5V30.8004Z\" class=\"fill-background\"/><path d=\"M23.8001 24.3004H20.6001V40.4004H23.8001V24.3004Z\" class=\"fill-background\"/><path d=\"M30.4001 17.8004H27.1001V40.4004H30.4001V17.8004Z\" class=\"fill-background\"/><path d=\"M36.8 27.6004H33.5V40.4004H36.8V27.6004Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 10.9004C11.6239 10.9004 10.5 12.0242 10.5 13.4004V38.4004C10.5 39.7765 11.6239 40.9004 13 40.9004H14.1801C14.1867 40.9007 14.1933 40.9008 14.2 40.9008H17.5C17.5067 40.9008 17.5133 40.9007 17.52 40.9004H20.58C20.5867 40.9007 20.5933 40.9008 20.6 40.9008H23.8C23.8067 40.9008 23.8133 40.9007 23.82 40.9004H27.08C27.0867 40.9007 27.0933 40.9008 27.1 40.9008H30.4L30.412 40.9006L30.42 40.9004H33.4859L33.5 40.9006H36.8L36.8141 40.9004H38C39.3761 40.9004 40.5 39.7765 40.5 38.4004V13.4004C40.5 12.0242 39.3761 10.9004 38 10.9004H13ZM34 39.9004H36.3V31.2002H34V39.9004ZM33 39.9004H30.9V30.7026L30.9 30.7002L30.9 30.6978V17.8008C30.9 17.5246 30.6761 17.3008 30.4 17.3008H27.1C26.8239 17.3008 26.6 17.5246 26.6 17.8008V39.9004H24.3V24.3008C24.3 24.0246 24.0761 23.8008 23.8 23.8008H20.6C20.3239 23.8008 20.1 24.0246 20.1 24.3008V39.9004H18V30.8008C18 30.5246 17.7762 30.3008 17.5 30.3008H14.2C13.9239 30.3008 13.7 30.5246 13.7 30.8008V39.9004H13C12.1761 39.9004 11.5 39.2242 11.5 38.4004V13.4004C11.5 12.5765 12.1761 11.9004 13 11.9004H38C38.8239 11.9004 39.5 12.5765 39.5 13.4004V38.4004C39.5 39.2242 38.8239 39.9004 38 39.9004H37.3V27.6006C37.3 27.5836 37.2992 27.5668 37.2975 27.5503C37.2992 27.5338 37.3 27.517 37.3 27.5C37.3 27.2239 37.0761 27 36.8 27H33.5C33.2239 27 33 27.2239 33 27.5C33 27.517 33.0008 27.5338 33.0025 27.5503C33.0008 27.5668 33 27.5836 33 27.6006V39.9004ZM29.9 30.2002V24.8008H27.6V30.2002H29.9ZM27.6 31.2002V39.9004H29.9V31.2002H27.6ZM21.1 28.1006V39.9004H23.3V28.1006H21.1ZM23.3 27.1006H21.1V24.8008H23.3V27.1006ZM29.9 23.8008H27.6V21.5H29.9V23.8008ZM29.9 18.3008V20.5H27.6V18.3008H29.9ZM34 30.2002V28.1006H36.3V30.2002H34ZM17 39.9004H14.7V34.5H17V39.9004ZM14.7 33.5V31.3008H17V33.5H14.7Z\" class=\"fill-border\"/></svg>",
    "charts_line": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.9 34.8004C16.7837 34.8004 17.5 34.0841 17.5 33.2004C17.5 32.3167 16.7837 31.6004 15.9 31.6004C15.0164 31.6004 14.3 32.3167 14.3 33.2004C14.3 34.0841 15.0164 34.8004 15.9 34.8004Z\" class=\"fill-background\"/><path d=\"M22.3 25.1004C23.1836 25.1004 23.9 24.384 23.9 23.5004C23.9 22.6167 23.1836 21.9004 22.3 21.9004C21.4163 21.9004 20.7 22.6167 20.7 23.5004C20.7 24.384 21.4163 25.1004 22.3 25.1004Z\" class=\"fill-background\"/><path d=\"M28.7999 28.3004C29.6836 28.3004 30.4 27.5841 30.4 26.7004C30.4 25.8167 29.6836 25.1004 28.7999 25.1004C27.9163 25.1004 27.2 25.8167 27.2 26.7004C27.2 27.5841 27.9163 28.3004 28.7999 28.3004Z\" class=\"fill-background\"/><path d=\"M35.2001 21.9004C36.0838 21.9004 36.8001 21.184 36.8001 20.3004C36.8001 19.4167 36.0838 18.7004 35.2001 18.7004C34.3164 18.7004 33.6001 19.4167 33.6001 20.3004C33.6001 21.184 34.3164 21.9004 35.2001 21.9004Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.9 31.1006C14.7402 31.1006 13.8 32.0408 13.8 33.2006C13.8 34.3604 14.7402 35.3006 15.9 35.3006C17.0598 35.3006 18 34.3604 18 33.2006C18 32.6334 17.7751 32.1187 17.4097 31.7408L21.6103 25.4845C21.8263 25.5596 22.0584 25.6004 22.3 25.6004C22.9561 25.6004 23.542 25.2995 23.9271 24.8281L26.7429 26.2762C26.7148 26.4133 26.7 26.5552 26.7 26.7006C26.7 27.8604 27.6402 28.8006 28.8 28.8006C29.9598 28.8006 30.9 27.8604 30.9 26.7006C30.9 26.2995 30.7876 25.9247 30.5925 25.606L34.0513 22.0585C34.3814 22.2746 34.776 22.4002 35.2 22.4002C36.3598 22.4002 37.3 21.46 37.3 20.3002C37.3 19.1404 36.3598 18.2002 35.2 18.2002C34.0402 18.2002 33.1 19.1404 33.1 20.3002C33.1 20.6732 33.1973 21.0235 33.3678 21.3271L29.8831 24.9011C29.5669 24.7103 29.1963 24.6006 28.8 24.6006C28.1439 24.6006 27.558 24.9015 27.1729 25.3729L24.3571 23.9248C24.3852 23.7877 24.4 23.6458 24.4 23.5004C24.4 22.3406 23.4598 21.4004 22.3 21.4004C21.1402 21.4004 20.2 22.3406 20.2 23.5004C20.2 24.0577 20.4171 24.5643 20.7713 24.9402L16.5633 31.2075C16.3548 31.1381 16.1318 31.1006 15.9 31.1006ZM14.8 33.2006C14.8 32.5931 15.2925 32.1006 15.9 32.1006C16.5075 32.1006 17 32.5931 17 33.2006C17 33.8081 16.5075 34.3006 15.9 34.3006C15.2925 34.3006 14.8 33.8081 14.8 33.2006ZM22.3 22.4004C21.6925 22.4004 21.2 22.8929 21.2 23.5004C21.2 24.1079 21.6925 24.6004 22.3 24.6004C22.9075 24.6004 23.4 24.1079 23.4 23.5004C23.4 22.8929 22.9075 22.4004 22.3 22.4004ZM27.7 26.7006C27.7 26.0931 28.1925 25.6006 28.8 25.6006C29.4075 25.6006 29.9 26.0931 29.9 26.7006C29.9 27.3081 29.4075 27.8006 28.8 27.8006C28.1925 27.8006 27.7 27.3081 27.7 26.7006ZM35.2 19.2002C34.5925 19.2002 34.1 19.6927 34.1 20.3002C34.1 20.9077 34.5925 21.4002 35.2 21.4002C35.8075 21.4002 36.3 20.9077 36.3 20.3002C36.3 19.6927 35.8075 19.2002 35.2 19.2002Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 10.9004C11.6239 10.9004 10.5 12.0242 10.5 13.4004V38.4004C10.5 39.7765 11.6239 40.9004 13 40.9004H38C39.3761 40.9004 40.5 39.7765 40.5 38.4004V13.4004C40.5 12.0242 39.3761 10.9004 38 10.9004H13ZM11.5 13.4004C11.5 12.5765 12.1761 11.9004 13 11.9004H38C38.8239 11.9004 39.5 12.5765 39.5 13.4004V38.4004C39.5 39.2242 38.8239 39.9004 38 39.9004H13C12.1761 39.9004 11.5 39.2242 11.5 38.4004V13.4004Z\" class=\"fill-border\"/></svg>",
    "charts_pie": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M25.5 16.7004V25.9004L18 31.3004C19.7 33.6004 22.4 35.1004 25.5 35.1004C30.6 35.1004 34.7 31.0004 34.7 25.9004C34.7 20.9004 30.6 16.7004 25.5 16.7004Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.8 25.9002C15.8 20.543 20.1428 16.2002 25.5 16.2002C30.8572 16.2002 35.2 20.543 35.2 25.9002C35.2 31.2574 30.8572 35.6002 25.5 35.6002C20.1428 35.6002 15.8 31.2574 15.8 25.9002ZM25 17.2143C22.9265 17.3318 21.0472 18.1754 19.6124 19.4949L25 24.7192V17.2143ZM26 17.2143V25.9002C26 26.0733 25.9121 26.2258 25.7784 26.3156L18.7431 31.381C20.3382 33.3451 22.7725 34.6002 25.5 34.6002C30.3049 34.6002 34.2 30.7051 34.2 25.9002C34.2 21.2631 30.5722 17.4734 26 17.2143ZM16.8 25.9002C16.8 23.7259 17.5976 21.7379 18.9162 20.2128L24.7228 25.8434L18.1581 30.5699C17.2982 29.2208 16.8 27.6187 16.8 25.9002Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.5 13.4004C10.5 12.0242 11.6239 10.9004 13 10.9004H38C39.3761 10.9004 40.5 12.0242 40.5 13.4004V38.4004C40.5 39.7765 39.3761 40.9004 38 40.9004H13C11.6239 40.9004 10.5 39.7765 10.5 38.4004V13.4004ZM13 11.9004C12.1761 11.9004 11.5 12.5765 11.5 13.4004V38.4004C11.5 39.2242 12.1761 39.9004 13 39.9004H38C38.8239 39.9004 39.5 39.2242 39.5 38.4004V13.4004C39.5 12.5765 38.8239 11.9004 38 11.9004H13Z\" class=\"fill-border\"/></svg>",
    "charts_scatter": "<svg width=\"51\" height=\"51\" viewBox=\"0 0 51 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.9 34.0004C16.7837 34.0004 17.5 33.2841 17.5 32.4004C17.5 31.5168 16.7837 30.8004 15.9 30.8004C15.0164 30.8004 14.3 31.5168 14.3 32.4004C14.3 33.2841 15.0164 34.0004 15.9 34.0004Z\" class=\"fill-background\"/><path d=\"M22.3 24.3004C23.1836 24.3004 23.9 23.5841 23.9 22.7004C23.9 21.8167 23.1836 21.1004 22.3 21.1004C21.4163 21.1004 20.7 21.8167 20.7 22.7004C20.7 23.5841 21.4163 24.3004 22.3 24.3004Z\" class=\"fill-background\"/><path d=\"M28.7999 27.5004C29.6836 27.5004 30.4 26.7841 30.4 25.9004C30.4 25.0168 29.6836 24.3004 28.7999 24.3004C27.9163 24.3004 27.2 25.0168 27.2 25.9004C27.2 26.7841 27.9163 27.5004 28.7999 27.5004Z\" class=\"fill-background\"/><path d=\"M35.2001 21.1004C36.0838 21.1004 36.8001 20.384 36.8001 19.5004C36.8001 18.6167 36.0838 17.9004 35.2001 17.9004C34.3164 17.9004 33.6001 18.6167 33.6001 19.5004C33.6001 20.384 34.3164 21.1004 35.2001 21.1004Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.8 32.4008C13.8 31.241 14.7402 30.3008 15.9 30.3008C17.0598 30.3008 18 31.241 18 32.4008C18 33.5606 17.0598 34.5008 15.9 34.5008C14.7402 34.5008 13.8 33.5606 13.8 32.4008ZM15.9 31.3008C15.2925 31.3008 14.8 31.7933 14.8 32.4008C14.8 33.0083 15.2925 33.5008 15.9 33.5008C16.5075 33.5008 17 33.0083 17 32.4008C17 31.7933 16.5075 31.3008 15.9 31.3008Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.3 20.6006C21.1402 20.6006 20.2 21.5408 20.2 22.7006C20.2 23.8604 21.1402 24.8006 22.3 24.8006C23.4598 24.8006 24.4 23.8604 24.4 22.7006C24.4 21.5408 23.4598 20.6006 22.3 20.6006ZM21.2 22.7006C21.2 22.0931 21.6925 21.6006 22.3 21.6006C22.9075 21.6006 23.4 22.0931 23.4 22.7006C23.4 23.3081 22.9075 23.8006 22.3 23.8006C21.6925 23.8006 21.2 23.3081 21.2 22.7006Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M26.7 25.9008C26.7 24.741 27.6402 23.8008 28.8 23.8008C29.9598 23.8008 30.9 24.741 30.9 25.9008C30.9 27.0606 29.9598 28.0008 28.8 28.0008C27.6402 28.0008 26.7 27.0606 26.7 25.9008ZM28.8 24.8008C28.1925 24.8008 27.7 25.2933 27.7 25.9008C27.7 26.5083 28.1925 27.0008 28.8 27.0008C29.4075 27.0008 29.9 26.5083 29.9 25.9008C29.9 25.2933 29.4075 24.8008 28.8 24.8008Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M35.2 17.4004C34.0402 17.4004 33.1 18.3406 33.1 19.5004C33.1 20.6602 34.0402 21.6004 35.2 21.6004C36.3598 21.6004 37.3 20.6602 37.3 19.5004C37.3 18.3406 36.3598 17.4004 35.2 17.4004ZM34.1 19.5004C34.1 18.8929 34.5925 18.4004 35.2 18.4004C35.8075 18.4004 36.3 18.8929 36.3 19.5004C36.3 20.1079 35.8075 20.6004 35.2 20.6004C34.5925 20.6004 34.1 20.1079 34.1 19.5004Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.5 13.4004C10.5 12.0242 11.6239 10.9004 13 10.9004H38C39.3761 10.9004 40.5 12.0242 40.5 13.4004V38.4004C40.5 39.7765 39.3761 40.9004 38 40.9004H13C11.6239 40.9004 10.5 39.7765 10.5 38.4004V13.4004ZM13 11.9004C12.1761 11.9004 11.5 12.5765 11.5 13.4004V38.4004C11.5 39.2242 12.1761 39.9004 13 39.9004H38C38.8239 39.9004 39.5 39.2242 39.5 38.4004V13.4004C39.5 12.5765 38.8239 11.9004 38 11.9004H13Z\" class=\"fill-border\"/></svg>",
    "format": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.9126 23.5371H26.5126V28.04L22.0125 23.6377L20.8125 29.3377L26.5126 28.1584V31.5371H10.9126V23.5371Z\" class=\"fill-background\"/><path d=\"M22.0125 23.6375L24.4037 26.0787L26.5125 28.1375L38.5125 16.1375C39.8125 14.8375 39.8125 12.8375 38.5125 11.5375C37.2125 10.2375 35.2125 10.2375 33.9125 11.5375L22.0125 23.6375Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M33.559 11.1839C35.0542 9.68868 37.3708 9.68868 38.8661 11.1839C40.3613 12.6792 40.3613 14.9958 38.8661 16.4911L34.9125 20.4447V37.317C35.0262 38.8372 33.7568 39.9367 32.4125 39.9367H12.6125C11.1363 39.9367 10.0125 38.8129 10.0125 37.3367V17.7367C10.0125 16.2606 11.1363 15.1367 12.6125 15.1367H29.6715L33.556 11.1869L33.559 11.1839ZM28.688 16.1367H12.6125C11.6886 16.1367 11.0125 16.8129 11.0125 17.7367V23.0367H21.9021L28.688 16.1367ZM21.4175 24.0367H19.0125V31.2373H26.0125V28.7537L20.9155 29.8268C20.7502 29.8616 20.5784 29.8105 20.459 29.6911C20.3395 29.5716 20.2884 29.3998 20.3232 29.2345L21.4175 24.0367ZM27.0125 28.3447V31.2373H33.9125V24.0367H31.3204L27.0125 28.3447ZM32.3204 23.0367H33.9125V21.4447L32.3204 23.0367ZM34.2675 11.8897L22.7204 23.6307L26.558 27.3849L38.159 15.7839C39.2637 14.6792 39.2637 12.9958 38.159 11.8911C37.0547 10.7868 35.3722 10.7863 34.2675 11.8897ZM21.4597 28.6903L22.3141 24.6321L25.5765 27.8236L21.4597 28.6903ZM26.0125 32.2373V38.9367H19.0125V32.2373H26.0125ZM27.0125 38.9367V32.2373H33.9125V37.3367C33.9125 37.3506 33.913 37.3644 33.9142 37.3782C33.9866 38.2467 33.2616 38.9367 32.4125 38.9367H27.0125ZM18.0125 31.2373V24.0367H11.0125V31.2373H18.0125ZM11.0125 32.2373H18.0125V38.9367H12.6125C11.6886 38.9367 11.0125 38.2606 11.0125 37.3367V32.2373Z\" class=\"fill-border\"/></svg>",
    "format_number": "<svg width=\"50\" height=\"51\" viewBox=\"0 0 50 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M29.6001 11.4005H37.5001C38.6001 11.4005 39.5001 12.3005 39.5001 13.4005V38.3005C39.5001 39.4005 38.6001 40.3005 37.5001 40.3005H29.6001V11.4005Z\" class=\"fill-background\"/><path d=\"M16.9 22.6008C16.9 21.994 17.2189 21.4325 17.8066 21.0051C18.3972 20.5756 19.2407 20.3008 20.2 20.3008C21.1501 20.3008 21.9936 20.5955 22.5887 21.0392C23.1866 21.4849 23.5 22.0498 23.5 22.6008C23.5 22.8769 23.7239 23.1008 24 23.1008C24.2761 23.1008 24.5 22.8769 24.5 22.6008C24.5 21.6518 23.9634 20.8167 23.1863 20.2374C22.521 19.7414 21.6542 19.41 20.7 19.3234V17.1006C20.7 16.8244 20.4761 16.6006 20.2 16.6006C19.9239 16.6006 19.7 16.8244 19.7 17.1006V19.3219C18.7527 19.4023 17.8867 19.7104 17.2184 20.1964C16.431 20.769 15.9 21.6075 15.9 22.6008C15.9 23.6826 16.2794 24.5368 17.0539 25.1442C17.7968 25.7269 18.8528 26.042 20.1334 26.1964C21.4344 26.3899 22.2766 26.7428 22.7871 27.1804C23.2773 27.6006 23.5 28.1309 23.5 28.8008C23.5 29.3518 23.1866 29.9167 22.5887 30.3624C21.9936 30.806 21.1501 31.1008 20.2 31.1008C19.2407 31.1008 18.3972 30.826 17.8066 30.3964C17.2189 29.969 16.9 29.4075 16.9 28.8008C16.9 28.5246 16.6761 28.3008 16.4 28.3008C16.1239 28.3008 15.9 28.5246 15.9 28.8008C15.9 29.794 16.431 30.6325 17.2184 31.2052C17.8867 31.6912 18.7527 31.9992 19.7 32.0797V34.4002C19.7 34.6763 19.9239 34.9002 20.2 34.9002C20.4761 34.9002 20.7 34.6763 20.7 34.4002V32.0782C21.6542 31.9916 22.521 31.6602 23.1863 31.1642C23.9634 30.5849 24.5 29.7498 24.5 28.8008C24.5 27.8707 24.1727 27.051 23.4379 26.4212C22.7243 25.8095 21.6685 25.4129 20.2733 25.2062L20.2596 25.2043C19.0433 25.0584 18.2018 24.7736 17.6711 24.3574C17.1706 23.9648 16.9 23.419 16.9 22.6008Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.6 10.9004C11.1239 10.9004 10 12.0242 10 13.5004V38.3004C10 39.7765 11.1239 40.9004 12.6 40.9004H37.4C38.8761 40.9004 40 39.7765 40 38.3004V13.5004C40 12.0242 38.8761 10.9004 37.4 10.9004H12.6ZM11 13.5004C11 12.5765 11.6761 11.9004 12.6 11.9004H29.3V39.9004H12.6C11.6761 39.9004 11 39.2242 11 38.3004V13.5004ZM30.3 18.2002V11.9004H37.4C38.3239 11.9004 39 12.5765 39 13.5004V18.2002H30.3ZM30.3 25.4004V19.2002H39V25.4004H30.3ZM30.3 32.6006V26.4004H39V32.6006H30.3ZM30.3 39.9004V33.6006H39V38.3004C39 39.2242 38.3239 39.9004 37.4 39.9004H30.3Z\" class=\"fill-border\"/></svg>",
    "format_conditional": "<svg width=\"50\" height=\"51\" viewBox=\"0 0 50 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.2 40.4004H12.6C11.4 40.4004 10.5 39.5004 10.5 38.3004V13.5004C10.5 12.3004 11.4 11.4004 12.6 11.4004H37.4C38.6 11.4004 39.5 12.3004 39.5 13.5004L39.5 18.6006H20.2V40.4004Z\" class=\"fill-background\"/><path d=\"M28.8721 23.9195C29.1038 23.7693 29.1698 23.4596 29.0195 23.228C28.8692 22.9963 28.5596 22.9303 28.3279 23.0806L24.6279 25.4806C24.4858 25.5728 24.4 25.7307 24.4 25.9001C24.4 26.0695 24.4858 26.2274 24.6279 26.3195L28.3279 28.7195C28.5596 28.8698 28.8692 28.8038 29.0195 28.5722C29.1698 28.3405 29.1038 28.0309 28.8721 27.8806L25.8188 25.9001L28.8721 23.9195Z\" class=\"fill-border\"/><path d=\"M30.5773 30.4333C30.7247 30.1998 31.0335 30.1301 31.267 30.2775L35.067 32.6775C35.2107 32.7682 35.2984 32.9257 35.3 33.0956C35.3016 33.2655 35.2168 33.4246 35.0748 33.518L31.2748 36.018C31.0441 36.1697 30.7341 36.1058 30.5823 35.8751C30.4305 35.6444 30.4945 35.3343 30.7252 35.1826L33.8772 33.1088L30.733 31.123C30.4995 30.9755 30.4298 30.6667 30.5773 30.4333Z\" class=\"fill-border\"/><path d=\"M24.9 31.7002C24.6239 31.7002 24.4 31.9241 24.4 32.2002C24.4 32.4763 24.6239 32.7002 24.9 32.7002H28.6C28.8761 32.7002 29.1 32.4763 29.1 32.2002C29.1 31.9241 28.8761 31.7002 28.6 31.7002H24.9Z\" class=\"fill-border\"/><path d=\"M24.4 34.1006C24.4 33.8244 24.6239 33.6006 24.9 33.6006H28.6C28.8761 33.6006 29.1 33.8244 29.1 34.1006C29.1 34.3767 28.8761 34.6006 28.6 34.6006H24.9C24.6239 34.6006 24.4 34.3767 24.4 34.1006Z\" class=\"fill-border\"/><path d=\"M31 24.5C30.7239 24.5 30.5 24.7239 30.5 25C30.5 25.2761 30.7239 25.5 31 25.5H32.4629L32.1277 26.3008H31C30.7239 26.3008 30.5 26.5246 30.5 26.8008C30.5 27.0769 30.7239 27.3008 31 27.3008H31.7091L31.5388 27.7076C31.4321 27.9624 31.5522 28.2553 31.8069 28.3619C32.0617 28.4686 32.3546 28.3485 32.4612 28.0938L32.7932 27.3008H34.8C35.0761 27.3008 35.3 27.0769 35.3 26.8008C35.3 26.5246 35.0761 26.3008 34.8 26.3008H33.2118L33.547 25.5H34.8C35.0761 25.5 35.3 25.2761 35.3 25C35.3 24.7239 35.0761 24.5 34.8 24.5H33.9656L34.2612 23.7938C34.3678 23.5391 34.2478 23.2461 33.9931 23.1395C33.7383 23.0329 33.4454 23.1529 33.3388 23.4076L32.8815 24.5H31Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 13.5004C10 12.0242 11.1239 10.9004 12.6 10.9004H37.4C38.8761 10.9004 40 12.0242 40 13.5004V38.3004C40 39.7765 38.8761 40.9004 37.4 40.9004H12.6C11.1239 40.9004 10 39.7765 10 38.3004V13.5004ZM12.6 11.9004C11.6761 11.9004 11 12.5765 11 13.5004V18.1006H19.7V11.9004H12.6ZM20.7 11.9004V18.1006H29.3V11.9004H20.7ZM39 18.1006H30.3V11.9004H37.4C38.3239 11.9004 39 12.5765 39 13.5004V18.1006ZM19.7 19.1006H11V25.4004H19.7V19.1006ZM19.7 26.4004H11V32.6006H19.7V26.4004ZM19.7 33.6006H11V38.3004C11 39.2242 11.6761 39.9004 12.6 39.9004H19.7V33.6006ZM20.7 39.9004V19.1006H39V38.3004C39 39.2242 38.3239 39.9004 37.4 39.9004H20.7Z\" class=\"fill-border\"/></svg>",
    "options": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M39 28.75C37.2 28.55 35.6 26.95 35.6 24.85C35.6 23.05 37.2 21.45 39 21.25C38.3 18.95 37.2 16.75 35.4 14.85C34.3 16.25 32 16.65 30.4 15.75C28.6 14.85 28.1 12.75 28.8 10.95C26.3 10.25 23.8 10.25 21.3 10.95C22 12.75 21.3 14.85 19.7 15.75C17.9 16.65 15.8 16.25 14.7 14.85C13.8 15.75 13.1 16.65 12.4 17.85C11.7 19.05 11.3 20.15 11 21.25C12.8 21.45 14.4 23.05 14.4 25.15C14.4 26.95 12.8 28.55 11 28.75C11.7 31.05 12.8 33.25 14.6 35.15C15.7 33.75 18 33.35 19.6 34.25C21.4 35.15 21.9 37.25 21.2 39.05C23.7 39.75 26.2 39.75 28.7 39.05C28 37.25 28.7 35.15 30.3 34.25C32.1 33.35 34.2 33.75 35.3 35.15C36.2 34.25 36.9 33.35 37.6 32.15C38.3 31.05 38.7 29.95 39 28.75ZM22.2 28.95C19.9 27.55 19 24.65 20.4 22.35C21.8 20.05 24.7 19.35 27.2 20.55C29.5 21.95 30.4 24.85 29 27.15C27.6 29.65 24.4 30.35 22.2 28.95Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.1652 10.4685C23.7534 9.74382 26.3466 9.74382 28.9348 10.4685C29.0707 10.5066 29.1842 10.6002 29.2473 10.7265C29.3103 10.8527 29.3171 10.9997 29.266 11.1312C28.6349 12.7541 29.1108 14.5464 30.6236 15.3028C30.6309 15.3064 30.6381 15.3102 30.6451 15.3142C31.3307 15.6998 32.1854 15.8153 32.9998 15.6702C33.8149 15.5251 34.5463 15.1273 35.0068 14.5411C35.0966 14.4268 35.2317 14.3572 35.3769 14.3505C35.5221 14.3438 35.663 14.4006 35.763 14.5061C37.6282 16.4749 38.7614 18.7488 39.4783 21.1044C39.5216 21.2467 39.4994 21.4008 39.4176 21.525C39.3358 21.6492 39.203 21.7305 39.0552 21.7469C37.476 21.9224 36.1 23.3361 36.1 24.85C36.1 26.6883 37.5015 28.0804 39.0552 28.253C39.1986 28.269 39.3281 28.3461 39.4105 28.4645C39.4929 28.583 39.5201 28.7313 39.4851 28.8713C39.1772 30.1026 38.7611 31.2543 38.027 32.4102C37.3073 33.6426 36.5823 34.5748 35.6536 35.5035C35.5524 35.6046 35.4129 35.6576 35.2702 35.6491C35.1274 35.6406 34.9952 35.5713 34.9068 35.4589C33.9761 34.2743 32.1507 33.8896 30.5346 34.6917C29.1756 35.4637 28.5507 37.2865 29.166 38.8688C29.2171 39.0003 29.2103 39.1473 29.1473 39.2735C29.0842 39.3997 28.9707 39.4934 28.8348 39.5315C26.2466 40.2562 23.6534 40.2562 21.0652 39.5315C20.9293 39.4934 20.8158 39.3997 20.7527 39.2735C20.6897 39.1473 20.6829 39.0003 20.734 38.8688C21.3651 37.2459 20.8892 35.4536 19.3764 34.6972C19.3734 34.6957 19.3703 34.6941 19.3673 34.6926C19.3631 34.6904 19.359 34.6881 19.3549 34.6858C18.6693 34.3001 17.8146 34.1847 17.0002 34.3297C16.1851 34.4749 15.4537 34.8727 14.9932 35.4589C14.9034 35.5732 14.7683 35.6427 14.6231 35.6495C14.4779 35.6562 14.337 35.5994 14.237 35.4939C12.3718 33.5251 11.2386 31.2512 10.5217 28.8956C10.4784 28.7533 10.5006 28.5992 10.5824 28.475C10.6642 28.3508 10.797 28.2695 10.9448 28.253C12.524 28.0776 13.9 26.6639 13.9 25.15C13.9 23.3117 12.4985 21.9196 10.9448 21.7469C10.7995 21.7308 10.6686 21.6519 10.5865 21.531C10.5043 21.4102 10.4792 21.2594 10.5176 21.1184C10.826 19.9878 11.2408 18.8449 11.9681 17.5981C12.6894 16.3616 13.4156 15.4273 14.3464 14.4964C14.4476 14.3953 14.5871 14.3423 14.7298 14.3509C14.8726 14.3594 15.0048 14.4286 15.0932 14.5411C16.0239 15.7256 17.8493 16.1104 19.4654 15.3083C20.8244 14.5363 21.4493 12.7135 20.834 11.1312C20.7829 10.9997 20.7897 10.8527 20.8527 10.7265C20.9158 10.6002 21.0293 10.5066 21.1652 10.4685ZM21.9353 11.301C22.4071 13.1847 21.6194 15.244 19.9451 16.1858C19.9381 16.1898 19.9309 16.1936 19.9236 16.1972C18.1275 17.0952 16.0133 16.8371 14.6898 15.5796C13.9903 16.3281 13.4129 17.1059 12.8319 18.1019C12.2686 19.0676 11.9069 19.9659 11.6329 20.8604C13.4284 21.3305 14.9 23.0137 14.9 25.15C14.9 27.0295 13.4193 28.6657 11.6481 29.1355C12.2818 31.0261 13.2088 32.8211 14.6038 34.4121C15.2148 33.8485 16.0063 33.491 16.8248 33.3452C17.8315 33.166 18.9222 33.2988 19.8344 33.8082C21.7292 34.7624 22.3295 36.8439 21.8389 38.6998C23.9153 39.2003 25.9883 39.2 28.0646 38.699C27.5929 36.8152 28.3806 34.7559 30.0549 33.8142C30.0597 33.8115 30.0646 33.8089 30.0695 33.8063C30.0718 33.8051 30.0741 33.8039 30.0764 33.8028C31.8725 32.9047 33.9867 33.1628 35.3102 34.4204C36.0097 33.6719 36.5871 32.8941 37.1681 31.8981C37.1706 31.8938 37.1731 31.8897 37.1757 31.8855C37.1765 31.8842 37.1773 31.8829 37.1782 31.8815C37.7421 30.9954 38.1032 30.1061 38.3779 29.1424C36.5775 28.6762 35.1 26.9906 35.1 24.85C35.1 22.9704 36.5807 21.3342 38.3519 20.8644C37.7183 18.9739 36.7912 17.1789 35.3962 15.5879C34.7852 16.1514 33.9937 16.509 33.1752 16.6547C32.1685 16.834 31.0778 16.7012 30.1655 16.1917C28.2708 15.2376 27.6705 13.156 28.1611 11.3001C26.0848 10.7997 24.0117 10.7999 21.9353 11.301ZM26.9612 20.99C24.6685 19.902 22.0729 20.5632 20.8271 22.61C19.5891 24.6438 20.3644 27.2473 22.46 28.5229L22.4685 28.5281L22.4684 28.5282C24.4276 29.7749 27.3049 29.1536 28.5637 26.9057C28.5667 26.9004 28.5698 26.8952 28.5729 26.89C29.8067 24.863 29.0408 22.2702 26.9612 20.99ZM19.9729 22.09C21.523 19.5434 24.7145 18.8023 27.4164 20.0992C27.4313 20.1064 27.4458 20.1143 27.46 20.1229C29.9619 21.6458 30.987 24.8374 29.4318 27.4022C27.8892 30.1463 24.3741 30.9227 21.9358 29.3745C19.4344 27.849 18.4118 24.6547 19.9729 22.09Z\" class=\"fill-border\"/></svg>",
    "fields": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M34.2 18.4002H10.5V12.6002C10.5 11.4002 11.4 10.5002 12.6 10.5002H32.1C33.3 10.5002 34.2 11.4002 34.2 12.6002V18.4002V18.4002Z\" class=\"fill-background\"/><path d=\"M39.5 33.1998C38.4 33.0998 37.5 32.0998 37.5 30.9998C37.5 29.8998 38.4 28.9998 39.5 28.8998C39.1 27.5998 38.4 26.2998 37.4 25.1998C36.7 25.9998 35.4 26.2998 34.5 25.6998C33.4 25.1998 33.2 23.9998 33.6 22.8998C32.1 22.4998 30.7 22.4998 29.2 22.8998C29.6 23.9998 29.2 25.0998 28.3 25.6998C27.2 26.1998 26 25.9998 25.4 25.1998C24.9 25.6998 24.5 26.2998 24.1 26.8998C23.7 27.5998 23.4 28.1998 23.3 28.8998C24.4 28.9998 25.3 29.9998 25.3 31.0998C25.3 32.1998 24.4 33.0998 23.3 33.1998C23.7 34.4998 24.4 35.7998 25.4 36.8998C26.1 36.0998 27.4 35.7998 28.3 36.3998C29.4 36.8998 29.6 38.0998 29.2 39.1998C30.7 39.5998 32.1 39.5998 33.6 39.1998C33.2 38.0998 33.6 36.9998 34.5 36.3998C35.6 35.8998 36.8 36.0998 37.4 36.8998C37.9 36.3998 38.3 35.7998 38.7 35.1998C39.1 34.5998 39.2 33.8998 39.5 33.1998ZM29.7 33.3998C28.4 32.5998 27.8 30.8998 28.6 29.5998C29.4 28.2998 31.1 27.8998 32.6 28.4998C33.9 29.2998 34.5 30.9998 33.7 32.2998C32.9 33.7998 31 34.1998 29.7 33.3998Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 12.6V32C10 33.4761 11.1239 34.6 12.6 34.6H23.299C23.7242 35.5321 24.3009 36.4338 25.0301 37.2359C25.126 37.3414 25.2623 37.4009 25.4048 37.3996C25.5473 37.3982 25.6825 37.3361 25.7763 37.2289C26.345 36.579 27.3716 36.3816 28.0227 36.8156C28.0451 36.8306 28.0687 36.8437 28.0931 36.8548C28.5015 37.0404 28.7303 37.3431 28.8304 37.7072C28.9346 38.0858 28.9032 38.553 28.7302 39.0287C28.6822 39.1606 28.6919 39.3064 28.7567 39.4308C28.8216 39.5552 28.9357 39.6466 29.0712 39.6827C30.6556 40.1052 32.1445 40.1052 33.7289 39.6827C33.8644 39.6466 33.9785 39.5552 34.0434 39.4308C34.1082 39.3064 34.1179 39.1606 34.0699 39.0287C33.7551 38.1628 34.0562 37.3168 34.7444 36.8381C35.6838 36.4275 36.5859 36.6474 37.0001 37.1996C37.087 37.3156 37.22 37.3881 37.3646 37.3984C37.5092 37.4086 37.6511 37.3557 37.7536 37.2532C38.2888 36.718 38.7119 36.0833 39.1032 35.4963L39.1161 35.477C39.3542 35.1198 39.4959 34.7431 39.6119 34.3952C39.6436 34.3 39.673 34.2085 39.7017 34.1194C39.7824 33.8681 39.8569 33.6362 39.9596 33.3966C40.0227 33.2495 40.0115 33.081 39.9295 32.9436C39.8476 32.8061 39.7047 32.7162 39.5453 32.7017C38.7063 32.6254 38.0001 31.8445 38.0001 30.9996C38.0001 30.1834 38.6769 29.4765 39.5453 29.3976C39.6954 29.3839 39.8313 29.3033 39.9153 29.1781C39.9992 29.053 40.0223 28.8966 39.9779 28.7526C39.5579 27.3874 38.8229 26.0215 37.77 24.8633C37.6741 24.7578 37.5378 24.6983 37.3953 24.6996C37.2528 24.701 37.1176 24.7631 37.0238 24.8704C36.4551 25.5202 35.4285 25.7176 34.7774 25.2836C34.755 25.2687 34.7315 25.2556 34.707 25.2444C34.7046 25.2434 34.7023 25.2423 34.7 25.2412V12.6C34.7 11.1239 33.5761 10 32.1 10H12.6C11.1239 10 10 11.1239 10 12.6ZM33.7 22.4088V18.9H26.8V25.4528C27.1789 25.508 27.6132 25.4545 28.0557 25.2611C28.7439 24.7824 29.045 23.9364 28.7302 23.0705C28.6822 22.9387 28.6919 22.7928 28.7567 22.6684C28.8216 22.544 28.9357 22.4526 29.0712 22.4165C30.646 21.9966 32.1264 21.994 33.7 22.4088ZM25.8 24.8996V18.9H18.9V25.9004H24.176C24.4367 25.5342 24.7209 25.1717 25.0465 24.8461C25.149 24.7436 25.2909 24.6906 25.4355 24.7009C25.5801 24.7111 25.713 24.7836 25.8 24.8996ZM23.5258 26.9004H18.9V33.6H22.9037C22.8753 33.5156 22.8482 33.4311 22.8222 33.3467C22.7778 33.2026 22.8009 33.0463 22.8848 32.9211C22.9688 32.7959 23.1047 32.7153 23.2548 32.7017C24.1232 32.6227 24.8001 31.9158 24.8001 31.0996C24.8001 30.2548 24.0938 29.4738 23.2548 29.3976C23.1183 29.3851 22.9929 29.3173 22.9079 29.2098C22.8229 29.1023 22.7857 28.9646 22.8051 28.8289C22.906 28.1227 23.1846 27.5178 23.5258 26.9004ZM12.6 11C11.6761 11 11 11.6761 11 12.6V17.9H33.7V12.6C33.7 11.6761 33.0239 11 32.1 11H12.6ZM17.9 25.9004V18.9H11V25.9004H17.9ZM11 26.9004H17.9V33.6H12.6C11.6761 33.6 11 32.9239 11 32V26.9004ZM28.5774 26.1156C29.5177 25.4888 30.0071 24.4028 29.8133 23.2675C30.8842 23.0442 31.9076 23.0436 32.9782 23.2657C32.8835 23.7315 32.8825 24.2103 33.0054 24.6572C33.1772 25.2818 33.5867 25.821 34.2568 26.1379C35.2293 26.7624 36.4935 26.5657 37.357 25.9167C38.0085 26.7202 38.5052 27.6166 38.8457 28.5282C37.7977 28.8736 37.0001 29.8334 37.0001 30.9996C37.0001 32.1403 37.775 33.1845 38.8319 33.5603C38.799 33.6588 38.7681 33.755 38.7386 33.847C38.7126 33.9279 38.6877 34.0056 38.6632 34.079C38.5542 34.4062 38.4459 34.6794 38.284 34.9223C37.9831 35.3737 37.6996 35.7973 37.3855 36.1735C36.562 35.5206 35.3451 35.4663 34.2931 35.9444C34.2687 35.9556 34.2451 35.9687 34.2227 35.9836C33.2824 36.6104 32.793 37.6964 32.9868 38.8317C31.9159 39.055 30.8925 39.0556 29.8219 38.8335C29.9166 38.3677 29.9176 37.889 29.7947 37.442C29.6229 36.8174 29.2134 36.2782 28.5433 35.9613C27.5708 35.3368 26.3066 35.5335 25.4431 36.1825C24.7916 35.379 24.2949 34.4826 23.9544 33.571C25.0024 33.2256 25.8001 32.2659 25.8001 31.0996C25.8001 29.933 24.9894 28.8672 23.8956 28.5143C24.022 28.0896 24.2363 27.6699 24.5257 27.1626C24.8231 26.7165 25.1039 26.2979 25.4146 25.9258C26.2381 26.5786 27.4551 26.6329 28.507 26.1548C28.5315 26.1437 28.555 26.1306 28.5774 26.1156ZM29.0259 29.8617C29.6646 28.8238 31.0596 28.4412 32.374 28.948C33.4669 29.6448 33.8912 31.0349 33.2742 32.0376C33.2688 32.0463 33.2637 32.0552 33.2589 32.0643C32.6016 33.2966 31.0296 33.6307 29.9621 32.9738C28.8425 32.2848 28.4021 30.8752 29.0259 29.8617ZM32.7857 28.0354C31.1118 27.3658 29.129 27.7861 28.1742 29.3376C27.198 30.924 27.9576 32.9144 29.438 33.8254C30.9665 34.7661 33.1871 34.305 34.134 32.5484C35.0979 30.9642 34.3384 28.9823 32.8621 28.0738C32.8378 28.0588 32.8122 28.046 32.7857 28.0354Z\" class=\"fill-border\"/></svg>",
    "fullscreen": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M29.9 20.2002H20.2V29.9002H29.9V20.2002Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.7 10H10.5C10.2239 10 10 10.2239 10 10.5V18.7C10 18.9022 10.1218 19.0845 10.3087 19.1619C10.4955 19.2393 10.7106 19.1966 10.8536 19.0536L14.6002 15.3069L19.7 20.4066V29.5929L14.6001 34.6928L10.8536 30.9463C10.7106 30.8033 10.4955 30.7605 10.3087 30.8379C10.1218 30.9153 10 31.0976 10 31.2998V39.4998C10 39.776 10.2239 39.9998 10.5 39.9998H18.7C18.9022 39.9998 19.0845 39.878 19.1619 39.6912C19.2393 39.5043 19.1966 39.2893 19.0536 39.1463L15.3072 35.3999L20.3069 30.4002H29.6933L34.6929 35.3998L30.9465 39.1463C30.8035 39.2893 30.7607 39.5043 30.8381 39.6912C30.9155 39.878 31.0978 39.9998 31.3001 39.9998H39.5001C39.7762 39.9998 40.0001 39.776 40.0001 39.4998V31.2998C40.0001 31.0976 39.8782 30.9153 39.6914 30.8379C39.5046 30.7605 39.2895 30.8033 39.1465 30.9463L35.4 34.6927L30.4 29.6926V20.3069L35.3999 15.3069L39.1465 19.0536C39.2895 19.1966 39.5046 19.2393 39.6914 19.1619C39.8782 19.0845 40.0001 18.9022 40.0001 18.7V10.5C40.0001 10.2239 39.7762 10 39.5001 10H31.3001C31.0978 10 30.9155 10.1218 30.8381 10.3087C30.7607 10.4955 30.8035 10.7106 30.9465 10.8536L34.6928 14.5998L29.5924 19.7002H20.4078L15.3073 14.5998L19.0536 10.8536C19.1966 10.7106 19.2393 10.4955 19.1619 10.3087C19.0845 10.1218 18.9022 10 18.7 10ZM11 17.4929V11H17.4929L11 17.4929ZM20.7 20.7002V29.4002H29.4V20.7002H20.7ZM32.5072 38.9998H39.0001V32.5069L32.5072 38.9998ZM32.5072 11L39.0001 17.4929V11H32.5072ZM11 38.9998V32.5069L17.4929 38.9998H11Z\" class=\"fill-border\"/></svg>",
    "minimize": "<svg width=\"50\" height=\"50\" viewBox=\"0 0 50 50\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.95 22.15H22.15V13.95L13.95 22.15Z\" class=\"fill-background\"/><path d=\"M36.0499 27.8504H27.8499V36.0504L36.0499 27.8504Z\" class=\"fill-background\"/><path d=\"M22.15 36.0504V27.8504H13.95L22.15 36.0504Z\" class=\"fill-background\"/><path d=\"M27.8499 13.95V22.15H36.0499L27.8499 13.95Z\" class=\"fill-background\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.8035 12.0966C12.6082 11.9014 12.2917 11.9014 12.0964 12.0966C11.9011 12.2919 11.9011 12.6085 12.0964 12.8037L17.3428 18.0502L13.5964 21.7967C13.4534 21.9397 13.4106 22.1547 13.488 22.3416C13.5654 22.5284 13.7477 22.6502 13.9499 22.6502H22.1499C22.4261 22.6502 22.6499 22.4264 22.6499 22.1502V13.9502C22.6499 13.748 22.5281 13.5657 22.3413 13.4883C22.1544 13.4109 21.9394 13.4537 21.7964 13.5967L18.05 17.3431L12.8035 12.0966ZM18.4043 18.4029L18.4035 18.4037L18.4027 18.4046L15.157 21.6502H21.6499V15.1573L18.4043 18.4029Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M32.6572 31.9503L36.4034 28.2041C36.5464 28.0611 36.5892 27.8461 36.5118 27.6592C36.4344 27.4724 36.2521 27.3506 36.0499 27.3506H27.8499C27.5737 27.3506 27.3499 27.5744 27.3499 27.8506V36.0506C27.3499 36.2528 27.4717 36.4351 27.6585 36.5125C27.8453 36.5899 28.0604 36.5471 28.2034 36.4041L31.9501 32.6574L37.1964 37.9037C37.3917 38.099 37.7082 38.099 37.9035 37.9037C38.0988 37.7085 38.0988 37.3919 37.9035 37.1966L32.6572 31.9503ZM31.5863 31.6071L28.3499 34.8435V28.3506H34.8427L31.6068 31.5865L31.5964 31.5966L31.5863 31.6071Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.3426 31.9504L12.0964 37.1966C11.9011 37.3919 11.9011 37.7085 12.0964 37.9037C12.2917 38.099 12.6082 38.099 12.8035 37.9037L18.0497 32.6575L21.7964 36.4041C21.9394 36.5471 22.1544 36.5899 22.3413 36.5125C22.5281 36.4351 22.6499 36.2528 22.6499 36.0506V27.8506C22.6499 27.5744 22.4261 27.3506 22.1499 27.3506H13.9499C13.7477 27.3506 13.5654 27.4724 13.488 27.6592C13.4106 27.8461 13.4534 28.0611 13.5964 28.2041L17.3426 31.9504ZM18.4154 31.609L18.4035 31.5966L18.3912 31.5847L15.157 28.3506H21.6499V34.8435L18.4154 31.609Z\" class=\"fill-border\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M37.9035 12.0966C38.0988 12.2919 38.0988 12.6085 37.9035 12.8037L32.657 18.0503L36.4034 21.7967C36.5464 21.9397 36.5892 22.1547 36.5118 22.3416C36.4344 22.5284 36.2521 22.6502 36.0499 22.6502H27.8499C27.5737 22.6502 27.3499 22.4264 27.3499 22.1502V13.9502C27.3499 13.748 27.4717 13.5657 27.6585 13.4883C27.8453 13.4109 28.0604 13.4537 28.2034 13.5967L31.9499 17.3431L37.1964 12.0966C37.3917 11.9014 37.7082 11.9014 37.9035 12.0966ZM28.3499 21.6502V15.1573L34.8427 21.6502H28.3499Z\" class=\"fill-border\"/></svg>"
};
FlexmonsterToolbar.prototype.icons_v26 = {
    connect: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><style>.a{fill:none;}</style><path d="M9.9 18.4c2.1 0.9 5 1.4 8.1 1.4 3.1 0 6-0.5 8.1-1.4C27.9 17.7 29 16.7 29 15.8v-3.9c-1 0.5-1.3 0.9-2.1 1.2 -2.4 1.1-5.5 1.7-8.9 1.7 -3.3 0-6.5-0.6-8.9-1.7C8.3 12.8 8 12.3 7 11.9v3.9c0 0 0 0 0 0C7 16.7 8.1 17.7 9.9 18.4z" class="a"/><path d="M9.9 24.5c2.1 0.9 5 1.4 8.1 1.4 3.1 0 6-0.5 8.1-1.4C27.9 23.7 29 21.8 29 20.9v-2.7c-1 0.4-1.3 0.8-2.1 1.2 -2.4 1-5.5 1.6-8.9 1.6 -3.3 0-6.5-0.6-8.9-1.6C8.3 19 8 18.6 7 18.1v3.7c0 0 0 0 0 0C7 22.8 8.1 23.7 9.9 24.5z" class="a"/><path d="M29 24.2c-0.6 0.4-1.3 0.8-2.1 1.2 -2.4 1-5.5 1.6-8.9 1.6 -3.3 0-6.5-0.6-8.9-1.6C8.3 25 8 24.6 7 24.2v3.7c0 0.9 1.1 1.9 2.9 2.6 2.1 0.9 5 1.4 8.1 1.4 3.1 0 6-0.5 8.1-1.4C27.9 29.8 29 28.8 29 27.9h0V24.2z" class="a"/><path d="M26.9 4.7C24.5 3.6 21.3 3 18 3c-3.3 0-6.5 0.6-8.9 1.7C6.5 5.9 6 7.5 6 9.4c0 0 0 0 0 0C6 9.5 6 9.5 6 9.5v18.5c0 1.8 0.5 2.4 3.1 3.5C11.5 32.4 14.7 33 18 33c3.3 0 6.5-0.6 8.9-1.6C29.5 30.3 30 29.7 30 27.9V9.4c0 0 0 0 0 0C30 7.5 29.5 5.9 26.9 4.7zM7 15.8v-3.9c1 0.5 1.3 0.9 2.1 1.3 2.4 1.1 5.5 1.7 8.9 1.7 3.3 0 6.5-0.6 8.9-1.7C27.7 12.8 28 12.3 29 11.9v3.9c0 0.9-1.1 1.9-2.9 2.6 -2.1 0.9-5 1.4-8.1 1.4 -3.1 0-5.9-0.5-8.1-1.4C8.1 17.7 7 16.7 7 15.8 7 15.8 7 15.8 7 15.8zM7 18.1c1 0.4 1.3 0.8 2.1 1.2 2.4 1 5.5 1.6 8.9 1.6 3.3 0 6.5-0.6 8.9-1.6C27.7 19 28 18.6 29 18.1v2.7c0 0.9-1.1 2.9-2.9 3.6 -2.1 0.9-5 1.4-8.1 1.4 -3.1 0-6-0.5-8.1-1.4 -1.8-0.8-2.9-1.8-2.9-2.6 0 0 0 0 0 0V18.1zM26.1 30.6c-2.1 0.9-5 1.4-8.1 1.4 -3.1 0-5.9-0.5-8.1-1.4C8.1 29.8 7 28.8 7 27.9v-3.7c1 0.4 1.3 0.8 2.1 1.2 2.4 1 5.5 1.6 8.9 1.6 3.3 0 6.5-0.6 8.9-1.6 0.8-0.3 1.5-0.7 2.1-1.2v3.7h0C29 28.8 27.9 29.8 26.1 30.6z"/></svg>',
    connect_olap: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M30 10.9c0 0-0.1-0.3-0.2-0.3 0 0 0 0-0.1 0 0 0 0 0 0 0L17.8 4.1c-0.2-0.1-0.3-0.1-0.5 0L5.3 10.5c0 0 0 0 0 0C5.1 10.6 5 10.8 5 11V27l12 5c0 0 0.4-0.1 0.4-0.1 0.1 0.1 0.3 0.1 0.5 0C17.8 31.9 18 32 18 32l12-5 0-16L30 10.9zM22.4 7.7l-4.8 2.4 -4.8-2.4 4.8-2.4L22.4 7.7zM11 21l-5-2V12l5 3V21zM6.3 10.9l4.8-2.4L16 11l-5 2L6.3 10.9zM17 31l-5-2v-6l5 2V31zM17 24l-5-2v-6l5 2V24zM17.6 16.5L12 14l6-2 5 2L17.6 16.5zM23 29l-5 2v-6l5-2V29zM23 22l-5 2v-6l5-2V22zM29 26l-5 2v-6l5-2V26zM29 19l-5 2v-6l5-2V19z"/></svg>',
    connect_csv: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M11 24l6 0V27h-6V24z"/><path d="M12.8 22L12.8 22l1.2-2.5L15.1 22h1.9l-2-3.9L16.9 14h-1.8l-1 2.5L12.9 14h-1.8l1.9 3.9L11 22H12.8z"/><path d="M19 19h6v3h-6V19z"/><path d="M19 14h6v3L19 17V14z"/><path d="M19 24h6v3h-6V24z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    connect_json: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/><path d="M19 24c0 0.6-0.4 1-1 1 -0.6 0-1-0.4-1-1v-2c0-0.6 0.4-1 1-1 0.6 0 1 0.4 1 1V24zM21 18v-2c0-0.6-0.4 0-1 0 -0.6 0-1-0.4-1-1 0-0.6 0.4-1 1-1 1.7 0 3 0.3 3 2v2c0 1.1 0.9 2 2 2 0.6 0 1 0.4 1 1 0 0.6-0.4 1-1 1 -1.1 0-2 0.9-2 2v2c0 1.7-1.3 2-3 2 -0.6 0-1-0.4-1-1s0.4-1 1-1c0.6 0 1 0.6 1 0v-2c0-1.2 0.5-2.3 1.4-3C21.5 20.3 21 19.2 21 18zM11 20c1.1 0 2-0.9 2-2v-2c0-1.7 1.3-2 3-2 0.6 0 1 0.4 1 1 0 0.6-0.4 1-1 1 -0.6 0-1-0.6-1 0v2c0 1.2-0.5 2.3-1.4 3 0.8 0.7 1.4 1.8 1.4 3v2c0 0.6 0.4 0 1 0 0.6 0 1 0.4 1 1s-0.4 1-1 1c-1.7 0-3-0.3-3-2v-2c0-1.1-0.9-2-2-2 -0.6 0-1-0.4-1-1C10 20.4 10.4 20 11 20z"/><path d="M18 17c0.6 0 1 0.4 1 1s-0.4 1-1 1 -1-0.4-1-1S17.4 17 18 17z"/></svg>',
    connect_csv_remote: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M11 24l6 0V27h-6V24z"/><path d="M12.8 22L12.8 22l1.2-2.5L15.1 22h1.9l-2-3.9L16.9 14h-1.8l-1 2.5L12.9 14h-1.8l1.9 3.9L11 22H12.8z"/><path d="M19 19h6v3h-6V19z"/><path d="M19 14h6v3L19 17V14z"/><path d="M19 24h6v3h-6V24z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    connect_json_remote: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/><path d="M19 24c0 0.6-0.4 1-1 1 -0.6 0-1-0.4-1-1v-2c0-0.6 0.4-1 1-1 0.6 0 1 0.4 1 1V24zM21 18v-2c0-0.6-0.4 0-1 0 -0.6 0-1-0.4-1-1 0-0.6 0.4-1 1-1 1.7 0 3 0.3 3 2v2c0 1.1 0.9 2 2 2 0.6 0 1 0.4 1 1 0 0.6-0.4 1-1 1 -1.1 0-2 0.9-2 2v2c0 1.7-1.3 2-3 2 -0.6 0-1-0.4-1-1s0.4-1 1-1c0.6 0 1 0.6 1 0v-2c0-1.2 0.5-2.3 1.4-3C21.5 20.3 21 19.2 21 18zM11 20c1.1 0 2-0.9 2-2v-2c0-1.7 1.3-2 3-2 0.6 0 1 0.4 1 1 0 0.6-0.4 1-1 1 -0.6 0-1-0.6-1 0v2c0 1.2-0.5 2.3-1.4 3 0.8 0.7 1.4 1.8 1.4 3v2c0 0.6 0.4 0 1 0 0.6 0 1 0.4 1 1s-0.4 1-1 1c-1.7 0-3-0.3-3-2v-2c0-1.1-0.9-2-2-2 -0.6 0-1-0.4-1-1C10 20.4 10.4 20 11 20z"/><path d="M18 17c0.6 0 1 0.4 1 1s-0.4 1-1 1 -1-0.4-1-1S17.4 17 18 17z"/></svg>',
    connect_elastic: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 112 112"><style type="text/css">.st0{fill:#FFFFFF;}.st1{fill:#00A9E5;}.st2{fill:#353535;}.st3{fill:#00BFB3;}.st4{fill:#019B8F;}.st5{fill:#F9B110;}.st6{fill:#FED10A;}</style><path d="m53.2 68h-32.4c-1.2-3.8-1.8-7.8-1.8-12s0.6-8.2 1.8-12h53.2c6.7 0 12 5.4 12 12s-5.3 12-11.9 12h-20.9zm-1.5 4h-29.4c3.1 7.1 8.2 13.2 14.7 17.4 6.3 4.2 13.9 6.6 22 6.6 13.9 0 26.1-7.1 33.3-17.8-3.7-3.8-8.9-6.2-14.6-6.2h-26zm26-32c5.7 0 10.9-2.4 14.6-6.2-7.2-10.7-19.4-17.8-33.3-17.8-8.1 0-15.7 2.4-22 6.6-6.4 4.2-11.5 10.3-14.7 17.4h55.4z"/></svg>',
    open: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M34.4 16.5C34.3 16.4 34.7 16 34.5 16H31V8C32 7.4 31.1 6 29.5 6h-15l-2-2c-0.1-0.2-0.7 0-1 0h-6C4.9 4 4 5.3 4 6V16H1.5c-0.2 0 0.2 0.4 0.1 0.5 -0.1 0.1-0.2 0.3-0.1 0.5l3.2 14.5C4.8 31.8 5.2 32 5.5 32h25c0.3 0 1 0.3 1 0l3-15C34.5 16.8 34.5 16.7 34.4 16.5zM5 5h6.5l1.9 1.7C13.5 7 14.2 7 14.5 7H30v9h-4v-5H9v5H5V5zM25 16H10v-4h15V16z"/></svg>',
    open_local: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><style>.a{fill:none;}</style><path d="M30.9 10.6C30.8 10.4 30.2 10 30 10h-1V8c0-0.4-0.6-1-1-1H15l-1-2H8C7.6 5 7 5.6 7 6v4H6c-0.2 0-0.8 0.4-0.9 0.6 -0.1 0.1-0.2 0.3-0.1 0.5l2.1 19.5C7.2 30.8 7.7 31 8 31h20c0.3 0 0.8-0.2 0.9-0.5l2.1-19.5C31 10.9 31 10.7 30.9 10.6zM28 30H8L6 11h24L28 30z"/><line x1="11" y1="23" x2="11" y2="23" class="a"/><line x1="25" y1="23" x2="25" y2="23" class="a"/><polygon points="11 15 11 23 17 23 17 25 14 25 14 26 22 26 22 25 19 25 19 23 25 23 25 15 "/></svg>',
    open_remote: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M30.9 10.6C30.8 10.4 30.2 10 30 10h-1V8c0-0.4-0.6-1-1-1H15l-1-2H8C7.6 5 7 5.6 7 6v4H6c-0.2 0-0.8 0.4-0.9 0.6 -0.1 0.1-0.2 0.3-0.1 0.5l2.1 19.5C7.2 30.8 7.7 31 8 31h20c0.3 0 0.8-0.2 0.9-0.5l2.1-19.5C31 10.9 31 10.7 30.9 10.6zM28 30H8L6 11h24L28 30z"/><path d="M24.8 18.1l-0.8 1.5c-0.2 0.2-0.5 0.2-0.8 0 -1.3-1.2-3.2-1.9-5.3-1.9 -2.1 0-4 0.7-5.3 1.9 -0.2 0.2-0.5 0.2-0.8 0l-0.8-1.5c-0.1-0.1-0.2-0.2-0.2-0.3 0-0.1 0.1-0.2 0.2-0.3 1.7-1.5 4.1-2.5 6.8-2.5 2.7 0 5.1 0.9 6.8 2.5 0.1 0 0.2 0.2 0.2 0.3C25 17.9 24.9 18 24.8 18.1zM18 19.6c1.5 0 2.8 0.5 3.8 1.4 0.2 0.2 0.2 0.5 0 0.7l-0.8 1.5c-0.2 0.2-0.5 0.2-0.8 0 -0.6-0.5-1.4-0.8-2.3-0.8 -0.9 0-1.7 0.3-2.3 0.8 -0.2 0.2-0.5 0.2-0.8 0l-0.8-1.5c-0.2-0.2-0.2-0.5 0-0.7C15.2 20.1 16.5 19.6 18 19.6zM18 23.4c0.8 0 1.4 0.6 1.4 1.3 0 0.7-0.6 1.3-1.4 1.3 -0.8 0-1.4-0.6-1.4-1.3C16.6 24 17.2 23.4 18 23.4z"/></svg>',
    grid: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><style>.a{fill:none;}</style><polygon points="30 15 23 15 23 22 30 22 30 15 " class="a"/><polygon points="14 22 14 15 7 15 7 22 14 22 " class="a"/><polygon points="14 23 7 23 7 30 14 30 14 23 " class="a"/><polygon points="22 15 15 15 15 22 22 22 22 15 " class="a"/><polygon points="30 23 23 23 23 30 30 30 30 23 " class="a"/><polygon points="22 23 15 23 15 30 22 30 22 23 " class="a"/><path d="M30.5 6l-0.2 0L30 6H7L6.7 6 6.5 6 6 6.5v24L6.5 31l0.2 0L7 31h23.1l0.3 0L30.5 31l0.5-0.5v-24L30.5 6 30.5 6zM14 15v7H7v-7H14L14 15zM15 15h7v7h-7V15L15 15zM23 15h7v7h-7V15L23 15zM7 23h7v7H7V23L7 23zM15 23h7v7h-7V23L15 23zM23 23h7v7h-7V23L23 23z"/></svg>',
    save: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M30 10.9l-6-5.2 0 0 0 0 0 0L24 5.5l-0.1 0 0 0.2L23.8 6H6.1L5 6.1v23.7V31h24.5l0.1-0.3L30 29.5v-18L30 10.9 30 10.9zM22 26h-9v-2h9V26L22 26zM29 30h-3V19h-0.5 -15H9v11H6V7h6v5.5l1.5 1.5h9l0.5-1.5v-6l6 5V30L29 30z"/></svg>',
    export: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><polygon points="14 27 22 27 22 15 27 15 18 5 9 15 14 15 "/><path d="M32.5 21h-5c-0.3 0-0.5 0.2-0.5 0.5s0.2 0.5 0.5 0.5H32v10H4V22h4.5C8.8 22 9 21.8 9 21.5S8.8 21 8.5 21h-5C3.2 21 3 21.2 3 21.5v11C3 32.8 3.2 33 3.5 33h29c0.3 0 0.5-0.2 0.5-0.5v-11C33 21.2 32.8 21 32.5 21z"/></svg>',
    export_print: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M23 23H13v1h10V23L23 23z"/><path d="M13 25v1h10v-1H13z"/><path d="M26 12V5H10v7H6v14h3v4h18v-4h3V12H26zM11 6h14v6H11V6zM26 29H10v-9h16V29zM26 17.8c-1.1 0-2-0.9-2-2s0.9-2 2-2c1.1 0 2 0.9 2 2S27.1 17.8 26 17.8z"/><path d="M26 14.6c0.7 0 1.2 0.5 1.2 1.2 0 0.7-0.5 1.2-1.2 1.2 -0.7 0-1.2-0.5-1.2-1.2C24.8 15.1 25.3 14.6 26 14.6z"/></svg>',
    export_excel: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M24.4 15h-3.8L18 18.6 15.3 15h-3.8l4.5 5.2L11 27h7.3L18 25h-2l2-3L21.1 27H25l-5.1-6.8L24.4 15z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    export_html: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M25.7 20.8l-2.3-2.5c-0.2-0.2-0.4-0.3-0.6-0.3 -0.2 0-0.4 0.1-0.6 0.3 -0.3 0.4-0.3 1 0 1.4l1.7 1.9 -1.7 1.9c-0.2 0.2-0.3 0.4-0.3 0.7 0 0.3 0.1 0.5 0.3 0.7 0.2 0.2 0.4 0.3 0.6 0.3 0.2 0 0.4-0.1 0.6-0.3l2.3-2.5C26.1 21.8 26.1 21.2 25.7 20.8z"/><path d="M14 24c0-0.3-0.1-0.5-0.3-0.7l-1.7-1.9 1.7-1.9c0.3-0.4 0.3-1 0-1.4 -0.2-0.2-0.4-0.3-0.6-0.3 -0.2 0-0.4 0.1-0.6 0.3l-2.3 2.5c-0.3 0.4-0.3 1 0 1.4l2.3 2.5c0.2 0.2 0.4 0.3 0.6 0.3 0.2 0 0.4-0.1 0.6-0.3C13.9 24.5 14 24.3 14 24z"/><path d="M20.4 15.1c-0.1 0-0.2-0.1-0.3-0.1 -0.4 0-0.8 0.3-0.9 0.6l-4.1 11.1c-0.1 0.2-0.1 0.5 0 0.7 0.1 0.2 0.3 0.4 0.5 0.5C15.7 28 15.8 28 16 28c0.4 0 0.8-0.3 0.9-0.6l4.1-11.1C21.1 15.8 20.9 15.2 20.4 15.1z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    export_image: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M25 21.5c0 1.9 0 3.7 0 5.6 0 0.5-0.4 0.9-1 0.9C20 28 16 28 12 28 11.4 28 11 27.7 11 27.1c0-3.2 0-6.4 0-9.5 0-0.6 0-1.1 0-1.7 0-0.4 0.3-0.7 0.7-0.8C11.8 15 11.9 15 11.9 15c4.1 0 8.1 0 12.2 0C24.6 15 25 15.3 25 15.9 25 17.7 25 19.6 25 21.5zM14 26h8c0 0-1.4-3.7-2.2-5.3 -0.8 1.1-1.5 2.1-2.3 3.2 -0.4-0.5-0.8-1-1.2-1.5C15.4 23.4 14 26 14 26zM14.5 17c-0.8 0-1.5 0.7-1.5 1.5 0 0.8 0.7 1.5 1.5 1.5C15.3 20 16 19.3 16 18.5 16 17.7 15.3 17 14.5 17z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    export_pdf: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M17.2 17.1L17.2 17.1C17.3 17.1 17.3 17.1 17.2 17.1c0.1-0.5 0.2-0.7 0.2-1V15.8c0.1-0.6 0.1-1 0-1.1 0 0 0 0 0-0.1l-0.1-0.1 0 0 0 0c0 0 0 0.1-0.1 0.1C16.9 15.2 16.9 16 17.2 17.1L17.2 17.1zM13.8 24.8c-0.2 0.1-0.4 0.2-0.6 0.3 -0.8 0.7-1.3 1.5-1.5 1.8l0 0 0 0 0 0C12.5 26.9 13.1 26.2 13.8 24.8 13.9 24.8 13.9 24.8 13.8 24.8 13.9 24.8 13.8 24.8 13.8 24.8zM24.1 23.1c-0.1-0.1-0.6-0.5-2.1-0.5 -0.1 0-0.1 0-0.2 0l0 0c0 0 0 0 0 0.1 0.8 0.3 1.6 0.6 2.1 0.6 0.1 0 0.1 0 0.2 0l0 0h0.1c0 0 0 0 0-0.1l0 0C24.2 23.3 24.1 23.3 24.1 23.1zM24.6 24c-0.2 0.1-0.6 0.2-1 0.2 -0.9 0-2.2-0.2-3.4-0.8 -1.9 0.2-3.4 0.5-4.5 0.9 -0.1 0-0.1 0-0.2 0.1 -1.3 2.4-2.5 3.5-3.4 3.5 -0.2 0-0.3 0-0.4-0.1l-0.6-0.3v-0.1c-0.1-0.2-0.1-0.3-0.1-0.6 0.1-0.6 0.8-1.6 2.1-2.4 0.2-0.1 0.6-0.3 1-0.6 0.3-0.6 0.7-1.2 1.1-2 0.6-1.1 0.9-2.3 1.2-3.3l0 0c-0.4-1.4-0.7-2.1-0.2-3.7 0.1-0.5 0.4-0.9 0.9-0.9h0.2c0.2 0 0.4 0.1 0.7 0.2 0.8 0.8 0.4 2.6 0 4.1 0 0.1 0 0.1 0 0.1 0.4 1.2 1.1 2.3 1.8 2.9 0.3 0.2 0.6 0.5 1 0.7 0.6 0 1-0.1 1.5-0.1 1.3 0 2.2 0.2 2.6 0.8 0.1 0.2 0.1 0.5 0.1 0.7C24.9 23.5 24.8 23.8 24.6 24zM17.3 19.6c-0.2 0.8-0.7 1.7-1.1 2.7 -0.2 0.5-0.4 0.8-0.7 1.2h0.1 0.1l0 0c1.5-0.6 2.8-0.9 3.7-1 -0.2-0.1-0.3-0.2-0.4-0.3C18.4 21.6 17.7 20.7 17.3 19.6z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    export_csv: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M11 24l6 0V27h-6V24z"/><path d="M12.8 22L12.8 22l1.2-2.5L15.1 22h1.9l-2-3.9L16.9 14h-1.8l-1 2.5L12.9 14h-1.8l1.9 3.9L11 22H12.8z"/><path d="M19 19h6v3h-6V19z"/><path d="M19 14h6v3L19 17V14z"/><path d="M19 24h6v3h-6V24z"/><path d="M23 4H7v28h22V11L23 4zM8 31V5h14v7h6v19H8L8 31z"/></svg>',
    charts: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><polygon points="28 30 28 22 23 22 23 30 21 30 21 9 16 9 16 30 14 30 14 17 9 17 9 30 5 30 5 5 4 5 4 31 32 31 32 30 "/></svg>',
    charts_bar: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><polygon points="32 30 5 30 5 26 18 26 18 21 5 21 5 19 26 19 26 14 5 14 5 12 13 12 13 7 5 7 5 3 4 3 4 31 32 31 "/></svg>',
    charts_column_line: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><polygon points="32 30 29 30 29 17 26 17 26 30 23 30 23 19 20 19 20 30 17 30 17 14 14 14 14 30 11 30 11 20 8 20 8 30 5 30 5 3 4 3 4 31 32 31 32 30 "/><path d="M8.7 12.5c1 0 1.7-0.8 1.7-1.7 0-0.3 0-0.5-0.1-0.8l4.3-3.9c0.3 0.3 0.5 0.3 0.9 0.3 0.2 0 0.5 0 0.6-0.1l4.8 6c-0.3 0.3-0.4 0.6-0.4 1 0 0.9 0.7 1.6 1.8 1.6 0.9 0 1.7-0.8 1.7-1.6 0-0.3-0.1-0.5-0.3-0.8l4.3-3.8c0.3 0.2 0.6 0.3 0.9 0.3 1.1 0 1.8-0.8 1.8-1.7 0-0.4-0.2-0.9-0.5-1.2C30.2 6 30 5.8 29.6 5.8c0 0-0.2-0.1-0.4-0.1 -0.9 0-1.7 0.8-1.7 1.7 0 0.3 0.1 0.5 0.3 0.8l-4.3 3.7c-0.3-0.1-0.5-0.3-0.9-0.3 -0.3 0-0.5 0.1-0.7 0.2l-4.8-6.1c0.2-0.3 0.4-0.6 0.4-0.9 0-1-0.8-1.7-1.7-1.7 -0.9 0-1.7 0.8-1.7 1.7 0 0.3 0.1 0.6 0.1 0.8l-4.3 3.9C9.4 9.2 9.1 9.1 8.7 9.1c-0.9 0-1.7 0.7-1.7 1.6C7 11.7 7.8 12.5 8.7 12.5z"/></svg>',
    charts_stacked_column: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><polygon points="32 30 28 30 28 27 23 27 23 30 21 30 21 14 16 14 16 30 14 30 14 22 9 22 9 30 5 30 5 3 4 3 4 31 32 31 32 30 "/><polygon points="14 15 9 15 9 21 14 21 14 15 "/><polygon points="21 9 16 9 16 13 21 13 21 9 "/><polygon points="28 22 23 22 23 26 28 26 28 22 "/></svg>',
    charts_line: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><polygon points="32 30 5 30 5 3 4 3 4 31 32 31 32 30 "/><path d="M9.4 24c1.3 0 2.4-1.1 2.4-2.3 0-0.7-0.3-1.3-0.8-1.8l2.8-4.3c0.4 0.1 0.6 0.2 1 0.2 0.8 0 1.4-0.3 1.9-0.7l2.8 2.6c-0.2 0.4-0.2 0.6-0.2 0.9 0 1.2 1 2.2 2.1 2.2 1.3 0 2.2-1 2.2-2.2 0-0.2 0-0.5-0.1-0.8l2.9-8c0.6 0.5 1.3 0.7 2.1 0.7 1.6 0 3-1.3 3-3.1 0-1.7-1.3-3.1-3-3.1 -1.7 0-3.1 1.4-3.1 3.1 0 0.6 0.2 1.1 0.4 1.6l-2.8 8c-0.4-0.5-0.9-0.7-1.6-0.7 -0.5 0-1 0.2-1.4 0.6l-2.8-2.7c0.1-0.4 0.2-0.8 0.2-1.2 0-1.6-1.1-2.8-2.7-2.8 -1.4 0-2.7 1.3-2.7 2.8 0 0.8 0.4 1.5 0.9 2.1l-2.8 4.2c-0.2-0.1-0.5-0.1-0.8-0.1C8.1 19.2 7 20.3 7 21.7 7 22.9 8.1 24 9.4 24z"/></svg>',
    charts_pie: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M25.2 28.8c3.3-2.2 5.5-5.8 5.8-9.8h-12L25.2 28.8z"/><path d="M17 18v-13c-7 0.4-12 6.1-12 13 0 7.2 5.9 13 13 13 2.1 0 4-0.5 5.8-1.4C23.8 29.6 17 18.2 17 18z"/><path d="M18 5V18h13l0-0.9C30.6 10.6 25 5.4 18 5z"/></svg>',
    charts_scatter: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><polygon points="32 30 5 30 5 3 4 3 4 31 32 31 "/><path d="M9.5 20c1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5S7 23.9 7 22.5C7 21.1 8.1 20 9.5 20z"/><path d="M21.5 17c1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5S19 20.9 19 19.5C19 18.1 20.1 17 21.5 17z"/><path d="M14 11c1.7 0 3 1.3 3 3s-1.3 3-3 3 -3-1.3-3-3S12.3 11 14 11z"/><path d="M28 6c1.7 0 3 1.3 3 3 0 1.7-1.3 3-3 3s-3-1.3-3-3C25 7.3 26.3 6 28 6z"/></svg>',
    format: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><rect x="18.8" y="12.9" transform="matrix(-0.7073 -0.7069 0.7069 -0.7073 21.6275 41.9551)" width="1.3" height="7.1" fill="none"/><polygon points="24 25 23 25 23 32 4 32 4 13 11 13 11 12 3 12 3 33 24 33 "/><path d="M28.3 3.5c-0.9 0-1.8 0.3-2.5 0.8l-1.7 1.7 5.9 5.9 1.7-1.7c0.5-0.7 0.8-1.6 0.8-2.5C32.5 5.4 30.6 3.5 28.3 3.5z"/><path d="M11.2 18.9L9.5 26.5l7.6-1.7 11.6-11.6 -5.9-5.9L11.2 18.9zM17.4 19.5l-0.9-0.9 5.1-5 0.9 0.9L17.4 19.5z"/></svg>',
    format_number: '<svg xmlns="http://www.w3.org/2000/svg" width="52" height="36" viewBox="0 0 52 36"><path d="M31 19.2v-3.4l2.5-0.4c0.2-0.7 0.5-1.4 0.9-2.1l-1.4-2 2.4-2.4 2 1.4c0.7-0.4 1.4-0.7 2.1-0.9l0.4-2.5h3.4l0.4 2.5c0.7 0.2 1.4 0.5 2.1 0.9l2-1.4 2.4 2.4 -1.4 2c0.4 0.7 0.7 1.4 0.9 2.1L52 15.8v3.4l-2.5 0.4c-0.2 0.7-0.5 1.4-0.9 2.1l1.4 2 -2.4 2.4 -2-1.5c-0.7 0.4-1.4 0.7-2.1 0.9l-0.4 2.5h-3.4l-0.4-2.5c-0.7-0.2-1.4-0.5-2.1-0.9l-2 1.5 -2.4-2.4 1.4-2c-0.4-0.7-0.7-1.4-0.9-2.1L31 19.2zM41.5 21c1.9 0 3.5-1.6 3.5-3.5 0-1.9-1.6-3.5-3.5-3.5 -1.9 0-3.5 1.6-3.5 3.5C38 19.4 39.6 21 41.5 21z"/><path d="M38 30H1V6h36V5H0v26h38V30L38 30z"/><path d="M9.4 21.1c-0.3 0.3-0.7 0.4-1.2 0.4 -0.5 0-0.9-0.2-1.2-0.5s-0.4-0.8-0.4-1.4H5c0 0.9 0.2 1.7 0.7 2.2 0.5 0.6 1.2 0.9 2 1v1.3h1.1v-1.4c0.8-0.1 1.5-0.4 1.9-0.9 0.5-0.5 0.7-1.1 0.7-1.9 0-0.4-0.1-0.8-0.2-1.1 -0.1-0.3-0.3-0.6-0.5-0.8 -0.2-0.2-0.5-0.4-0.8-0.6 -0.3-0.2-0.8-0.4-1.4-0.6 -0.6-0.2-1-0.4-1.2-0.7s-0.4-0.6-0.4-1c0-0.4 0.1-0.8 0.4-1 0.2-0.2 0.6-0.4 1-0.4 0.4 0 0.8 0.2 1 0.5 0.3 0.3 0.4 0.8 0.4 1.4h1.6c0-0.9-0.2-1.6-0.6-2.2 -0.4-0.6-1-0.9-1.8-1v-1.5H7.9v1.5C7.1 12.6 6.5 12.9 6 13.4s-0.7 1.1-0.7 1.9c0 1.1 0.5 2 1.6 2.6 0.3 0.2 0.8 0.4 1.3 0.6 0.6 0.2 1 0.4 1.2 0.7s0.4 0.6 0.4 1C9.8 20.5 9.7 20.8 9.4 21.1z"/><path d="M16.3 12.6h-0.2l-3.8 1.5v1.4l2.4-0.8v8.1h1.6V12.6z"/><path d="M19.9 23.8c0.2-0.5 0.4-1 0.4-1.5l0-1.2h-1.5v1.3c0 0.3-0.1 0.6-0.2 1 -0.1 0.3-0.3 0.7-0.5 1.1l0.9 0.5C19.3 24.7 19.6 24.3 19.9 23.8z"/><path d="M27 16.7c0-1.4-0.3-2.5-0.8-3.2s-1.3-1.1-2.4-1.1c-1.1 0-1.9 0.4-2.4 1.1 -0.5 0.7-0.8 1.8-0.8 3.3v1.8c0 1.4 0.3 2.5 0.8 3.2s1.3 1.1 2.4 1.1c1.1 0 1.9-0.4 2.4-1.1 0.5-0.7 0.8-1.8 0.8-3.3V16.7zM25.4 18.9c0 0.9-0.1 1.6-0.4 2 -0.2 0.4-0.6 0.6-1.2 0.6 -0.5 0-0.9-0.2-1.2-0.7 -0.3-0.5-0.4-1.2-0.4-2.1v-2.3c0-0.9 0.1-1.5 0.4-2 0.3-0.4 0.6-0.6 1.2-0.6 0.5 0 0.9 0.2 1.2 0.7 0.3 0.4 0.4 1.1 0.4 2.1V18.9z"/></svg>',
    format_conditional: '<svg xmlns="http://www.w3.org/2000/svg" width="52" height="36" viewBox="0 0 52 36"><polygon points="38 5 0 5 0 31 26 31 26 30 1 30 1 6 37 6 37 10 38 10 "/><path d="M9 13H8.6L5 14.4v1.4l2-0.8V23h2V13z"/><path d="M17 22h-4l2.4-2.9c0.6-0.7 1-1.3 1.3-1.8 0.3-0.5 0.4-1.1 0.4-1.5 0-0.8-0.3-1.5-0.8-2 -0.5-0.5-1.2-0.7-2.2-0.7 -0.6 0-1.2 0.1-1.7 0.4s-0.9 0.6-1.1 1C11.1 14.9 11 16 11 16h1.6c0 0 0.1-0.9 0.4-1.3s0.7-0.4 1.2-0.4c0.4 0 0.8 0.2 1 0.5 0.3 0.3 0.4 0.7 0.4 1.1 0 0.4-0.1 0.7-0.3 1.1 -0.2 0.4-0.6 0.8-1.1 1.3L11 21.9V23h6V22z"/><path d="M21 19h0.8c0.6 0 1-0.1 1.3 0.2 0.3 0.3 0.4 0.6 0.4 1.1 0 0.5-0.1 0.8-0.4 1.1 -0.3 0.3-0.6 0.4-1.1 0.4 -0.5 0-0.8-0.3-1.1-0.5C20.6 20.9 20.5 21 20.5 20h-1.5c0 1 0.3 1.6 0.8 2.1s1.3 0.8 2.1 0.8c0.9 0 1.6-0.2 2.2-0.7 0.6-0.5 0.8-1.2 0.8-2.1 0-0.5-0.1-1-0.4-1.4 -0.3-0.4-0.6-0.7-1.1-0.9 0.4-0.2 0.7-0.5 1-0.9 0.3-0.4 0.4-0.8 0.4-1.2 0-0.9-0.3-1.5-0.8-2 -0.5-0.5-1.2-0.7-2.1-0.7 -0.5 0-1 0.1-1.5 0.3 -0.4 0.2-0.8 0.7-1 1.1S19.1 15 19.1 16h1.5c0-1 0.1-0.9 0.4-1.1 0.3-0.3 0.6-0.5 1-0.5 0.5 0 0.8 0.1 1 0.3s0.3 0.6 0.3 1.1c0 0.5-0.1 0.7-0.4 1C22.7 17 22.3 17 21.9 17H21V19z"/><path d="M47.8 7C50.1 7 52 8.9 52 11.2c0 1-0.3 1.8-0.8 2.5l-1.7 1.7L43.6 9.5l1.7-1.7C46 7.3 46.8 7 47.8 7zM30.7 22.4L29 30l7.6-1.7 11.6-11.6 -5.9-5.9L30.7 22.4zM42 17.9l-5.1 5.1 -0.9-0.9 5.1-5L42 17.9z"/></svg>',
    options: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path d="M19.8 34.5h-3.5c-0.5 0-0.7 0-2.5-4.5l-1.4-0.6c-3.7 1.7-4.2 1.7-4.3 1.7H7.9l-0.2-0.2 -2.5-2.5c-0.4-0.4-0.5-0.5 1.4-5l-0.6-1.4c-4.5-1.7-4.5-1.8-4.5-2.4v-3.5c0-0.5 0-0.7 4.5-2.5l0.6-1.4C4.5 8.1 4.7 8 5.1 7.6l2.6-2.6 0.3 0c0.4 0 1.9 0.6 4.4 1.6l1.4-0.6c1.7-4.5 1.9-4.5 2.4-4.5h3.5c0.5 0 0.7 0 2.5 4.5l1.4 0.6c3.7-1.7 4.2-1.7 4.3-1.7h0.3l0.2 0.2 2.5 2.5c0.4 0.4 0.5 0.5-1.4 5l0.6 1.4c4.5 1.6 4.5 1.8 4.5 2.4v3.5c0 0.5 0 0.7-4.5 2.5l-0.6 1.4c2 4.4 1.9 4.5 1.5 4.9l-2.7 2.7 -0.3 0c-0.4 0-1.9-0.6-4.4-1.6l-1.4 0.6C20.5 34.5 20.3 34.5 19.8 34.5zM16.7 33.1h2.7c0.3-0.7 1-2.4 1.5-3.9l0.1-0.3 2.5-1 0.3 0.1c1.5 0.6 3.2 1.4 3.9 1.6l1.9-1.9c-0.2-0.7-1-2.4-1.7-3.8l-0.1-0.3 1-2.5 0.3-0.1c1.5-0.6 3.2-1.3 3.9-1.6v-2.7c-0.7-0.3-2.4-1-3.9-1.5l-0.3-0.1 -1-2.5 0.1-0.3c0.6-1.5 1.3-3.2 1.6-3.9l-1.9-1.9c-0.6 0.2-2.4 1-3.8 1.7l-0.3 0.1L21.1 7.1l-0.1-0.3c-0.6-1.5-1.3-3.2-1.7-3.9h-2.7c-0.3 0.7-1 2.4-1.5 3.9l-0.1 0.3 -2.5 1 -0.3-0.1c-1.5-0.6-3.2-1.4-3.9-1.6l-1.9 1.9c0.2 0.7 1 2.4 1.6 3.8l0.1 0.3 -1 2.5 -0.3 0.1c-1.5 0.6-3.2 1.3-3.9 1.6v2.7c0.7 0.3 2.4 1 3.9 1.5l0.3 0.1 1 2.5 -0.1 0.3c-0.6 1.5-1.3 3.2-1.6 3.9l1.9 1.9c0.6-0.2 2.4-1 3.8-1.7l0.3-0.1 2.5 1 0.1 0.3C15.6 30.7 16.4 32.4 16.7 33.1zM18 23.8c-3.2 0-5.8-2.6-5.8-5.8 0-3.2 2.6-5.8 5.8-5.8 3.2 0 5.8 2.6 5.8 5.8C23.8 21.2 21.2 23.8 18 23.8z"/></svg>',
    fields: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><style>.a{fill:none;}</style><path d="M2 25.2v-3.4l2.5-0.4c0.2-0.7 0.5-1.4 0.9-2.1l-1.4-2 2.4-2.4 2 1.4c0.7-0.4 1.4-0.7 2.1-0.9L10.8 13h3.4l0.4 2.5c0.7 0.2 1.4 0.5 2.1 0.9l2-1.4 2.4 2.4 -1.4 2c0.4 0.7 0.7 1.4 0.9 2.1L23 21.8v3.4l-2.5 0.4c-0.2 0.7-0.5 1.4-0.9 2.1l1.4 2 -2.4 2.4 -2-1.5c-0.7 0.4-1.4 0.7-2.1 0.9L14.2 34h-3.4l-0.4-2.5c-0.7-0.2-1.4-0.5-2.1-0.9l-2 1.5 -2.4-2.4 1.4-2c-0.4-0.7-0.7-1.4-0.9-2.1L2 25.2zM12.5 27c1.9 0 3.5-1.6 3.5-3.5 0-1.9-1.6-3.5-3.5-3.5S9 21.6 9 23.5C9 25.4 10.6 27 12.5 27z"/><polygon points="24 18.9 24 12 17.3 12 24 18.9 " class="a"/><polygon points="32 27 32 20 25 20 25 24 25 27 32 27 " class="a"/><polygon points="16 4 9 4 9 11 12.5 11 16 11 16 4 " class="a"/><polygon points="17 11 24 11 24 4 17 4 17 11 " class="a"/><polygon points="25 19 32 19 32 12 25 12 25 19 " class="a"/><polygon points="25 11 32 11 32 4 25 4 25 11 " class="a"/><path d="M33 3H8v8.9L11 11H9V4h7v7h-2l3.3 1H24v6.9L25 22v-2h7v7h-7v-2l-1 3h9V3zM24 11h-7V4h7V11L24 11zM32 19h-7v-7h7V19L32 19zM32 11h-7V4h7V11L32 11z"/></svg>',
    fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><polygon points="31 13 31 5 23 5 23 6 29.3 6 22.3 13 13.7 13 6.7 6 13 6 13 5 5 5 5 13 6 13 6 6.7 13 13.7 13 22.3 6 29.3 6 23 5 23 5 31 13 31 13 30 6.7 30 13.7 23 22.3 23 29.3 30 23 30 23 31 31 31 31 23 30 23 30 29.3 23 22.3 23 13.7 30 6.7 30 13 "/></svg>',
    minimize: '<svg xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" enable-background="new -0.5 0.5 36 36" version="1.1" viewBox="-0.5 0.5 36 36" xml:space="preserve"><polygon points="10.796 12.499 4.5 12.5 4.5 13.5 12.496 13.5 12.5 5.5 11.5 5.5 11.497 11.799 4.628 4.924 3.925 5.622"/><rect x="12.5" y="13.5" width="10" height="10"/><line x1="13" x2="13" y1="13.7" y2="13.7"/><line x1="13.7" x2="13.7" y1="13" y2="13"/><polygon points="11.492 25.2 11.5 31.497 12.5 31.496 12.491 23.5 4.491 23.506 4.492 24.506 10.791 24.501 3.924 31.378 4.623 32.08"/><polygon points="24.2 24.506 30.497 24.5 30.496 23.5 22.5 23.506 22.502 31.506 23.502 31.505 23.5 25.206 30.373 32.076 31.076 31.378"/><polygon points="23.506 11.8 23.5 5.503 22.5 5.504 22.506 13.5 30.506 13.498 30.505 12.498 24.206 12.5 31.076 5.627 30.378 4.924"/></svg>'
};
// HANDLERS
// Connect tab
FlexmonsterToolbar.prototype.connectLocalCSVHandler = function () {
    this.pivot.connectTo({
        type: "csv",
        browseForFile: true
    });
}
FlexmonsterToolbar.prototype.connectLocalJSONHandler = function () {
    this.pivot.connectTo({
        type: "json",
        browseForFile: true
    });
}
FlexmonsterToolbar.prototype.connectRemoteCSV = function () {
    this.showConnectToRemoteCSVDialog();
}
FlexmonsterToolbar.prototype.connectRemoteJSON = function () {
    this.showConnectToRemoteJsonDialog();
}
FlexmonsterToolbar.prototype.connectOLAP = function () {
    this.showConnectToOLAPDialog();
}
FlexmonsterToolbar.prototype.connectElastic = function () {
    this.showConnectToElasticDialog();
}
// Open tab
FlexmonsterToolbar.prototype.openLocalReport = function () {
    this.pivot.open();
}
FlexmonsterToolbar.prototype.openRemoteReport = function () {
    this.showOpenRemoteReportDialog();
}
// Save tab
FlexmonsterToolbar.prototype.saveHandler = function () {
    this.pivot.save("report.json", 'file');
}
// Grid tab
FlexmonsterToolbar.prototype.gridHandler = function () {
    this.pivot.showGrid();
}
// Charts tab
FlexmonsterToolbar.prototype.chartsHandler = function (type) {
    var options = this.pivot.getOptions() || {};
    var chartOptions = options['chart'] || {};
    var multiple = chartOptions['multipleMeasures'];
    var node = this.getElementById("fm-tab-charts-multiple");
    if (node != null) this.disableMultipleValues(type, multiple, node);
    this.pivot.showCharts(type, multiple);
}
FlexmonsterToolbar.prototype.chartsMultipleHandler = function () {
    var options = this.pivot.getOptions() || {};
    var chartOptions = options['chart'] || {};
    var type = chartOptions['type'];
    var multiple = !chartOptions['multipleMeasures'];
    var node = this.getElementById("fm-tab-charts-multiple");
    if (multiple) {
        this.addClass(node, "fm-selected");
    } else {
        this.removeClass(node, "fm-selected");
    }
    if (type == "pie" || type == "stacked_column" || type == "column_line") {
        this.removeClass(node, "fm-selected");
    } else {
        this.pivot.showCharts(type, multiple);
    }
}
FlexmonsterToolbar.prototype.checkChartMultipleMeasures = function () {
    var options = this.pivot.getOptions() || {};
    var chartOptions = options['chart'] || {};
    var multiple = chartOptions['multipleMeasures'];
    var node = this.getElementById("fm-tab-charts-multiple");
    if (node != null) {
        this.disableMultipleValues(chartOptions['type'], multiple, node);
    }
}
FlexmonsterToolbar.prototype.disableMultipleValues = function (type, multiple, node) {
    var Labels = this.Labels;
    if (type == "pie" || type == "stacked_column" || type == "column_line") {
        var chartType = "";
        switch (type) {
            case ("pie"):
                chartType = Labels.charts_pie;
                break;
            case ("stacked_column"):
                chartType = Labels.charts_stacked_column;
                break;
            case ("column_line"):
                chartType = Labels.charts_column_line;
                break;
        }
        node.classList.remove("fm-selected");
        node.classList.add("fm-ui-disabled");
        node.setAttribute("aria-checked", "false");
        node.setAttribute("aria-disavled", "true");
        node.setAttribute("title", Labels.charts_multiple_disabled + chartType.toLocaleLowerCase() + " " + Labels.charts.toLocaleLowerCase());
    } else if (multiple) {
        node.classList.add("fm-selected");
        node.classList.remove("fm-ui-disabled");
        node.removeAttribute("title");
        node.setAttribute("aria-checked", "true");
    } else {
        node.classList.remove("fm-ui-disabled");
        node.removeAttribute("title");
        node.setAttribute("aria-checked", "false");
    }
}
// Format tab
FlexmonsterToolbar.prototype.formatCellsHandler = function (measureName) {
    this.showFormatCellsDialog(measureName);
}
FlexmonsterToolbar.prototype.conditionalFormattingHandler = function (measureName) {
    this.showConditionalFormattingDialog(measureName);
}
// Options tab
FlexmonsterToolbar.prototype.optionsHandler = function () {
    this.showOptionsDialog();
}
// Fields tab
FlexmonsterToolbar.prototype.fieldsHandler = function () {
    this.pivot.openFieldsList();
}
// Export tab
FlexmonsterToolbar.prototype.printHandler = function () {
    this.pivot.print();
}
FlexmonsterToolbar.prototype.exportHandler = function (type) {
    (type == "pdf") ? this.showExportPdfDialog() : this.pivot.exportTo(type);
}
// Fullscreen tab
FlexmonsterToolbar.prototype.fullscreenHandler = function () {
    this.toggleFullscreen();
}

// DIALOGS
FlexmonsterToolbar.prototype.defaults = {};
// Connect to remote CSV
FlexmonsterToolbar.prototype.showConnectToRemoteCSVDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        if (textInput.value.length > 0) {
            self.pivot.connectTo({
                filename: textInput.value,
                type: "csv"
            });
        }
    }
    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("fm-popup-w500");
    dialog.setTitle(Labels.open_remote_csv);
    dialog.setToolbar([{
        id: "fm-btn-open",
        label: Labels.open,
        handler: applyHandler,
        isPositive: true
    },
    {
        id: "fm-btn-cancel",
        label: Labels.cancel
    }
    ]);

    var content = document.createElement("div");
    var textInput = document.createElement("input");
    textInput.classList.add("fm-inp-file-url");
    textInput.type = "text";
    textInput.value = "https://cdn.flexmonster.com/data/data.csv";
    textInput.setAttribute("aria-label", "URL");
    content.appendChild(textInput);

    dialog.setContent(content);
    dialog.initialFocusAt = textInput;
    this.popupManager.addPopup(dialog);
}
// Connect to remote JSON
FlexmonsterToolbar.prototype.showConnectToRemoteJsonDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        if (textInput.value.length > 0) {
            self.pivot.connectTo({
                filename: textInput.value,
                type: "json"
            });
        }
    }
    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("fm-popup-w500");
    dialog.setTitle(Labels.open_remote_json);
    dialog.setToolbar([{
        id: "fm-btn-open",
        label: Labels.open,
        handler: applyHandler,
        isPositive: true
    },
    {
        id: "fm-btn-cancel",
        label: Labels.cancel
    }
    ]);

    var content = document.createElement("div");
    var textInput = document.createElement("input");
    textInput.classList.add("fm-inp-file-url");
    textInput.type = "text";
    textInput.value = "https://cdn.flexmonster.com/data/data.json";
    textInput.setAttribute("aria-label", "URL");
    content.appendChild(textInput);

    dialog.setContent(content);
    dialog.initialFocusAt = textInput;
    this.popupManager.addPopup(dialog);
}
// Connect to Elasticsearch
FlexmonsterToolbar.prototype.showConnectToElasticDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var onConnectBtnClick = function () {
        if (hostUrlInput.value.length == 0) return;
        self.pivot.getElasticIndices({
            host: hostUrlInput.value
        }, indicesHandler);
    };
    var indicesHandler = function (err, indices) {
        if (err) {
            self.popupManager.removePopup();
            return;
        }
        // hide Flexmonster internal indices
        indices = indices.filter(function (index) {
            return index.indexOf("z_test_") != 0;
        });
        indicesList.setDataProvider(indices);
        indicesList.setEnabled(true);
    };
    var okHandler = function () {
        self.pivot.connectTo({
            type: "elasticsearch",
            host: hostUrlInput.value,
            index: indicesList.value
        });
    };
    var onIndicesListChange = function () {
        self.setEnabled(self.getElementById("fm-btn-open"), true);
    };

    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("fm-popup-olap");
    dialog.content.classList.add("fm-popup-w570");
    dialog.setTitle(Labels.connect_elastic_title);
    dialog.setToolbar([{
        id: "fm-btn-open",
        label: Labels.ok,
        handler: okHandler,
        disabled: true,
        isPositive: true
    },
    {
        id: "fm-btn-cancel",
        label: Labels.cancel
    }
    ]);

    var content = document.createElement("div");
    var group = document.createElement("div");
    group.classList.add("fm-inp-group");
    content.appendChild(group);

    // host url
    var row = document.createElement("div");
    row.classList.add("fm-inp-row");
    row.classList.add("fm-ir-horizontal");
    group.appendChild(row);

    var hostUrlInput = document.createElement("input");
    hostUrlInput.type = "text";
    hostUrlInput.classList.add("fm-inp");
    hostUrlInput.classList.add("fm-inp-proxy-url");
    hostUrlInput.id = this.guid();
    hostUrlInput.value = "https://olap.flexmonster.com:9200";

    var label = document.createElement("label");
    label.setAttribute("for", hostUrlInput.id);
    this.setText(label, Labels.host_url);

    var connectBtn = document.createElement("button");
    connectBtn.classList.add("fm-ui-btn");
    connectBtn.classList.add("fm-ui-btn-dark");
    connectBtn.classList.add("fm-btn-connect");
    this.setText(connectBtn, Labels.connect);
    connectBtn.onclick = onConnectBtnClick;

    row.appendChild(label);
    row.appendChild(hostUrlInput);
    row.appendChild(connectBtn);

    // indices list
    var row = document.createElement("div");
    row.classList.add("fm-inp-row");
    row.classList.add("fm-ir-horizontal");
    group.appendChild(row);

    var indicesList = this.createSelect([], Labels.select_index);
    indicesList.onchange = onIndicesListChange;
    indicesList.setEnabled(false);

    var label = document.createElement("label");
    label.id = this.guid();
    indicesList.dropdownButton.setAttribute("aria-labelledby", label.id);
    this.setText(label, Labels.index_name);

    row.appendChild(label);
    row.appendChild(indicesList);

    dialog.setContent(content);
    dialog.initialFocusAt = hostUrlInput;
    this.popupManager.addPopup(dialog);
}
// Connect to OLAP (XMLA)
FlexmonsterToolbar.prototype.showConnectToOLAPDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var onConnectBtnClick = function () {
        if (proxyUrlInput.value.length == 0) return;
        self.pivot.getXMLADataSources(proxyUrlInput.value, dataSourcesHandler);
    };
    var _this = this;
    var dataSourcesHandler = function (dataProvider) {
        if (dataProvider != null && dataProvider.length > 0) {
            olapDataSourcesList.setDataProvider(dataProvider);
            olapDataSourcesList.setEnabled(true);
        } else if (dataProvider.length == 0) { //on error
            _this.popupManager.removePopup();
        }
    };
    var onOlapDataSourcesListChange = function () {
        self.pivot.getXMLACatalogs(proxyUrlInput.value, olapDataSourcesList.getValue(), catalogsHandler);
    };
    var catalogsHandler = function (dataProvider) {
        if (dataProvider != null && dataProvider.length > 0) {
            olapCatalogsList.setDataProvider(dataProvider);
            olapCatalogsList.setEnabled(true);
        }
    };
    var onOlapCatalogsListChange = function () {
        self.pivot.getXMLACubes(proxyUrlInput.value, olapDataSourcesList.getValue(), olapCatalogsList.getValue(), cubesHandler);
    };
    var cubesHandler = function (dataProvider) {
        if (dataProvider != null && dataProvider.length > 0) {
            olapCubesList.setDataProvider(dataProvider);
            olapCubesList.setEnabled(true);
        }
    };
    var onOlapCubesListChange = function () {
        self.setEnabled(self.getElementById("fm-btn-open"), true);
    };
    var okHandler = function () {
        var provider = self.pivot.getXMLAProviderName(proxyUrlInput.value, '');
        self.pivot.connectTo({
            type: provider,
            proxyUrl: proxyUrlInput.value,
            dataSourceInfo: olapDataSourcesList.getValue(),
            catalog: olapCatalogsList.getValue(),
            cube: olapCubesList.getValue()
        });
    };

    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("fm-popup-olap");
    dialog.content.classList.add("fm-popup-w570");
    dialog.setTitle(this.osUtils.isMobile ? Labels.connect_olap_mobile : Labels.olap_connection_tool);
    dialog.setToolbar([{
        id: "fm-btn-open",
        label: Labels.ok,
        handler: okHandler,
        disabled: true,
        isPositive: true
    },
    {
        id: "fm-btn-cancel",
        label: Labels.cancel
    }
    ]);

    var content = document.createElement("div");
    var group = document.createElement("div");
    group.classList.add("fm-inp-group");
    content.appendChild(group);

    // proxy url
    var row = document.createElement("div");
    row.classList.add("fm-inp-row");
    row.classList.add("fm-ir-horizontal");
    group.appendChild(row);

    var proxyUrlInput = document.createElement("input");
    proxyUrlInput.type = "text";
    proxyUrlInput.id = this.guid();
    proxyUrlInput.classList.add("fm-inp");
    proxyUrlInput.classList.add("fm-inp-proxy-url");
    proxyUrlInput.value = "https://olap.flexmonster.com/olap/msmdpump.dll";

    var label = document.createElement("label");
    label.setAttribute("for", proxyUrlInput.id);
    this.setText(label, Labels.proxy_url);

    var connectBtn = document.createElement("button");
    connectBtn.classList.add("fm-ui-btn");
    connectBtn.classList.add("fm-ui-btn-dark");
    connectBtn.classList.add("fm-btn-connect");
    this.setText(connectBtn, Labels.connect);
    connectBtn.onclick = onConnectBtnClick;

    row.appendChild(label);
    row.appendChild(proxyUrlInput);
    row.appendChild(connectBtn);

    // ds info
    var row = document.createElement("div");
    row.classList.add("fm-inp-row");
    row.classList.add("fm-ir-horizontal");
    group.appendChild(row);
    var olapDataSourcesList = this.createSelect([], Labels.select_data_source);
    olapDataSourcesList.setEnabled(false);
    olapDataSourcesList.onchange = onOlapDataSourcesListChange;
    var label = document.createElement("label");
    label.id = this.guid();
    olapDataSourcesList.dropdownButton.setAttribute("aria-labelledby", label.id);
    this.setText(label, Labels.data_source_info);
    row.appendChild(label);
    row.appendChild(olapDataSourcesList);

    // catalogs
    var row = document.createElement("div");
    row.classList.add("fm-inp-row");
    row.classList.add("fm-ir-horizontal");
    group.appendChild(row);
    var olapCatalogsList = this.createSelect([], Labels.select_catalog);
    olapCatalogsList.setEnabled(false);
    olapCatalogsList.onchange = onOlapCatalogsListChange;
    var label = document.createElement("label");
    label.id = this.guid();
    olapCatalogsList.dropdownButton.setAttribute("aria-labelledby", label.id);
    this.setText(label, Labels.catalog);
    row.appendChild(label);
    row.appendChild(olapCatalogsList);

    // cube
    var row = document.createElement("div");
    row.classList.add("fm-inp-row");
    row.classList.add("fm-ir-horizontal");
    group.appendChild(row);
    var olapCubesList = this.createSelect([], Labels.select_cube);
    olapCubesList.setEnabled(false);
    olapCubesList.onchange = onOlapCubesListChange;
    var label = document.createElement("label");
    label.id = this.guid();
    olapCubesList.dropdownButton.setAttribute("aria-labelledby", label.id);
    this.setText(label, Labels.cube);
    row.appendChild(label);
    row.appendChild(olapCubesList);

    dialog.setContent(content);
    dialog.initialFocusAt = proxyUrlInput;
    this.popupManager.addPopup(dialog);
}
// Open remote report
FlexmonsterToolbar.prototype.showOpenRemoteReportDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        if (textInput.value.length > 0) {
            self.pivot.load(textInput.value);
        }
    }
    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("fm-popup-w500");
    dialog.setTitle(Labels.open_remote_report);
    dialog.setToolbar([{
        id: "fm-btn-open",
        label: Labels.open,
        handler: applyHandler,
        isPositive: true
    },
    {
        id: "fm-btn-cancel",
        label: Labels.cancel
    }
    ]);
    var content = document.createElement("div");
    var textInput = document.createElement("input");
    textInput.type = "text";
    textInput.setAttribute("aria-label", "URL");
    var options = self.pivot.getOptions() || {};
    var isFlatTable = (options.grid && options.grid.type == "flat");
    textInput.value = isFlatTable ? "https://cdn.flexmonster.com/reports/report-flat.json" : "https://cdn.flexmonster.com/reports/report.json";
    content.appendChild(textInput);

    dialog.setContent(content);
    dialog.initialFocusAt = textInput;
    this.popupManager.addPopup(dialog);
}
// Format cells
FlexmonsterToolbar.prototype.defaults.numberFormatting = {
    textAligns: [
        { label: "align_left", value: "left" },
        { label: "align_right", value: "right" },
        { label: "align_center", value: "center" },
    ],
    thousandSeparators: [
        { label: "none", value: "" },
        { label: "space", value: " " },
        { label: ",", value: "," },
        { label: ".", value: "." },
    ],
    decimalSeparators: [
        { label: ",", value: "," },
        { label: ".", value: "." },
    ],
    decimalPlaces: [
        { label: "none", value: -1 },
        { label: "0", value: 0 },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
    ],
    positiveCurrencyFormats: [
        { label: "$1", value: "$1" },
        { label: "1$", value: "1$" },
    ],
    negativeCurrencyFormats: [
        { label: "-$1", value: "-$1" },
        { label: "-1$", value: "-1$" },
        { label: "$-1", value: "$-1" },
        { label: "$1-", value: "$1-" },
        { label: "1-$", value: "1-$" },
        { label: "1$-", value: "1$-" },
        { label: "($1)", value: "($1)" },
        { label: "(1$)", value: "(1$)" },
    ],
    negativeNumberFormats: [
        { label: "-1", value: "-1" },
        { label: "- 1", value: "- 1" },
        { label: "1-", value: "1-" },
        { label: "1 -", value: "1 -" },
        { label: "(1)", value: "(1)" },
    ],
    isPercent: [
        { label: "true_value", value: true },
        { label: "false_value", value: false },
    ]
}
FlexmonsterToolbar.prototype.ConfirmationPopUp = function () { }
FlexmonsterToolbar.prototype.showFormatCellsDialog = function (measureName) {
    var self = this;
    var Labels = this.Labels;
    var currentFormatVO = undefined;

    function validateForm() {
        var isEnabled = valuesDropDown.getValue() != null;
        textAlignDropDown.setEnabled(isEnabled);
        thousandsSepDropDown.setEnabled(isEnabled);
        decimalSepDropDown.setEnabled(isEnabled);
        decimalPlacesDropDown.setEnabled(isEnabled);
        positiveCurrencyFormatDropDown.setEnabled(isEnabled);
        negativeCurrencyFormatDropDown.setEnabled(isEnabled);
        negativeNumberFormatDropDown.setEnabled(isEnabled);
        isPercentDropdown.setEnabled(isEnabled);
        self.setEnabled(currencySymbInput, isEnabled);
        self.setEnabled(nullValueInput, isEnabled);
    }

    function applyCurrencySymbol(dataProvider, currencySymbol) {
        // to be able to show $$ we should replace with $$$$ 
        // https://stackoverflow.com/questions/33781510/how-to-replace-in-javascript
        currencySymbol = currencySymbol.replace(/\$/g, '$$$$');
        return dataProvider.map(function (item) {
            return {
                label: item.label.replace(/\$/g, currencySymbol),
                value: item.value
            }
        });
    }

    function filterFormatting(formatVO) {
        if (currentFormatVO["textAlign"] != textAlignDropDown.getValue()) {
            formatVO["textAlign"] = textAlignDropDown.getValue();
        }
        if (currentFormatVO["thousandsSeparator"] != thousandsSepDropDown.getValue()) {
            formatVO["thousandsSeparator"] = thousandsSepDropDown.getValue();
        }
        if (currentFormatVO["decimalSeparator"] != decimalSepDropDown.getValue()) {
            formatVO["decimalSeparator"] = decimalSepDropDown.getValue();
        }
        if (currentFormatVO["decimalPlaces"] != decimalPlacesDropDown.getValue()) {
            formatVO["decimalPlaces"] = decimalPlacesDropDown.getValue();
        }
        if (currentFormatVO["currencySymbol"] != currencySymbInput.value) {
            formatVO["currencySymbol"] = currencySymbInput.value;
        }
        if (currentFormatVO["positiveCurrencyFormat"] != positiveCurrencyFormatDropDown.getValue() && positiveCurrencyFormatDropDown.getValue() != "") {
            formatVO["positiveCurrencyFormat"] = positiveCurrencyFormatDropDown.getValue();
        }
        if (currentFormatVO["negativeCurrencyFormat"] != negativeCurrencyFormatDropDown.getValue() && negativeCurrencyFormatDropDown.getValue() != "") {
            formatVO["negativeCurrencyFormat"] = negativeCurrencyFormatDropDown.getValue();
        }
        if (currentFormatVO["negativeNumberFormat"] != negativeNumberFormatDropDown.getValue() && negativeNumberFormatDropDown.getValue() != "") {
            formatVO["negativeNumberFormat"] = negativeNumberFormatDropDown.getValue();
        }
        if (currentFormatVO["nullValue"] != nullValueInput.value) {
            formatVO["nullValue"] = nullValueInput.value;
        }
        if (currentFormatVO["isPercent"] != isPercentDropdown.getValue()) {
            formatVO["isPercent"] = isPercentDropdown.getValue();
        }
        return formatVO;
    }

    function ConfirmationPopUp() {
        var dialog = null;
    }

    ConfirmationPopUp.prototype.createPopUp = function () {
        if (this.dialog == null) {
            this.dialog = self.popupManager.createPopup(this);
            this.dialog.content.style.zIndex = 152;
        }
    }

    ConfirmationPopUp.prototype.addPopUp = function () {
        var popup = this.dialog.content;
        this.modalOverlay = this.createModalOverlay();
        self.toolbarWrapper.appendChild(popup);
        self.toolbarWrapper.appendChild(this.modalOverlay);
        self.popupManager.addLayoutClasses(popup);
        self.popupManager.centerPopup(popup);
        var _this = this;
        popup.resizeHandler = function () {
            if (!popup) return;
            _this.addLayoutClasses(popup);
            _this.centerPopup(popup);
        };
        window.addEventListener("resize", popup.resizeHandler);
    }

    ConfirmationPopUp.prototype.initializePopUp = function () {
        this.dialog.setTitle(Labels.confirm_title);
        confirmPopUp.dialog.setToolbar([{
            id: "fm-btn-apply",
            label: Labels.ok,
            handler: switchToMeasure,
            isPositive: true
        },
        {
            id: "fm-btn-cancel",
            label: Labels.cancel,
            handler: restoreEditedMeasure
        }
        ], false, this.removePopUp);
        var content = document.createElement("div");
        var contentLabel = document.createElement("label");
        contentLabel.innerHTML = Labels.confirm_message;
        contentLabel.style.fontSize = "14px";
        content.appendChild(contentLabel);
        this.dialog.setContent(content);
    }

    ConfirmationPopUp.prototype.removePopUp = function (popup) {
        var popupWindow = (popup || confirmPopUp.dialog.content);
        if (confirmPopUp.modalOverlay != null) {
            self.toolbarWrapper.removeChild(confirmPopUp.modalOverlay);
            confirmPopUp.modalOverlay = null;
        }
        if (popupWindow != null) {
            self.toolbarWrapper.removeChild(popupWindow);
            confirmPopUp.dialog = null;
            window.removeEventListener("resize", popupWindow.resizeHandler);
        }
    }

    ConfirmationPopUp.prototype.createModalOverlay = function () {
        var modalOverlay = document.createElement("div");
        modalOverlay.style.zIndex = 151;
        modalOverlay.classList.add("fm-modal-overlay");
        modalOverlay.classList.add("fm-popup-confirm-modal-overlay");
        var _this = this;
        modalOverlay.addEventListener('click', function (e) {
            _this.removePopUp(_this.dialog.content);
            restoreEditedMeasure();
        });
        return modalOverlay;
    }

    var valuesDropDownChangeHandler = function () {
        var formatObject = {};
        formatObject = filterFormatting(formatObject);
        if ((formatObject.hasOwnProperty("textAlign") || formatObject.hasOwnProperty("thousandsSeparator") || formatObject.hasOwnProperty("decimalSeparator") ||
            formatObject.hasOwnProperty("decimalPlaces") || formatObject.hasOwnProperty("currencySymbol") || formatObject.hasOwnProperty("positiveCurrencyFormat") ||
            formatObject.hasOwnProperty("negativeCurrencyFormat") || formatObject.hasOwnProperty("nullValue") || formatObject.hasOwnProperty("isPercent")) &&
            (currentMeasureNames !== undefined && currentMeasureNames.length > 0)) {
            confirmPopUp.createPopUp();
            confirmPopUp.initializePopUp();
            confirmPopUp.addPopUp();
        } else {
            switchToMeasure();
        }
    }

    var restoreEditedMeasure = function () {
        valuesDropDown.setValue(currentMeasureNames);
    }

    function isStringDataMode() {
        var options = self.pivot.getOptions({
            withDefaults: true
        });
        if (options.grid.type == "flat" && currentMeasureNames !== undefined && currentMeasureNames.length > 0) {
            var measures = self.pivot.getMeasures();
            var currentMeasure = null;
            for (var i = 0; i < measures.length; i++) {
                if (currentMeasureNames.indexOf(measures[i].uniqueName) !== -1) {
                    currentMeasure = measures[i];
                }
            }
            return currentMeasure != null && currentMeasure.type != "number";
        }
        return false;
    }

    function applyStringDataMode(isStringDataMode) {
        if (isStringDataMode) {
            thousandSeparatorRow.classList.add("fm-hide");
            decimalSeparatorRow.classList.add("fm-hide");
            decimalPlacesRow.classList.add("fm-hide");
            currencySymbolRow.classList.add("fm-hide");
            positiveCurrencyRow.classList.add("fm-hide");
            negativeCurrencyRow.classList.add("fm-hide");
            nullValueRow.classList.add("fm-hide");
            isPercentRow.classList.add("fm-hide");
        } else {
            thousandSeparatorRow.classList.remove("fm-hide");
            decimalSeparatorRow.classList.remove("fm-hide");
            decimalPlacesRow.classList.remove("fm-hide");
            currencySymbolRow.classList.remove("fm-hide");
            positiveCurrencyRow.classList.remove("fm-hide");
            negativeCurrencyRow.classList.remove("fm-hide");
            nullValueRow.classList.remove("fm-hide");
            isPercentRow.classList.remove("fm-hide");
        }
    }

    var switchToMeasure = function () {
        validateForm();
        currentMeasureNames = valuesDropDown.getValue();
        var formatVO = self.pivot.getFormat(currentMeasureNames ? currentMeasureNames[0] : null);
        currentFormatVO = formatVO;

        applyStringDataMode(isStringDataMode());

        textAlignDropDown.setValue((formatVO.textAlign !== undefined) ? formatVO.textAlign : "right");
        thousandsSepDropDown.setValue(formatVO.thousandsSeparator);
        decimalSepDropDown.setValue(formatVO.decimalSeparator);
        decimalPlacesDropDown.setValue(formatVO.decimalPlaces);
        currencySymbInput.value = formatVO.currencySymbol;
        positiveCurrencyFormatDropDown.setDataProvider(applyCurrencySymbol(self.defaults.numberFormatting.positiveCurrencyFormats, formatVO.currencySymbol));
        positiveCurrencyFormatDropDown.setValue(formatVO.positiveCurrencyFormat);
        negativeCurrencyFormatDropDown.setDataProvider(applyCurrencySymbol(self.defaults.numberFormatting.negativeCurrencyFormats, formatVO.currencySymbol));
        negativeCurrencyFormatDropDown.setValue(formatVO.negativeCurrencyFormat);
        negativeNumberFormatDropDown.setValue(formatVO.negativeNumberFormat);
        nullValueInput.value = formatVO.nullValue;
        isPercentDropdown.setValue((formatVO.isPercent == true) ? true : false);
        if (formatVO.currencySymbol == "" || formatVO.currencySymbol == null) {
            positiveCurrencyRow.classList.add("fm-hide");
            negativeCurrencyRow.classList.add("fm-hide");
            negativeNumberRow.classList.remove("fm-hide");
        } else {
            positiveCurrencyRow.classList.remove("fm-hide");
            negativeCurrencyRow.classList.remove("fm-hide");
            negativeNumberRow.classList.add("fm-hide");
        }
    }
    var applyHandler = function () {
        var currentReport = (currentFormatVO.name != "" || valuesDropDown.getValue()[0] == "") ? self.pivot.getReport() : {};
        var formatVO = undefined;
        if (currentReport.hasOwnProperty("formats") && currentReport.formats.length > 0) {
            for (var i = 0; i < currentReport.formats.length; i++) {
                if (currentFormatVO.name == currentReport.formats[i].name) {
                    formatVO = currentReport.formats[i];
                    break;
                }
            }
        }
        if (formatVO === undefined) {
            formatVO = {};
        }
        if (valuesDropDown.getValue()[0] === "") {
            formatVO.name = "";
        }
        if (formatVO.name && formatVO.name !== "") {
            delete formatVO["name"];
        }
        filterFormatting(formatVO);
        currentFormatVO = undefined;
        var measures = valuesDropDown.getValue();
        for (var i = 0; i < measures.length; i++) {
            self.pivot.setFormat(formatVO, (measures[i] == "" ? null : measures[i]));
        }
        // if (valuesDropDown.getValue() === "" && currentReport.hasOwnProperty("formats")) {
        //     var reportMeasures = currentReport.slice.measures;
        //     for (var i = 0; i < reportMeasures.length; i++) {
        //         if (reportMeasures[i].hasOwnProperty("format")) {
        //             self.pivot.setFormat(formatVO, reportMeasures[i]["uniqueName"]);
        //         }
        //     }
        // }
        self.pivot.refresh();
    }

    var dialog = this.popupManager.createPopup();
    var confirmPopUp = new ConfirmationPopUp();

    dialog.content.classList.add("fm-popup-format-cells");
    dialog.setTitle(this.osUtils.isMobile ? Labels.format : Labels.format_cells);
    dialog.setToolbar([{
        id: "fm-btn-apply",
        label: Labels.apply,
        handler: applyHandler,
        isPositive: true
    },
    {
        id: "fm-btn-cancel",
        label: Labels.cancel
    }
    ], true);

    var content = document.createElement("div");
    var group = document.createElement("div");
    group.classList.add("fm-inp-group");
    content.appendChild(group);

    var measuresDataProvider = [{
        value: "",
        label: Labels.default_value
    }];
    var _uniqueNames = [];
    var _measures = self.pivot.getMeasures();
    for (var i = 0; i < _measures.length; i++) {
        if (_uniqueNames.indexOf(_measures[i].uniqueName) == -1) {
            _uniqueNames.push(_measures[i].uniqueName);
            measuresDataProvider.push({
                value: _measures[i].uniqueName,
                label: _measures[i].name
            });
        }
    }

    var valuesDropDown = this.createSelect(measuresDataProvider, Labels.choose_value, true);
    valuesDropDown.onchange = valuesDropDownChangeHandler;
    if (measureName) valuesDropDown.setValue([measureName]);

    var valuesRow = this.createInputRow(Labels.choose_value, valuesDropDown);
    valuesRow.querySelector("label").classList.add("fm-uc");
    group.appendChild(valuesRow);

    var group = document.createElement("div");
    group.classList.add("fm-inp-group");
    content.appendChild(group);

    function applyLabels(dataProvider) {
        return dataProvider.map(function (item) {
            return {
                label: Labels[item.label] !== undefined ? Labels[item.label] : item.label,
                value: item.value
            };
        });
    }

    // text align
    var textAlignDropDown = this.createSelect(applyLabels(this.defaults.numberFormatting.textAligns));
    group.appendChild(this.createInputRow(Labels.text_align, textAlignDropDown));

    // thousand_separator
    var thousandsSepDropDown = this.createSelect(applyLabels(this.defaults.numberFormatting.thousandSeparators));
    var thousandSeparatorRow = this.createInputRow(Labels.thousand_separator, thousandsSepDropDown);
    group.appendChild(thousandSeparatorRow);

    // decimal_separator
    var decimalSepDropDown = this.createSelect(applyLabels(this.defaults.numberFormatting.decimalSeparators));
    var decimalSeparatorRow = this.createInputRow(Labels.decimal_separator, decimalSepDropDown);
    group.appendChild(decimalSeparatorRow);

    // decimal_places
    var decimalPlacesDropDown = this.createSelect(applyLabels(this.defaults.numberFormatting.decimalPlaces));
    var decimalPlacesRow = this.createInputRow(Labels.decimal_places, decimalPlacesDropDown);
    group.appendChild(decimalPlacesRow);

    // currency_symbol
    var currencySymbInput = document.createElement("input");
    currencySymbInput.classList.add("fm-inp");
    currencySymbInput.type = "text";
    var currencySymbolRow = this.createInputRow(Labels.currency_symbol, currencySymbInput);
    group.appendChild(currencySymbolRow);

    // positive currency_format
    var positiveCurrencyFormatDropDown = this.createSelect();
    var positiveCurrencyRow = this.createInputRow(Labels.positive_currency_format, positiveCurrencyFormatDropDown);
    positiveCurrencyRow.classList.add("fm-popup-format-cells-positive-currency");
    group.appendChild(positiveCurrencyRow);

    // negative currency_format
    var negativeCurrencyFormatDropDown = this.createSelect();
    var negativeCurrencyRow = this.createInputRow(Labels.negative_currency_format, negativeCurrencyFormatDropDown);
    negativeCurrencyRow.classList.add("fm-popup-format-cells-negative-currency");
    group.appendChild(negativeCurrencyRow);

    var negativeNumberFormatDropDown = this.createSelect(applyLabels(this.defaults.numberFormatting.negativeNumberFormats));
    var negativeNumberRow = this.createInputRow(Labels.negative_number_format, negativeNumberFormatDropDown);
    negativeNumberRow.classList.add("fm-popup-format-cells-negative-number");
    group.appendChild(negativeNumberRow);

    currencySymbInput.addEventListener('input', function (event) {
        var value = currencySymbInput.value;
        if (value.trim()) {
            positiveCurrencyRow.classList.remove("fm-hide");
            negativeCurrencyRow.classList.remove("fm-hide");
            negativeNumberRow.classList.add("fm-hide");
            var positiveCurrencyFormat = positiveCurrencyFormatDropDown.getValue();
            positiveCurrencyFormatDropDown.setDataProvider(applyCurrencySymbol(self.defaults.numberFormatting.positiveCurrencyFormats, value));
            positiveCurrencyFormatDropDown.setValue(positiveCurrencyFormat);
            var negativeCurrencyFormat = negativeCurrencyFormatDropDown.getValue();
            negativeCurrencyFormatDropDown.setDataProvider(applyCurrencySymbol(self.defaults.numberFormatting.negativeCurrencyFormats, value));
            negativeCurrencyFormatDropDown.setValue(negativeCurrencyFormat);
        } else {
            positiveCurrencyRow.classList.add("fm-hide");
            negativeCurrencyRow.classList.add("fm-hide");
            negativeNumberRow.classList.remove("fm-hide");
        }
    });

    // null_value
    var nullValueInput = document.createElement("input");
    nullValueInput.classList.add("fm-inp");
    nullValueInput.type = "text";
    var nullValueRow = this.createInputRow(Labels.null_value, nullValueInput);
    group.appendChild(nullValueRow);

    // is_percent
    var isPercentDropdown = this.createSelect(applyLabels(this.defaults.numberFormatting.isPercent));
    var isPercentRow = this.createInputRow(Labels.is_percent, isPercentDropdown);
    group.appendChild(isPercentRow);

    dialog.setContent(content);
    dialog.initialFocusAt = valuesDropDown.dropdownButton;
    this.popupManager.addPopup(dialog);

    switchToMeasure();
}
// Conditional formatting
FlexmonsterToolbar.prototype.showConditionalFormattingDialog = function (measureName) {
    var self = this;
    var Labels = this.Labels;
    var conditions = this.pivot.getAllConditions();

    var _measures = self.pivot.getMeasures();
    var _uniqueNames = [];
    var measures = [];
    for (var i = 0; i < _measures.length; i++) {
        if (_uniqueNames.indexOf(_measures[i].uniqueName) == -1) {
            _uniqueNames.push(_measures[i].uniqueName);
            measures.push(_measures[i]);
        }
    }

    var applyHandler = function () {
        self.pivot.removeAllConditions();
        for (var i = 0; i < conditions.length; i++) {
            var formula = composeFormula(conditions[i].sign, conditions[i].value1, conditions[i].value2);
            if (formula == null) return;
            conditions[i].formula = formula;
            self.pivot.addCondition(conditions[i]);
        }
        self.pivot.refresh();
    };
    var onAddConditionBtnClick = function () {
        var condition = {
            sign: "<",
            value1: "0",
            measures: measures,
            format: {
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#000000',
                backgroundColor: '#FFFFFF'
            }
        };
        conditions.unshift(condition);
        var item = self.createConditionalFormattingItem(condition, conditions);
        content.insertBefore(item, content.firstChild);
        item.focus();
        content.scrollTop = 0;
        if (conditions.length > 0) {
            placeholder.style.display = "none";
        }
        self.popupManager.centerPopup(dialog.content);
    };
    var composeFormula = function (sign, value1, value2) {
        var formula = '';
        var firstValueEmpty = (value1 == null || value1.length == 0);
        var secondValueEmpty = (value2 == null || value2.length == 0);
        var isBetween = (sign === '><');
        var isEmpty = (sign === 'isNaN');
        if ((firstValueEmpty && !isEmpty) || (isBetween && secondValueEmpty)) {
            return formula;
        }
        if (isBetween && !secondValueEmpty) {
            formula = "AND(#value > " + value1 + ", #value < " + value2 + ")";
        } else if (isEmpty) {
            formula = "isNaN(#value)";
        } else {
            var isString = isNaN(parseFloat(value1));
            if (isString) {
                value1 = "'" + value1 + "'";
            }
            formula = "#value " + sign + " " + value1;
        }
        return formula;
    };
    var parseStrings = function (input) {
        var output = [];
        var openQuote = false;
        var str = "";
        for (var i = 0; i < input.length; i++) {
            if (input[i] == '"' || input[i] == "'") {
                if (openQuote) {
                    output.push(str);
                } else {
                    str = "";
                }
                openQuote = !openQuote;
                continue;
            }
            if (openQuote) {
                str += input[i];
            }
        }
        return output;
    };
    var parseFormula = function (formula) {
        var parseNumber = /\W\d+\.*\d*/g;
        var parseSign = /<=|>=|<|>|=|=|!=|isNaN/g;
        var numbers = formula.match(parseNumber);
        var strings = parseStrings(formula);
        var signs = formula.match(parseSign);
        if (numbers == null && strings == null) return {};
        return {
            value1: (numbers != null) ? numbers[0].replace(/\s/, '') : strings[0],
            value2: (numbers != null && numbers.length > 1) ? numbers[1].replace(/\s/, '') : '',
            sign: signs ? signs.join('') : ""
        };
    };
    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("fm-popup-conditional");
    dialog.setTitle(this.osUtils.isMobile ? Labels.conditional : Labels.conditional_formatting);
    dialog.setToolbar([{
        id: "fm-btn-apply",
        label: Labels.apply,
        handler: applyHandler,
        isPositive: true
    },
    {
        id: "fm-btn-cancel",
        label: Labels.cancel
    }
    ], true);

    var addConditionBtn = document.createElement("button");
    addConditionBtn.classList.add("fm-ui-btn");
    addConditionBtn.classList.add("fm-ui-btn-light");
    addConditionBtn.classList.add("fm-button-add");
    addConditionBtn.onclick = onAddConditionBtnClick;
    addConditionBtn.setAttribute("title", Labels.tooltips.add_condition);
    var icon = document.createElement("span");
    icon.classList.add("fm-icon");
    icon.classList.add("fm-icon-act_add");
    addConditionBtn.appendChild(icon);
    dialog.toolbar.insertBefore(addConditionBtn, dialog.toolbar.firstChild);

    var content = document.createElement("div");
    content.classList.add("fm-popup-content");
    content.onclick = function (event) {
        if (event.target.classList.contains("fm-cr-delete")) {
            if (conditions.length == 0) {
                placeholder.style.display = "block";
            }
            self.popupManager.centerPopup(dialog.content);
        }
    }

    var placeholder = document.createElement("div");
    placeholder.classList.add("fm-popup-placeholder");
    content.appendChild(placeholder);

    var message = document.createElement("div");
    message.classList.add("fm-popup-placeholder-text");
    self.setText(message, Labels.no_active_conditions);
    placeholder.appendChild(message);

    var addConditionBtn2 = document.createElement("button");
    addConditionBtn2.setAttribute("href", "javascript:void(0)");
    addConditionBtn2.classList.add("fm-ui-btn");
    addConditionBtn2.classList.add("fm-ui-btn-light");
    addConditionBtn2.classList.add("fm-button-add-large");
    addConditionBtn2.onclick = onAddConditionBtnClick;
    self.setText(addConditionBtn2, Labels.add_condition_button);
    var icon = document.createElement("span");
    icon.classList.add("fm-icon");
    icon.classList.add("fm-icon-act_add");
    addConditionBtn2.insertBefore(icon, addConditionBtn2.firstChild);
    placeholder.appendChild(addConditionBtn2);

    for (var i = 0; i < conditions.length; i++) {
        var formula = parseFormula(conditions[i].formula);
        conditions[i].value1 = formula.value1;
        conditions[i].value2 = formula.value2;
        conditions[i].sign = formula.sign;
        conditions[i].measures = measures;
        content.appendChild(self.createConditionalFormattingItem(conditions[i], conditions));
    }
    if (conditions.length > 0) {
        placeholder.style.display = "none";
    }
    dialog.initialFocusAt = addConditionBtn;
    dialog.setContent(content);
    this.popupManager.addPopup(dialog);
};
FlexmonsterToolbar.prototype.defaults.fontSizes = ["8px", "9px", "10px", "11px", "12px", "13px", "14px"];
FlexmonsterToolbar.prototype.defaults.fonts = ['Arial', 'Lucida Sans Unicode', 'Verdana', 'Courier New', 'Palatino Linotype', 'Tahoma', 'Impact', 'Trebuchet MS', 'Georgia', 'Times New Roman'];
FlexmonsterToolbar.prototype.defaults.conditions = [
    {
        label: "less_than",
        value: '<'
    },
    {
        label: "less_than_or_equal",
        value: '<='
    },
    {
        label: "greater_than",
        value: '>'
    },
    {
        label: "greater_than_or_equal",
        value: '>='
    },
    {
        label: "equal_to",
        value: '='
    },
    {
        label: "not_equal_to",
        value: '!='
    },
    {
        label: "between",
        value: '><'
    },
    {
        label: "is_empty",
        value: 'isNaN'
    }
];
FlexmonsterToolbar.prototype.createConditionalFormattingItem = function (data, allConditions) {
    var self = this;
    var Labels = this.Labels;

    function fillValuesDropDown(measures, selectedMeasure) {
        var options = self.pivot.getOptions() || {};
        var isFlatTable = (options.grid && options.grid.type == "flat");
        var dataProvider = [{
            label: Labels.all_values,
            value: ""
        }];
        for (var i = 0; i < measures.length; i++) {
            if (isFlatTable && measures[i].type == 7) { // count measure
                continue;
            }
            dataProvider.push({
                label: measures[i].name,
                value: measures[i].uniqueName
            })
            // backward compatibility with 2.1
            if (selectedMeasure == "[Measures].[" + measures[i].uniqueName + "]") {
                selectedMeasure = measures[i].uniqueName;
            }
        }
        valuesDropDown.setDataProvider(dataProvider);
        valuesDropDown.setValue(selectedMeasure ? selectedMeasure : dataProvider[0].value);
    };
    function applyLabels(dataProvider) {
        return dataProvider.map(function (item) {
            return {
                label: Labels[item.label] !== undefined ? Labels[item.label] : item.label,
                value: item.value
            };
        });
    }
    var onValueChanged = function () {
        data.measure = valuesDropDown.getValue();
    };
    var onFontFamilyChanged = function () {
        if (data.format != null) {
            data.format.fontFamily = fontFamiliesDropDown.getValue();
            drawSample();
        }
    };
    var onFontSizeChanged = function () {
        if (data.format != null) {
            data.format.fontSize = fontSizesDropDown.getValue();
            drawSample();
        }
    };
    var onConditionChanged = function () {
        data.sign = conditionsDropDown.getValue();
        if (('sign' in data) && data.sign === '><') {
            data.value2 = 0;
        } else if (('sign' in data) && data.sign === 'isNaN') {
            delete data.value1;
            delete data.value2;
        } else {
            delete data.value2;
        }
        drawInputs();
    };
    var onInput1Changed = function () {
        data.value1 = (input1.value.length == 0) ? "0" : input1.value;
    };
    var onInput2Changed = function () {
        data.value2 = (input2.value.length == 0) ? "0" : input2.value;
    };
    var onRemoveBtnClick = function () {
        var idx = allConditions.indexOf(data);
        if (idx > -1) {
            allConditions.splice(idx, 1);
        }
        output.parentNode.removeChild(output);
    };
    var onColorChanged = function () {
        if (data.format != null) {
            sample.style.color = colorPicker.fontColor || '#000';
            sample.style.backgroundColor = colorPicker.backgroundColor || '#fff';
        }
    };
    var onColorApply = function () {
        if (data.format != null) {
            data.format.color = colorPicker.fontColor;
            data.format.backgroundColor = colorPicker.backgroundColor;
            drawSample();
        }
    };
    var onColorCancel = function () {
        if (data.format != null) {
            colorPicker.setColor(data.format.hasOwnProperty('backgroundColor') ? data.format.backgroundColor : '0xFFFFFF', "bg");
            colorPicker.setColor(data.format.hasOwnProperty('color') ? data.format.color : '0x000000', "font");
        }
        drawSample();
    }
    var drawInputs = function () {
        if (('sign' in data) && data.sign === '><') {
            input1.classList.remove("fm-width120");
            input1.classList.add("fm-width50");
            input1.style.display = "inline-block";
            input2.value = ('value2' in data ? data.value2 : "0");
            input2.style.display = "inline-block";
            andLabel.style.display = "inline-block";
        } else if (('sign' in data) && data.sign === 'isNaN') {
            input1.style.display = "none";
            input2.style.display = "none";
            andLabel.style.display = "none";
        } else {
            input1.classList.add("fm-width120");
            input1.classList.remove("fm-width50");
            input1.style.display = "inline-block";
            input2.style.display = "none";
            andLabel.style.display = "none";
        }
    };
    var drawSample = function () {
        var format = data.format;
        if (format != null) {
            sample.style.backgroundColor = format.backgroundColor || '#fff';
            sample.style.color = format.color || '#000';
            sample.style.fontFamily = format.fontFamily || 'Arial';
            sample.style.fontSize = format.fontSize || '12px';
        }
    };

    var output = document.createElement("div");
    output.classList.add("fm-condition-row");

    var itemRenderer = document.createElement("div");
    output.appendChild(itemRenderer);

    var row = document.createElement("div");
    row.classList.add("fm-cr-inner");
    itemRenderer.appendChild(row);

    var label = document.createElement("div");
    label.classList.add("fm-cr-lbl");
    label.classList.add("fm-width50");
    self.setText(label, Labels.value + ":");
    row.appendChild(label);

    // values
    var valuesDropDown = this.createSelect();
    valuesDropDown.classList.add("fm-values");
    if (data.measures && data.measures.length > 0) {
        fillValuesDropDown(data.measures, data.measure);
    } else {
        valuesDropDown.setEnabled(false);
    }
    valuesDropDown.onchange = onValueChanged;
    valuesDropDown.setAttribute("title", Labels.value);
    valuesDropDown.dropdownButton.setAttribute("aria-label", Labels.value);
    row.appendChild(valuesDropDown);

    // conditions
    var conditionsDropDown = this.createSelect(applyLabels(this.defaults.conditions));
    conditionsDropDown.classList.add("fm-conditions");
    conditionsDropDown.setValue(data.sign);
    conditionsDropDown.onchange = onConditionChanged;
    conditionsDropDown.setAttribute("title", Labels.tooltips.condition);
    conditionsDropDown.dropdownButton.setAttribute("aria-label", Labels.tooltips.condition);
    row.appendChild(conditionsDropDown);

    var input1 = document.createElement("input");
    input1.classList.add("fm-number-inp");
    input1.classList.add("fm-width50");
    input1.type = "number";
    input1.value = ('value1' in data ? data.value1 : "0");
    input1.onchange = onInput1Changed;
    row.appendChild(input1);

    var andLabel = document.createElement("span");
    andLabel.classList.add("fm-and-label");
    andLabel.classList.add("fm-width20");
    self.setText(andLabel, Labels.and_symbole);
    row.appendChild(andLabel);

    var input2 = document.createElement("input");
    input2.classList.add("fm-number-inp");
    input2.classList.add("fm-width50");
    input2.type = "number";
    input2.value = ('value2' in data ? data.value2 : "0");
    input2.onchange = onInput2Changed;
    row.appendChild(input2);

    drawInputs();

    var row = document.createElement("div");
    row.classList.add("fm-cr-inner");
    itemRenderer.appendChild(row);

    var label = document.createElement("div");
    label.classList.add("fm-cr-lbl");
    label.classList.add("fm-width50");
    self.setText(label, Labels.format + ":");
    row.appendChild(label);

    var fontFamiliesDropDown = this.createSelect(this.defaults.fonts);
    fontFamiliesDropDown.classList.add("fm-font-family");
    fontFamiliesDropDown.setValue((data.hasOwnProperty('format')) && (data.format.hasOwnProperty('fontFamily')) ? data.format.fontFamily : this.defaults.fonts[0]);
    fontFamiliesDropDown.onchange = onFontFamilyChanged;
    fontFamiliesDropDown.setAttribute("title", Labels.tooltips.font);
    fontFamiliesDropDown.dropdownButton.setAttribute("aria-label", Labels.tooltips.font);
    row.appendChild(fontFamiliesDropDown);

    var fontSizesDropDown = this.createSelect(this.defaults.fontSizes);
    fontSizesDropDown.classList.add("fm-font-size");
    fontSizesDropDown.setValue((data.hasOwnProperty('format')) && (data.format.hasOwnProperty('fontSize')) ? data.format.fontSize : "12px");
    fontSizesDropDown.onchange = onFontSizeChanged;
    fontSizesDropDown.setAttribute("title", Labels.tooltips.font_size);
    fontSizesDropDown.dropdownButton.setAttribute("aria-label", Labels.tooltips.font_size);
    row.appendChild(fontSizesDropDown);

    var colorPicker = new FlexmonsterToolbar.ColorPicker(this, output);
    colorPicker.setColor((data.hasOwnProperty('format')) && (data.format.hasOwnProperty('backgroundColor')) ? data.format.backgroundColor : '0xFFFFFF', "bg");
    colorPicker.setColor((data.hasOwnProperty('format')) && (data.format.hasOwnProperty('color')) ? data.format.color : '0x000000', "font");
    colorPicker.changeHandler = onColorChanged;
    colorPicker.applyHandler = onColorApply;
    colorPicker.cancelHandler = onColorCancel;
    row.appendChild(colorPicker.element);

    var sample = document.createElement("input");
    sample.setAttribute("tabindex", "-1");
    sample.classList.add("fm-sample");
    sample.classList.add("fm-inp");
    sample.type = "number";
    sample.value = "73.93";
    sample.style.pointerEvents = "none";
    row.appendChild(sample);
    drawSample();

    var removeBtnWrap = document.createElement("div");
    removeBtnWrap.style.position = "relative";
    itemRenderer.appendChild(removeBtnWrap);
    var removeBtn = document.createElement("a");
    removeBtn.href = "javascript:void(0);";
    removeBtn.classList.add("fm-cr-delete");
    removeBtn.classList.add("fm-icon");
    removeBtn.classList.add("fm-icon-act_trash");
    removeBtn.onclick = onRemoveBtnClick;
    removeBtn.setAttribute("title", Labels.tooltips.remove_condition);
    removeBtn.setAttribute("role", "button");
    removeBtnWrap.appendChild(removeBtn);
    this.makeSelectableByKeyboard(removeBtn);

    return output;
};
// Options
FlexmonsterToolbar.prototype.showOptionsDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        var options = self.pivot.getOptions();
        var currentViewType = options["viewType"];
        var currentType = options["grid"]["type"];
        var options = {
            grid: {
                showGrandTotals: grandTotalsGroup.getValue(),
                showTotals: totalsGroup.getValue(),
                type: layoutGroup.getValue()
            }
        };
        options.viewType = (currentType != options.grid.type && currentViewType == "charts") ? "grid" : currentViewType;
        self.pivot.setOptions(options);
        self.pivot.refresh();
    }
    var dialog = this.popupManager.createPopup();
    dialog.content.classList.add("fm-popup-options");
    dialog.setTitle(this.osUtils.isMobile ? Labels.options : Labels.layout_options);
    dialog.setToolbar([{
        id: "fm-btn-apply",
        label: Labels.apply,
        handler: applyHandler,
        isPositive: true
    },
    {
        id: "fm-btn-cancel",
        label: Labels.cancel
    }
    ], true);

    var content = document.createElement("div");
    content.classList.add("fm-popup-content");

    var row = document.createElement("div");
    row.classList.add("fm-ui-row");
    content.appendChild(row);

    var col = document.createElement("div");
    col.classList.add("fm-ui-col-2");
    row.appendChild(col);

    // grand totals
    var title = document.createElement("div");
    title.id = this.guid();
    title.classList.add("fm-title-2");
    self.setText(title, Labels.grand_totals);
    col.appendChild(title);

    var grandTotalsGroup = this.createRadioGroup([
        {
            label: Labels.grand_totals_off,
            value: "off"
        }, {
            label: Labels.grand_totals_on,
            value: "on"
        }, {
            label: Labels.grand_totals_on_rows,
            value: "rows"
        }, {
            label: Labels.grand_totals_on_columns,
            value: "columns"
        }
    ])
    grandTotalsGroup.setAttribute("aria-labelledby", title.id);
    col.appendChild(grandTotalsGroup);

    // layout
    var title = document.createElement("div");
    title.id = this.guid();
    title.classList.add("fm-title-2");
    self.setText(title, Labels.layout);
    col.appendChild(title);
    var layoutRadioItems = [
        {
            label: Labels.compact_view,
            value: "compact"
        }, {
            label: Labels.classic_view,
            value: "classic"
        }
    ];
    var options = self.pivot.getReport({
        withDefaults: true,
        withGlobals: true
    });
    if (options != null && options.hasOwnProperty("dataSource")
        && !(options["dataSource"]["type"] == "microsoft analysis services" ||
            options["dataSource"]["type"] == "mondrian" ||
            options["dataSource"]["type"] == "elasticsearch")) {
        layoutRadioItems.push({
            label: Labels.flat_view,
            value: "flat"
        });
    }
    var layoutGroup = this.createRadioGroup(layoutRadioItems);
    layoutGroup.setAttribute("aria-labelledby", title.id);
    col.appendChild(layoutGroup);

    // subtotals
    var col = document.createElement("div");
    col.classList.add("fm-ui-col-2");
    row.appendChild(col);
    var title = document.createElement("div");
    title.id = this.guid();
    title.classList.add("fm-title-2");
    self.setText(title, Labels.subtotals);
    col.appendChild(title);

    var totalsGroup = this.createRadioGroup([
        {
            label: Labels.subtotals_off,
            value: "off"
        }, {
            label: Labels.subtotals_on,
            value: "on"
        }, {
            label: Labels.subtotals_on_rows,
            value: "rows"
        }, {
            label: Labels.subtotals_on_columns,
            value: "columns"
        }
    ])
    layoutGroup.setAttribute("aria-labelledby", title.id);
    col.appendChild(totalsGroup);

    dialog.setContent(content);
    dialog.initialFocusAt = grandTotalsGroup.querySelector("li");
    this.popupManager.addPopup(dialog);

    var options = self.pivot.getOptions() || {};
    var optionsGrid = options.grid || {};

    grandTotalsGroup.setValue(optionsGrid.showGrandTotals || "on");
    totalsGroup.setValue(optionsGrid.showTotals || "on")
    layoutGroup.setValue(optionsGrid.type || "compact");
}
// Export to PDF
FlexmonsterToolbar.prototype.showExportPdfDialog = function () {
    var self = this;
    var Labels = this.Labels;
    var applyHandler = function () {
        self.pivot.exportTo('pdf', {
            pageOrientation: orientationRadioGroup.getValue()
        });
    }
    var dialog = this.popupManager.createPopup();
    dialog.setTitle(Labels.choose_page_orientation);
    dialog.setToolbar([{
        id: "fm-btn-apply",
        label: Labels.apply,
        handler: applyHandler,
        isPositive: true
    },
    {
        id: "fm-btn-cancel",
        label: Labels.cancel
    }
    ]);

    var content = document.createElement("div");
    var orientationRadioGroup = this.createRadioGroup([
        {
            label: Labels.portrait,
            value: "portrait",
            checked: true
        }, {
            label: Labels.landscape,
            value: "landscape",
        }
    ]);
    content.appendChild(orientationRadioGroup);

    dialog.setContent(content);
    dialog.initialFocusAt = orientationRadioGroup.querySelector("li");
    this.popupManager.addPopup(dialog);
}

// Fullscreen
FlexmonsterToolbar.prototype.toggleFullscreen = function () {
    this.isFullscreen() ? this.exitFullscreen() : this.enterFullscreen(this.container);
}
FlexmonsterToolbar.prototype.isFullscreen = function () {
    return document.fullScreenElement != undefined ||
        document.mozFullScreenElement != undefined ||
        document.webkitFullscreenElement != undefined ||
        document.msFullscreenElement != undefined;
}
FlexmonsterToolbar.prototype.enterFullscreen = function (element) {
    if (element.requestFullscreen || element.webkitRequestFullScreen ||
        element.mozRequestFullScreen || (element.msRequestFullscreen && window == top)) {
        this.containerStyle = {
            width: this.container.style.width,
            height: this.container.style.height,
            position: this.container.style.position,
            top: this.container.style.top,
            bottom: this.container.style.bottom,
            left: this.container.style.left,
            right: this.container.style.right,
            marginTop: this.container.style.marginTop,
            marginLeft: this.container.style.marginLeft,
            zIndex: this.container.style.zIndex
        };
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.position = "fixed";
        this.container.style.top = 0 + "px";
        this.container.style.left = 0 + "px";
        this.container.style.zIndex = 2147483647;

        this.toolbarWrapper.style.width = "100%";
        var fullScreenChangeHandler = null;
        this.init();

        if (element.requestFullscreen) {
            element.requestFullscreen();
            fullScreenChangeHandler = function () {
                if (!this.isFullscreen()) {
                    this.exitFullscreen();
                    element.removeEventListener("fullscreenchange", fullScreenChangeHandler);
                }
            }.bind(this);
            element.addEventListener("fullscreenchange", fullScreenChangeHandler, false);
        } else if (element.webkitRequestFullScreen) {
            var ua = navigator.userAgent;
            if ((ua.indexOf("Safari") > -1) && (ua.indexOf("Chrome") == -1)) {
                element.webkitRequestFullScreen();
            } else {
                element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            fullScreenChangeHandler = function () {
                if (!this.isFullscreen()) {
                    this.exitFullscreen();
                    element.removeEventListener("webkitfullscreenchange", fullScreenChangeHandler);
                }
            }.bind(this);
            element.addEventListener("webkitfullscreenchange", fullScreenChangeHandler, false);
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
            fullScreenChangeHandler = function () {
                if (!this.isFullscreen()) {
                    this.exitFullscreen();
                    document.removeEventListener("mozfullscreenchange", fullScreenChangeHandler);
                }
            }.bind(this);
            document.addEventListener("mozfullscreenchange", fullScreenChangeHandler, false);
        } else if (element.msRequestFullscreen) { //IE 11
            element.msRequestFullscreen();
            fullScreenChangeHandler = function () {
                if (!this.isFullscreen()) {
                    this.exitFullscreen();
                    document.removeEventListener("MSFullscreenChange", fullScreenChangeHandler);
                }
            }.bind(this);
            document.addEventListener("MSFullscreenChange", fullScreenChangeHandler, false);
        }
    } else if (element.msRequestFullscreen && window !== top) {
        alert("Fullscreen mode in IE11 is not supported when Pivot is embedded in IFrame.");
    }
}
FlexmonsterToolbar.prototype.exitFullscreen = function () {
    this.container.style.width = this.containerStyle.width;
    this.container.style.height = this.containerStyle.height;
    this.container.style.position = this.containerStyle.position;
    this.container.style.top = this.containerStyle.top;
    this.container.style.left = this.containerStyle.left;
    this.container.style.marginTop = this.containerStyle.marginTop;
    this.container.style.marginLeft = this.containerStyle.marginLeft;
    this.container.style.zIndex = this.containerStyle.zIndex;

    if (document.exitFullscreen && document.fullScreenElement) {
        document.exitFullscreen();
    } else if (document.cancelFullscreen && document.fullScreenElement) {
        document.cancelFullscreen();
    } else if (document.mozCancelFullScreen && document.mozFullScreenElement) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullScreen && document.webkitFullscreenElement) {
        document.webkitExitFullScreen();
    } else if (document.webkitCancelFullScreen && document.webkitFullscreenElement) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen && document.msFullscreenElement) { //IE 11
        document.msExitFullscreen();
    }

    this.init();

    this.setText(document.querySelector("#fm-tab-fullscreen .fm-tab-label"), this.Labels.fullscreen);
    document.querySelector("#fm-tab-fullscreen .fm-svg-icon").innerHTML = this.icons.fullscreen;
}

// PRIVATE API
FlexmonsterToolbar.prototype.nullOrUndefined = function (val) {
    return (typeof (val) === 'undefined' || val === null);
}
FlexmonsterToolbar.prototype.hasClass = function (elem, cls) {
    return elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
FlexmonsterToolbar.prototype.addClass = function (elem, cls) {
    if (!this.hasClass(elem, cls)) {
        elem.className += " " + cls;
    }
}
FlexmonsterToolbar.prototype.removeClass = function (elem, cls) {
    if (this.hasClass(elem, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        elem.className = elem.className.replace(reg, ' ');
    }
}
FlexmonsterToolbar.prototype.setEnabled = function (elem, isEnabled) {
    if (isEnabled) {
        this.removeClass(elem, "fm-ui-disabled");
        elem.setAttribute("tabindex", "0");
        elem.removeAttribute("aria-disabled");
    } else {
        this.addClass(elem, "fm-ui-disabled");
        elem.setAttribute("tabindex", "-1");
        elem.setAttribute("aria-disabled", "true");
    }
}
FlexmonsterToolbar.prototype.setText = function (target, text) {
    if (!target) return;
    if (target.innerText !== undefined) {
        target.innerText = text;
    }
    if (target.textContent !== undefined) {
        target.textContent = text;
    }
}
FlexmonsterToolbar.prototype.makeSelectableByKeyboard = function (element) {
    element.setAttribute("tabindex", "0");
    element.addEventListener("keyup", function (e) {
        if (document.activeElement !== element) {
            return;
        }
        if (e.which == 13 /*enter*/ || e.which == 32 /*space*/) {
            element.click();
            var el = element.querySelector("input");
            if (el) {
                el.click();
            }
        }
    });
}
FlexmonsterToolbar.prototype.createRadioGroup = function (dataProvider, groupName) {
    var list = document.createElement("ul");
    list.setAttribute("role", "radiogroup");
    list.classList.add("fm-radiobtn-list");

    function onClick(e) {
        var radio = e.target.querySelector("input");
        if (radio) {
            radio.checked = true;
        }
        updateAriaChecked();
    }
    function updateAriaChecked() {
        var children = list.childNodes;
        for (var i = 0; i < children.length; i++) {
            var child = children.item(i)
            var radio = child.querySelector("input");
            child.setAttribute("aria-checked", radio.checked ? "true" : "false");
        }
    }
    if (groupName === undefined) {
        groupName = this.guid();
    }
    for (var i = 0; i < dataProvider.length; i++) {
        var data = dataProvider[i];
        var li = document.createElement("li");
        li.classList.add("fm-radio-wrap");
        li.setAttribute("role", "radio");
        li.setAttribute("aria-checked", data.checked ? "true" : "false");
        li.addEventListener("click", onClick);
        this.makeSelectableByKeyboard(li);

        var radio = document.createElement("input");
        radio.id = this.guid();
        radio.type = "radio";
        radio.name = groupName;
        radio.value = data.value;
        radio.checked = data.checked;
        li.appendChild(radio);

        var label = document.createElement("label");
        label.setAttribute("for", radio.id);
        this.setText(label, data.label);
        li.appendChild(label);

        list.appendChild(li);
    }

    list.getValue = function () {
        var children = list.childNodes;
        for (var i = 0; i < children.length; i++) {
            var radio = children.item(i).querySelector("input");
            if (radio.checked) {
                return radio.value;
            }
        }
        return null;
    }
    list.setValue = function (value) {
        var children = list.childNodes;
        for (var i = 0; i < children.length; i++) {
            var radio = children.item(i).querySelector("input");
            if (radio.value == value) {
                radio.checked = true;
                updateAriaChecked();
                break;
            }
        }
    }

    return list;
}
FlexmonsterToolbar.prototype.guid = function () {
    return 'fm-' + Math.random().toString(36).substr(2, 9);
}
FlexmonsterToolbar.prototype.createInputRow = function (labelText, input) {
    var row = document.createElement("div");
    row.classList.add("fm-inp-row");
    row.classList.add("fm-ir-horizontal");

    var label = document.createElement("label");
    label.id = this.guid();
    this.setText(label, labelText);
    row.appendChild(label);

    if (input.dropdownButton) {
        input.dropdownButton.setAttribute("aria-labelledby", label.id);
    } else {
        input.setAttribute("aria-labelledby", label.id);
    }
    row.appendChild(input);

    return row;
}
FlexmonsterToolbar.prototype.createSelect = function (dataProvider, placeholder, allowMuliselect) {
    if (dataProvider === undefined) {
        dataProvider = [];
    }
    if (placeholder === undefined) {
        placeholder = "";
    }
    var _dataProvider = dataProvider;
    var _selectedItemIndexes = [];
    var _activeItemIndex = -1;
    var _isOpen = false;

    var dropdown = document.createElement("div");
    dropdown.classList.add("fm-ui", "fm-ui-element", "fm-ui-dropdown");

    var dropdownButton = document.createElement("a");
    dropdownButton.classList.add("fm-ui-element", "fm-ui", "fm-ui-toggle-btn", "fm-ui-dropdown-btn");
    dropdownButton.setAttribute("tabindex", "0");
    dropdownButton.setAttribute("role", "combobox");
    dropdownButton.setAttribute("aria-haspopup", "listbox");
    dropdownButton.setAttribute("aria-expanded", "false");
    dropdownButton.addEventListener("click", onDropdownButtonClick);
    dropdownButton.addEventListener("keydown", onDropdownButtonKeyDown);
    dropdownButton.addEventListener("blur", hide);
    dropdownButton.innerHTML = placeholder;
    dropdown.appendChild(dropdownButton);
    dropdown.dropdownButton = dropdownButton;

    var dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("fm-ui-element", "fm-ui", "fm-ui-dropdown-list");
    dropdownMenu.addEventListener("mouseleave", hide);
    dropdown.appendChild(dropdownMenu);

    var dropdownList = document.createElement("ul");
    dropdownList.id = this.guid();
    dropdownList.classList.add("fm-ui-element", "fm-ui", "fm-ui-list");
    dropdownList.setAttribute("role", "listbox");
    dropdownMenu.appendChild(dropdownList);
    dropdownButton.setAttribute("aria-controls", dropdownList.id);

    function onDropdownButtonClick() {
        _isOpen ? hide() : show();
    }

    function onDropdownButtonKeyDown(e) {
        if (_isOpen && (e.keyCode == 38 || e.keyCode == 40)) {
            setActiveItemAt(e.keyCode == 40 ? _activeItemIndex + 1 : _activeItemIndex - 1);
            e.preventDefault();
        }
        if (e.keyCode == 13 || e.keyCode == 32) {
            if (_isOpen) {
                if (_activeItemIndex != -1) {
                    if (allowMuliselect) {
                        toggleItem(dropdownList.children.item(_activeItemIndex))
                    } else {
                        selectItem(dropdownList.children.item(_activeItemIndex));
                        hide();
                    }
                    if (dropdown.onchange) {
                        dropdown.onchange();
                    }
                }
            } else {
                show();
            }
        }
        if (_isOpen && e.keyCode == 27) {
            hide();
            e.stopImmediatePropagation();
        }
    }

    function onItemMouseDown(e) {
        if (allowMuliselect) {
            toggleItem(e.target);
        } else {
            selectItem(e.target);
            hide();
        }
        if (dropdown.onchange) {
            dropdown.onchange();
        }
    }

    function toggleItem(item, isSelected) {
        if (isSelected === undefined) {
            isSelected = !item.classList.contains("fm-selected");
        }
        var index = parseInt(item.getAttribute("data-index"));
        if (isSelected) {
            item.classList.add("fm-selected");
            item.setAttribute("aria-selected", "true");
            if (_selectedItemIndexes.indexOf(index) < 0) {
                _selectedItemIndexes.push(index);
            }
        } else {
            item.classList.remove("fm-selected");
            item.setAttribute("aria-selected", "false");
            var _index = _selectedItemIndexes.indexOf(index);
            if (_index >= 0) {
                _selectedItemIndexes.splice(_index, 1);
            }
        }
        var index = parseInt(item.getAttribute("data-index"));
        setActiveItemAt(index);
        setDropdownButtonLabel();
    }

    function selectItem(item) {
        // deselect all
        var allItems = dropdownList.children;
        for (var i = 0; i < allItems.length; i++) {
            allItems.item(i).classList.remove("fm-selected");
            allItems.item(i).setAttribute("aria-selected", "false");
        }
        // select
        item.classList.add("fm-selected");
        item.setAttribute("aria-selected", "true");
        var index = parseInt(item.getAttribute("data-index"));
        _selectedItemIndexes = [index];
        setActiveItemAt(index);
        dropdownButton.setAttribute("aria-activedescendant", item.id);
        setDropdownButtonLabel();
    }

    function setDropdownButtonLabel() {
        var label = placeholder;
        if (_selectedItemIndexes.length > 0) {
            if (allowMuliselect) {
                _selectedItemIndexes.sort();
                var labels = [];
                for (var i = 0; i < _selectedItemIndexes.length; i++) {
                    var data = _dataProvider[_selectedItemIndexes[i]];
                    labels.push(typeof data === "string" ? data : data.label);
                }
                label = labels.join(", ");
            } else {
                var data = _dataProvider[_selectedItemIndexes[0]];
                label = typeof data === "string" ? data : data.label;
            }
        }
        dropdownButton.innerHTML = label;
    }

    function setActiveItemAt(index) {
        _activeItemIndex = Math.max(0, Math.min(dropdownList.children.length - 1, index));
        var allItems = dropdownList.children;
        for (var i = 0; i < allItems.length; i++) {
            allItems.item(i).classList.remove("fm-current");
        }
        dropdownList.children.item(_activeItemIndex).classList.add("fm-current");
    }

    function hide() {
        if (_isOpen) {
            _isOpen = false;
            dropdown.classList.remove("fm-opened");
            dropdownButton.setAttribute("aria-expanded", "false");
        }
    }

    function show() {
        if (_isOpen == false) {
            _isOpen = true;
            dropdown.classList.add("fm-opened");
            dropdownButton.setAttribute("aria-expanded", "true");
            dropdownMenu.style.top = (dropdownButton.offsetTop + dropdownButton.clientHeight) + "px";
            dropdownMenu.style.left = dropdownButton.offsetLeft + "px";
            dropdownMenu.style.width = (dropdownButton.clientWidth + 2) + "px";
            if (_selectedItemIndexes.length > 0) {
                setActiveItemAt(_selectedItemIndexes[0]);
            }
        }
    }

    dropdown.setDataProvider = function (dataProvider) {
        _dataProvider = dataProvider;
        _selectedItemIndexes.length = 0;
        dropdownList.innerHTML = "";
        for (var i = 0; i < dataProvider.length; i++) {
            var data = dataProvider[i];
            var li = document.createElement("li");
            li.id = dropdownList.id + i;
            li.innerHTML = typeof data === "string" ? data : data.label;
            li.classList.add("fm-ui-element", "fm-ui");
            li.setAttribute("role", "option");
            li.setAttribute("data-index", i);
            li.setAttribute("aria-selected", "false");
            li.addEventListener("mousedown", onItemMouseDown); // click is not suitable because if fires after blur
            dropdownList.appendChild(li);
        }
        if (dropdownList.firstChild) {
            dropdownButton.setAttribute("aria-activedescendant", dropdownList.firstChild.id);
            setActiveItemAt(0);
        }
    }

    dropdown.setEnabled = function (isEnabled) {
        if (isEnabled) {
            dropdown.classList.remove("fm-ui-disabled");
            dropdown.removeAttribute("aria-disabled");
            dropdownButton.setAttribute("tabindex", "0");
        } else {
            dropdown.classList.add("fm-ui-disabled");
            dropdown.setAttribute("aria-disabled", "true");
            dropdownButton.setAttribute("tabindex", "-1");
        }
    }

    dropdown.getValue = function () {
        if (_selectedItemIndexes.length == 0) {
            return null;
        }
        if (allowMuliselect) {
            _selectedItemIndexes.sort();
            return _selectedItemIndexes.map(function (index) {
                return typeof _dataProvider[index] === "string"
                    ? _dataProvider[index]
                    : _dataProvider[index].value;
            });
        }
        return typeof _dataProvider[_selectedItemIndexes[0]] === "string"
            ? _dataProvider[_selectedItemIndexes[0]]
            : _dataProvider[_selectedItemIndexes[0]].value;
    }

    dropdown.setValue = function (value) {
        var findIndex = function (value) {
            for (var i = 0; i < _dataProvider.length; i++) {
                if (typeof _dataProvider[i] === "string" && _dataProvider[i] == value) {
                    return i;
                }
                if (typeof _dataProvider[i] === "object" && _dataProvider[i].value == value) {
                    return i;
                }
            }
            return -1;
        }
        if (allowMuliselect) {
            for (var i = 0; i < value.length; i++) {
                var index = findIndex(value[i]);
                if (index >= 0) {
                    toggleItem(dropdownList.children.item(index), true);
                }
            }
        } else {
            var index = findIndex(value);
            if (index >= 0) {
                selectItem(dropdownList.children.item(index));
            }
        }
    }

    if (dataProvider) {
        dropdown.setDataProvider(dataProvider);
    }

    return dropdown;
}
FlexmonsterToolbar.prototype.createDivider = function (data) {
    var item = document.createElement("li");
    item.className = "fm-divider";
    item.setAttribute("aria-hidden", "true");
    return item;
}
FlexmonsterToolbar.prototype.createTab = function (data, parent) {
    var tab = document.createElement("li");
    tab.id = data.id;
    var tabLink = document.createElement("a");
    tabLink.setAttribute("role", "menuitem");
    tabLink.tabIndex = 0;
    if (data.hasOwnProperty("class_attr")) {
        tabLink.setAttribute("class", data.class_attr);
    }
    tabLink.setAttribute("href", "javascript:void(0)");

    if (data.icon) {
        var svgIcon = document.createElement("div");
        svgIcon.classList.add("fm-svg-icon");
        svgIcon.setAttribute("aria-hidden", "true");
        svgIcon.innerHTML = data.icon;
        tabLink.appendChild(svgIcon);
    }

    var title = document.createElement("span");
    title.classList.add("fm-tab-label");
    this.setText(title, data.title);
    tabLink.appendChild(title);
    var _this = this;
    var _handler = typeof data.handler == "function" ? data.handler : this[data.handler];
    var _onShowHandler = typeof data.onShowHandler == "function" ? data.onShowHandler : this[data.onShowHandler];
    if (!this.nullOrUndefined(_handler)) {
        tabLink.onclick =
            function (handler, args) {
                return function () {
                    handler.call(_this, args);
                }
            }(_handler, data.args);
    }
    if (!this.nullOrUndefined(_onShowHandler)) {
        tabLink.onmouseover =
            function (handler) {
                return function () {
                    handler.call(_this);
                }
            }(_onShowHandler);
    }
    tab.appendChild(tabLink);
    if (data.menu != null && (!this.osUtils.isMobile || data.collapse == true)) {
        var submenu = this.createTabMenu(data.menu, tab);
        submenu.querySelector("ul").id = this.guid();
        tabLink.setAttribute("aria-haspopup", "true");
        tabLink.setAttribute("aria-controls", submenu.querySelector("ul").id);
        tab.appendChild(submenu);
    }
    return tab;
}
FlexmonsterToolbar.prototype.createSubmenuItem = function (data, parentTab) {
    var tab = document.createElement("li");
    tab.setAttribute("role", "menuitem");
    tab.id = data.id;
    if (data.hasOwnProperty("class_attr")) {
        tab.setAttribute("class", data.class_attr);
    }

    var _this = this;
    var _handler = typeof data.handler == "function" ? data.handler : this[data.handler];
    if (!this.nullOrUndefined(_handler)) {
        tab.addEventListener("click",
            function (handler, args) {
                return function () {
                    handler.call(_this, args);
                    parentTab.classList.remove("fm-opened");
                }
            }(_handler, data.args)
        );
    }

    if (data.icon) {
        var svgIcon = document.createElement("span");
        svgIcon.classList.add("fm-svg-icon");
        svgIcon.setAttribute("aria-hidden", "true");
        svgIcon.innerHTML = data.icon;
        tab.appendChild(svgIcon);
    }

    if (data.type === "checkbox") {
        var checkbox = document.createElement("span");
        checkbox.setAttribute("aria-hidden", "true");
        checkbox.classList.add("fm-tab-checkbox");
        tab.appendChild(checkbox);
        tab.setAttribute("role", "menuitemcheckbox");
    }

    var title = document.createElement("span");
    title.classList.add("fm-tab-label");
    this.setText(title, data.title);
    tab.appendChild(title);

    return tab;
}
FlexmonsterToolbar.prototype.createTabMenu = function (dataProvider, parentTab) {
    var menuContainer = document.createElement("div");
    menuContainer.className = "fm-dropdown fm-shadow-container";
    var menuList = document.createElement("ul");
    menuList.setAttribute("role", "menu");
    menuList.setAttribute("aria-orientation", "vertical");
    menuList.className = "fm-dropdown-content";
    for (var i = 0; i < dataProvider.length; i++) {
        if (this.isDisabled(dataProvider[i])) continue;
        menuList.appendChild((dataProvider[i].divider) ? this.createMenuDivider() : this.createSubmenuItem(dataProvider[i], parentTab));
    }
    menuContainer.appendChild(menuList);

    var _activeItemIndex = -1;

    parentTab.querySelector("a").addEventListener("click", function () {
        var _isOpen = parentTab.classList.contains("fm-opened");
        _isOpen ? hide() : show();
    });
    parentTab.querySelector("a").addEventListener("keydown", function (e) {
        var _isOpen = parentTab.classList.contains("fm-opened");
        if (_isOpen && (e.keyCode == 38 || e.keyCode == 40)) {
            setActiveItemAt(e.keyCode == 40 ? _activeItemIndex + 1 : _activeItemIndex - 1);
            e.preventDefault();
        }
        if (e.keyCode == 13 /*enter*/ || e.keyCode == 32 /*space*/) {
            if (_isOpen) {
                if (_activeItemIndex >= 0) {
                    var data = dataProvider[_activeItemIndex];
                    var _handler = typeof data.handler == "function" ? data.handler : _this[data.handler];
                    if (!_this.nullOrUndefined(_handler)) {
                        _handler.call(_this, data.args);
                    }
                }
                e.preventDefault();
            } else {
                show();
                e.preventDefault();
            }
        }
        if (_isOpen && e.keyCode == 27 /*esc*/) {
            hide();
            e.stopImmediatePropagation();
        }
    });
    parentTab.querySelector("a").addEventListener("blur", hide);
    parentTab.addEventListener("mouseover", show);
    parentTab.addEventListener("mouseleave", hide);

    var _this = this;
    function show() {
        parentTab.classList.add("fm-opened");
        parentTab.classList.remove("fm-align-rigth");
        menuList.classList.remove("fm-dropdown-scrollable-left");
        menuList.classList.remove("fm-dropdown-scrollable-right");
        menuContainer.style.right = menuContainer.style.left = null;
        var menuRect = menuContainer.getBoundingClientRect();
        var toolbarRect = _this.toolbarWrapper.getBoundingClientRect();
        var leftScrollArrow = _this.container.querySelector(".fm-left-scroll-button");
        var rightScrollArrow = _this.container.querySelector(".fm-right-scroll-button");
        var arrowWidth = (leftScrollArrow ? leftScrollArrow.offsetWidth : 0) + (rightScrollArrow ? rightScrollArrow.offsetWidth : 0);
        if (menuRect.right > toolbarRect.right - arrowWidth) {
            menuContainer.style.right = 0;
            _this.addClass(parentTab, "fm-align-rigth");
            menuRect = menuContainer.getBoundingClientRect();
            if (menuRect.right > toolbarRect.right - (rightScrollArrow ? rightScrollArrow.offsetWidth : 0)) {
                var luft = menuRect.right - rightScrollArrow.getBoundingClientRect().left + 5;
                menuContainer.style.right = luft + "px";
                _this.removeClass(parentTab, "fm-align-rigth");
                menuList.classList.add("fm-dropdown-scrollable-right");
            }
        } else if (menuRect.left < toolbarRect.left + (leftScrollArrow ? leftScrollArrow.offsetWidth : 0)) { //this block handles cases when scrolling tabs are partly hidden
            var luft = (leftScrollArrow ? leftScrollArrow.getBoundingClientRect().right : 0) - menuRect.left + 5;
            menuContainer.style.left = luft + "px";
            menuList.classList.add("fm-dropdown-scrollable-left");
        }
        setActiveItemAt(-2);
        parentTab.querySelector("a").setAttribute("aria-activedescendant", menuList.children.item(0).id);
    }
    function hide() {
        parentTab.classList.remove("fm-opened");
    }
    function setActiveItemAt(index) {
        var allItems = menuList.children;
        for (var i = 0; i < allItems.length; i++) {
            allItems.item(i).classList.remove("fm-current");
        }
        if (index >= -1) {
            _activeItemIndex = Math.max(0, Math.min(menuList.children.length - 1, index));
            menuList.children.item(_activeItemIndex).classList.add("fm-current");
        } else {
            _activeItemIndex = -1;
        }
    }
    return menuContainer;
}
FlexmonsterToolbar.prototype.createMenuDivider = function () {
    var item = document.createElement("li");
    item.className = "fm-v-divider";
    item.setAttribute("aria-hidden", "true");
    return item;
}
FlexmonsterToolbar.prototype.isDisabled = function (data) {
    if (this.nullOrUndefined(data)) return true;
    return (data.ios === false && this.osUtils.isIOS) || (data.android === false && this.osUtils.isAndroid) || (data.mobile === false && this.osUtils.isMobile) || (data.kibana === false && this.envUtils.isKibana);
}
FlexmonsterToolbar.prototype.filterConnectMenu = function () {
    var menu = [];
    var Labels = this.Labels;
    if (this.dataSourceType == 1 || this.dataSourceType == 2) {
        menu.push({
            title: Labels.connect_local_csv,
            id: "fm-tab-connect-local-csv",
            handler: this.connectLocalCSVHandler,
            mobile: false,
            icon: this.icons.connect_csv
        });
        menu.push({
            title: Labels.connect_local_json,
            id: "fm-tab-connect-local-json",
            handler: this.connectLocalJSONHandler,
            mobile: false,
            icon: this.icons.connect_json
        });
        menu.push({
            title: this.osUtils.isMobile ? Labels.connect_remote_csv_mobile : Labels.connect_remote_csv,
            id: "fm-tab-connect-remote-csv",
            handler: this.connectRemoteCSV,
            icon: this.icons.connect_csv
        });
        menu.push({
            title: this.osUtils.isMobile ? Labels.connect_remote_json_mobile : Labels.connect_remote_json,
            id: "fm-tab-connect-remote-json",
            handler: this.connectRemoteJSON,
            icon: this.icons.connect_json
        });
    } else if (this.dataSourceType == 3 || this.dataSourceType == 4) {
        menu.push({
            title: this.osUtils.isMobile ? Labels.connect_olap_mobile : Labels.connect_olap,
            id: "fm-tab-connect-olap",
            handler: this.connectOLAP,
            flat: false,
            icon: this.icons.connect_olap
        });
    } else if (this.dataSourceType == 6) {
        menu.push({
            title: this.osUtils.isMobile ? Labels.connect_elastic_mobile : Labels.connect_elastic,
            id: "fm-tab-connect-elastic",
            handler: this.connectElastic,
            flat: false,
            icon: this.icons.connect_elastic
        });
    }
    if (this.dataSourceType != 0 && this.dataProvider[0] && this.dataProvider[0].id == "fm-tab-connect") {
        this.dataProvider[0]["menu"] = menu;
    }
}
FlexmonsterToolbar.prototype.updateDataSourceType = function (dataType) {
    this.dataSourceType = dataType || 5;
    if (this.dataSourceType != 5 && this.dataProvider[0] && this.dataProvider[0].id == "fm-tab-connect") {
        this.filterConnectMenu();
        if (!this.osUtils.isMobile) {
            var connect = this.pivotContainer.querySelector("#fm-tab-connect");
            var open = this.pivotContainer.querySelector("#fm-tab-open");
            this.toolbarWrapper.firstChild.firstChild.removeChild(connect ? connect : this.toolbarWrapper.firstChild.firstChild.firstChild.nextSibling);
            this.toolbarWrapper.firstChild.firstChild.insertBefore(this.createTab(this.dataProvider[0]), open ? open : this.toolbarWrapper.firstChild.firstChild.firstChild.nextSibling);
        } else {
            var elemList = ["#fm-tab-connect-remote-csv", "#fm-tab-connect-remote-json", "#fm-tab-connect-olap"];
            for (var i = 0; i < elemList.length; i++) {
                var elem = this.pivotContainer.querySelector(elemList[i]);
                if (elem) {
                    this.toolbarWrapper.firstChild.firstChild.removeChild(elem);
                }
            }
            var filterList = this.dataProvider[0].menu;
            for (var i = filterList.length - 1; i >= 0; i--) {
                if (!filterList[i].hasOwnProperty("mobile") || filterList[i].mobile) {
                    this.toolbarWrapper.firstChild.firstChild.insertBefore(this.createTab(filterList[i]), this.toolbarWrapper.firstChild.firstChild.firstChild);
                }
            }
        }
    }
}
FlexmonsterToolbar.prototype.getElementById = function (id, parent) {
    var find = function (node, id) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if (child.id == id) {
                return child;
            } else {
                var res = find(child, id);
            }
            if (res != null) {
                return res;
            }
        }
        return null;
    };
    return find(parent || this.toolbarWrapper, id);
}
FlexmonsterToolbar.prototype.envUtils = {
    isKibana: document.getElementById('kibana_body') != null
};
FlexmonsterToolbar.prototype.osUtils = {
    isIOS: navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.platform.match(/iPhone|iPad|iPod/i) ? true : false,
    isMac: /Mac/i.test(navigator.platform),
    isAndroid: navigator.userAgent.match(/Android/i) ? true : false,
    isBlackBerry: /BlackBerry/i.test(navigator.platform),
    isMobile: navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.platform.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Android/i) || /BlackBerry/i.test(navigator.platform)
};
FlexmonsterToolbar.PopupManager = function (toolbar) {
    this.toolbar = toolbar;
    this.activePopup = null;
}
FlexmonsterToolbar.PopupManager.prototype.createPopup = function () {
    return new FlexmonsterToolbar.PopupManager.PopupWindow(this);
};
FlexmonsterToolbar.PopupManager.prototype.addPopup = function (popup) {
    if (popup == null) return;
    this.removePopup();
    this.modalOverlay = this.createModalOverlay();
    this.activePopup = popup;
    this.toolbar.toolbarWrapper.appendChild(popup.content);
    this.toolbar.toolbarWrapper.appendChild(this.modalOverlay);
    this.addLayoutClasses(popup.content);
    this.centerPopup(popup.content);
    var _this = this;
    popup.resizeHandler = function () {
        if (!popup) return;
        _this.addLayoutClasses(popup.content);
        _this.centerPopup(popup.content);
    };
    window.addEventListener("resize", popup.resizeHandler);

    if (popup.initialFocusAt) {
        popup.prevActiveElement = document.activeElement;
        popup.initialFocusAt.focus({
            preventScroll: true
        });
    }
};
FlexmonsterToolbar.PopupManager.prototype.addLayoutClasses = function (popup) {
    popup.classList.remove("fm-layout-tablet");
    popup.classList.remove("fm-layout-mobile");
    popup.classList.remove("fm-layout-mobile-small");
    var rect = this.getBoundingRect(this.toolbar.container);
    if (rect.width < 768) {
        popup.classList.add("fm-layout-tablet");
    }
    if (rect.width < 580) {
        popup.classList.add("fm-layout-mobile");
    }
    if (rect.width < 460) {
        popup.classList.add("fm-layout-mobile-small");
    }
};
FlexmonsterToolbar.PopupManager.prototype.centerPopup = function (popup) {
    if (this.modalOverlay == null) return;
    var containerRect = this.getBoundingRect(this.toolbar.container);
    var popupRect = this.getBoundingRect(popup);
    var toolbarRect = this.getBoundingRect(this.toolbar.toolbarWrapper);
    popup.style.zIndex = parseInt(this.modalOverlay.style.zIndex) + 1;
    //this.modalOverlay.style.top = toolbarRect.height + "px";
    this.modalOverlay.style.height = containerRect.height /*- toolbarRect.height*/ + "px";
    popup.style.left = Math.max(0, (toolbarRect.width - popupRect.width) / 2) + "px";
    popup.style.top = Math.max(toolbarRect.height, (containerRect.height - toolbarRect.height - popupRect.height) / 2 + toolbarRect.height) + "px";
};
FlexmonsterToolbar.PopupManager.prototype.removePopup = function (popup) {
    var popup = (popup || this.activePopup);
    if (this.modalOverlay != null && this.toolbar.toolbarWrapper.contains(this.modalOverlay)) {
        this.toolbar.toolbarWrapper.removeChild(this.modalOverlay);
        this.modalOverlay = null;
    }
    if (popup != null && this.toolbar.toolbarWrapper.contains(popup.content)) {
        this.toolbar.toolbarWrapper.removeChild(popup.content);
        this.activePopup = null;
        window.removeEventListener("resize", popup.resizeHandler);
        if (popup.prevActiveElement) {
            popup.prevActiveElement.focus({ preventScroll: true });
        }
    }
};
FlexmonsterToolbar.PopupManager.prototype.getBoundingRect = function (target) {
    var rect = target.getBoundingClientRect();
    return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width || target.clientWidth,
        height: rect.height || target.clientHeight
    };
};
FlexmonsterToolbar.PopupManager.prototype.createModalOverlay = function () {
    var modalOverlay = document.createElement("div");
    modalOverlay.classList.add("fm-modal-overlay");
    modalOverlay.classList.add("fm-popup-modal-overlay");
    var _this = this;
    modalOverlay.addEventListener('click', function (e) {
        _this.removePopup(_this.activePopup);
    });
    return modalOverlay;
};
FlexmonsterToolbar.PopupManager.PopupWindow = function (popupManager) {
    this.popupManager = popupManager;
    var contentPanel = document.createElement("div");
    contentPanel.className = "fm-panel-content";
    var titleBar = document.createElement("div");
    titleBar.className = "fm-title-bar";
    var titleLabel = document.createElement("div");
    titleLabel.className = "fm-title-text";
    titleLabel.id = "fm-popup-title-text";
    var toolbar = document.createElement("div");
    toolbar.className = "fm-toolbox";
    toolbar.style.clear = "both";
    this.content = document.createElement("div");
    this.content.className = "fm-popup fm-panel fm-toolbar-ui fm-ui";
    this.content.setAttribute("role", "dialog");
    this.content.setAttribute("aria-labelledby", "fm-popup-title-text");
    this.content.appendChild(contentPanel);
    this.content.addEventListener("keydown", function (e) {
        if (e.keyCode == 27) {
            popupManager.removePopup();
        }
    });
    contentPanel.appendChild(titleBar);
    titleBar.appendChild(titleLabel);

    var _this = this;

    function keepFocusHandler(e) {
        if (e.relatedTarget) {
            e.relatedTarget.focus();
        }
    }
    var focusGuardTop = document.createElement("div");
    focusGuardTop.setAttribute("tabindex", "0");
    focusGuardTop.addEventListener("focus", keepFocusHandler);
    contentPanel.insertBefore(focusGuardTop, contentPanel.firstChild);

    var focusGuardBottom = document.createElement("div");
    focusGuardBottom.setAttribute("tabindex", "0");
    focusGuardBottom.addEventListener("focus", keepFocusHandler);

    this.setTitle = function (title) {
        FlexmonsterToolbar.prototype.setText(titleLabel, title);
    }
    this.setContent = function (content) {
        contentPanel.insertBefore(content, titleBar.nextSibling);
        contentPanel.appendChild(focusGuardBottom);
    }
    this.setToolbar = function (buttons, toHeader, removePopupHandler) {
        toolbar.innerHTML = "";
        for (var i = buttons.length - 1; i >= 0; i--) {
            var button = document.createElement("button");
            button.className = "fm-ui-btn" + (buttons[i].isPositive ? " fm-ui-btn-dark" : "");
            if (buttons[i].id) button.id = buttons[i].id;
            FlexmonsterToolbar.prototype.setText(button, buttons[i].label);
            button.onclick =
                function (handler) {
                    return function () {
                        if (handler != null) {
                            handler.call();
                        }
                        if (removePopupHandler != undefined) {
                            removePopupHandler.call();
                        } else {
                            _this.popupManager.removePopup();
                        }
                    }
                }(buttons[i].handler, removePopupHandler);
            FlexmonsterToolbar.prototype.setEnabled(button, buttons[i].disabled !== true);
            if (buttons[i].isPositive && (FlexmonsterToolbar.prototype.osUtils.isMac || FlexmonsterToolbar.prototype.osUtils.isIOS)) {
                toolbar.appendChild(button);
            } else {
                toolbar.insertBefore(button, toolbar.firstChild);
            }
        }
        if (toHeader) {
            toolbar.classList.add("fm-ui-col");
            titleBar.appendChild(toolbar);
            titleBar.classList.add("fm-ui-row");
            titleLabel.classList.add("fm-ui-col");
        } else {
            contentPanel.appendChild(toolbar);
        }
    }
    this.toolbar = toolbar;
    this.titleBar = titleBar;
    this.title = titleLabel;
    return this;
};
FlexmonsterToolbar.ColorPicker = function (toolbar, popupContainer) {
    var _this = this;
    this.toolbar = toolbar;

    this.element = document.createElement("div");
    this.element.classList.add("fm-colorpick-wrap");
    this.element.classList.add("fm-width40");

    this.colorPickerButton = document.createElement("div");
    this.colorPickerButton.classList.add("fm-colorpick-btn");
    this.colorPickerButton.setAttribute("title", toolbar.Labels.tooltips.cp_text_color);
    this.element.appendChild(this.colorPickerButton);
    this.colorPickerIcon = document.createElement("span");
    this.colorPickerIcon.classList.add("fm-icon");
    this.colorPickerIcon.classList.add("fm-ui-icon-vam");
    this.colorPickerIcon.classList.add("fm-icon-act_font");
    this.colorPickerButton.appendChild(this.colorPickerIcon);
    toolbar.makeSelectableByKeyboard(this.colorPickerButton);

    this.popup = document.createElement('div');
    this.popup.classList.add("fm-colorpick-popup");
    // this.popup.setAttribute("tabindex", "0");
    this.popup.addEventListener("click", function (event) {
        event.stopPropagation();
    });
    this.popup.addEventListener("keydown", function (e) {
        if (e.keyCode == 27) {
            _this.closePopup();
            e.stopImmediatePropagation();
        }
    });
    popupContainer.appendChild(this.popup);

    function keepFocusHandler(e) {
        if (e.relatedTarget) {
            e.relatedTarget.focus();
        }
    }

    var focusGuardTop = document.createElement("div");
    focusGuardTop.setAttribute("tabindex", "0");
    focusGuardTop.addEventListener("focus", keepFocusHandler);
    this.popup.insertBefore(focusGuardTop, this.popup.firstChild);

    var colorSwitch = document.createElement("div");
    colorSwitch.classList.add("fm-color-targ-switch");
    this.popup.appendChild(colorSwitch);

    var colorBtn = document.createElement("button");
    colorBtn.classList.add("fm-cts-item");
    colorBtn.classList.add("fm-current");
    colorBtn.innerHTML = toolbar.Labels.cp_text;
    colorBtn.onclick = function () {
        onSwitchChange('font');
    };
    colorSwitch.appendChild(colorBtn);

    var bgColorBtn = document.createElement("button");
    bgColorBtn.classList.add("fm-cts-item");
    bgColorBtn.innerHTML = toolbar.Labels.cp_highlight;
    bgColorBtn.onclick = function () {
        onSwitchChange('bg');
    };
    colorSwitch.appendChild(bgColorBtn);

    var row = document.createElement("div");
    row.classList.add("fm-cp-sett-row");
    this.popup.appendChild(row);

    this.colorInput = document.createElement("input");
    this.colorInput.type = "text";
    this.colorInput.setAttribute("aria-label", toolbar.Labels.cp_hex_value);
    this.colorInput.classList.add("fm-inp");
    this.colorInput.classList.add("fm-cp-2-colors-width");
    this.colorInput.classList.add("fm-tac");
    this.colorInput.onchange = onColorInputChanged;
    row.appendChild(this.colorInput);

    this.colorPreview = document.createElement("div");
    this.colorPreview.classList.add("fm-cp-curr-color");
    this.colorPreview.classList.add("fm-cp-2-colors-width");
    row.appendChild(this.colorPreview);

    this.mainColors = document.createElement("div");
    this.mainColors.classList.add("fm-row-10colors");
    this.popup.appendChild(this.mainColors);
    for (var color in this.colors) {
        var item = document.createElement("div");
        item.classList.add("fm-r10c-item");
        item.style.backgroundColor = color;
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "checkbox");
        item.setAttribute("aria-label", this.colorLabels[color]);
        this.toolbar.makeSelectableByKeyboard(item);

        item.setAttribute('data-c', color);
        item.addEventListener('click', onMainColorClick);
        this.mainColors.appendChild(item);

        var check = document.createElement("span");
        check.classList.add("fm-cp-currentmark");
        check.classList.add("fm-icon");
        check.classList.add("fm-icon-act_check");
        item.appendChild(check);

        var arrow = document.createElement("span");
        if (color == "#FFFFFF") {
            item.classList.add("fm-r10c-white-arrow");
        } else {
            arrow.classList.add("fm-r10c-arrow");
        }
        arrow.style.borderTopColor = color;
        item.appendChild(arrow);
    }

    this.shadeColors = document.createElement("div");
    this.shadeColors.classList.add("fm-row-4colors");
    this.popup.appendChild(this.shadeColors);
    for (var i = 0; i < 8; i++) {
        var item = document.createElement("div");
        item.classList.add("fm-r4c-item");
        item.addEventListener('click', onColorClick);
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "checkbox");
        this.toolbar.makeSelectableByKeyboard(item);
        this.shadeColors.appendChild(item);

        var check = document.createElement("span");
        check.classList.add("fm-cp-currentmark");
        check.classList.add("fm-icon");
        check.classList.add("fm-icon-act_check");
        item.appendChild(check);
    }
    this.drawShades('#000000');

    var row = document.createElement("div");
    row.classList.add("fm-cp-btns-row");
    this.popup.appendChild(row);

    var applyBtn = document.createElement("button");
    applyBtn.innerHTML = toolbar.Labels.apply;
    applyBtn.classList.add("fm-ui-btn");
    applyBtn.classList.add("fm-ui-btn-dark");
    applyBtn.addEventListener("click", onApplyClick);

    var cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = toolbar.Labels.cancel;
    cancelBtn.classList.add("fm-ui-btn");
    cancelBtn.addEventListener("click", onCancelClick);

    if (FlexmonsterToolbar.prototype.osUtils.isMac || FlexmonsterToolbar.prototype.osUtils.isIOS) {
        row.appendChild(cancelBtn);
        row.appendChild(applyBtn);
    } else {
        row.appendChild(applyBtn);
        row.appendChild(cancelBtn);
    }

    var focusGuardBottom = document.createElement("div");
    focusGuardBottom.setAttribute("tabindex", "0");
    focusGuardBottom.addEventListener("focus", keepFocusHandler);
    this.popup.appendChild(focusGuardBottom);

    this.currentType = "font";

    this.colorPickerButton.addEventListener('click', onColorButtonClick);
    document.body.addEventListener('click', onBodyClick);

    function onBodyClick(event) {
        if (_this.isOpened()) {
            _this.closePopup();
        }
    }

    function onColorButtonClick(event) {
        event.stopPropagation();
        if (_this.isOpened()) {
            _this.closePopup();
        } else {
            _this.openPopup();
        }
    }

    function onMainColorClick(event) {
        var color = event.target.getAttribute('data-c');
        _this.drawShades(_this.colors[color]);
        _this.setColor(color, _this.currentType, true);
    }

    function onColorClick(event) {
        var color = event.target.getAttribute('data-c');
        _this.setColor(color, _this.currentType, true);
    }

    function onSwitchChange(type) {
        _this.currentType = type;
        colorBtn.classList.remove("fm-current");
        bgColorBtn.classList.remove("fm-current");
        if (type == "bg") {
            bgColorBtn.classList.add("fm-current");
            _this.setColor(_this.backgroundColor, type, false);
        } else {
            colorBtn.classList.add("fm-current");
            _this.setColor(_this.fontColor, type, false);
        }
    }

    function onColorInputChanged() {
        var color = _this.colorInput.value;
        if (_this.isColor(color)) {
            _this.setColor(color, _this.currentType, true);
        }
    }

    function onApplyClick(e) {
        _this.closePopup();
        if (_this.applyHandler) {
            _this.applyHandler();
        }
        _this.colorPickerButton.focus();
    }

    function onCancelClick(e) {
        _this.closePopup();
        if (_this.cancelHandler) {
            _this.cancelHandler();
        }
        _this.colorPickerButton.focus();
    }
}
FlexmonsterToolbar.ColorPicker.prototype.colors = {
    '#000000': ["#000000", "#262626", "#424242", "#616161", "#757575", "#9E9E9E", "#BDBDBD", "#DEDEDE"],
    '#FFFFFF': ["#FFFFFF", "#E6E6E6", "#B5B5B5", "#8F8F8F", "#737373", "#525252", "#404040", "#383838"],
    '#F44336': ["#D32F2F", "#E53935", "#F44336", "#EF5350", "#E57373", "#EF9A9A", "#FFCDD2", "#FFEBEE"],
    '#FF9800': ["#F57C00", "#FB8C00", "#FF9800", "#FFA726", "#FFB74D", "#FFCC80", "#FFE0B2", "#FFF3E0"],
    '#FFEB3B': ["#FBC02D", "#FDD835", "#FFEB3B", "#FFEE58", "#FFF176", "#FFF59D", "#FFF9C4", "#FFFDE7"],
    '#8BC34A': ["#689F38", "#7CB342", "#8BC34A", "#9CCC65", "#AED581", "#C5E1A5", "#DCEDC8", "#F1F8E9"],
    '#009688': ["#00796B", "#00897B", "#009688", "#26A69A", "#4DB6AC", "#80CBC4", "#B2DFDB", "#E0F2F1"],
    '#03A9F4': ["#0288D1", "#039BE5", "#03A9F4", "#29B6F6", "#4FC3F7", "#81D4FA", "#B3E5FC", "#E1F5FE"],
    '#3F51B5': ["#303F9F", "#3949AB", "#3F51B5", "#5C6BC0", "#7986CB", "#9FA8DA", "#C5CAE9", "#E8EAF6"],
    '#9C27B0': ["#7B1FA2", "#8E24AA", "#9C27B0", "#AB47BC", "#BA68C8", "#CE93D8", "#E1BEE7", "#F3E5F5"],
};
FlexmonsterToolbar.ColorPicker.prototype.colorLabels = {
    '#000000': "black",
    '#FFFFFF': "white",
    '#F44336': "red",
    '#FF9800': "orange",
    '#FFEB3B': "yellow",
    '#8BC34A': "green",
    '#009688': "teal",
    '#03A9F4': "cyan",
    '#3F51B5': "blue",
    '#9C27B0': "purple",
}
FlexmonsterToolbar.ColorPicker.prototype.isOpened = function () {
    return this.popup.parentElement && this.popup.parentElement.classList.contains("fm-popup-opened");
};
FlexmonsterToolbar.ColorPicker.prototype.drawShades = function (mainColor) {
    var colors = this.colors[mainColor];
    if (!colors) {
        return;
    }
    var children = this.shadeColors.children;
    for (var i = 0; i < children.length; i++) {
        var item = children[i];
        item.setAttribute("aria-label", this.colorLabels[mainColor] + " " + this.toolbar.Labels.cp_shade + " " + (i + 1));
        item.setAttribute('data-c', colors[i]);
        item.style.backgroundColor = colors[i];
        if (colors[i] == "#FFFFFF") {
            item.classList.add("fm-white-shade");
        }
    }
};
FlexmonsterToolbar.ColorPicker.prototype.setColor = function (colorValue, type, dispatch) {
    if (typeof colorValue === "string" && colorValue.indexOf("0x") == 0) {
        colorValue = "#" + colorValue.substr(2);
    }
    if (type == "bg") {
        this.backgroundColor = colorValue;
        this.colorPickerButton.style.backgroundColor = colorValue;
    } else {
        this.fontColor = colorValue;
        this.colorPickerIcon.style.color = colorValue;
    }
    this.colorInput.value = colorValue;
    this.colorPreview.style.backgroundColor = colorValue;
    this.drawSelected();

    if (dispatch && this.changeHandler) {
        this.changeHandler();
    }
};
FlexmonsterToolbar.ColorPicker.prototype.drawSelected = function () {
    var color = this.currentType == "bg" ? this.backgroundColor : this.fontColor;
    var mainColor = this.findMain(color);

    this.drawShades(mainColor);

    var children = this.mainColors.children;
    for (var i = 0; i < children.length; i++) {
        children[i].classList.remove("fm-current");
        children[i].removeAttribute("aria-checked");
    }
    var mainSelected = this.mainColors.querySelector("[data-c='" + mainColor + "']");
    if (mainSelected) {
        mainSelected.classList.add("fm-current");
        mainSelected.setAttribute("aria-checked", "true");
    }

    children = this.shadeColors.children;
    for (var i = 0; i < children.length; i++) {
        children[i].classList.remove("fm-current");
        children[i].removeAttribute("aria-checked");
    }
    var shadeSelected = this.shadeColors.querySelector("[data-c='" + color + "']");
    if (shadeSelected) {
        shadeSelected.classList.add("fm-current");
        shadeSelected.setAttribute("aria-checked", "true");
    }
};
FlexmonsterToolbar.ColorPicker.prototype.findMain = function (color) {
    if (typeof color === "string" && color.indexOf("0x") == 0) {
        color = "#" + color.substr(2);
    }
    for (var mainColor in this.colors) {
        var colors = this.colors[mainColor];
        if (colors.indexOf(color) >= 0) {
            return mainColor;
        }
    }
};
FlexmonsterToolbar.ColorPicker.prototype.isColor = function (value) {
    return value.match(/^#?[0-9A-Fa-f]{6}$/g);
}
FlexmonsterToolbar.ColorPicker.prototype.closePopup = function () {
    if (!this.popup.parentElement) {
        return;
    }
    this.popup.parentElement.classList.remove("fm-popup-opened");
    // hack for setting focus back to colorpicker button when using keybord for apply/cancel
    this.justClosed = true;
    var _this = this;
    setTimeout(function () {
        _this.justClosed = false;
    }, 100);
}
FlexmonsterToolbar.ColorPicker.prototype.openPopup = function () {
    if (this.justClosed) {
        return;
    }
    // close others
    var openedPopups = this.toolbar.toolbarWrapper.querySelectorAll('.fm-colorpick-popup');
    for (var i = 0; i < openedPopups.length; i++) {
        openedPopups[i].parentElement.classList.remove("fm-popup-opened");
    }
    if (!this.popup.parentElement) {
        return;
    }
    // open current
    this.popup.parentElement.classList.add("fm-popup-opened");
    var parent = this.toolbar.toolbarWrapper.querySelector(".fm-popup-conditional .fm-panel-content");
    var pos = this.getWhere(this.colorPickerButton, parent);
    var posAbs = this.getWhere(this.colorPickerButton, document.body);
    if (posAbs.top - this.popup.clientHeight < 0) {
        this.popup.classList.remove("fm-arrow-down");
        this.popup.classList.add("fm-arrow-up");
        this.popup.style.top = (this.colorPickerButton.clientHeight + pos.top + 11) + 'px';
        this.popup.style.bottom = "";
    } else {
        this.popup.classList.add("fm-arrow-down");
        this.popup.classList.remove("fm-arrow-up");
        this.popup.style.bottom = (parent.clientHeight - pos.top + 5) + 'px';
        this.popup.style.top = "";
    }
    this.popup.style.left = pos.left + 'px';
    this.popup.querySelector("button").focus();
}
FlexmonsterToolbar.ColorPicker.prototype.getWhere = function (el, parent) {
    var curleft = 0;
    var curtop = 0;
    var curtopscroll = 0;
    var curleftscroll = 0;
    if (el.offsetParent) {
        curleft = el.offsetLeft;
        curtop = el.offsetTop;
        var elScroll = el;
        while (elScroll = elScroll.parentNode) {
            if (elScroll == parent) {
                break;
            }
            curtopscroll = elScroll.scrollTop ? elScroll.scrollTop : 0;
            curleftscroll = 0;
            curleft -= curleftscroll;
            curtop -= curtopscroll;
        }
        while (el = el.offsetParent) {
            if (el == parent) {
                break;
            }
            curleft += el.offsetLeft;
            curtop += el.offsetTop;
        }
    }
    var isMSIE = /*@cc_on!@*/ 0;
    var offsetX = 0; // isMSIE ? document.body.scrollLeft : window.pageXOffset;
    var offsetY = 0; // isMSIE ? document.body.scrollTop : window.pageYOffset;
    return {
        top: curtop + offsetY,
        left: curleft + offsetX
    };
}