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
        public string ComponentFolder { get; set; } = "https://cdn.flexmonster.com/";

        [Parameter]
        public AccessibilityOptions Accessibility { get; set; }
        
        [Parameter]
        public APIClientOptions ShareReportConnection { get; set; }

        [Parameter]
        public object Report { get; set; }

        [Parameter]
        public Report Global { get; set; }

        protected string id;

        internal FlexmonsterBaseInternal _flexmonsterBaseInternal;

        protected override Task OnInitializedAsync()
        {
            id = "pivot-container-" + Guid.NewGuid();
            _flexmonsterBaseInternal = new FlexmonsterBaseInternal(this);
            return base.OnInitializedAsync();
        }

        #region AfterChartDraw

        public delegate void OnAfterChartDrawHandler();

        private event OnAfterChartDrawHandler OnAfterChartDrawEvent;

        [Parameter]
        public OnAfterChartDrawHandler OnAfterChartDraw
        {
            set
            {
                if (OnAfterChartDrawEvent == null)
                {
                    OnAfterChartDrawEvent += value;
                }
            }
        }

        internal void InvokeAfterChartDrawEvent()
        {
            OnAfterChartDrawEvent?.Invoke();
        }

        #endregion AfterChartDraw

        #region AfterGridDraw

        public delegate void OnAfterGridDrawHandler(GridDrawParams gridDrawParams);

        public event OnAfterGridDrawHandler OnAfterGridDrawEvent;

        [Parameter]
        public OnAfterGridDrawHandler OnAfterGridDraw
        {
            set
            {
                if (OnAfterGridDrawEvent == null)
                {
                    OnAfterGridDrawEvent += value;
                }
            }
        }

        internal void InvokeAfterGridDrawEvent(GridDrawParams gridDrawParams)
        {
            OnAfterGridDrawEvent?.Invoke(gridDrawParams);
        }

        #endregion AfterGridDraw

        #region BeforeGridDraw

        public delegate void OnBeforeGridDrawHandler(GridDrawParams gridDrawParams);

        public event OnBeforeGridDrawHandler OnBeforeGridDrawEvent;

        [Parameter]
        public OnBeforeGridDrawHandler OnBeforeGridDraw
        {
            set
            {
                if (OnBeforeGridDrawEvent == null)
                {
                    OnBeforeGridDrawEvent += value;
                }
            }
        }

        internal void InvokeBeforeGridDrawEvent(GridDrawParams gridDrawParams)
        {
            OnBeforeGridDrawEvent?.Invoke(gridDrawParams);
        }

        #endregion BeforeGridDraw

        //TODO: change object to toolbar class

        #region BeforeToolbarCreated

        public delegate void OnBeforeToolbarCreatedHandler(object toolbar);

        public event OnBeforeToolbarCreatedHandler OnBeforeToolbarCreatedEvent;

        [Parameter]
        public OnBeforeToolbarCreatedHandler OnBeforeToolbarCreated
        {
            set
            {
                if (OnBeforeToolbarCreatedEvent == null)
                {
                    OnBeforeToolbarCreatedEvent += value;
                }
            }
        }

        internal void InvokeBeforeToolbarCreatedEvent(object toolbar)
        {
            OnBeforeToolbarCreatedEvent?.Invoke(toolbar);
        }

        #endregion BeforeToolbarCreated

        #region CellClick

        public delegate void OnCellClickHandler(CellData cellData);

        public event OnCellClickHandler OnCellClickEvent;

        [Parameter]
        public OnCellClickHandler OnCellClick
        {
            set
            {
                if (OnCellClickEvent == null)
                {
                    OnCellClickEvent += value;
                }
            }
        }

        internal void InvokeCellClickEvent(CellData cellData)
        {
            OnCellClickEvent?.Invoke(cellData);
        }

        #endregion CellClick

        #region CellDoubleClick

        public delegate void OnCellDoubleClickHandler(CellData cellData);

        public event OnCellDoubleClickHandler OnCellDoubleClickEvent;

        [Parameter]
        public OnCellDoubleClickHandler OnCellDoubleClick
        {
            set
            {
                if (OnCellDoubleClickEvent == null)
                {
                    OnCellDoubleClickEvent += value;
                }
            }
        }

        internal void InvokeCellDoubleClickEvent(CellData cellData)
        {
            OnCellDoubleClickEvent?.Invoke(cellData);
        }

        #endregion CellDoubleClick

        #region ChartClick

        public delegate void OnChartClickHandler(ChartData chartData);

        public event OnChartClickHandler OnChartClickEvent;

        [Parameter]
        public OnChartClickHandler OnChartClick
        {
            set
            {
                if (OnChartClickEvent == null)
                {
                    OnChartClickEvent += value;
                }
            }
        }

        internal void InvokeChartClickEvent(ChartData chartData)
        {
            OnChartClickEvent?.Invoke(chartData);
        }

        #endregion ChartClick

        //check

        #region DataChanged

        public delegate void OnDataChangedHandler(DataChangedParams dataChangedParams);

        public event OnDataChangedHandler OnDataChangedEvent;

        [Parameter]
        public OnDataChangedHandler OnDataChanged
        {
            set
            {
                if (OnDataChangedEvent == null)
                {
                    OnDataChangedEvent += value;
                }
            }
        }

        internal void InvokeDataChangedEvent(DataChangedParams dataChangedParams)
        {
            OnDataChangedEvent?.Invoke(dataChangedParams);
        }

        #endregion DataChanged

        #region DataError

        public delegate void OnDataErrorHandler(DataErrorParams dataErrorParams);

        public event OnDataErrorHandler OnDataErrorEvent;

        [Parameter]
        public OnDataErrorHandler OnDataError
        {
            set
            {
                if (OnDataErrorEvent == null)
                {
                    OnDataErrorEvent += value;
                }
            }
        }

        internal void InvokeDataErrorEvent(DataErrorParams dataErrorParams)
        {
            OnDataErrorEvent?.Invoke(dataErrorParams);
        }

        #endregion DataError

        #region DataFileCancelled

        public delegate void OnDataFileCancelledHandler();

        public event OnDataFileCancelledHandler OnDataFileCancelledEvent;

        [Parameter]
        public OnDataFileCancelledHandler OnDataFileCancelled
        {
            set
            {
                if (OnDataFileCancelledEvent == null)
                {
                    OnDataFileCancelledEvent += value;
                }
            }
        }

        internal void InvokeDataFileCancelledEvent()
        {
            OnDataFileCancelledEvent?.Invoke();
        }

        #endregion DataFileCancelled

        #region DataLoaded

        public delegate void OnDataLoadedHandler();

        public event OnDataLoadedHandler OnDataLoadedEvent;

        [Parameter]
        public OnDataLoadedHandler OnDataLoaded
        {
            set
            {
                if (OnDataLoadedEvent == null)
                {
                    OnDataLoadedEvent += value;
                }
            }
        }

        internal void InvokeDataLoadedEvent()
        {
            OnDataLoadedEvent?.Invoke();
        }

        #endregion DataLoaded

        #region DrillthroughClose

        public delegate void OnDrillthroughCloseHandler();

        public event OnDrillthroughCloseHandler OnDrillthroughCloseEvent;

        [Parameter]
        public OnDrillthroughCloseHandler OnDrillthroughClose
        {
            set
            {
                if (OnDrillthroughCloseEvent == null)
                {
                    OnDrillthroughCloseEvent += value;
                }
            }
        }

        internal void InvokeDrillthroughCloseEvent()
        {
            OnDrillthroughCloseEvent?.Invoke();
        }

        #endregion DrillthroughClose

        //change CellData to CellData | ChartData

        #region DrillthroughOpen

        public delegate void OnDrillthroughOpenHandler(object data);

        public event OnDrillthroughOpenHandler OnDrillthroughOpenEvent;

        [Parameter]
        public OnDrillthroughOpenHandler OnDrillthroughOpen
        {
            set
            {
                if (OnDrillthroughOpenEvent == null)
                {
                    OnDrillthroughOpenEvent += value;
                }
            }
        }

        internal void InvokeDrillthroughOpenEvent(object data)
        {
            OnDrillthroughOpenEvent?.Invoke(data);
        }

        #endregion DrillthroughOpen

        #region ExportComplete

        public delegate void OnExportCompleteHandler();

        public event OnExportCompleteHandler OnExportCompleteEvent;

        [Parameter]
        public OnExportCompleteHandler OnExportComplete
        {
            set
            {
                if (OnExportCompleteEvent == null)
                {
                    OnExportCompleteEvent += value;
                }
            }
        }

        internal void InvokeExportCompleteEvent()
        {
            OnExportCompleteEvent?.Invoke();
        }

        #endregion ExportComplete

        #region ExportStart

        public delegate void OnExportStartHandler();

        public event OnExportStartHandler OnExportStartEvent;

        [Parameter]
        public OnExportStartHandler OnExportStart
        {
            set
            {
                if (OnExportStartEvent == null)
                {
                    OnExportStartEvent += value;
                }
            }
        }

        internal void InvokeExportStartEvent()
        {
            OnExportStartEvent?.Invoke();
        }

        #endregion ExportStart

        #region FieldsListClose

        public delegate void OnFieldsListCloseHandler();

        public event OnFieldsListCloseHandler OnFieldsListCloseEvent;

        [Parameter]
        public OnFieldsListCloseHandler OnFieldsListClose
        {
            set
            {
                if (OnFieldsListCloseEvent == null)
                {
                    OnFieldsListCloseEvent += value;
                }
            }
        }

        internal void InvokeFieldsListCloseEvent()
        {
            OnFieldsListCloseEvent?.Invoke();
        }

        #endregion FieldsListClose

        #region FieldsListOpen

        public delegate void OnFieldsListOpenHandler();

        public event OnFieldsListOpenHandler OnFieldsListOpenEvent;

        [Parameter]
        public OnFieldsListOpenHandler OnFieldsListOpen
        {
            set
            {
                if (OnFieldsListOpenEvent == null)
                {
                    OnFieldsListOpenEvent += value;
                }
            }
        }

        internal void InvokeFieldsListOpenEvent()
        {
            OnFieldsListOpenEvent?.Invoke();
        }

        #endregion FieldsListOpen

        #region FilterClose

        public delegate void OnFilterCloseHandler();

        public event OnFilterCloseHandler OnFilterCloseEvent;

        [Parameter]
        public OnFilterCloseHandler OnFilterClose
        {
            set
            {
                if (OnFilterCloseEvent == null)
                {
                    OnFilterCloseEvent += value;
                }
            }
        }

        internal void InvokeFilterCloseEvent()
        {
            OnFilterCloseEvent?.Invoke();
        }

        #endregion FilterClose

        #region FilterOpen

        public delegate void OnFilterOpenHandler(FilterOpenParams filterOpenParams);

        public event OnFilterOpenHandler OnFilterOpenEvent;

        [Parameter]
        public OnFilterOpenHandler OnFilterOpen
        {
            set
            {
                if (OnFilterOpenEvent == null)
                {
                    OnFilterOpenEvent += value;
                }
            }
        }

        internal void InvokeFilterOpenEvent(FilterOpenParams filterOpenParams)
        {
            OnFilterOpenEvent?.Invoke(filterOpenParams);
        }

        #endregion FilterOpen

        #region LoadingData

        public delegate void OnLoadingDataHandler();

        public event OnLoadingDataHandler OnLoadingDataEvent;

        [Parameter]
        public OnLoadingDataHandler OnLoadingData
        {
            set
            {
                if (OnLoadingDataEvent == null)
                {
                    OnLoadingDataEvent += value;
                }
            }
        }

        internal void InvokeLoadingDataEvent()
        {
            OnLoadingDataEvent?.Invoke();
        }

        #endregion LoadingData

        #region LoadingLocalization

        public delegate void OnLoadingLocalizationHandler();

        public event OnLoadingLocalizationHandler OnLoadingLocalizationEvent;

        [Parameter]
        public OnLoadingLocalizationHandler OnLoadingLocalization
        {
            set
            {
                if (OnLoadingLocalizationEvent == null)
                {
                    OnLoadingLocalizationEvent += value;
                }
            }
        }

        internal void InvokeLoadingLocalizationEvent()
        {
            OnLoadingLocalizationEvent?.Invoke();
        }

        #endregion LoadingLocalization

        #region LoadingOLAPStructure

        public delegate void OnLoadingOLAPStructureHandler();

        public event OnLoadingOLAPStructureHandler OnLoadingOLAPStructureEvent;

        [Parameter]
        public OnLoadingOLAPStructureHandler OnLoadingOLAPStructure
        {
            set
            {
                if (OnLoadingOLAPStructureEvent == null)
                {
                    OnLoadingOLAPStructureEvent += value;
                }
            }
        }

        internal void InvokeLoadingOLAPStructureEvent()
        {
            OnLoadingOLAPStructureEvent?.Invoke();
        }

        #endregion LoadingOLAPStructure

        #region LoadingReportFile

        public delegate void OnLoadingReportFileHandler();

        public event OnLoadingReportFileHandler OnLoadingReportFileEvent;

        [Parameter]
        public OnLoadingReportFileHandler OnLoadingReportFile
        {
            set
            {
                if (OnLoadingReportFileEvent == null)
                {
                    OnLoadingReportFileEvent += value;
                }
            }
        }

        internal void InvokeLoadingReportFileEvent()
        {
            OnLoadingReportFileEvent?.Invoke();
        }

        #endregion LoadingReportFile

        #region LocalizationError

        public delegate void OnLocalizationErrorHandler();

        public event OnLocalizationErrorHandler OnLocalizationErrorEvent;

        [Parameter]
        public OnLocalizationErrorHandler OnLocalizationError
        {
            set
            {
                if (OnLocalizationErrorEvent == null)
                {
                    OnLocalizationErrorEvent += value;
                }
            }
        }

        internal void InvokeLocalizationErrorEvent()
        {
            OnLocalizationErrorEvent?.Invoke();
        }

        #endregion LocalizationError

        #region LocalizationLoaded

        public delegate void OnLocalizationLoadedHandler();

        public event OnLocalizationLoadedHandler OnLocalizationLoadedEvent;

        [Parameter]
        public OnLocalizationLoadedHandler OnLocalizationLoaded
        {
            set
            {
                if (OnLocalizationLoadedEvent == null)
                {
                    OnLocalizationLoadedEvent += value;
                }
            }
        }

        internal void InvokeLocalizationLoadedEvent()
        {
            OnLocalizationLoadedEvent?.Invoke();
        }

        #endregion LocalizationLoaded

        #region OLAPStructureError

        public delegate void OnOLAPStructureErrorHandler();

        public event OnOLAPStructureErrorHandler OnOLAPStructureErrorEvent;

        [Parameter]
        public OnOLAPStructureErrorHandler OnOLAPStructureError
        {
            set
            {
                if (OnOLAPStructureErrorEvent == null)
                {
                    OnOLAPStructureErrorEvent += value;
                }
            }
        }

        internal void InvokeOLAPStructureErrorEvent()
        {
            OnOLAPStructureErrorEvent?.Invoke();
        }

        #endregion OLAPStructureError

        #region OLAPStructureLoaded

        public delegate void OnOLAPStructureLoadedHandler();

        public event OnOLAPStructureLoadedHandler OnOLAPStructureLoadedEvent;

        [Parameter]
        public OnOLAPStructureLoadedHandler OnOLAPStructureLoaded
        {
            set
            {
                if (OnOLAPStructureLoadedEvent == null)
                {
                    OnOLAPStructureLoadedEvent += value;
                }
            }
        }

        internal void InvokeOLAPStructureLoadedEvent()
        {
            OnOLAPStructureLoadedEvent?.Invoke();
        }

        #endregion OLAPStructureLoaded

        #region OpeningReportFile

        public delegate void OnOpeningReportFileHandler();

        public event OnOpeningReportFileHandler OnOpeningReportFileEvent;

        [Parameter]
        public OnOpeningReportFileHandler OnOpeningReportFile
        {
            set
            {
                if (OnOpeningReportFileEvent == null)
                {
                    OnOpeningReportFileEvent += value;
                }
            }
        }

        internal void InvokeOpeningReportFileEvent()
        {
            OnOpeningReportFileEvent?.Invoke();
        }

        #endregion OpeningReportFile

        #region PrintComplete

        public delegate void OnPrintCompleteHandler();

        public event OnPrintCompleteHandler OnPrintCompleteEvent;

        [Parameter]
        public OnPrintCompleteHandler OnPrintComplete
        {
            set
            {
                if (OnPrintCompleteEvent == null)
                {
                    OnPrintCompleteEvent += value;
                }
            }
        }

        internal void InvokePrintCompleteEvent()
        {
            OnPrintCompleteEvent?.Invoke();
        }

        #endregion PrintComplete

        #region PrintStart

        public delegate void OnPrintStartHandler();

        public event OnPrintStartHandler OnPrintStartEvent;

        [Parameter]
        public OnPrintStartHandler OnPrintStart
        {
            set
            {
                if (OnPrintStartEvent == null)
                {
                    OnPrintStartEvent += value;
                }
            }
        }

        internal void InvokePrintStartEvent()
        {
            OnPrintStartEvent?.Invoke();
        }

        #endregion PrintStart

        #region QueryComplete

        public delegate void OnQueryCompleteHandler();

        public event OnQueryCompleteHandler OnQueryCompleteEvent;

        [Parameter]
        public OnQueryCompleteHandler OnQueryComplete
        {
            set
            {
                if (OnQueryCompleteEvent == null)
                {
                    OnQueryCompleteEvent += value;
                }
            }
        }

        internal void InvokeQueryCompleteEvent()
        {
            OnQueryCompleteEvent?.Invoke();
        }

        #endregion QueryComplete

        #region QueryError

        public delegate void OnQueryErrorHandler();

        public event OnQueryErrorHandler OnQueryErrorEvent;

        [Parameter]
        public OnQueryErrorHandler OnQueryError
        {
            set
            {
                if (OnQueryErrorEvent == null)
                {
                    OnQueryErrorEvent += value;
                }
            }
        }

        internal void InvokeQueryErrorEvent()
        {
            OnQueryErrorEvent?.Invoke();
        }

        #endregion QueryError

        #region Ready

        public delegate void OnReadyHandler();

        public event OnReadyHandler OnReadyEvent;

        [Parameter]
        public OnReadyHandler OnReady
        {
            set
            {
                if (OnReadyEvent == null)
                {
                    OnReadyEvent += value;
                }
            }
        }

        internal void InvokeReadyEvent()
        {
            OnReadyEvent?.Invoke();
        }

        #endregion Ready

        #region ReportChange

        public delegate void OnReportChangeHandler();

        public event OnReportChangeHandler OnReportChangeEvent;

        [Parameter]
        public OnReportChangeHandler OnReportChange
        {
            set
            {
                if (OnReportChangeEvent == null)
                {
                    OnReportChangeEvent += value;
                }
            }
        }

        internal void InvokeReportChangeEvent()
        {
            OnReportChangeEvent?.Invoke();
        }

        #endregion ReportChange

        #region ReportComplete

        public delegate void OnReportCompleteHandler();

        public event OnReportCompleteHandler OnReportCompleteEvent;

        [Parameter]
        public OnReportCompleteHandler OnReportComplete
        {
            set
            {
                if (OnReportCompleteEvent == null)
                {
                    OnReportCompleteEvent += value;
                }
            }
        }

        internal void InvokeReportCompleteEvent()
        {
            OnReportCompleteEvent?.Invoke();
        }

        #endregion ReportComplete

        #region ReportFileLoaded

        public delegate void OnReportFileLoadedHandler();

        public event OnReportFileLoadedHandler OnReportFileLoadedEvent;

        [Parameter]
        public OnReportFileLoadedHandler OnReportFileLoaded
        {
            set
            {
                if (OnReportFileLoadedEvent == null)
                {
                    OnReportFileLoadedEvent += value;
                }
            }
        }

        internal void InvokeReportFileLoadedEvent()
        {
            OnReportFileLoadedEvent?.Invoke();
        }

        #endregion ReportFileLoaded

        #region ReportFileCancelled

        public delegate void OnReportFileCancelledHandler();

        public event OnReportFileCancelledHandler OnReportFileCancelledEvent;

        [Parameter]
        public OnReportFileCancelledHandler OnReportFileCancelled
        {
            set
            {
                if (OnReportFileCancelledEvent == null)
                {
                    OnReportFileCancelledEvent += value;
                }
            }
        }

        internal void InvokeReportFileCancelledEvent()
        {
            OnReportFileCancelledEvent?.Invoke();
        }

        #endregion ReportFileCancelled

        #region ReportFileError

        public delegate void OnReportFileErrorHandler();

        public event OnReportFileErrorHandler OnReportFileErrorEvent;

        [Parameter]
        public OnReportFileErrorHandler OnReportFileError
        {
            set
            {
                if (OnReportFileErrorEvent == null)
                {
                    OnReportFileErrorEvent += value;
                }
            }
        }

        internal void InvokeReportFileErrorEvent()
        {
            OnReportFileErrorEvent?.Invoke();
        }

        #endregion ReportFileError

        #region RunningQuery

        public delegate void OnRunningQueryHandler();

        public event OnRunningQueryHandler OnRunningQueryEvent;

        [Parameter]
        public OnRunningQueryHandler OnRunningQuery
        {
            set
            {
                if (OnRunningQueryEvent == null)
                {
                    OnRunningQueryEvent += value;
                }
            }
        }

        internal void InvokeRunningQueryEvent()
        {
            OnRunningQueryEvent?.Invoke();
        }

        #endregion RunningQuery

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
                                                   CreateDotNetObjectRef(_flexmonsterBaseInternal), flexmonsterParametersWithoutNulls, id).ConfigureAwait(false);
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

        public delegate void ExportToHandler(ExportToResult result, ExportToError error);

        public async Task ExportTo(string type, ExportOptions exportOptions = null, ExportToHandler handler = null)
        {
            _exportToHandler = handler;
            await JsRuntime.InvokeAsync<object>($"blazorflexmonster.exportToApiCall", id, CreateDotNetObjectRef(_flexmonsterBaseInternal), type, exportOptions);
        }

        internal ExportToHandler _exportToHandler;

        internal void InvokeExportToHandler(ExportToResult result, ExportToError error)
        {
            _exportToHandler?.Invoke(result, error);
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
            return await JsRuntime.InvokeAsync<Filter>($"{id}.setFilter", hierarchyName);
        }

        public async Task<Format> GetFormat(string measureName)
        {
            return await JsRuntime.InvokeAsync<Format>($"{id}.getFormat", measureName);
        }

        public async Task<Measure[]> GetMeasures()
        {
            return await JsRuntime.InvokeAsync<Measure[]>($"{id}.getMeasures");
        }

        public delegate void GetMembersHandler(Member[] members);

        public async Task GetMembers(string hierarchyName, string memberName = null, GetMembersHandler handler = null)
        {
            _getMembersHandler = handler;
            await JsRuntime.InvokeAsync<object>($"blazorflexmonster.getMembersApiCall", id, CreateDotNetObjectRef(_flexmonsterBaseInternal), hierarchyName, memberName);
        }

        internal GetMembersHandler _getMembersHandler;

        internal void InvokeGetMembersHandler(Member[] members)
        {
            _getMembersHandler?.Invoke(members);
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
                report = await JsRuntime.InvokeAsync<Report>($"{id}.getReport", getReportOptions);
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

        public delegate void OpenCalculatedValueEditorHandler(OpenCalculatedValueEditorResult result);

        public async Task OpenCalculatedValueEditor(string uniqueName = null, OpenCalculatedValueEditorHandler handler = null)
        {
            _openCalculatedValueEditorHandler = handler;
            await JsRuntime.InvokeAsync<object>($"blazorflexmonster.openCalculatedValueEditorApiCall", id, CreateDotNetObjectRef(_flexmonsterBaseInternal), uniqueName, handler);
        }

        internal OpenCalculatedValueEditorHandler _openCalculatedValueEditorHandler;

        internal void InvokeOpenCalculatedValueEditorHandler(OpenCalculatedValueEditorResult result)
        {
            _openCalculatedValueEditorHandler?.Invoke(result);
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
            await JsRuntime.InvokeAsync<object>($"{id}.print", printOptions);
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

        internal void InvokeSaveHandler(SaveResult result, SaveError error)
        {
            _saveHandler?.Invoke(result, error);
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

        public async Task UpdateData(DataSource connectionParameters, UpdateDataParams updateDataParams)
        {
            var connectionParametersWithoutNulls = RemoveNulls(connectionParameters);
            var updateDataParamsWithoutNulls = RemoveNulls(updateDataParams);
            await JsRuntime.InvokeAsync<object>($"{id}.updateData", connectionParametersWithoutNulls, updateDataParamsWithoutNulls);
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