function pageContentLoad(sender, args) {

    var caml = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
        Shp.Page.GetParameterFromUrl('countryId') +
        '</Value></Eq></Where></Query></View>';

    Shp.Lists.GetItems('Countries', null, caml, function (items) {
        var item = items.itemAt(0);
        $select('NewContryCode').set_value(item.get_item('CountryCode'));
        $select('NewCountryName').set_value(item.get_item('Country'));
        $select('NewDefaultCurrency').set_value(item.get_item('DefaultCurrency'));
        $select('InvoiceCurrency').set_value(item.get_item('InvoiceCurrency'));
        $select('NewLegalEntityName').set_value(item.get_item('Legal_x0020_Entity_x0020_Name'));
        $select('NewVATNumber').set_value(item.get_item('VatNumber'));
        $select('NewCity').set_value(item.get_item('WorkCity'));
        $select('NewFirstAddressLine').set_value(item.get_item('Address1'));
        $select('NewSecondAddressLine').set_value(item.get_item('Address2'));
        $select('NewPostalCode').set_value(item.get_item('PostalCode'));
        $select('NewTemsAndConditions').set_value(item.get_item('Terms_x0026_Conditions'));


    }, function (err) {
        Shp.Dialog.ErrorDialog.show('Cannot get country details', err);
    });
}


function SaveCountry() {
    /// <summary>Save country</summary>

    // Validate form
    let errors = 0;
    let controls = ['NewContryCode', 'NewCountryName', 'NewDefaultCurrency',
        'NewLegalEntityName', 'NewVATNumber', 'NewCity',
        'NewFirstAddressLine', 'NewSecondAddressLine', 'NewPostalCode', 'NewTemsAndConditions'];
    for (let i = 0; i < controls.length; i++) {
        if ($select(controls[i]).check_validity() === false) {
            jQuery('#' + controls[i]).addClass('is-invalid');
            errors++;
        }
        else {
            jQuery('#' + controls[i]).removeClass('is-invalid');
        }
    }

    // Exit on validation errors
    if (errors > 0) {
        return;
    }

    var wParent = window.parent;
    var country = {};
    country['ID'] = Shp.Page.GetParameterFromUrl('countryId');
    country['CountryCode'] = $select('NewContryCode').get_value();
    country['Country'] = $select('NewCountryName').get_value();
    country['DefaultCurrency'] = $select('NewDefaultCurrency').get_value();
    country['InvoiceCurrency'] = $select('InvoiceCurrency').get_value();
    country['Legal_x0020_Entity_x0020_Name'] = $select('NewLegalEntityName').get_value();
    country['VatNumber'] = $select('NewVATNumber').get_value();
    country['WorkCity'] = $select('NewCity').get_value();
    country['Address1'] = $select('NewFirstAddressLine').get_value();
    country['Address2'] = $select('NewSecondAddressLine').get_value();
    country['PostalCode'] = $select('NewPostalCode').get_value();
    country['Terms_x0026_Conditions'] = $select('NewTemsAndConditions').get_value();

    Shp.Lists.UpdateItem('Countries', country, null, function (item) {
        wParent.location.href = wParent.top.location.href;
    }, function (err) {
        Shp.Dialog.ErrorDialog.show('Cannot save country details', err);
    });

}


function CloseEdit() {

    let wParent = window.parent;
    wParent.Shp.Dialog.EditFormDialog.hide();
}






