function SaveEditForm(args) {

    // Validate form
    var errors = 0;
    if ($select('SupplierName').check_validity() === false) {
        jQuery('#validateSupplierName').show();
        errors++;
    }
    else {
        jQuery('#validateSupplierName').hide();
    }
    if ($select('SupplierPhone').check_validity() === false) {
        jQuery('#validateSupplierPhone').show();
        errors++;
    }
    else {
        jQuery('#validateSupplierPhone').hide();
    }
    if ($select('SupplierAddress').check_validity() === false) {
        jQuery('#validateSupplierAddress').show();
        errors++;
    }
    else {
        jQuery('#validateSupplierAddress').hide();
    }

    if (errors > 0) {
        return;
    }
    // End of form validation

    SP.SOD.executeFunc('clientpeoplepicker.js', '$_global_clientpeoplepicker', function () {

        var supplier = {};
        supplier['ID'] = Shp.Page.GetParameterFromUrl('supplierId');
        supplier['SupplierName'] = $select('SupplierName').get_value();
        supplier['Address'] = $select('SupplierPhone').get_value();
        supplier['Address'] = $select('SupplierAddress').get_value();
        supplier['ContactPerson'] = SP.FieldUserValue.fromUser($selectClientPicker('SupplierContactPerson1').get_allUserInfo()[0].Key);

        Shp.Lists.UpdateItem('Suppliers', supplier, null, function () {
            window.parent.RefreshPage();
            window.parent.Shp.Dialog.EditFormDialog.hide();
        }, function (err) {
            alert('Cannot update supplier:\n' + err);
            window.parent.Shp.Dialog.EditFormDialog.hide();
        });

    });

}

function CloseModal() {
    window.parent.Shp.Dialog.EditFormDialog.hide();
}