function pageContentLoad(sender, args) {    


    jq('#tblUsers').DataTable({
        info: false,
        ordering: false,
        scrollX: true,
        paging: false,
        data: [],
        columns: [
            {
                data: 'DisplayName'
            }]
    });




    GetCompanies().then(function (rows) {

        jq('#tblCompanies').DataTable({
            info: false,
            ordering: false,
            scrollX: true,
            paging: false,
            data: rows,
            columns: [
                {
                    orderable: false,
                    data: null,
                    defaultContent: '',
                    render: function (d, row, index, meta) {
                        let html = '<span style="color:#d9534f" onclick="javascript:RemovePartner(' + meta.row + ',' + d['ID'] + ')"><i class="fa fa-remove"></i><span>';
                        return html;
                    }
                },
                {
                    data: 'CompanyName'
                }]

        });


    }, function (err) {
            Shp.Dialog.ErrorDialog('Cannot get companies list', err);
    });


}


function RemovePartner(rowIndex, partnerId) {

    $SPData.DeleteItem('Companies', partnerId).then(function () {
        jq('#tblCompanies').DataTable().rows(rowIndex).remove().draw(true);
    }, function (err) {
            Shp.Dialog.ErrorDialog.show('Cannot remvoe partner', err);
    });

}


function AddPartner() {

    let partner = {};
    partner['CompanyName'] = jq('#newIWGPartner').val().trim();
    partner['Title'] = jq('#newIWGPartner').val().trim();

    $SPData.AddItem('Companies', partner).then(function (item) {
        jq('#tblCompanies').DataTable().row.add({ 'CompanyName': jq('#newIWGPartner').val().trim() }).draw(true);
        jq('#newIWGPartner').val('');
        jq('#myModal').modal('hide');
    }, function (err) {
            jq('#newIWGPartner').val('');
            jq('#myModal').modal('hide');
            Shp.Dialog.ErrorDialog.show('Cannot add partner', err);
    });

}





function GetCompanies() {
    var promise = new Promise(function (resolve, reject) {
        let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Companies')/items?$top=5000&$select=*";
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
    });
    return promise;
}
