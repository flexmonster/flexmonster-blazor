using Microsoft.JSInterop;

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
        public void AfterChartDrawCallBack()
        {
            _flexmonsterBase.InvokeAfterChartDrawEvent();
        }

        #endregion AfterChartDraw

        #region AfterGridDraw
        [JSInvokable]
        public void AfterGridDrawCallBack(GridDrawParams gridDrawParams)
        {
            _flexmonsterBase.InvokeAfterGridDrawEvent(gridDrawParams);
        }
        #endregion

        #region BeforeGridDraw
        [JSInvokable]
        public void BeforeGridDrawCallBack(GridDrawParams gridDrawParams)
        {
            _flexmonsterBase.InvokeBeforeGridDrawEvent(gridDrawParams);
        }
        #endregion

        #region BeforeToolbarCreated
        [JSInvokable]
        public void BeforeToolbarCreatedCallBack(object toolbar)
        {
            _flexmonsterBase.InvokeBeforeToolbarCreatedEvent(toolbar);
        }
        #endregion BeforeToolbarCreated

        #region CellClick

        [JSInvokable]
        public void CellClickCallBack(CellData cellData)
        {
            _flexmonsterBase.InvokeCellClickEvent(cellData);
        }

        #endregion CellClick

        #region CellDoubleClick

        [JSInvokable]
        public void CellDoubleClickCallBack(CellData cellData)
        {
            _flexmonsterBase.InvokeCellDoubleClickEvent(cellData);
        }

        #endregion CellDoubleClick

        #region ChartClick

        [JSInvokable]
        public void ChartClickCallBack(ChartData chartData)
        {
            _flexmonsterBase.InvokeChartClickEvent(chartData);
        }

        #endregion ChartClick

        #region DataChanged

        [JSInvokable]
        public void DataChangedCallBack(DataChangedParams dataChangedParams)
        {
            _flexmonsterBase.InvokeDataChangedEvent(dataChangedParams);
        }

        #endregion DataChanged

        #region DataError

        [JSInvokable]
        public void DataErrorCallBack(DataErrorParams dataErrorParams)
        {
            _flexmonsterBase.InvokeDataErrorEvent(dataErrorParams);
        }

        #endregion DataError

        #region DataFileCancelled

        [JSInvokable]
        public void DataFileCancelledCallBack()
        {
            _flexmonsterBase.InvokeDataFileCancelledEvent();
        }

        #endregion DataFileCancelled

        #region DataLoaded

        [JSInvokable]
        public void DataLoadedCallBack()
        {
            _flexmonsterBase.InvokeDataLoadedEvent();
        }

        #endregion DataLoaded

        #region DrillthroughClose

        [JSInvokable]
        public void DrillthroughCloseCallBack()
        {
            _flexmonsterBase.InvokeDrillthroughCloseEvent();
        }

        #endregion DrillthroughClose

        #region DrillthroughOpen

        [JSInvokable]
        public void DrillthroughOpenCellCallBack(CellData data)
        {
            _flexmonsterBase.InvokeDrillthroughOpenEvent(data);
        }

        [JSInvokable]
        public void DrillthroughOpenChartCallBack(ChartData data)
        {
            _flexmonsterBase.InvokeDrillthroughOpenEvent(data);
        }

        #endregion DrillthroughOpen

        #region ExportComplete

        [JSInvokable]
        public void ExportCompleteCallBack()
        {
            _flexmonsterBase.InvokeExportCompleteEvent();
        }

        #endregion ExportComplete

        #region ExportStart

        [JSInvokable]
        public void ExportStartCallBack()
        {
            _flexmonsterBase.InvokeExportStartEvent();
        }

        #endregion ExportStart

        #region FieldsListClose

        [JSInvokable]
        public void FieldsListCloseCallBack()
        {
            _flexmonsterBase.InvokeFieldsListCloseEvent();
        }

        #endregion FieldsListClose

        #region FieldsListOpen

        [JSInvokable]
        public void FieldsListOpenCallBack()
        {
            _flexmonsterBase.InvokeFieldsListOpenEvent();
        }

        #endregion FieldsListOpen

        #region FilterClose

        [JSInvokable]
        public void FilterCloseCallBack()
        {
            _flexmonsterBase.InvokeFilterCloseEvent();
        }

        #endregion FilterClose

        #region FilterOpen

        [JSInvokable]
        public void FilterOpenCallBack(FilterOpenParams filterOpenParams)
        {
            _flexmonsterBase.InvokeFilterOpenEvent(filterOpenParams);
        }

        #endregion FilterOpen

        #region LoadingData

        [JSInvokable]
        public void LoadingDataCallBack()
        {
            _flexmonsterBase.InvokeLoadingDataEvent();
        }

        #endregion LoadingData

        #region LoadingLocalization

        [JSInvokable]
        public void LoadingLocalizationCallBack()
        {
            _flexmonsterBase.InvokeLoadingLocalizationEvent();
        }

        #endregion LoadingLocalization

        #region LoadingOLAPStructure

        [JSInvokable]
        public void LoadingOLAPStructureCallBack()
        {
            _flexmonsterBase.InvokeLoadingOLAPStructureEvent();
        }

        #endregion LoadingOLAPStructure

        #region LoadingReportFile

        [JSInvokable]
        public void LoadingReportFileCallBack()
        {
            _flexmonsterBase.InvokeLoadingReportFileEvent();
        }

        #endregion LoadingReportFile

        #region LocalizationError

        [JSInvokable]
        public void LocalizationErrorCallBack()
        {
            _flexmonsterBase.InvokeLocalizationErrorEvent();
        }

        #endregion LocalizationError

        #region LocalizationLoaded

        [JSInvokable]
        public void LocalizationLoadedCallBack()
        {
            _flexmonsterBase.InvokeLocalizationLoadedEvent();
        }

        #endregion LocalizationLoaded

        #region OLAPStructureError

        [JSInvokable]
        public void OLAPStructureErrorCallBack()
        {
            _flexmonsterBase.InvokeOLAPStructureErrorEvent();
        }

        #endregion OLAPStructureError

        #region OLAPStructureLoaded

        [JSInvokable]
        public void OLAPStructureLoadedCallBack()
        {
            _flexmonsterBase.InvokeOLAPStructureLoadedEvent();
        }

        #endregion OLAPStructureLoaded

        #region OpeningReportFile

        [JSInvokable]
        public void OpeningReportFileCallBack()
        {
            _flexmonsterBase.InvokeOpeningReportFileEvent();
        }

        #endregion OpeningReportFile

        #region PrintComplete

        [JSInvokable]
        public void PrintCompleteCallBack()
        {
            _flexmonsterBase.InvokePrintCompleteEvent();
        }

        #endregion PrintComplete

        #region PrintStart

        [JSInvokable]
        public void PrintStartCallBack()
        {
            _flexmonsterBase.InvokePrintStartEvent();
        }

        #endregion PrintStart

        #region QueryComplete

        [JSInvokable]
        public void QueryCompleteCallBack()
        {
            _flexmonsterBase.InvokeQueryCompleteEvent();
        }

        #endregion QueryComplete

        #region QueryError

        [JSInvokable]
        public void QueryErrorCallBack()
        {
            _flexmonsterBase.InvokeQueryErrorEvent();
        }

        #endregion QueryError

        #region Ready

        [JSInvokable]
        public void ReadyCallBack()
        {
            _flexmonsterBase.InvokeReadyEvent();
        }

        #endregion Ready

        #region ReportChange

        [JSInvokable]
        public void ReportChangeCallBack()
        {
            _flexmonsterBase.InvokeReportChangeEvent();
        }

        #endregion ReportChange

        #region ReportComplete

        [JSInvokable]
        public void ReportCompleteCallBack()
        {
            _flexmonsterBase.InvokeReportCompleteEvent();
        }

        #endregion ReportComplete

        #region ReportFileLoaded

        [JSInvokable]
        public void ReportFileLoadedCallBack()
        {
            _flexmonsterBase.InvokeReportFileLoadedEvent();
        }

        #endregion ReportFileLoaded

        #region ReportFileCancelled

        [JSInvokable]
        public void ReportFileCancelledCallBack()
        {
            _flexmonsterBase.InvokeReportFileCancelledEvent();
        }

        #endregion ReportFileCancelled

        #region ReportFileError

        [JSInvokable]
        public void ReportFileErrorCallBack()
        {
            _flexmonsterBase.InvokeReportFileErrorEvent();
        }

        #endregion ReportFileError

        #region RunningQuery

        [JSInvokable]
        public void RunningQueryCallBack()
        {
            _flexmonsterBase.InvokeRunningQueryEvent();
        }

        #endregion RunningQuery

        #region Update

        [JSInvokable]
        public void UpdateCallBack()
        {
            _flexmonsterBase.InvokeUpdateEvent();
        }

        #endregion Update

        [JSInvokable]
        public void ExportToCallBack(ExportToResult result, ExportToError error)
        {
            _flexmonsterBase.InvokeExportToHandler(result, error);
        }

        [JSInvokable]
        public void GetMembersCallBack(Member[] members)
        {
            _flexmonsterBase.InvokeGetMembersHandler(members);
        }

        [JSInvokable]
        public void OpenCalculatedValueEditorCallBack(OpenCalculatedValueEditorResult result)
        {
            _flexmonsterBase.InvokeOpenCalculatedValueEditorHandler(result);
        }

        [JSInvokable]
        public void SaveCallBack(SaveResult result, SaveError error)
        {
            _flexmonsterBase.InvokeSaveHandler(result, error);
        }


    }
}
