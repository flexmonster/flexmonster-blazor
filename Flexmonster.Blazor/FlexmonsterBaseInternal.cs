using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Flexmonster.Blazor
{
    internal class FlexmonsterBaseInternal
    {
        private readonly FlexmonsterBase _flexmonsterBase;

        public FlexmonsterBaseInternal(FlexmonsterBase flexmonsterBase)
        {
            _flexmonsterBase = flexmonsterBase;
        }
        
        #region AfterChartDraw

        [JSInvokable]
        public async Task AfterChartDrawCallBack()
        {
            await _flexmonsterBase.InvokeAfterChartDrawEvent();
        }

        #endregion AfterChartDraw

        #region AfterGridDraw
        [JSInvokable]
        public async Task AfterGridDrawCallBack(GridDrawParams gridDrawParams)
        {
            await _flexmonsterBase.InvokeAfterGridDrawEvent(gridDrawParams);
        }
        #endregion

        #region BeforeGridDraw
        [JSInvokable]
        public async Task BeforeGridDrawCallBack(GridDrawParams gridDrawParams)
        {
            await _flexmonsterBase.InvokeBeforeGridDrawEvent(gridDrawParams);
        }
        #endregion

        #region BeforeToolbarCreated
        [JSInvokable]
        public async Task BeforeToolbarCreatedCallBack(object toolbar)
        {
            await _flexmonsterBase.InvokeBeforeToolbarCreatedEvent(toolbar);
        }
        #endregion BeforeToolbarCreated

        #region CellClick

        [JSInvokable]
        public async Task CellClickCallBack(CellData cellData)
        {
            await _flexmonsterBase.InvokeCellClickEvent(cellData);
        }

        #endregion CellClick

        #region CellDoubleClick

        [JSInvokable]
        public async Task CellDoubleClickCallBack(CellData cellData)
        {
            await _flexmonsterBase.InvokeCellDoubleClickEvent(cellData);
        }

        #endregion CellDoubleClick

        #region ChartClick

        [JSInvokable]
        public async Task ChartClickCallBack(ChartData chartData)
        {
            await _flexmonsterBase.InvokeChartClickEvent(chartData);
        }

        #endregion ChartClick

        #region DataChanged

        [JSInvokable]
        public async Task DataChangedCallBack(DataChangedParams dataChangedParams)
        {
            await _flexmonsterBase.InvokeDataChangedEvent(dataChangedParams);
        }

        #endregion DataChanged

        #region DataError

        [JSInvokable]
        public async Task DataErrorCallBack(DataErrorParams dataErrorParams)
        {
            await _flexmonsterBase.InvokeDataErrorEvent(dataErrorParams);
        }

        #endregion DataError

        #region DataFileCancelled

        [JSInvokable]
        public async Task DataFileCancelledCallBack()
        {
            await _flexmonsterBase.InvokeDataFileCancelledEvent();
        }

        #endregion DataFileCancelled

        #region DataLoaded

        [JSInvokable]
        public async Task DataLoadedCallBack()
        {
            await _flexmonsterBase.InvokeDataLoadedEvent();
        }

        #endregion DataLoaded

        #region DrillthroughClose

        [JSInvokable]
        public async Task DrillthroughCloseCallBack()
        {
            await _flexmonsterBase.InvokeDrillthroughCloseEvent();
        }

        #endregion DrillthroughClose

        #region DrillthroughOpen

        [JSInvokable]
        public async Task DrillthroughOpenCellCallBack(CellData data)
        {
            await _flexmonsterBase.InvokeDrillthroughOpenEvent(data);
        }

        [JSInvokable]
        public async Task DrillthroughOpenChartCallBack(ChartData data)
        {
            await _flexmonsterBase.InvokeDrillthroughOpenEvent(data);
        }

        #endregion DrillthroughOpen

        #region ExportComplete

        [JSInvokable]
        public async Task ExportCompleteCallBack()
        {
            await _flexmonsterBase.InvokeExportCompleteEvent();
        }

        #endregion ExportComplete

        #region ExportStart

        [JSInvokable]
        public async Task ExportStartCallBack()
        {
            await _flexmonsterBase.InvokeExportStartEvent();
        }

        #endregion ExportStart

        #region FieldsListClose

        [JSInvokable]
        public async Task FieldsListCloseCallBack()
        {
            await _flexmonsterBase.InvokeFieldsListCloseEvent();
        }

        #endregion FieldsListClose

        #region FieldsListOpen

        [JSInvokable]
        public async Task FieldsListOpenCallBack()
        {
            await _flexmonsterBase.InvokeFieldsListOpenEvent();
        }

        #endregion FieldsListOpen

        #region FilterClose

        [JSInvokable]
        public async Task FilterCloseCallBack()
        {
            await _flexmonsterBase.InvokeFilterCloseEvent();
        }

        #endregion FilterClose

        #region FilterOpen

        [JSInvokable]
        public async Task FilterOpenCallBack(FilterOpenParams filterOpenParams)
        {
            await _flexmonsterBase.InvokeFilterOpenEvent(filterOpenParams);
        }

        #endregion FilterOpen

        #region LoadingData

        [JSInvokable]
        public async Task LoadingDataCallBack()
        {
            await _flexmonsterBase.InvokeLoadingDataEvent();
        }

        #endregion LoadingData

        #region LoadingLocalization

        [JSInvokable]
        public async Task LoadingLocalizationCallBack()
        {
            await _flexmonsterBase.InvokeLoadingLocalizationEvent();
        }

        #endregion LoadingLocalization

        #region LoadingOLAPStructure

        [JSInvokable]
        public async Task LoadingOLAPStructureCallBack()
        {
            await _flexmonsterBase.InvokeLoadingOLAPStructureEvent();
        }

        #endregion LoadingOLAPStructure

        #region LoadingReportFile

        [JSInvokable]
        public async Task LoadingReportFileCallBack()
        {
            await _flexmonsterBase.InvokeLoadingReportFileEvent();
        }

        #endregion LoadingReportFile

        #region LocalizationError

        [JSInvokable]
        public async Task LocalizationErrorCallBack()
        {
            await _flexmonsterBase.InvokeLocalizationErrorEvent();
        }

        #endregion LocalizationError

        #region LocalizationLoaded

        [JSInvokable]
        public async Task LocalizationLoadedCallBack()
        {
            await _flexmonsterBase.InvokeLocalizationLoadedEvent();
        }

        #endregion LocalizationLoaded

        #region OLAPStructureError

        [JSInvokable]
        public async Task OLAPStructureErrorCallBack()
        {
            await _flexmonsterBase.InvokeOLAPStructureErrorEvent();
        }

        #endregion OLAPStructureError

        #region OLAPStructureLoaded

        [JSInvokable]
        public async Task OLAPStructureLoadedCallBack()
        {
            await _flexmonsterBase.InvokeOLAPStructureLoadedEvent();
        }

        #endregion OLAPStructureLoaded

        #region OpeningReportFile

        [JSInvokable]
        public async Task OpeningReportFileCallBack()
        {
            await _flexmonsterBase.InvokeOpeningReportFileEvent();
        }

        #endregion OpeningReportFile

        #region PrintComplete

        [JSInvokable]
        public async Task PrintCompleteCallBack()
        {
            await _flexmonsterBase.InvokePrintCompleteEvent();
        }

        #endregion PrintComplete

        #region PrintStart

        [JSInvokable]
        public async Task PrintStartCallBack()
        {
            await _flexmonsterBase.InvokePrintStartEvent();
        }

        #endregion PrintStart

        #region QueryComplete

        [JSInvokable]
        public async Task QueryCompleteCallBack()
        {
            await _flexmonsterBase.InvokeQueryCompleteEvent();
        }

        #endregion QueryComplete

        #region QueryError

        [JSInvokable]
        public async Task QueryErrorCallBack()
        {
            await _flexmonsterBase.InvokeQueryErrorEvent();
        }

        #endregion QueryError

        #region Ready

        [JSInvokable]
        public async Task ReadyCallBack()
        {
            await _flexmonsterBase.InvokeReadyEvent();
        }

        #endregion Ready

        #region ReportChange

        [JSInvokable]
        public async Task ReportChangeCallBack()
        {
            await _flexmonsterBase.InvokeReportChangeEvent();
        }

        #endregion ReportChange

        #region ReportComplete

        [JSInvokable]
        public async Task ReportCompleteCallBack()
        {
            await _flexmonsterBase.InvokeReportCompleteEvent();
        }

        #endregion ReportComplete

        #region ReportFileLoaded

        [JSInvokable]
        public async Task ReportFileLoadedCallBack()
        {
            await _flexmonsterBase.InvokeReportFileLoadedEvent();
        }

        #endregion ReportFileLoaded

        #region ReportFileCancelled

        [JSInvokable]
        public async Task ReportFileCancelledCallBack()
        {
            await _flexmonsterBase.InvokeReportFileCancelledEvent();
        }

        #endregion ReportFileCancelled

        #region ReportFileError

        [JSInvokable]
        public async Task ReportFileErrorCallBack()
        {
            await _flexmonsterBase.InvokeReportFileErrorEvent();
        }

        #endregion ReportFileError

        #region RunningQuery

        [JSInvokable]
        public async Task RunningQueryCallBack()
        {
            await _flexmonsterBase.InvokeRunningQueryEvent();
        }

        #endregion RunningQuery

        #region Update

        [JSInvokable]
        public async Task UpdateCallBack()
        {
            await _flexmonsterBase.InvokeUpdateEvent();
        }

        #endregion Update

        [JSInvokable]
        public async Task ExportToCallBack(ExportToResult result, ExportToError error)
        {
            await _flexmonsterBase.InvokeExportToHandler(result, error);
        }

        [JSInvokable]
        public async Task GetMembersCallBack(Member[] members)
        {
            await _flexmonsterBase.InvokeGetMembersHandler(members);
        }

        [JSInvokable]
        public async Task OpenCalculatedValueEditorCallBack(OpenCalculatedValueEditorResult result)
        {
            await _flexmonsterBase.InvokeOpenCalculatedValueEditorHandler(result);
        }

        [JSInvokable]
        public async Task SaveCallBack(SaveResult result, SaveError error)
        {
            await _flexmonsterBase.InvokeSaveHandler(result, error);
        }


    }
}
