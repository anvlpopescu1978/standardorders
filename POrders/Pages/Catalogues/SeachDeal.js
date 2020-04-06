function pageContentLoad(sender, args) {

    let dartId = Shp.Page.GetParameterFromUrl('dartId');
    jq('#srcDartIdCriteria').val(dartId);
    if (dartId === '') {
        ShowResults([], dartId);
        return;
    }

    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('HPCatalogue')/items?$top=3000&$orderby=SolutionNumber,SolutionNumberOrdering&$filter=DartID eq " + Shp.Page.GetParameterFromUrl('dartId');
    let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
    executor.executeAsync({
        url: url,
        method: 'GET',
        headers: { "Accept": "application/json; odata=verbose" },
        error: function (data, errorCode, errorMessage) {
            reject(data.body);
        },
        success: function (results) {
            let settings = {};
            let response = JSON.parse(results.body);
            let rows = response.d.results;
            ShowResults(rows, dartId);
        }
    });

}

function ShowResults(data, dartId) {
    jq('#dataTable').DataTable({
        "oSearch": { "sSearch": dartId },
        buttons: [ 'excel' ],
        data: data,
        info: false,
        ordering: false,
        scrollX: true,
        paging: false,
        rowCallback: function (row, dataRow, dataIndex) {
            if (dataRow['Class'] === 'solution') {
                jq('td', row).css({
                    'background-color': '#000000 ',
                    'color': '#ffffff'
                });
            }
        },
        columns: [{
            data: null,
            orderable: false,
            render: function (d) {
                let html = '';
                if (d['Class'] === 'solution') {
                    html = '<button onclick="javascript:DeleteSolution(\'' + d['SolutionNumber'] + '\')" class="btn btn-xs btn-danger">Delete</button>';
                }
                return html;
            }
        },
        { data: 'ID' },
        { data: 'DartID' },
        { data: 'SolutionNumber' },
        { data: 'ProductName' },
        { data: 'SKU' },
        { data: 'Class' },
        { data: 'BillingModel' },
        { data: 'BaseFee' },
        { data: 'UpfrontCharge' },
        { data: 'PrinterType' },
        { data: 'MonoClick' },
        { data: 'ColorClick' },
        { data: 'ProfColorClick' },
        { data: 'Country' },
        { data: 'Currency' },
        { data: 'MonthlyPages' }]
    });
}

function SearchForAnotherDeal() {
    var url = '/Pages/Catalogues/SearchDeal.aspx?dartId=' + escapeProperly(jq('#srcDartIdCriteria').val());
    NavigateToPage(url);
}


function ClearCurrentDeal() {

    let items = jq('#dataTable').DataTable().rows().data();
    let ids = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        ids.push(item['ID']);

    }

    if (ids.length === 0) {
        Shp.Dialog.warningDialog.show('No item to delete', 'There is no item found for current search');
        return;
    }

    Shp.Dialog.WaittingDialog.show('Deleting items');
    Shp.Lists._DeleteItems2('HPCatalogue', ids, new SP.ClientContext.get_current(), function () {
        window.location.href = window.top.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Error deleting items', err);
    });
}


function DeleteSolution(solutionNumber) {

    let ids = [];
    jq('#dataTable tbody tr').each(function () {
        let tds = jq(this).children('td');
        if (tds.eq(3).text().trim() === solutionNumber) {
            ids.push(tds.eq(1).text());
        }
    });

    Shp.Lists.DeleteItems2('HPCatalogue', ids, null, function () {
        window.top.location.href = window.location.href;
    }, function (err) {
        Shp.Dialog.ErrorDialog.show('Unable to delete solution', err);
    });
}