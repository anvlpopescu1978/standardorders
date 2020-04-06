function pageContentLoad(sender, args) {


    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('LegalEntities')/items";
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
            ShowResults(rows);
        }
    });

}


function ShowResults(rows) {

    var tbl = jq('#dataTable').DataTable({
        info: false,
        ordering: false,
        scrollX: true,
        paging: false,
        data: rows,
        columns: [{
            data: function (row) {
                return '<button type="button" onclick="javascript:DeleteLegalEntity(\'' + row['ID'] + '\')" class="btn btn-xs btn-danger">Delete</button>';
            }
        },
            {
                data: function (row) {
                return '<button type="button" onclick="javascript:EditLegalEntity(\'' + row['ID'] + '\')" class="btn btn-xs btn-primary">Edit</button>';
            }
        },
            { data: 'Legal_x0020_Entity_x0020_Name' },
            { data: 'Country' },
            { data: 'VaTNumber' },
            { data: 'WorkCity' },
            { data: 'PostalCode' },
            {
                data: function (row) {
                    return row['AddressLine1'] + ' ' + row['AddressLine2'];
                }
            }],

        'aoColumnDefs': [
            { "bSortable": false, "bSearchable": false, "aTargets": [1] },
            { "bSortable": false, "bSearchable": false, "aTargets": [0] }
        ]
    });
}


function ValidateFields() {
    let errors = 0;
    let ctrls = ['NewCountry', 'NewLegalEntityName', 'NewVATNumber',
        'NewCity', 'NewPostalCode', 'NewFirstAddressLine',
        'NewSecondAddressLine', 'SSOWNumber', 'CPADate'];

    for (let i = 0; i < ctrls.length; i++) {
        if ($select(ctrls[i]).check_validity() === false) {
            jq('#' + ctrls[i]).addClass('is-invalid');
            errors++;
        }
        else {
            jq('#' + ctrls[i]).removeClass('is-invalid');
        }
    }

    return errors;
}



function AddLegalEntity() {

    if (ValidateFields() > 0) {
        return;
    }


    Shp.Dialog.WaittingDialog.show("Adding new legal entity");
    var le = {};
    le['CountryCode'] = $select('NewCountry').get_value();
    le['Country'] = $select('NewCountry').get_text();
    le['Legal_x0020_Entity_x0020_Name'] = $select('NewLegalEntityName').get_value();
    le['VaTNumber'] = $select('NewVATNumber').get_value();
    le['WorkCity'] = $select('NewCity').get_value();
    le['PostalCode'] = $select('NewPostalCode').get_value();
    le['AddressLine1'] = $select('NewFirstAddressLine').get_value();
    le['AddressLine2'] = $select('NewSecondAddressLine').get_value();
    le['SSOWNumber'] = $select('SSOWNumber').get_value();
    le['CPADate'] = $select('CPADate').get_date('yyyy-MM-dd');   


    Shp.Lists.AddItem('LegalEntities', le, null, function (item) {
        window.top.location.href = window.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Cannot add legal entity", err);
    });

}


function DeleteLegalEntity(id) {
    Shp.Dialog.WaittingDialog.show("Deleting legal entity");
    Shp.Lists.DeleteItem('LegalEntities', parseFloat(id), null, function () {
        window.top.location.href = window.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Cannot delete legal entity", err);
    });
}


function EditLegalEntity(id) {
    Shp.Dialog.EditFormDialog.show('Edit', _spPageContextInfo.webAbsoluteUrl + '/Pages/Countries/EditLegalEntity.aspx?entityId=' + id, null);
}







