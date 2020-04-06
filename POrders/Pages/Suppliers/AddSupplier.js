/// <reference name="MicrosoftAjax.js" />
/// <reference path= "Dialog/sharepoint.dialog.js" />

function AddSupplier() {
    /// <summary>Add supplier</summary>

    if (!Page_ClientValidate()) {
        return;
    }

    Shp.Dialog.WaittingDialog.show('Adding supplier');
    SP.SOD.executeFunc('clientpeoplepicker.js', '$_global_clientpeoplepicker', function () {


        var supplier = {};
        supplier['SupplierName'] = $select('SupplierName').get_value();
        supplier['Address'] = $select('SupplierAddress').get_value();
        supplier['Phone'] = $select('SupplierPhone').get_value();
        supplier['ContactPerson'] = SP.FieldUserValue.fromUser($selectClientPicker('SupplierContactPerson').get_allUserInfo()[0].Key);


        Shp.Lists.AddItem('Suppliers', supplier, null, function () {
            window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Suppliers/Suppliers.aspx';
        }, function (err) {
            Shp.Dialog.WaittingDialog.hide();
            Shp.Dialog.ErrorDialog.show('Cannot add suplier', err);
        });
    });

}



function validateContactPerson(sender, args) {
    args.IsValid = true;

    if ($selectClientPicker('SupplierContactPerson').get_allUserInfo().length === 0) {
        args.IsValid = false;
    }
}