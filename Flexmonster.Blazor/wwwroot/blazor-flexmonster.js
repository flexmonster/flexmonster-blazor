import './flexmonster/flexmonster.js';

window.initFlexmonster = (instance, flexmonsterParams, id, htmlref) => {
	var pivot = new Flexmonster(flexmonsterParams);

	pivot.on('afterchartdraw', function () {
		instance.invokeMethodAsync("AfterChartDrawCallBack");
	});

	pivot.on('aftergriddraw', function (param) {
		instance.invokeMethodAsync("AfterGridDrawCallBack", param);
	});

	pivot.on('beforegriddraw', function (param) {
		instance.invokeMethodAsync("BeforeGridDrawCallBack", param);
	});

	pivot.on('beforetoolbarcreated', function (toolbar) {
		instance.invokeMethodAsync("BeforeToolbarCreatedCallBack", toolbar);
	});

	pivot.on('cellclick', function (cell) {
		instance.invokeMethodAsync("CellClickCallBack", cell);
	});

	pivot.on('celldoubleclick', function (cell) {
		instance.invokeMethodAsync("CellDoubleClickCallBack", cell);
	});

	pivot.on('chartclick', function (data) {
		instance.invokeMethodAsync("ChartClickCallBack", data);
	});

	pivot.on('datachanged', function (param) {
		instance.invokeMethodAsync("DataChangedCallBack", param);
	});

	pivot.on('dataerror', function (param) {
		instance.invokeMethodAsync("DataErrorCallBack", param);
	});

	pivot.on('datafilecancelled', function () {
		instance.invokeMethodAsync("DataFileCancelledCallBack");
	});

	pivot.on('dataloaded', function () {
		instance.invokeMethodAsync("DataLoadedCallBack");
	});

	pivot.on('drillthroughclose', function () {
		instance.invokeMethodAsync("DrillthroughCloseCallBack");
	});

	pivot.on('drillthroughopen', function (cell) {
		instance.invokeMethodAsync("DrillthroughOpenCallBack", cell);
	});

	pivot.on('exportcomplete', function () {
		instance.invokeMethodAsync("ExportCompleteCallBack");
	});

	pivot.on('exportstart', function () {
		instance.invokeMethodAsync("ExportStartCallBack");
	});

	pivot.on('fieldslistclose', function () {
		instance.invokeMethodAsync("FieldsListCloseCallBack");
	});

	pivot.on('fieldslistopen', function () {
		instance.invokeMethodAsync("FieldsListOpenCallBack");
	});

	pivot.on('filterclose', function () {
		instance.invokeMethodAsync("FilterCloseCallBack");
	});

	pivot.on('filteropen', function (param) {
		instance.invokeMethodAsync("FilterOpenCallBack", param);
	});

	pivot.on('loadingdata', function () {
		instance.invokeMethodAsync("LoadingDataCallBack");
	});

	pivot.on('loadinglocalization', function () {
		instance.invokeMethodAsync("LoadingLocalizationCallBack");
	});

	pivot.on('loadingolapstructure', function () {
		instance.invokeMethodAsync("LoadingOLAPStructureCallBack");
	});

	pivot.on('loadingreportfile', function () {
		instance.invokeMethodAsync("LoadingReportFileCallBack");
	});

	pivot.on('localizationerror', function () {
		instance.invokeMethodAsync("LocalizationErrorCallBack");
	});

	pivot.on('localizationloaded', function () {
		instance.invokeMethodAsync("LocalizationLoadedCallBack");
	});

	pivot.on('olapstructureerror', function () {
		instance.invokeMethodAsync("OLAPStructureErrorCallBack");
	});

	pivot.on('olapstructureloaded', function () {
		instance.invokeMethodAsync("OLAPStructureLoadedCallBack");
	});

	pivot.on('openingreportfile', function () {
		instance.invokeMethodAsync("OpeningReportFileCallBack");
	});

	pivot.on('printcomplete', function () {
		instance.invokeMethodAsync("PrintCompleteCallBack");
	});

	pivot.on('printstart', function () {
		instance.invokeMethodAsync("PrintStartCallBack");
	});

	pivot.on('querycomplete', function () {
		instance.invokeMethodAsync("QueryCompleteCallBack");
	});

	pivot.on('queryerror', function () {
		instance.invokeMethodAsync("QueryErrorCallBack");
	});

	pivot.on('ready', function () {
		instance.invokeMethodAsync("ReadyCallBack");
	});

	pivot.on('reportchange', function () {
		instance.invokeMethodAsync("ReportChangeCallBack");
	});

	pivot.on('reportcomplete', function () {
		instance.invokeMethodAsync("ReportCompleteCallBack");
	});

	pivot.on('reportfileloaded', function () {
		instance.invokeMethodAsync("ReportFileLoadedCallBack");
	});

	pivot.on('reportfilecancelled', function () {
		instance.invokeMethodAsync("ReportFileCancelledCallBack");
	});

	pivot.on('reportfileerror', function () {
		instance.invokeMethodAsync("ReportFileErrorCallBack");
	});

	pivot.on('runningquery', function () {
		instance.invokeMethodAsync("RunningQueryCallBack");
	});
	//htmlref.dataset.flex = pivot;
	window[id] = pivot;

}

window.customizeCellWrapper = (instance, id) => {
	window[id].customizeCell((builder, cell) => {
		instance.invokeMethod("CustomizeCellFunctionCallBack", builder, cell);
		var result = instance.invokeMethod("GetAddClassResult");
		for (var i = 0; i < result.length; i++) {
			builder.addClass(result[i]);
		}
	});
}



window.invokeApiCall = (htmlref, name, params) => {
	htmlref.dataset.flex[name].apply(null, params);
}