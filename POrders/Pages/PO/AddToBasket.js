
function pageContentLoad(sender, args) {

    var addedPoducts = window.parent.Shp.Dialog.EditFormDialog.get_args();
    jq('#dataTable input[type="checkbox"]').each(function (index) {
        var chk = jQuery(this);
        if(addedPoducts.hasOwnProperty(chk.data('productid')) === true) {
            chk.hide();
        }
    });


    jq('#btnAddToPO').show();



    /*
    jq('#dataTable').DataTable({
        scrollX: true,
        paging: false,
        'aoColumnDefs': [
            { "bSortable": false, "aTargets": [0] }
        ]
    });
    */


}

function selectComponents(chk) {
    /// <summary>Select solution components</summary>
    let el = jq(chk);
    jq('#dataTable input[type="checkbox"][data-componentfor="' + el.data('lineid') + '"]').each(function (index) {
        jq(this).attr('checked', el.is(':checked'));
    });
}


function AddToBasket() {
    /// <summary>Add to basket (adding line in parent window basket)</summary>
    var parentW = window.parent;
    jQuery("table[class*='table'] input[type='checkbox']:checked").each(function () {
        var el = jQuery(this); 
        var line = {
            'Custom Group': el.data('customgroup'),
            'Product ID': el.data('productid'),
            'DART ID': el.data('dartid'),
            'Solution Number': el.data('solutionnumber'),
            'Product Name': el.data('productname'),
            'SKU': el.data('sku'),
            'Billing Model': el.data('billingmodel'),
            'Base Fee': el.data('basefee'),
            'Solution Net Price': el.data('price'),
            'Printer Type': el.data('printertype'),
            'Accessory List': el.data('acclist'),
            'SLA': el.data('sla'),
            'Qty': el.data('qty'),
            'Currency': el.data('currency'),
            'Country': el.data('country'),
            'Mono Click': el.data('monoclick'),
            'Color Click': el.data('colorclick'),
            'Prof Color Click': el.data('profcolorclick'),
            'Upfront Charge': el.data('upfroncharge'),
            'Class': el.data('class'),
            'Monthly Pages': el.data('monthlypages')
        }    
        parentW._AddToBasket(line);
    });
    parentW.Shp.Dialog.EditFormDialog.hide();
}





function Close() {
    /// <summary>Close dialog</summary>
    var parentW = window.parent;
    parentW.Shp.Dialog.EditFormDialog.hide();
}