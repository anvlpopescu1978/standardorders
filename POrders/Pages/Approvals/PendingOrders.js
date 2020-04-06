function pageContentLoad(sender, args) {
    Shp.Dialog.WaittingDialog.show('Getting the data');
    GetOrders().then(function (items) {
        ShowOrders(items);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get data', err);
    });
}



function ShowOrders(items) {

    jq('#dataTable').DataTable({
        dom: 'Bfrtip',
        data: items,
        info: false,
        ordering: true,
        scrollXInner: true,
        paging: false,
        columns: [{
                data: null,
                render: function (d, row, index) {
                    return '<button type="button" onclick="javascript:EditPO(\'' + d['ID'] + '\')" class="btn btn-xs btn-primary">Edit</button>';
                }
            },
            { data: 'ID' },
            { data: 'AgreementID' },
            { data: 'CustomerName' },
            { data: 'Phase' },
            { data: 'OData__x0028_Invoiceto_x0029_Country' }]
    });

    Shp.Dialog.WaittingDialog.hide();
}



function GetOrders() {
   
    let promise = new Promise(function (resolve, reject) {

        let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Purchase Orders')/items?$filter=Phase eq 'Pending approval'";
        let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        executor.executeAsync({
            url: url,
            method: 'GET',
            headers: { "Accept": "application/json; odata=verbose" },
            error: function (data, errorCode, errorMessage) {
                reject(data.body);
            },
            success: function (results) {
                let response = JSON.parse(results.body);
                let rows = response.d.results;
                resolve(rows);
            }
        });

    }, function (err) {
    });

    return promise;
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


function EditPO(poId) {
    var url = _spPageContextInfo.webAbsoluteUrl + '/Pages/Common/EditPO.aspx?poId=' + poId;
    GoToPage(url);
}


