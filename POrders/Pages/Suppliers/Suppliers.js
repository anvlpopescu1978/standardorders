function pageContentLoad(sender, args) {

    var sortField = Shp.Page.GetParameterFromUrl('SortField') === '' ? 'ID' : Shp.Page.GetParameterFromUrl('SortField');
    var sortDir = Shp.Page.GetParameterFromUrl('SortDir') === '' ? 'Desc' : Shp.Page.GetParameterFromUrl('SortDir');
    $select('SortField').set_value(sortField);
    $select('SortDirection').set_value(sortDir);

    var tbl = jQuery('#dataTable').DataTable({
        info: false,
        ordering: false,
        scrollX: true,
        paging: false,
        fixedColumns: {
            leftColumns: 1
        },
        'aoColumnDefs': [
            { "bSortable": false, "bSearchable": false, "aTargets": [0] }
        ]
    });
}


function AddSupplier() {
    /// <summary>Add supplier</summary>

    if (!Page_ClientValidate()) {
        return;
    }

    Shp.Dialog.WaittingDialog.show('Adding supplier');

    SP.SOD.executeFunc('clientpeoplepicker.js', '$_global_clientpeoplepicker', function () {
        var supplier = {};
        supplier['Title'] = $select('SupplierName').get_value();
        supplier['Address'] = $select('SupplierAddress').get_value();
        supplier['Phone'] = $select('SupplierPhone').get_value();
        supplier['ContactPerson'] = Shp.Controls.Selector.get_clientPeoplePickerValue('SupplierContactPerson')[0];

        Shp.Lists.AddItem('Suppliers', supplier, null, function () {
            window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Suppliers/Suppliers.aspx';
        }, function (err) {
            Shp.Dialog.WaittingDialog.hide();
            alert('Cannot add supplier:\n' + err);
        });
    });

}



function EditSupplier(id) {
    /// <summary>Edit supplier</summary>
    /// <param name="id">ID</param>
    Shp.Dialog.EditFormDialog.show('Change supplier details', _spPageContextInfo.webAbsoluteUrl + '/Pages/Suppliers/EditSupplier.aspx?supplierId=' + id, null);
}

function DeleteSupplier(id) {
    /// <summary>Delete supplier</summary>
    /// <param name="id">ID</param>
    Shp.Dialog.WaittingDialog.show('Deleting supplier');

    Shp.Lists.DeleteItem('Suppliers', parseInt(id), null, function () {
        RefreshPage();
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot delete supplier', err);
    });  
}

function ChangeView() {
    window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Suppliers/Suppliers.aspx?' +
        'SortField=' + escapeProperly($select('SortField').get_value()) +
        '&SortDir=' + escapeProperly($select('SortDirection').get_value());
}


function RefreshPage() {
    window.top.location.href = window.location.href;
}