function pageContentLoad(sender, args) {
    /// <summary>Child page load logic</summary>

    jQuery('#ProductPrice').number(true, 2);
    jQuery('#ProductQty').number(true, 0);

    Shp.Lists.GetAttachments('Products', parseInt(Shp.Page.GetParameterFromUrl('productId')), null, function(files) {
        jQuery('#loadingImage').hide();

        if (files.length === 0) {
            return;
        }

        var _innerHTML = '';
        var _html = "";

        for (var k = 0; k < files.length; k++) {
            var file = files[k];
            var cls = (k === 0) ? 'item active' : 'item';
            _innerHTML += '<div class="' + cls + '">' +
                            '<img src="' + file['serverRelativeUrl'] + '" style="width: 300px; height: 200px; margin-left: auto; margin-right: auto;" />' +
                '</div>' +
                '<div style="display:block; text-align: center; width:100%; padding:10px 0px">' +
                '<button type="button" class="btn btn-danger btn-xs" onclick="javascript:DeleteAttachedFile(\'' + file['fileName'] + '\')">Delete</button>' +
                '</div>';
        }

        _html = '<div id="myCarousel" class="carousel slide" data-ride="carousel">' +
                    '<div class="carousel-inner">' + _innerHTML + '</div>' +
                    '<a class="left carousel-control" href="#myCarousel" data-slide="prev">' +
                        '<span class="fa fa-arrow-left"></span>' +
                        '<span class="sr-only">Previous</span>' +
                    '</a>' +
                    '<a class="right carousel-control" href="#myCarousel" data-slide="next">' +
                         '<span class="fa fa-arrow-right"></span>' +
                         '<span class="sr-only">Next</span>' +
                     '</a>' +
                '</div>';
        jQuery('#imagePlaceHolder').html(_html);
        jQuery('#imagePlaceHolder').css('display', 'block');
        jQuery('#imagePlaceHolder').css('height', '200px');
        jQuery('#imagePlaceHolder').show();

    }, function(err) {
        alert('Cannot get attachments');
        jQuery('#loadingImage').hide();
    });

}


function DeleteAttachedFile(fileName) {
    Shp.Dialog.WaittingDialog.show('Deleting attached files');
    Shp.Lists.DeleteAttachments('Products', Shp.Page.GetParameterFromUrl('productId'), [fileName], null, function () {
        Shp.Dialog.WaittingDialog.hide();
        RefreshData();
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Error deleting attached image', err);
    });
}


function EditProduct() {

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
    product['ID'] = Shp.Page.GetParameterFromUrl('productId');
    product['ProductName'] = $select('ProductName').get_value();
    product['ProductCode'] = $select('ProductCode').get_value();
    product['ProductDescription'] = $select('ProductDescription').get_value();
    product['Currency'] = $select('ProductCurrency').get_value();
    product['Supplier'] = $select('ProductSupplier').get_value();
    product['Price'] = $select('ProductPrice').get_number();
    product['Qty'] = $select('ProductQty').get_number();

    Shp.Lists.UpdateItem('Products', product, null, function (item) {
        AttachImage(item);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        alert('Cannot add product:\n' + err);
    });
}


function AttachImage(item) {

    Shp.Attachments.add('Products', item.get_id().toString(), document.getElementById('productImage'), null, function (itemId) {
        var confirmation = confirm('Do you want to continue editing product');
        if (confirmation) {
            AddToCountPostBack();
            window.RefreshData();
        }
        else {
            window.parent.RefreshData();
        }
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        alert('Cannot attach image:\n' + err);
    });

}



function RefreshData() {
    __doPostBack('tl00$ContentPlaceHolderMaim$ctl00$EditProduct', '__refresh');
}


function CloseModal() {
    if (parseInt($select('CountPostBack').get_value()) > 0) {
        window.parent.RefreshData();
        window.parent.Shp.Dialog.EditFormDialog.hide();
    }
    else {
        window.parent.Shp.Dialog.EditFormDialog.hide();
    }
}


function AddToCountPostBack() {
    var p = parseInt($select('CountPostBack').get_value());
    p++;
    $select('CountPostBack').set_value(p.toString());

}