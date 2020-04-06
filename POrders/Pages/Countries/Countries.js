function pageContentLoad(sender, args) {

    var sortField = Shp.Page.GetParameterFromUrl('SortField') === '' ? 'CountryCode' : Shp.Page.GetParameterFromUrl('SortField');
    var sortDir = Shp.Page.GetParameterFromUrl('SortDir') === '' ? 'Asc' : Shp.Page.GetParameterFromUrl('SortDir');
    $select('SortField').set_value(sortField);
    $select('SortDirection').set_value(sortDir);

    var tbl = jq('#dataTable').DataTable({
        info: false,
        ordering: false,
        scrollX: true,
        paging: false,
        drawCallback: function () {
            jq('#dataTable button[data-toggle="tooltip"]').tooltip({
                container: 'body'
            });
        },
        fixedColumns: {
            leftColumns: 1
        },
        'aoColumnDefs': [
            { "bSortable": false, "bSearchable": false, "aTargets": [0] }
        ]
    });

}


function DeleteCountry(id) {
    Shp.Dialog.WaittingDialog.show('Deleting country');
    Shp.Lists.DeleteItem('Countries', parseInt(id), null, function () {
        RefreshData();
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot delete country', err);
    });
}


function AddNewCountry() {
    /// <summary>Add new currency</summary>

    // Validate form
    var errors = 0;
    if ($select('NewContryCode').check_validity() === false) {
        jQuery('#NewContryCode').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewContryCode').removeClass('is-invalid');
    }
    if ($select('NewCountryName').check_validity() === false) {
        jQuery('#NewCountryName').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewCountryName').removeClass('is-invalid');
    }
    if ($select('NewDefaultCurrency').check_validity() === false) {
        jQuery('#NewDefaultCurrency').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewDefaultCurrency').removeClass('is-invalid');
    }

    if ($select('NewLegalEntityName').check_validity() === false) {
        jQuery('#NewLegalEntityName').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewLegalEntityName').removeClass('is-invalid');
    }

    if ($select('NewTemsAndConditions').check_validity() === false) {
        jQuery('#NewTemsAndConditions').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewTemsAndConditions').removeClass('is-invalid');
    }

    if ($select('NewVATNumber').check_validity() === false) {
        jQuery('#NewVATNumber').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewVATNumber').removeClass('is-invalid');
    }

    if ($select('NewCity').check_validity() === false) {
        jQuery('#NewCity').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewCity').removeClass('is-invalid');
    }

    if ($select('NewFirstAddressLine').check_validity() === false) {
        jQuery('#NewFirstAddressLine').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewFirstAddressLine').removeClass('is-invalid');
    }

    if ($select('NewSecondAddressLine').check_validity() === false) {
        jQuery('#NewSecondAddressLine').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewSecondAddressLine').removeClass('is-invalid');
    }

    if ($select('NewPostalCode').check_validity() === false) {
        jQuery('#NewPostalCode').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#NewPostalCode').removeClass('is-invalid');
    }


    if (errors > 0) {
        Shp.Dialog.ErrorDialog.show("Invalid form values", "Please complete highlighted fields");
        return;
    }

    Shp.Dialog.WaittingDialog.show("Adding new country");

    var country = {};
    country['CountryCode'] = $select('NewContryCode').get_value();
    country['Country'] = $select('NewCountryName').get_value();
    country['DefaultCurrency'] = $select('NewDefaultCurrency').get_value();
    country['Legal_x0020_Entity_x0020_Name'] = $select('NewLegalEntityName').get_value();
    country['Terms_x0026_Conditions'] = $select('NewTemsAndConditions').get_value();
    country['VatNumber'] = $select('NewVATNumber').get_value();
    country['WorkCity'] = $select('NewCity').get_value();
    country['Address1'] = $select('NewFirstAddressLine').get_value();
    country['Address2'] = $select('NewSecondAddressLine').get_value();
    country['PostalCode'] = $select('NewPostalCode').get_value();
    country['InvoiceCurrency'] = $select('InvoiceCurrency').get_value();   


    Shp.Lists.AddItem('Countries', country, null, function (item) {
        RefreshData();
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Cannot add country", err);
    });
}

function ChangeView() {
    /// <summary>Change view</summary>
    window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Countries/Countries.aspx?' + 
        'SortField=' + escapeProperly($select('SortField').get_value()) +
        '&SortDir=' + escapeProperly($select('SortDirection').get_value());
}


function RefreshData() {
    /// <summary>Refresh data</summary>
    window.location.href = window.top.location.href;
}





function EditCountry(countryId) {
    /// <summary>Add to basket</summary>

    var url = _spPageContextInfo.webAbsoluteUrl + '/Pages/Countries/EditCountry.aspx?countryId=' + countryId;
    Shp.Dialog.EditFormDialog.show("", url, null);
}


