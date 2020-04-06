function pageContentLoad(sender, args) {

    jQuery('#dataTable a').tooltipster({
        trigger: 'click',
        contentAsHTML: true,
        interactive: true,
        theme: 'tooltipster-shadow',
        functionBefore: function (instance, helper) {
            var $origin = jQuery(helper.origin);
            var poId = $origin.attr('data-id');
            if (Boolean($origin.data('loaded')) !== true) {
                Shp.Lists.GetAttachments('Products', parseInt(poId), null, function (attachments) {
                    if (attachments.length === 0) {
                        instance.content('No image found');
                        $origin.data('loaded', true);
                        return;
                    }

                    var html = '';
                    for (var k = 0; k < attachments.length; k++) {
                        html += '<div class="mySlides">' +
                            '<img src="' + attachments[k].serverRelativeUrl + '" style="width:100px; height: 100px">' +
                            '</div>';
                    }
                    instance.content('<div class="slideshow-container">' + html + '</div>');

                },
                    function (err) {
                        instance.content('Cannot get images:' + err);
                        $origin.data('loaded', true);
                    });
            }
        }
    });

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
            { "bSortable": false, "bSearchable": false, "aTargets": [0] },
            { "bSortable": false, "bSearchable": false, "aTargets": [5] }
        ]
    });

    tbl.responsive.recalc();

    $('#dataTable').on('order.dt', function (e, settings) {

    });

}


function DeleteProduct(id) {
    Shp.Dialog.WaittingDialog.show('Deleting product');
    Shp.Lists.DeleteItem('Products', parseInt(id), null, function () {
        RefreshData();
    }, function (err) {
        alert('Cannot delete product:\n' + err);
        Shp.Dialog.WaittingDialog.hide();
    });
}

function ChangeView() {
    window.top.location.href =_spPageContextInfo.webAbsoluteUrl + '/Pages/Products/Products.aspx?' + 
        'SortField=' + escapeProperly($select('SortField').get_value()) +
        '&SortDir=' + escapeProperly($select('SortDirection').get_value());
}


function RefreshData() {
    __doPostBack('tl00$ContentPlaceHolderMaim$ctl00$ViewProducts', '__refresh');
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