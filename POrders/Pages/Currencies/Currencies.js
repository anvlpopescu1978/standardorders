function pageContentLoad(sender, args) {

    var sortField = Shp.Page.GetParameterFromUrl('SortField') === '' ? 'Title' : Shp.Page.GetParameterFromUrl('SortField');
    var sortDir = Shp.Page.GetParameterFromUrl('SortDir') === '' ? 'Asc' : Shp.Page.GetParameterFromUrl('SortDir');
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


function DeleteCurrency(id) {
    Shp.Dialog.WaittingDialog.show('Deleting currency');
    Shp.Lists.DeleteItem('Currencies', parseInt(id), null, function () {
        RefreshData();
    }, function (err) {
        alert('Cannot delete currency:\n' + err);
        Shp.Dialog.WaittingDialog.hide();
    });
}


function AddNewCurrency() {
    /// <summary>Add new currency</summary>

    // Validate form
    var errors = 0;
    if ($select('NewCurrencyCode').check_validity() === false) {
        jQuery('#NewCurrencyCode').addClass('is-invalid');
        errors++;
    }
    if ($select('NewCurrencyName').check_validity() === false) {
        jQuery('#NewCurrencyName').addClass('is-invalid');
        errors++;
    }
    if (errors > 0) {
        Shp.Dialog.ErrorDialog.show("Invalid form values", "Please complete highlighted fields");
        return;
    }

    Shp.Dialog.WaittingDialog.show("Adding new currency");

    var currency = {};
    currency['Title'] = $select('NewCurrencyCode').get_value();
    currency['CurrencyName'] = $select('NewCurrencyName').get_value();

    Shp.Lists.AddItem('Currencies', currency, null, function (item) {
        RefreshData();
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Cannot add currency", err);
    });
}

function ChangeView() {
    /// <summary>Change view</summary>
    window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Currencies/Currencies.aspx?' + 
        'SortField=' + escapeProperly($select('SortField').get_value()) +
        '&SortDir=' + escapeProperly($select('SortDirection').get_value());
}


function RefreshData() {
    /// <summary>Refresh data</summary>
    __doPostBack('tl00$ContentPlaceHolderMaim$ctl00$ViewCurrencies', '__refresh');
}



function EditProduct(id) {
    /// <summary>Edit product</summary>
    /// <param>Product id</param>

    Shp.Dialog.EditFormDialog.show('Edit', _spPageContextInfo.webAbsoluteUrl + '/Pages/Products/EditProduct.aspx?productId=' + id, null);
}


function UpdateProducts() {
   /// <summary>Update products</summary>

    var errors = 0;
    jQuery('#dataTable tbody input[id*="Qty"]').each(function (index) {
        var el = jQuery(this);
        var inputElement = $select(el.attr('id'));
        if (inputElement.check_validity() === false) {
            el.addClass('is-invalid');
            errors++;
        }
    });

    if (errors > 0) {
        Shp.Dialog.ErrorDialog.show('Invalid data provided', 'Please check if you provided all quantities are values you provided are numbers');
        return;
    }

    Shp.Dialog.WaittingDialog.show("Saving data");

    var products = [];
    jQuery('#dataTable tbody input[id*="Qty"]').each(function (index) {
        var txtInput = jQuery(this);
        var id = txtInput.data('id');
        var product = {};
        product['ID'] = id;
        product['Qty'] = $select(txtInput.attr('id')).get_number();
        products.push(product);
    });

    Shp.Lists.UpdateItems('Products', products, null, function (items) {
        __doPostBack('ctl00$ContentPlaceHolderMaim$ViewProducts', '__refresh');
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Unable to update products', err);
    });
}