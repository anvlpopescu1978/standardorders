function pageContentLoad(sender, args) {

    Shp.Dialog.WaittingDialog.show("Getting legal entity data");
    var camlQuery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + Shp.Page.GetParameterFromUrl('entityId') + '</Value></Eq></Where></Query></View>';
    Shp.Lists.GetItems('LegalEntities', null, camlQuery, function (items) {
        var item = items.itemAt(0);
        $select('NewLegalEntityName').set_value(item.get_item('Legal_x0020_Entity_x0020_Name'));
        $select('NewVATNumber').set_value(item.get_item('VaTNumber'));
        $select('NewFirstAddressLine').set_value(item.get_item('AddressLine1'));
        $select('NewSecondAddressLine').set_value(item.get_item('AddressLine2'));
        $select('NewCity').set_value(item.get_item('WorkCity'));
        $select('NewPostalCode').set_value(item.get_item('PostalCode'));
        $select('NewDefaultCountry').set_value(item.get_item('CountryCode'));
        $select('SSOWNumber').set_value(item.get_item('SSOWNumber'));
        jq('#CPADate').val(item.get_item('CPADate') === null ? '' : item.get_item('CPADate').format('yyyy-MM-dd'));
        Shp.Dialog.WaittingDialog.hide();
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Cannot get legal entity details", err);
    });

}


function CloseModal() {

    let wParent = window.parent;
    wParent.Shp.Dialog.EditFormDialog.hide();
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


function SaveChanges() {

    if (ValidateFields() > 0) {
        return;
    }


    Shp.Dialog.WaittingDialog.show("Saving changes");
    var le = {};
    le['ID'] = Shp.Page.GetParameterFromUrl('entityId');
    le['CountryCode'] = $select('NewDefaultCountry').get_value();
    le['Country'] = $select('NewDefaultCountry').get_text();
    le['Legal_x0020_Entity_x0020_Name'] = $select('NewLegalEntityName').get_value();
    le['VaTNumber'] = $select('NewVATNumber').get_value();
    le['AddressLine1'] = $select('NewFirstAddressLine').get_value();
    le['AddressLine2'] = $select('NewSecondAddressLine').get_value();
    le['WorkCity'] = $select('NewCity').get_value();
    le['PostalCode'] = $select('NewPostalCode').get_value();
    le['SSOWNumber'] = $select('SSOWNumber').get_value();
    le['CPADate'] = $select('CPADate').get_date('yyyy-MM-dd');

    Shp.Lists.UpdateItem('LegalEntities', le, null, function (item) {
        window.parent.top.location.href = window.parent.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Cannot save legal entity data", err);
    });
}





