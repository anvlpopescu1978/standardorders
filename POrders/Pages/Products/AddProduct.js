function pageContentLoad(sender, args) {
    /// <summary>Child page load logic</summary>

    jQuery('#ProductPrice').number(true, 2);
    jQuery('#ProductQty').number(true, 0);
}


function GetDefaultCurrency() {
    /// <summary>Get default currency for selected country</summary>
    Shp.Dialog.WaittingDialog.show('Getting default currency');
    var caml = '<View><Query><Where><Eq><FieldRef Name="CountryCode" /><Value Type="Text">' + $select('Country').get_value() + '</Value></Eq></Where></Query></View>';
    Shp.Lists.GetItems('Countries', null, caml, function (items) {
        Shp.Dialog.WaittingDialog.hide();
        if (items.get_count() === 0) {
            $select('ProductCurrency').set_value('');
            return;
        }
        $select('ProductCurrency').set_value(items.itemAt(0).get_item('DefaultCurrency'));
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get default currency', err);
    });
}


function AddProduct() {

    // Validate form
    var errors = 0;
    if ($select('ProductName').check_validity() === false) {
        jQuery('#validateProductName').show();
        errors++;
    }
    else {
        jQuery('#validateProductName').hide();
    }
    if ($select('ProductCode').check_validity() === false) {
        jQuery('#validateProductCode').show();
        errors++;
    }
    else {
        jQuery('#validateProductCode').hide();
    }
    if ($select('Country').check_validity() === false) {
        jQuery('#validateCountry').show();
        errors++;
    }
    else {
        jQuery('#validateCountry').hide();
    }
    if ($select('ProductCurrency').check_validity() === false) {
        jQuery('#validateProductCurrency').show();
        errors++;
    }
    else {
        jQuery('#validateProductCurrency').hide();
    }
    if ($select('ProductSupplier').check_validity() === false) {
        jQuery('#validateProductSupplier').show();
        errors++;
    }
    else {
        jQuery('#validateProductSupplier').hide();
    }
    if ($select('ProductPrice').check_validity() === false) {
        jQuery('#validateProductPrice').show();
        errors++;
    }
    else {
        jQuery('#validateProductPrice').hide();
    }
    if ($select('ProductDescription').check_validity() === false) {
        jQuery('#validateProductDescription').show();
        errors++;
    }
    else {
        jQuery('#validateProductDescription').hide();
    }
    if ($select('ProductQty').check_validity() === false) {
        jQuery('#validateProductQty').show();
        errors++;
    }
    else {
        jQuery('#validateProductQty').hide();
    }
    if (errors > 0) {
        return;
    }
    // End of form validation

    Shp.Dialog.WaittingDialog.show('Adding product');
    var product = {};
    product['ProductName'] = $select('ProductName').get_value();
    product['ProductCode'] = $select('ProductCode').get_value();
    product['ProductDescription'] = $select('ProductDescription').get_value();
    product['Currency'] = $select('ProductCurrency').get_value();
    product['Supplier'] = $select('ProductSupplier').get_value();
    product['Price'] = $select('ProductPrice').get_number();
    product['Qty'] = $select('ProductQty').get_number();
    product['CountryCode'] = $select('Country').get_value();


    Shp.Lists.AddItem('Products', product, null, function (item) {
        if (document.getElementById('productImage').files.length === 0) {
            window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Products/Products.aspx';
            return;
        }
        AttachImage(item);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot add suplier', err);
    });

}


function AttachImage(item) {

    Shp.Attachments.add('Products', item.get_id().toString(), document.getElementById('productImage'), null, function (itemId) {
        window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Products/Products.aspx';
    }, function (err) {
        var errMsg = err + ' Try to add image by editing product details.'
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot add suplier', errMsg, function () {
            window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Products/Products.aspx';
        });
    });

}


