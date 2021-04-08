using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
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
        public string ComponentFolder { get; set; } = "flexmonster/";

        [Parameter]
        public Report Report { get; set; }

        [Parameter]
        public Report Global { get; set; }

        protected string id;

        protected override Task OnInitializedAsync()
        {
            id = "pivot-container-" + Guid.NewGuid();
            return base.OnInitializedAsync();
        }

        #region AfterChartDraw

        public delegate void AfterChartDrawHandler();

        private event AfterChartDrawHandler AfterChartDrawEvent;

        [Parameter]
        public AfterChartDrawHandler AfterChartDraw
        {
            get
            {
                return AfterChartDrawEvent;
            }
            set
            {
                if (AfterChartDrawEvent == null)
                {
                    AfterChartDrawEvent += value;
                }
            }
        }

        [JSInvokable]
        public void AfterChartDrawCallBack()
        {
            AfterChartDrawEvent?.Invoke();
        }

        #endregion AfterChartDraw

        #region AfterGridDraw

        public delegate void OnAfterGridDrawHandler(GridDrawParams gridDrawParams);

        private event OnAfterGridDrawHandler OnAfterGridDrawEvent;

        [Parameter]
        public OnAfterGridDrawHandler OnAfterGridDraw
        {
            get
            {
                return OnAfterGridDrawEvent;
            }
            set
            {
                if (OnAfterGridDrawEvent == null)
                {
                    OnAfterGridDrawEvent += value;
                }
            }
        }

        [JSInvokable]
        public void AfterGridDrawCallBack(GridDrawParams gridDrawParams)
        {
            OnAfterGridDrawEvent?.Invoke(gridDrawParams);
        }

        #endregion AfterGridDraw

        #region BeforeGridDraw

        public delegate void OnBeforeGridDrawHandler(GridDrawParams gridDrawParams);

        private event OnBeforeGridDrawHandler OnBeforeGridDrawEvent;

        [Parameter]
        public OnBeforeGridDrawHandler OnBeforeGridDraw
        {
            get
            {
                return OnBeforeGridDrawEvent;
            }
            set
            {
                if (OnBeforeGridDrawEvent == null)
                {
                    OnBeforeGridDrawEvent += value;
                }
            }
        }

        [JSInvokable]
        public void BeforeGridDrawCallBack(GridDrawParams gridDrawParams)
        {
            OnBeforeGridDrawEvent?.Invoke(gridDrawParams);
        }

        #endregion BeforeGridDraw

        //TODO: change object to toolbar class
        #region BeforeToolbarCreated

        public delegate void OnBeforeToolbarCreatedHandler(object toolbar);

        private event OnBeforeToolbarCreatedHandler OnBeforeToolbarCreatedEvent;

        [Parameter]
        public OnBeforeToolbarCreatedHandler OnBeforeToolbarCreated
        {
            get
            {
                return OnBeforeToolbarCreatedEvent;
            }
            set
            {
                if (OnBeforeToolbarCreatedEvent == null)
                {
                    OnBeforeToolbarCreatedEvent += value;
                }
            }
        }

        [JSInvokable]
        public void BeforeToolbarCreatedCallBack(object toolbar)
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
            get
            {
                return OnCellClickEvent;
            }
            set
            {
                if (OnCellClickEvent == null)
                {
                    OnCellClickEvent += value;
                }
            }
        }

        [JSInvokable]
        public void CellClickCallBack(CellData cellData)
        {
            OnCellClickEvent?.Invoke(cellData);
        }

        #endregion CellClick

        #region CellDoubleClick

        public delegate void OnCellDoubleClickHandler(CellData cellData);

        private event OnCellDoubleClickHandler OnCellDoubleClickEvent;

        [Parameter]
        public OnCellDoubleClickHandler OnCellDoubleClick
        {
            get
            {
                return OnCellDoubleClickEvent;
            }
            set
            {
                if (OnCellDoubleClickEvent == null)
                {
                    OnCellDoubleClickEvent += value;
                }
            }
        }

        [JSInvokable]
        public void CellDoubleClickCallBack(CellData cellData)
        {
            OnCellDoubleClickEvent?.Invoke(cellData);
        }

        #endregion CellDoubleClick

        #region ChartClick

        public delegate void OnChartClickHandler(ChartData chartData);

        private event OnChartClickHandler OnChartClickEvent;

        [Parameter]
        public OnChartClickHandler OnChartClick
        {
            get
            {
                return OnChartClickEvent;
            }
            set
            {
                if (OnChartClickEvent == null)
                {
                    OnChartClickEvent += value;
                }
            }
        }

        [JSInvokable]
        public void ChartClickCallBack(ChartData chartData)
        {
            OnChartClickEvent?.Invoke(chartData);
        }

        #endregion ChartClick

        //check
        #region DataChanged

        public delegate void OnDataChangedHandler(DataChangedParams dataChangedParams);

        private event OnDataChangedHandler OnDataChangedEvent;

        [Parameter]
        public OnDataChangedHandler OnDataChanged
        {
            get
            {
                return OnDataChangedEvent;
            }
            set
            {
                if (OnDataChangedEvent == null)
                {
                    OnDataChangedEvent += value;
                }
            }
        }

        [JSInvokable]
        public void DataChangedCallBack(DataChangedParams dataChangedParams)
        {
            OnDataChangedEvent?.Invoke(dataChangedParams);
        }

        #endregion DataChanged

        #region DataError

        public delegate void OnDataErrorHandler(DataErrorParams dataErrorParams);

        private event OnDataErrorHandler OnDataErrorEvent;

        [Parameter]
        public OnDataErrorHandler OnDataError
        {
            get
            {
                return OnDataErrorEvent;
            }
            set
            {
                if (OnDataErrorEvent == null)
                {
                    OnDataErrorEvent += value;
                }
            }
        }

        [JSInvokable]
        public void DataErrorCallBack(DataErrorParams dataErrorParams)
        {
            OnDataErrorEvent?.Invoke(dataErrorParams);
        }

        #endregion DataError

        #region DataFileCancelled

        public delegate void OnDataFileCancelledHandler();

        private event OnDataFileCancelledHandler OnDataFileCancelledEvent;

        [Parameter]
        public OnDataFileCancelledHandler OnDataFileCancelled
        {
            get
            {
                return OnDataFileCancelledEvent;
            }
            set
            {
                if (OnDataFileCancelledEvent == null)
                {
                    OnDataFileCancelledEvent += value;
                }
            }
        }

        [JSInvokable]
        public void DataFileCancelledCallBack()
        {
            OnDataFileCancelledEvent?.Invoke();
        }

        #endregion DataFileCancelled

        #region DataLoaded

        public delegate void OnDataLoadedHandler();

        private event OnDataLoadedHandler OnDataLoadedEvent;

        [Parameter]
        public OnDataLoadedHandler OnDataLoaded
        {
            get
            {
                return OnDataLoadedEvent;
            }
            set
            {
                if (OnDataLoadedEvent == null)
                {
                    OnDataLoadedEvent += value;
                }
            }
        }

        [JSInvokable]
        public void DataLoadedCallBack()
        {
            OnDataLoadedEvent?.Invoke();
        }

        #endregion DataLoaded

        #region DrillthroughClose

        public delegate void OnDrillthroughCloseHandler();

        private event OnDrillthroughCloseHandler OnDrillthroughCloseEvent;

        [Parameter]
        public OnDrillthroughCloseHandler OnDrillthroughClose
        {
            get
            {
                return OnDrillthroughCloseEvent;
            }
            set
            {
                if (OnDrillthroughCloseEvent == null)
                {
                    OnDrillthroughCloseEvent += value;
                }
            }
        }

        [JSInvokable]
        public void DrillthroughCloseCallBack()
        {
            OnDrillthroughCloseEvent?.Invoke();
        }

        #endregion DrillthroughClose
        //change CellData to CellData | ChartData
        #region DrillthroughOpen

        public delegate void OnDrillthroughOpenHandler(CellData cellData);

        public event OnDrillthroughOpenHandler OnDrillthroughOpenEvent;

        [Parameter]
        public OnDrillthroughOpenHandler OnDrillthroughOpen
        {
            get
            {
                return OnDrillthroughOpenEvent;
            }
            set
            {
                if (OnDrillthroughOpenEvent == null)
                {
                    OnDrillthroughOpenEvent += value;
                }
            }
        }

        [JSInvokable]
        public void DrillthroughOpenCallBack(CellData cellData)
        {
            OnDrillthroughOpenEvent?.Invoke(cellData);
        }

        #endregion DrillthroughOpen

        #region ExportComplete

        public delegate void OnExportCompleteHandler();

        private event OnExportCompleteHandler OnExportCompleteEvent;

        [Parameter]
        public OnExportCompleteHandler OnExportComplete
        {
            get
            {
                return OnExportCompleteEvent;
            }
            set
            {
                if (OnExportCompleteEvent == null)
                {
                    OnExportCompleteEvent += value;
                }
            }
        }

        [JSInvokable]
        public void ExportCompleteCallBack()
        {
            OnExportCompleteEvent?.Invoke();
        }

        #endregion ExportComplete

        #region ExportStart

        public delegate void OnExportStartHandler();

        private event OnExportStartHandler OnExportStartEvent;

        [Parameter]
        public OnExportStartHandler OnExportStart
        {
            get
            {
                return OnExportStartEvent;
            }
            set
            {
                if (OnExportStartEvent == null)
                {
                    OnExportStartEvent += value;
                }
            }
        }

        [JSInvokable]
        public void ExportStartCallBack()
        {
            OnExportStartEvent?.Invoke();
        }

        #endregion ExportStart

        #region FieldsListClose

        public delegate void OnFieldsListCloseHandler();

        private event OnFieldsListCloseHandler OnFieldsListCloseEvent;

        [Parameter]
        public OnFieldsListCloseHandler OnFieldsListClose
        {
            get
            {
                return OnFieldsListCloseEvent;
            }
            set
            {
                if (OnFieldsListCloseEvent == null)
                {
                    OnFieldsListCloseEvent += value;
                }
            }
        }

        [JSInvokable]
        public void FieldsListCloseCallBack()
        {
            OnFieldsListCloseEvent?.Invoke();
        }

        #endregion FieldsListClose

        #region FieldsListOpen

        public delegate void OnFieldsListOpenHandler();

        private event OnFieldsListOpenHandler OnFieldsListOpenEvent;

        [Parameter]
        public OnFieldsListOpenHandler OnFieldsListOpen
        {
            get
            {
                return OnFieldsListOpenEvent;
            }
            set
            {
                if (OnFieldsListOpenEvent == null)
                {
                    OnFieldsListOpenEvent += value;
                }
            }
        }

        [JSInvokable]
        public void FieldsListOpenCallBack()
        {
            OnFieldsListOpenEvent?.Invoke();
        }

        #endregion FieldsListOpen

        #region FilterClose

        public delegate void OnFilterCloseHandler();

        private event OnFilterCloseHandler OnFilterCloseEvent;

        [Parameter]
        public OnFilterCloseHandler OnFilterClose
        {
            get
            {
                return OnFilterCloseEvent;
            }
            set
            {
                if (OnFilterCloseEvent == null)
                {
                    OnFilterCloseEvent += value;
                }
            }
        }

        [JSInvokable]
        public void FilterCloseCallBack()
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
            get
            {
                return OnFilterOpenEvent;
            }
            set
            {
                if (OnFilterOpenEvent == null)
                {
                    OnFilterOpenEvent += value;
                }
            }
        }

        [JSInvokable]
        public void FilterOpenCallBack(FilterOpenParams filterOpenParams)
        {
            OnFilterOpenEvent?.Invoke(filterOpenParams);
        }

        #endregion FilterOpen

        #region LoadingData

        public delegate void OnLoadingDataHandler();

        private event OnLoadingDataHandler OnLoadingDataEvent;

        [Parameter]
        public OnLoadingDataHandler OnLoadingData
        {
            get
            {
                return OnLoadingDataEvent;
            }
            set
            {
                if (OnLoadingDataEvent == null)
                {
                    OnLoadingDataEvent += value;
                }
            }
        }

        [JSInvokable]
        public void LoadingDataCallBack()
        {
            OnLoadingDataEvent?.Invoke();
        }

        #endregion LoadingData

        #region LoadingLocalization

        public delegate void OnLoadingLocalizationHandler();

        private event OnLoadingLocalizationHandler OnLoadingLocalizationEvent;

        [Parameter]
        public OnLoadingLocalizationHandler OnLoadingLocalization
        {
            get
            {
                return OnLoadingLocalizationEvent;
            }
            set
            {
                if (OnLoadingLocalizationEvent == null)
                {
                    OnLoadingLocalizationEvent += value;
                }
            }
        }

        [JSInvokable]
        public void LoadingLocalizationCallBack()
        {
            OnLoadingLocalizationEvent?.Invoke();
        }

        #endregion LoadingLocalization

        #region LoadingOLAPStructure

        public delegate void OnLoadingOLAPStructureHandler();

        private event OnLoadingOLAPStructureHandler OnLoadingOLAPStructureEvent;

        [Parameter]
        public OnLoadingOLAPStructureHandler OnLoadingOLAPStructure
        {
            get
            {
                return OnLoadingOLAPStructureEvent;
            }
            set
            {
                if (OnLoadingOLAPStructureEvent == null)
                {
                    OnLoadingOLAPStructureEvent += value;
                }
            }
        }

        [JSInvokable]
        public void LoadingOLAPStructureCallBack()
        {
            OnLoadingOLAPStructureEvent?.Invoke();
        }

        #endregion LoadingOLAPStructure

        #region LoadingReportFile

        public delegate void OnLoadingReportFileHandler();

        private event OnLoadingReportFileHandler OnLoadingReportFileEvent;

        [Parameter]
        public OnLoadingReportFileHandler OnLoadingReportFile
        {
            get
            {
                return OnLoadingReportFileEvent;
            }
            set
            {
                if (OnLoadingReportFileEvent == null)
                {
                    OnLoadingReportFileEvent += value;
                }
            }
        }

        [JSInvokable]
        public void LoadingReportFileCallBack()
        {
            OnLoadingReportFileEvent?.Invoke();
        }

        #endregion LoadingReportFile

        #region LocalizationError

        public delegate void OnLocalizationErrorHandler();

        private event OnLocalizationErrorHandler OnLocalizationErrorEvent;

        [Parameter]
        public OnLocalizationErrorHandler OnLocalizationError
        {
            get
            {
                return OnLocalizationErrorEvent;
            }
            set
            {
                if (OnLocalizationErrorEvent == null)
                {
                    OnLocalizationErrorEvent += value;
                }
            }
        }

        [JSInvokable]
        public void LocalizationErrorCallBack()
        {
            OnLocalizationErrorEvent?.Invoke();
        }

        #endregion LocalizationError

        #region LocalizationLoaded

        public delegate void OnLocalizationLoadedHandler();

        private event OnLocalizationLoadedHandler OnLocalizationLoadedEvent;

        [Parameter]
        public OnLocalizationLoadedHandler OnLocalizationLoaded
        {
            get
            {
                return OnLocalizationLoadedEvent;
            }
            set
            {
                if (OnLocalizationLoadedEvent == null)
                {
                    OnLocalizationLoadedEvent += value;
                }
            }
        }

        [JSInvokable]
        public void LocalizationLoadedCallBack()
        {
            OnLocalizationLoadedEvent?.Invoke();
        }

        #endregion LocalizationLoaded

        #region OLAPStructureError

        public delegate void OnOLAPStructureErrorHandler();

        private event OnOLAPStructureErrorHandler OnOLAPStructureErrorEvent;

        [Parameter]
        public OnOLAPStructureErrorHandler OnOLAPStructureError
        {
            get
            {
                return OnOLAPStructureErrorEvent;
            }
            set
            {
                if (OnOLAPStructureErrorEvent == null)
                {
                    OnOLAPStructureErrorEvent += value;
                }
            }
        }

        [JSInvokable]
        public void OLAPStructureErrorCallBack()
        {
            OnOLAPStructureErrorEvent?.Invoke();
        }

        #endregion OLAPStructureError

        #region OLAPStructureLoaded

        public delegate void OnOLAPStructureLoadedHandler();

        private event OnOLAPStructureLoadedHandler OnOLAPStructureLoadedEvent;

        [Parameter]
        public OnOLAPStructureLoadedHandler OnOLAPStructureLoaded
        {
            get
            {
                return OnOLAPStructureLoadedEvent;
            }
            set
            {
                if (OnOLAPStructureLoadedEvent == null)
                {
                    OnOLAPStructureLoadedEvent += value;
                }
            }
        }

        [JSInvokable]
        public void OLAPStructureLoadedCallBack()
        {
            OnOLAPStructureLoadedEvent?.Invoke();
        }

        #endregion OLAPStructureLoaded

        #region OpeningReportFile

        public delegate void OnOpeningReportFileHandler();

        private event OnOpeningReportFileHandler OnOpeningReportFileEvent;

        [Parameter]
        public OnOpeningReportFileHandler OnOpeningReportFile
        {
            get
            {
                return OnOpeningReportFileEvent;
            }
            set
            {
                if (OnOpeningReportFileEvent == null)
                {
                    OnOpeningReportFileEvent += value;
                }
            }
        }

        [JSInvokable]
        public void OpeningReportFileCallBack()
        {
            OnOpeningReportFileEvent?.Invoke();
        }

        #endregion OpeningReportFile

        #region PrintComplete

        public delegate void OnPrintCompleteHandler();

        private event OnPrintCompleteHandler OnPrintCompleteEvent;

        [Parameter]
        public OnPrintCompleteHandler OnPrintComplete
        {
            get
            {
                return OnPrintCompleteEvent;
            }
            set
            {
                if (OnPrintCompleteEvent == null)
                {
                    OnPrintCompleteEvent += value;
                }
            }
        }

        [JSInvokable]
        public void PrintCompleteCallBack()
        {
            OnPrintCompleteEvent?.Invoke();
        }

        #endregion PrintComplete

        #region PrintStart

        public delegate void OnPrintStartHandler();

        private event OnPrintStartHandler OnPrintStartEvent;

        [Parameter]
        public OnPrintStartHandler OnPrintStart
        {
            get
            {
                return OnPrintStartEvent;
            }
            set
            {
                if (OnPrintStartEvent == null)
                {
                    OnPrintStartEvent += value;
                }
            }
        }

        [JSInvokable]
        public void PrintStartCallBack()
        {
            OnPrintStartEvent?.Invoke();
        }

        #endregion PrintStart

        #region QueryComplete

        public delegate void OnQueryCompleteHandler();

        private event OnQueryCompleteHandler OnQueryCompleteEvent;

        [Parameter]
        public OnQueryCompleteHandler OnQueryComplete
        {
            get
            {
                return OnQueryCompleteEvent;
            }
            set
            {
                if (OnQueryCompleteEvent == null)
                {
                    OnQueryCompleteEvent += value;
                }
            }
        }

        [JSInvokable]
        public void QueryCompleteCallBack()
        {
            OnQueryCompleteEvent?.Invoke();
        }

        #endregion QueryComplete

        #region QueryError

        public delegate void OnQueryErrorHandler();

        private event OnQueryErrorHandler OnQueryErrorEvent;

        [Parameter]
        public OnQueryErrorHandler OnQueryError
        {
            get
            {
                return OnQueryErrorEvent;
            }
            set
            {
                if (OnQueryErrorEvent == null)
                {
                    OnQueryErrorEvent += value;
                }
            }
        }

        [JSInvokable]
        public void QueryErrorCallBack()
        {
            OnQueryErrorEvent?.Invoke();
        }

        #endregion QueryError

        #region Ready

        public delegate void OnReadyHandler();

        private event OnReadyHandler OnReadyEvent;

        [Parameter]
        public OnReadyHandler OnReady
        {
            get
            {
                return OnReadyEvent;
            }
            set
            {
                if (OnReadyEvent == null)
                {
                    OnReadyEvent += value;
                }
            }
        }

        [JSInvokable]
        public void ReadyCallBack()
        {
            OnReadyEvent?.Invoke();
        }

        #endregion Ready

        #region ReportChange

        public delegate void OnReportChangeHandler();

        private event OnReportChangeHandler OnReportChangeEvent;

        [Parameter]
        public OnReportChangeHandler OnReportChange
        {
            get
            {
                return OnReportChangeEvent;
            }
            set
            {
                if (OnReportChangeEvent == null)
                {
                    OnReportChangeEvent += value;
                }
            }
        }

        [JSInvokable]
        public void ReportChangeCallBack()
        {
            OnReportChangeEvent?.Invoke();
        }

        #endregion ReportChange

        #region ReportComplete

        public delegate void OnReportCompleteHandler();

        private event OnReportCompleteHandler OnReportCompleteEvent;

        [Parameter]
        public OnReportCompleteHandler OnReportComplete
        {
            get
            {
                return OnReportCompleteEvent;
            }
            set
            {
                if (OnReportCompleteEvent == null)
                {
                    OnReportCompleteEvent += value;
                }
            }
        }

        [JSInvokable]
        public void ReportCompleteCallBack()
        {
            OnReportCompleteEvent?.Invoke();
        }

        #endregion ReportComplete

        #region ReportFileLoaded

        public delegate void OnReportFileLoadedHandler();

        private event OnReportFileLoadedHandler OnReportFileLoadedEvent;

        [Parameter]
        public OnReportFileLoadedHandler OnReportFileLoaded
        {
            get
            {
                return OnReportFileLoadedEvent;
            }
            set
            {
                if (OnReportFileLoadedEvent == null)
                {
                    OnReportFileLoadedEvent += value;
                }
            }
        }

        [JSInvokable]
        public void ReportFileLoadedCallBack()
        {
            OnReportFileLoadedEvent?.Invoke();
        }

        #endregion ReportFileLoaded

        #region ReportFileCancelled

        public delegate void OnReportFileCancelledHandler();

        private event OnReportFileCancelledHandler OnReportFileCancelledEvent;

        [Parameter]
        public OnReportFileCancelledHandler OnReportFileCancelled
        {
            get
            {
                return OnReportFileCancelledEvent;
            }
            set
            {
                if (OnReportFileCancelledEvent == null)
                {
                    OnReportFileCancelledEvent += value;
                }
            }
        }

        [JSInvokable]
        public void ReportFileCancelledCallBack()
        {
            OnReportFileCancelledEvent?.Invoke();
        }

        #endregion ReportFileCancelled

        #region ReportFileError

        public delegate void OnReportFileErrorHandler();

        private event OnReportFileErrorHandler OnReportFileErrorEvent;

        [Parameter]
        public OnReportFileErrorHandler OnReportFileError
        {
            get
            {
                return OnReportFileErrorEvent;
            }
            set
            {
                if (OnReportFileErrorEvent == null)
                {
                    OnReportFileErrorEvent += value;
                }
            }
        }

        [JSInvokable]
        public void ReportFileErrorCallBack()
        {
            OnReportFileErrorEvent?.Invoke();
        }

        #endregion ReportFileError

        #region RunningQuery

        public delegate void OnRunningQueryHandler();

        private event OnRunningQueryHandler OnRunningQueryEvent;

        [Parameter]
        public OnRunningQueryHandler OnRunningQuery
        {
            get
            {
                return OnRunningQueryEvent;
            }
            set
            {
                if (OnRunningQueryEvent == null)
                {
                    OnRunningQueryEvent += value;
                }
            }
        }

        [JSInvokable]
        public void RunningQueryCallBack()
        {
            OnRunningQueryEvent?.Invoke();
        }

        #endregion RunningQuery

        #region CustomizeCell

        public delegate void CustomizeCellFunctionHandler(CellBuilder builder, CellData cellData);

        [Parameter]
        public CustomizeCellFunctionHandler CustomizeCellFunction { get; set; }

        [JSInvokable]
        public void CustomizeCellFunctionCallBack(CellBuilder builder, CellData cellData)
        {
            CustomizeCellFunction?.Invoke(builder, cellData);
        }

        [JSInvokable]
        public string[] GetAddClassResult()
        {
            var array = CellBuilder.ClassesToAdd.ToArray();
            CellBuilder.ClassesToAdd = new System.Collections.Generic.List<string>();
            return array;
        }


        #endregion CustomizeCell

        public object _pivot;
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                var flexmonsterParameters = new
                {
                    container = $"#{id}",
                    toolbar = Toolbar,
                    licenseKey = LicenseKey,
                    licenseFilePath = LicenseFilePath,
                    width = Width,
                    height = Height,
                    componentFolder = ComponentFolder,
                    report = Report,
                    global = Global,
                };
                _pivot = await JsRuntime.InvokeAsync<object>("initFlexmonster",
                                                   CreateDotNetObjectRef(this), flexmonsterParameters,id,pivotContainerReference).ConfigureAwait(false);
            }
            await base.OnAfterRenderAsync(firstRender);
        }

        //add optional parameter GetReportOptions
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
#if DEBUG
            Console.WriteLine(JsonSerializer.Serialize(report));
#endif
            return report;
        }

        public async Task SetReport(Report report)
        {
            var withoutNulls = RemoveNulls(report);
#if DEBUG
            Console.WriteLine(JsonSerializer.Serialize(withoutNulls));
#endif
            await JsRuntime.InvokeAsync<object>($"{id}.setReport", withoutNulls);
           // await JsRuntime.InvokeAsync<object>("invokeApiCall", pivotContainerReference , "setReport", withoutNulls);
            
        }

        public async Task CustomizeCell(CustomizeCellFunctionHandler customizeCellFunction)
        {
            CustomizeCellFunction = customizeCellFunction;

            await JsRuntime.InvokeAsync<object>($"customizeCellWrapper", CreateDotNetObjectRef(this), id);

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

        /*  private void DisposeDotNetObjectRef<T>(DotNetObjectReference<T> value) where T : class
          {
              if (value != null)
              {
                  lock (CreateDotNetObjectRefSyncObj)
                  {
                      value.Dispose();
                  }
              }
          }*/
    }
}