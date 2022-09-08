using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace Flexmonster.Blazor
{
    public class FlexmonsterBase : ComponentBase
    {
        protected ElementReference pivotContainerReference;

        [Inject]
        private IJSRuntime JsRuntime { get; set; }

        [Parameter]
        public bool Toolbar { get; set; }

        [Parameter]
        public string LicenseKey { get; set; }

        [Parameter]
        public string LicenseFilePath { get; set; }

        [Parameter]
        public string Width { get; set; }

        [Parameter]
        public string Height { get; set; }

        [Parameter]
        public string ComponentFolder { get; set; }

        [Parameter]
        public AccessibilityOptions Accessibility { get; set; }

        [Parameter]
        public APIClientOptions ShareReportConnection { get; set; }

        [Parameter]
        public object Report { get; set; }

        [Parameter]
        public Report Global { get; set; }

        [Parameter]
        public string JavaScriptHandler { get; set; }

        protected string id;

        internal FlexmonsterBaseInternal _flexmonsterBaseInternal;

        protected override Task OnInitializedAsync()
        {
            id = "pivot-container-" + Guid.NewGuid();
            _flexmonsterBaseInternal = new FlexmonsterBaseInternal(this);
            return base.OnInitializedAsync();
        }

        #region AfterChartDraw

        public event Func<Task> OnAfterChartDrawEvent;

        [Parameter]
        public Func<Task> OnAfterChartDraw
        {
            set
            {
                if (OnAfterChartDrawEvent == null)
                {
                    OnAfterChartDrawEvent += value;
                }
            }
        }

        internal async Task InvokeAfterChartDrawEvent()
        {
            if (OnAfterChartDrawEvent != null)
            {
                await OnAfterChartDrawEvent.Invoke();
            }
        }

        #endregion AfterChartDraw

        #region AfterGridDraw

        public event Func<GridDrawParams, Task> OnAfterGridDrawEvent;

        [Parameter]
        public Func<GridDrawParams, Task> OnAfterGridDraw
        {
            set
            {
                if (OnAfterGridDrawEvent == null)
                {
                    OnAfterGridDrawEvent += value;
                }
            }
        }

        internal async Task InvokeAfterGridDrawEvent(GridDrawParams gridDrawParams)
        {
            if (OnAfterGridDrawEvent != null)
            {
                await OnAfterGridDrawEvent.Invoke(gridDrawParams);
            }
        }

        #endregion AfterGridDraw

        #region BeforeGridDraw

        public event Func<GridDrawParams, Task> OnBeforeGridDrawEvent;

        [Parameter]
        public Func<GridDrawParams, Task> OnBeforeGridDraw
        {
            set
            {
                if (OnBeforeGridDrawEvent == null)
                {
                    OnBeforeGridDrawEvent += value;
                }
            }
        }

        internal async Task InvokeBeforeGridDrawEvent(GridDrawParams gridDrawParams)
        {
            if (OnBeforeGridDrawEvent != null)
            {
                await OnBeforeGridDrawEvent.Invoke(gridDrawParams);
            }
        }

        #endregion BeforeGridDraw

        //TODO: change object to toolbar class

        #region BeforeToolbarCreated

        public event Func<object, Task> OnBeforeToolbarCreatedEvent;

        [Parameter]
        public Func<object, Task> OnBeforeToolbarCreated
        {
            set
            {
                if (OnBeforeToolbarCreatedEvent == null)
                {
                    OnBeforeToolbarCreatedEvent += value;
                }
            }
        }

        internal async Task InvokeBeforeToolbarCreatedEvent(object toolbar)
        {
            if(OnBeforeToolbarCreatedEvent != null)
            {
                await OnBeforeToolbarCreatedEvent.Invoke(toolbar);
            }
        }

        #endregion BeforeToolbarCreated

        #region CellClick

        public event Func<CellData, Task> OnCellClickEvent;

        [Parameter]
        public Func<CellData, Task> OnCellClick
        {
            set
            {
                if (OnCellClickEvent == null)
                {
                    OnCellClickEvent += value;
                }
            }
        }

        internal async Task InvokeCellClickEvent(CellData cellData)
        {
            if(OnCellClickEvent != null)
            {
                await OnCellClickEvent.Invoke(cellData);
            }
        }

        #endregion CellClick

        #region CellDoubleClick

        public delegate void OnCellDoubleClickHandler(CellData cellData);

        public event Func<CellData, Task> OnCellDoubleClickEvent;

        [Parameter]
        public Func<CellData, Task> OnCellDoubleClick
        {
            set
            {
                if (OnCellDoubleClickEvent == null)
                {
                    OnCellDoubleClickEvent += value;
                }
            }
        }

        internal async Task InvokeCellDoubleClickEvent(CellData cellData)
        {
            if(OnCellDoubleClickEvent != null)
            { 
                await OnCellDoubleClickEvent.Invoke(cellData);
            }
        }

        #endregion CellDoubleClick

        #region ChartClick

        public event Func<ChartData, Task> OnChartClickEvent;

        [Parameter]
        public Func<ChartData, Task> OnChartClick
        {
            set
            {
                if (OnChartClickEvent == null)
                {
                    OnChartClickEvent += value;
                }
            }
        }

        internal async Task InvokeChartClickEvent(ChartData chartData)
        {
            if(OnChartClickEvent != null) 
            {
                await OnChartClickEvent.Invoke(chartData);
            }
        }

        #endregion ChartClick

        //check

        #region DataChanged

        public event Func<DataChangedParams, Task> OnDataChangedEvent;

        [Parameter]
        public Func<DataChangedParams, Task> OnDataChanged
        {
            set
            {
                if (OnDataChangedEvent == null)
                {
                    OnDataChangedEvent += value;
                }
            }
        }

        internal async Task InvokeDataChangedEvent(DataChangedParams dataChangedParams)
        {
            if(OnDataChangedEvent != null)
            {
                await OnDataChangedEvent.Invoke(dataChangedParams);
            }
        }

        #endregion DataChanged

        #region DataError

        public event Func<DataErrorParams, Task> OnDataErrorEvent;

        [Parameter]
        public Func<DataErrorParams, Task> OnDataError
        {
            set
            {
                if (OnDataErrorEvent == null)
                {
                    OnDataErrorEvent += value;
                }
            }
        }

        internal async Task InvokeDataErrorEvent(DataErrorParams dataErrorParams)
        {
            if (OnDataErrorEvent != null)
            {
                await OnDataErrorEvent.Invoke(dataErrorParams);
            }
        }

        #endregion DataError

        #region DataFileCancelled

        public event Func<Task> OnDataFileCancelledEvent;

        [Parameter]
        public Func<Task> OnDataFileCancelled
        {
            set
            {
                if (OnDataFileCancelledEvent == null)
                {
                    OnDataFileCancelledEvent += value;
                }
            }
        }

        internal async Task InvokeDataFileCancelledEvent()
        {
            if (OnDataFileCancelledEvent != null)
            {
                await OnDataFileCancelledEvent.Invoke();
            }
        }

        #endregion DataFileCancelled

        #region DataLoaded

        public event Func<Task> OnDataLoadedEvent;

        [Parameter]
        public Func<Task> OnDataLoaded
        {
            set
            {
                if (OnDataLoadedEvent == null)
                {
                    OnDataLoadedEvent += value;
                }
            }
        }

        internal async Task InvokeDataLoadedEvent()
        {
            if (OnDataLoadedEvent != null)
            {
                await OnDataLoadedEvent.Invoke();
            }
        }

        #endregion DataLoaded

        #region DrillthroughClose

        public event Func<Task> OnDrillthroughCloseEvent;

        [Parameter]
        public Func<Task> OnDrillthroughClose
        {
            set
            {
                if (OnDrillthroughCloseEvent == null)
                {
                    OnDrillthroughCloseEvent += value;
                }
            }
        }

        internal async Task InvokeDrillthroughCloseEvent()
        {
            if (OnDrillthroughCloseEvent != null)
            {
                await OnDrillthroughCloseEvent.Invoke();
            }
        }

        #endregion DrillthroughClose

        //change CellData to CellData | ChartData

        #region DrillthroughOpen

        public event Func<object, Task> OnDrillthroughOpenEvent;

        [Parameter]
        public Func<object, Task> OnDrillthroughOpen
        {
            set
            {
                if (OnDrillthroughOpenEvent == null)
                {
                    OnDrillthroughOpenEvent += value;
                }
            }
        }

        internal async Task InvokeDrillthroughOpenEvent(object data)
        {
            if (OnDrillthroughOpenEvent != null)
            {
                await OnDrillthroughOpenEvent.Invoke(data);
            }
        }

        #endregion DrillthroughOpen

        #region ExportComplete

        public event Func<Task> OnExportCompleteEvent;

        [Parameter]
        public Func<Task> OnExportComplete
        {
            set
            {
                if (OnExportCompleteEvent == null)
                {
                    OnExportCompleteEvent += value;
                }
            }
        }

        internal async Task InvokeExportCompleteEvent()
        {
            if (OnExportCompleteEvent != null)
            {
                await OnExportCompleteEvent.Invoke();
            }
        }

        #endregion ExportComplete

        #region ExportStart

        public event Func<Task> OnExportStartEvent;

        [Parameter]
        public Func<Task> OnExportStart
        {
            set
            {
                if (OnExportStartEvent == null)
                {
                    OnExportStartEvent += value;
                }
            }
        }

        internal async Task InvokeExportStartEvent()
        {
            if (OnExportStartEvent != null)
            {
                await OnExportStartEvent.Invoke();
            }
        }

        #endregion ExportStart

        #region FieldsListClose

        public event Func<Task> OnFieldsListCloseEvent;

        [Parameter]
        public Func<Task> OnFieldsListClose
        {
            set
            {
                if (OnFieldsListCloseEvent == null)
                {
                    OnFieldsListCloseEvent += value;
                }
            }
        }

        internal async Task InvokeFieldsListCloseEvent()
        {
            if (OnFieldsListCloseEvent != null)
            {
                await OnFieldsListCloseEvent.Invoke();
            }
        }

        #endregion FieldsListClose

        #region FieldsListOpen

        public event Func<Task> OnFieldsListOpenEvent;

        [Parameter]
        public Func<Task> OnFieldsListOpen
        {
            set
            {
                if (OnFieldsListOpenEvent == null)
                {
                    OnFieldsListOpenEvent += value;
                }
            }
        }

        internal async Task InvokeFieldsListOpenEvent()
        {
            if (OnFieldsListOpenEvent != null)
            {
                await OnFieldsListOpenEvent.Invoke();
            }
        }

        #endregion FieldsListOpen

        #region FilterClose

        public event Func<Task> OnFilterCloseEvent;

        [Parameter]
        public Func<Task> OnFilterClose
        {
            set
            {
                if (OnFilterCloseEvent == null)
                {
                    OnFilterCloseEvent += value;
                }
            }
        }

        internal async Task InvokeFilterCloseEvent()
        {
            if (OnFilterCloseEvent != null)
            {
                await OnFilterCloseEvent.Invoke();
            }
        }

        #endregion FilterClose

        #region FilterOpen

        public event Func<FilterOpenParams, Task> OnFilterOpenEvent;

        [Parameter]
        public Func<FilterOpenParams, Task> OnFilterOpen
        {
            set
            {
                if (OnFilterOpenEvent == null)
                {
                    OnFilterOpenEvent += value;
                }
            }
        }

        internal async Task InvokeFilterOpenEvent(FilterOpenParams filterOpenParams)
        {
            if (OnFilterOpenEvent != null)
            {
                await OnFilterOpenEvent.Invoke(filterOpenParams);
            }
        }

        #endregion FilterOpen

        #region LoadingData

        public event Func<Task> OnLoadingDataEvent;

        [Parameter]
        public Func<Task> OnLoadingData
        {
            set
            {
                if (OnLoadingDataEvent == null)
                {
                    OnLoadingDataEvent += value;
                }
            }
        }

        internal async Task InvokeLoadingDataEvent()
        {
            if (OnLoadingDataEvent != null)
            {
                await OnLoadingDataEvent.Invoke();
            }
        }

        #endregion LoadingData

        #region LoadingLocalization

        public event Func<Task> OnLoadingLocalizationEvent;

        [Parameter]
        public Func<Task> OnLoadingLocalization
        {
            set
            {
                if (OnLoadingLocalizationEvent == null)
                {
                    OnLoadingLocalizationEvent += value;
                }
            }
        }

        internal async Task InvokeLoadingLocalizationEvent()
        {
            if (OnLoadingLocalizationEvent != null)
            {
                await OnLoadingLocalizationEvent.Invoke();
            }
        }

        #endregion LoadingLocalization

        #region LoadingOLAPStructure

        public event Func<Task> OnLoadingOLAPStructureEvent;

        [Parameter]
        public Func<Task> OnLoadingOLAPStructure
        {
            set
            {
                if (OnLoadingOLAPStructureEvent == null)
                {
                    OnLoadingOLAPStructureEvent += value;
                }
            }
        }

        internal async Task InvokeLoadingOLAPStructureEvent()
        {
            if (OnLoadingOLAPStructureEvent != null)
            {
                await OnLoadingOLAPStructureEvent.Invoke();
            }
        }

        #endregion LoadingOLAPStructure

        #region LoadingReportFile

        public event Func<Task> OnLoadingReportFileEvent;

        [Parameter]
        public Func<Task> OnLoadingReportFile
        {
            set
            {
                if (OnLoadingReportFileEvent == null)
                {
                    OnLoadingReportFileEvent += value;
                }
            }
        }

        internal async Task InvokeLoadingReportFileEvent()
        {
            if (OnLoadingReportFileEvent != null)
            {
                await OnLoadingReportFileEvent.Invoke();
            }
        }

        #endregion LoadingReportFile

        #region LocalizationError

        public event Func<Task> OnLocalizationErrorEvent;

        [Parameter]
        public Func<Task> OnLocalizationError
        {
            set
            {
                if (OnLocalizationErrorEvent == null)
                {
                    OnLocalizationErrorEvent += value;
                }
            }
        }

        internal async Task InvokeLocalizationErrorEvent()
        {
            if (OnLocalizationErrorEvent != null)
            {
                await OnLocalizationErrorEvent.Invoke();
            }
        }

        #endregion LocalizationError

        #region LocalizationLoaded

        public event Func<Task> OnLocalizationLoadedEvent;

        [Parameter]
        public Func<Task> OnLocalizationLoaded
        {
            set
            {
                if (OnLocalizationLoadedEvent == null)
                {
                    OnLocalizationLoadedEvent += value;
                }
            }
        }

        internal async Task InvokeLocalizationLoadedEvent()
        {
            if (OnLocalizationLoadedEvent != null)
            {
                await OnLocalizationLoadedEvent.Invoke();
            }
        }

        #endregion LocalizationLoaded

        #region OLAPStructureError

        public event Func<Task> OnOLAPStructureErrorEvent;

        [Parameter]
        public Func<Task> OnOLAPStructureError
        {
            set
            {
                if (OnOLAPStructureErrorEvent == null)
                {
                    OnOLAPStructureErrorEvent += value;
                }
            }
        }

        internal async Task InvokeOLAPStructureErrorEvent()
        {
            if (OnOLAPStructureErrorEvent != null)
            {
                await OnOLAPStructureErrorEvent.Invoke();
            }
        }

        #endregion OLAPStructureError

        #region OLAPStructureLoaded

        public event Func<Task> OnOLAPStructureLoadedEvent;

        [Parameter]
        public Func<Task> OnOLAPStructureLoaded
        {
            set
            {
                if (OnOLAPStructureLoadedEvent == null)
                {
                    OnOLAPStructureLoadedEvent += value;
                }
            }
        }

        internal async Task InvokeOLAPStructureLoadedEvent()
        {
            if (OnOLAPStructureLoadedEvent != null)
            {
                await OnOLAPStructureLoadedEvent.Invoke();
            }
        }

        #endregion OLAPStructureLoaded

        #region OpeningReportFile

        public event Func<Task> OnOpeningReportFileEvent;

        [Parameter]
        public Func<Task> OnOpeningReportFile
        {
            set
            {
                if (OnOpeningReportFileEvent == null)
                {
                    OnOpeningReportFileEvent += value;
                }
            }
        }

        internal async Task InvokeOpeningReportFileEvent()
        {
            if (OnOpeningReportFileEvent != null)
            {
                await OnOpeningReportFileEvent.Invoke();
            }
        }

        #endregion OpeningReportFile

        #region PrintComplete

        public event Func<Task> OnPrintCompleteEvent;

        [Parameter]
        public Func<Task> OnPrintComplete
        {
            set
            {
                if (OnPrintCompleteEvent == null)
                {
                    OnPrintCompleteEvent += value;
                }
            }
        }

        internal async Task InvokePrintCompleteEvent()
        {
            if (OnPrintCompleteEvent != null)
            {
                await OnPrintCompleteEvent.Invoke();
            }
        }

        #endregion PrintComplete

        #region PrintStart

        public event Func<Task> OnPrintStartEvent;

        [Parameter]
        public Func<Task> OnPrintStart
        {
            set
            {
                if (OnPrintStartEvent == null)
                {
                    OnPrintStartEvent += value;
                }
            }
        }

        internal async Task InvokePrintStartEvent()
        {
            if (OnPrintStartEvent != null)
            {
                await OnPrintStartEvent.Invoke();
            }
        }

        #endregion PrintStart

        #region QueryComplete

        public event Func<Task> OnQueryCompleteEvent;

        [Parameter]
        public Func<Task> OnQueryComplete
        {
            set
            {
                if (OnQueryCompleteEvent == null)
                {
                    OnQueryCompleteEvent += value;
                }
            }
        }

        internal async Task InvokeQueryCompleteEvent()
        {
            if (OnQueryCompleteEvent != null)
            {
                await OnQueryCompleteEvent.Invoke();
            }
        }

        #endregion QueryComplete

        #region QueryError

        public event Func<Task> OnQueryErrorEvent;

        [Parameter]
        public Func<Task> OnQueryError
        {
            set
            {
                if (OnQueryErrorEvent == null)
                {
                    OnQueryErrorEvent += value;
                }
            }
        }

        internal async Task InvokeQueryErrorEvent()
        {
            if (OnQueryErrorEvent != null)
            {
                await OnQueryErrorEvent.Invoke();
            }
        }

        #endregion QueryError

        #region Ready

        public event Func<Task> OnReadyEvent;

        [Parameter]
        public Func<Task> OnReady
        {
            set
            {
                if (OnReadyEvent == null)
                {
                    OnReadyEvent += value;
                }
            }
        }

        internal async Task InvokeReadyEvent()
        {
            if (OnReadyEvent != null)
            {
                await OnReadyEvent.Invoke();
            }
        }

        #endregion Ready

        #region ReportChange

        public event Func<Task> OnReportChangeEvent;

        [Parameter]
        public Func<Task> OnReportChange
        {
            set
            {
                if (OnReportChangeEvent == null)
                {
                    OnReportChangeEvent += value;
                }
            }
        }

        internal async Task InvokeReportChangeEvent()
        {
            if (OnReportChangeEvent != null)
            {
                await OnReportChangeEvent.Invoke();
            }
        }

        #endregion ReportChange

        #region ReportComplete

        public event Func<Task> OnReportCompleteEvent;

        [Parameter]
        public Func<Task> OnReportComplete
        {
            set
            {
                if (OnReportCompleteEvent == null)
                {
                    OnReportCompleteEvent += value;
                }
            }
        }

        internal async Task InvokeReportCompleteEvent()
        {
            if (OnReportCompleteEvent != null)
            {
                await OnReportCompleteEvent.Invoke();
            }
        }

        #endregion ReportComplete

        #region ReportFileCancelled

        public event Func<Task> OnReportFileCancelledEvent;

        [Parameter]
        public Func<Task> OnReportFileCancelled
        {
            set
            {
                if (OnReportFileCancelledEvent == null)
                {
                    OnReportFileCancelledEvent += value;
                }
            }
        }

        internal async Task InvokeReportFileCancelledEvent()
        {
            if (OnReportFileCancelledEvent != null)
            {
                await OnReportFileCancelledEvent.Invoke();
            }
        }

        #endregion ReportFileCancelled

        #region ReportFileError

        public event Func<Task> OnReportFileErrorEvent;

        [Parameter]
        public Func<Task> OnReportFileError
        {
            set
            {
                if (OnReportFileErrorEvent == null)
                {
                    OnReportFileErrorEvent += value;
                }
            }
        }

        internal async Task InvokeReportFileErrorEvent()
        {
            if (OnReportFileErrorEvent != null)
            {
                await OnReportFileErrorEvent.Invoke();
            }
        }

        #endregion ReportFileError

        #region RunningQuery

        public event Func<Task> OnRunningQueryEvent;

        [Parameter]
        public Func<Task> OnRunningQuery
        {
            set
            {
                if (OnRunningQueryEvent == null)
                {
                    OnRunningQueryEvent += value;
                }
            }
        }

        internal async Task InvokeRunningQueryEvent()
        {
            if (OnRunningQueryEvent != null)
            {
                await OnRunningQueryEvent.Invoke();
            }
        }

        #endregion RunningQuery

        #region Update

        public event Func<Task> OnUpdateEvent;

        [Parameter]
        public Func<Task> OnUpdate
        {
            set
            {
                if (OnUpdateEvent == null)
                {
                    OnUpdateEvent += value;
                }
            }
        }

        internal async Task InvokeUpdateEvent()
        {
            if (OnUpdateEvent != null)
            {
                await OnUpdateEvent.Invoke();
            }
        }

        #endregion Update

        public object _pivot;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                var flexmonsterParameters = new
                {
                    container = $"#{id}",
                    accessibility = Accessibility,
                    toolbar = Toolbar,
                    licenseKey = LicenseKey,
                    licenseFilePath = LicenseFilePath,
                    width = Width,
                    height = Height,
                    componentFolder = ComponentFolder,
                    shareReportConnection = ShareReportConnection,
                    report = Report,
                    global = Global
                };
                var flexmonsterParametersWithoutNulls = RemoveNulls(flexmonsterParameters);
                _pivot = await JsRuntime.InvokeAsync<object>("blazorflexmonster.initFlexmonster",
                                                   CreateDotNetObjectRef(_flexmonsterBaseInternal), flexmonsterParametersWithoutNulls, id, JavaScriptHandler).ConfigureAwait(false);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        public async Task AddCalculatedMeasure(Measure measure)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.addCalculatedMeasure", measure);
        }

        public async Task AddCondition(ConditionalFormat conditionalFormat)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.addCondition", conditionalFormat);
        }

        /* public async Task AddJSON<T>(T[] json)
         {
             await JsRuntime.InvokeAsync<object>($"{id}.addCondition", json);
         }*/

        //alert

        public async Task Clear()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.clear");
        }

        public async Task ClearFilter(string hierarchyName)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.clearFilter", hierarchyName);
        }

        //clear XMLA

        public async Task CloseFieldsList()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.closeFieldsList");
        }

        public async Task CollapseAllData()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.collapseAllData");
        }

        public async Task CollapseData(string hierarchyName)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.collapseData", hierarchyName);
        }

        public async Task ConnectTo(DataSource dataSource)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.connectTo", dataSource);
        }

        //3 customize requests

        public async Task Dispose()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.dispose");
        }

        public async Task ExpandAllData(bool withAllChildren = true)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.expandAllData", withAllChildren);
        }

        public async Task ExpandData(string hierarchyName)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.expandData", hierarchyName);
        }

        public delegate Task ExportToHandler(ExportToResult result, ExportToError error);

        public async Task ExportTo(string type, ExportOptions exportOptions = null, ExportToHandler handler = null)
        {
            _exportToHandler = handler;
            await JsRuntime.InvokeAsync<object>($"blazorflexmonster.exportToApiCall", id, CreateDotNetObjectRef(_flexmonsterBaseInternal), type, exportOptions);
        }

        internal ExportToHandler _exportToHandler;

        internal async Task InvokeExportToHandler(ExportToResult result, ExportToError error)
        {
            await _exportToHandler?.Invoke(result, error);
        }

        public async Task<ConditionalFormat[]> GetAllConditions()
        {
            return await JsRuntime.InvokeAsync<ConditionalFormat[]>($"{id}.getAllConditions");
        }

        public async Task<Hierarchy[]> GetAllHierarchies()
        {
            return await JsRuntime.InvokeAsync<Hierarchy[]>($"{id}.getAllHierarchies");
        }

        public async Task<Measure[]> GetAllMeasures()
        {
            return await JsRuntime.InvokeAsync<Measure[]>($"{id}.getAllMeasures");
        }

        public async Task<CellData> GetCell(int rowIdx, int colIdx)
        {
            return await JsRuntime.InvokeAsync<CellData>($"{id}.getCell", rowIdx, colIdx);
        }

        public async Task<Hierarchy[]> GetColumns()
        {
            return await JsRuntime.InvokeAsync<Hierarchy[]>($"{id}.getColumns");
        }

        public async Task<ConditionalFormat> GetCondition(string id)
        {
            return await JsRuntime.InvokeAsync<ConditionalFormat>($"{this.id}.getCondition", id);
        }

        //getData

        public async Task<Filter> GetFilter(string hierarchyName)
        {
            return await JsRuntime.InvokeAsync<Filter>($"{id}.getFilter", hierarchyName);
        }

        public async Task<Format> GetFormat(string measureName)
        {
            return await JsRuntime.InvokeAsync<Format>($"{id}.getFormat", measureName);
        }

        public async Task<Measure[]> GetMeasures()
        {
            return await JsRuntime.InvokeAsync<Measure[]>($"{id}.getMeasures");
        }

        public delegate Task GetMembersHandler(Member[] members);

        public async Task GetMembers(string hierarchyName, string memberName = null, GetMembersHandler handler = null)
        {
            _getMembersHandler = handler;
            await JsRuntime.InvokeAsync<object>($"blazorflexmonster.getMembersApiCall", id, CreateDotNetObjectRef(_flexmonsterBaseInternal), hierarchyName, memberName);
        }

        internal GetMembersHandler _getMembersHandler;

        internal async Task InvokeGetMembersHandler(Member[] members)
        {
            await _getMembersHandler?.Invoke(members);
        }

        public async Task<Options> GetOptions()
        {
            return await JsRuntime.InvokeAsync<Options>($"{id}.getOptions");
        }

        public async Task<Report> GetReport(GetReportOptions getReportOptions = null)
        {
            Report report;
            if (getReportOptions == null)
            {
                report = await JsRuntime.InvokeAsync<Report>($"{id}.getReport");
            }
            else
            {
                var withoutNulls = RemoveNulls(getReportOptions);
                report = await JsRuntime.InvokeAsync<Report>($"{id}.getReport", withoutNulls);
            }
            return report;
        }

        public async Task<Hierarchy[]> GetReportFilters()
        {
            return await JsRuntime.InvokeAsync<Hierarchy[]>($"{id}.getReportFilters");
        }

        public async Task<Hierarchy[]> GetRows()
        {
            return await JsRuntime.InvokeAsync<Hierarchy[]>($"{id}.getRows");
        }

        public async Task<CellData[]> GetSelectedCell()
        {
            var cellData = await JsRuntime.InvokeAsync<JsonElement>($"{id}.getSelectedCell");
            if (cellData.ValueKind == JsonValueKind.Object)
            {
                var rawCellData = cellData.GetRawText();
                var obj = JsonSerializer.Deserialize<CellData>(rawCellData);
                return new CellData[] { obj };
            }
            else if (cellData.ValueKind == JsonValueKind.Array)
            {
                var rawCellData = cellData.GetRawText();
                return JsonSerializer.Deserialize<CellData[]>(rawCellData);
            }
            return null;
        }

        public async Task<string> GetSort(string hierarchyName)
        {
            return await JsRuntime.InvokeAsync<string>($"{id}.getSort", hierarchyName);
        }

        public async Task<FlatSort[]> GetFlatSort()
        {
            return await JsRuntime.InvokeAsync<FlatSort[]>($"{id}.getFlatSort");
        }

        public async Task<TableSizes> GetTableSizes()
        {
            return await JsRuntime.InvokeAsync<TableSizes>($"{id}.getTableSizes");
        }

        public async Task Load(string url, Dictionary<string, string> requestHeaders = null)
        {
            if (requestHeaders != null)
            {
                await JsRuntime.InvokeAsync<object>($"{id}.load", url, requestHeaders);
            }
            else
            {
                await JsRuntime.InvokeAsync<object>($"{id}.load", url);
            }
        }

        public async Task Open()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.open");
        }

        public delegate Task OpenCalculatedValueEditorHandler(OpenCalculatedValueEditorResult result);

        public async Task OpenCalculatedValueEditor(string uniqueName = null, OpenCalculatedValueEditorHandler handler = null)
        {
            _openCalculatedValueEditorHandler = handler;
            await JsRuntime.InvokeAsync<object>($"blazorflexmonster.openCalculatedValueEditorApiCall", id, CreateDotNetObjectRef(_flexmonsterBaseInternal), uniqueName, handler);
        }

        internal OpenCalculatedValueEditorHandler _openCalculatedValueEditorHandler;

        internal async Task InvokeOpenCalculatedValueEditorHandler(OpenCalculatedValueEditorResult result)
        {
            await _openCalculatedValueEditorHandler?.Invoke(result);
        }

        public async Task OpenFieldsList()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.openFieldsList");
        }

        public async Task OpenFilter(string hierarchyName)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.openFilter", hierarchyName);
        }

        public async Task Print(PrintOptions printOptions)
        {
            var withoutNulls = RemoveNulls(printOptions);
            await JsRuntime.InvokeAsync<object>($"{id}.print", withoutNulls);
        }

        public async Task Refresh()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.refresh");
        }

        public async Task RemoveAllCalculatedMeasures()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.removeAllCalculatedMeasures");
        }

        public async Task RemoveAllConditions()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.removeAllConditions");
        }

        public async Task RemoveCalculatedMeasure(string uniqueName)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.removeCalculatedMeasure", uniqueName);
        }

        public async Task RemoveCondition(string id)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.removeCondition", id);
        }

        public async Task RemoveSelection()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.removeSelection");
        }

        public async Task RunQuery(Slice slice)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.runQuery", slice);
        }

        public async Task Save(SaveParams saveParams)
        {
            _saveHandler = saveParams.SaveCallback;
            await JsRuntime.InvokeAsync<object>($"blazorflexmonster.saveApiCall", id, CreateDotNetObjectRef(_flexmonsterBaseInternal), saveParams);
        }

        private SaveParams.SaveHandler _saveHandler;

        internal async Task InvokeSaveHandler(SaveResult result, SaveError error)
        {
            await _saveHandler?.Invoke(result, error);
        }

        public async Task ScrollToRow(int rowIndex)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.scrollToRow", rowIndex);
        }

        public async Task ScrollToColumn(int columnIndex)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.scrollToColumn", columnIndex);
        }

        public async Task SetFilter(string hierarchyName, Filter filter)
        {
            var withoutNulls = RemoveNulls(filter);
            await JsRuntime.InvokeAsync<object>($"{id}.setFilter", hierarchyName, withoutNulls);
        }

        public async Task SetFormat(Format format, string measureName = null)
        {
            var withoutNulls = RemoveNulls(format);
            if (measureName != null)
            {
                await JsRuntime.InvokeAsync<object>($"{id}.setFormat", withoutNulls, measureName);
            }
            else
            {
                await JsRuntime.InvokeAsync<object>($"{id}.setFormat", withoutNulls);
            }
        }

        public async Task SetOptions(Options options)
        {
            var withoutNulls = RemoveNulls(options);
            await JsRuntime.InvokeAsync<object>($"{id}.setOptions", withoutNulls);
        }

        public async Task SetReport(Report report)
        {
            var withoutNulls = RemoveNulls(report);
            await JsRuntime.InvokeAsync<object>($"{id}.setReport", withoutNulls);
        }

        public async Task SetSort(string hierarchyName, string sortName)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.setSort", hierarchyName, sortName);
        }

        public async Task SetFlatSort(FlatSort[] flatSort)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.setFlatSort", flatSort);
        }

        public async Task SetTableSizes(TableSizes tableSizes)
        {
            var withoutNulls = RemoveNulls(tableSizes);
            await JsRuntime.InvokeAsync<object>($"{id}.setTableSizes", withoutNulls);
        }

        public async Task ShareReport(APIClientOptions options)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.shareReport", options);
        }

        //specified default values, so if changed in fm need to be changed here
        public async Task ShowCharts(string type = "column", bool multiple = false)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.showCharts", type, multiple);
        }

        public async Task ShowGrid()
        {
            await JsRuntime.InvokeAsync<object>($"{id}.showGrid");
        }

        //specified default values, so if changed in fm need to be changed here
        public async Task ShowGridAndCharts(string type = "column", string position = "bottom", bool multiple = false)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.showGridAndCharts", type, position, multiple);
        }

        public async Task SortValues(string axisName, string type, string[] tuple, MeasureObject measure)
        {
            await JsRuntime.InvokeAsync<object>($"{id}.sortValues", type, axisName, tuple, measure);
        }

        public async Task UpdateData(DataSource connectionParameters, UpdateDataParams updateDataParams = null)
        {
            var connectionParametersWithoutNulls = RemoveNulls(connectionParameters);
            if (updateDataParams != null)
            {
                var updateDataParamsWithoutNulls = RemoveNulls(updateDataParams);
                await JsRuntime.InvokeAsync<object>($"{id}.updateData", connectionParametersWithoutNulls, updateDataParamsWithoutNulls);
            }
            else
            {
                await JsRuntime.InvokeAsync<object>($"{id}.updateData", connectionParametersWithoutNulls);
            }
        }

        private object RemoveNulls(object obj)
        {
            var withoutNulls = JsonSerializer.Serialize(obj, new JsonSerializerOptions() { IgnoreNullValues = true });
            return JsonSerializer.Deserialize<object>(withoutNulls);
        }

        private static readonly object CreateDotNetObjectRefSyncObj = new object();

        private DotNetObjectReference<T> CreateDotNetObjectRef<T>(T value) where T : class
        {
            lock (CreateDotNetObjectRefSyncObj)
            {
                return DotNetObjectReference.Create(value);
            }
        }
    }
}