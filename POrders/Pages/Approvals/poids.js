function pageContentLoad(sender, args) {
    GetPOs();
}



function AddPO() {

    Shp.Dialog.WaittingDialog.show('Adding PO ID');

    let po = {};
    po['POID'] = $select('NewPOID').get_value();

    $SPData.AddItem('POIDS', po).then(function () {
        window.top.location.href = window.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Cannot add PO ID", err);
    });

}



function GetPOs() {

    function ShowData(dataRows) {

        jq('#dataTable').DataTable({
            dom: 'Bfrtip',
            data: dataRows,
            info: false,
            ordering: true,
            scrollXInner: true,
            paging: false,
            columns: [{
                data: null,
                render: function (d, row, index) {
                    return '<button type="button" class="btn btn-xs btn-primary" onclick="javascript:DeletePO(\'' + d['ID']  + '\')">Del.</button>';
                }
            },
                { data: 'POID' }]
        });

    }

    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('POIDS')/items";
    let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
    executor.executeAsync({
        url: url,
        method: 'GET',
        headers: { "Accept": "application/json; odata=verbose" },
        error: function (data, errorCode, errorMessage) {
            alert(data.body);
        },
        success: function (results) {
            let response = JSON.parse(results.body);
            let rows = response.d.results;
            ShowData(rows);
        }
    });
}



function DeletePO(poId) {
    Shp.Dialog.WaittingDialog.show('Deleting PO ID');
    $SPData.DeleteItem('POIDS', poId).then(function () {
        window.top.location.href = window.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot delete PO', err);
    });

}