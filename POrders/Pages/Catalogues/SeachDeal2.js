function pageContentLoad(sender, args) {

    $select('FilterCountry').set_value(Shp.Page.GetParameterFromUrl('Country'));

    if (Shp.Page.GetParameterFromUrl('Country') === '') {
        ShowResults([], Shp.Page.GetParameterFromUrl('Country'));
        return;
    }

    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('HPCatalogue')/items?$orderby=SolutionNumber,SolutionNumberOrdering&$top=5000&$filter=Country eq '" + escapeProperly(Shp.Page.GetParameterFromUrl('Country')) + "'";
    let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
    executor.executeAsync({
        url: url,
        method: 'GET',
        headers: { "Accept": "application/json; odata=verbose" },
        error: function (data, errorCode, errorMessage) {
            alert(data.body);
        },
        success: function (results) {
            let settings = {};
            let response = JSON.parse(results.body);
            let rows = response.d.results;
            ShowResults(rows, Shp.Page.GetParameterFromUrl('Country'));
        },
        reject: function (err) {
            Shp.Dialog.ErrorDialog.show("Cannot get data from server", err);

        }
    });

}

function ShowResults(data, country) {
    jq('#dataTable').DataTable({
        "oSearch": { "sSearch": country },
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
        columns: [
            {
                data: null,
                render: function (d) {
                    let html = '';
                    if (d['Class'] === 'solution') {
                        html = '<button type="button" onclick="javascript:DeleteSolution(\'' + d['SolutionNumber'] + '\')" class="btn btn-xs btn-danger">Delete</button>';
                    }
                    return html;
                }
            },
            { data: 'ID' },
        { data: 'DartID' },
        { data: 'SolutionNumber' },
        { data: 'ProductName' },
        { data: 'SKU' },
        { data: 'BillingModel' },
            { data: 'BaseFee' },
            { data: 'UpfrontCharge' },
        { data: 'PrinterType' },
        { data: 'MonoClick' },
        { data: 'ColorClick' },
        { data: 'ProfColorClick' },
        { data: 'Country' },
        { data: 'Currency' }]
    });
}


function ChangeCountry() {
    NavigateToPage('/Pages/Catalogues/SearchDeal2.aspx?Country=' + $select('FilterCountry').get_value());

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