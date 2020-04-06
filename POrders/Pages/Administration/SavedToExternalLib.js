function pageContentLoad(sender, args) {

    
    // Getting settings store in the list
    Shp.Dialog.WaittingDialog.show('Getting saved values');
    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Settings')/items";
    let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
    executor.executeAsync({        
        url: url,
        method: 'GET',
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (results) {
            let response = JSON.parse(results.body);
            let rows = response.d.results;
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i]
                switch (row['Title']) {
                    case 'Signed Contracts Location':
                        jQuery('#SignedContractLocation').data('itemid', row['ID']).val(row['Value1']);
                        break;
                    case 'List Name':
                        jQuery('#LibraryName').data('itemid', row['ID']).val(row['Value1']);
                        break;
                    case 'List URL':
                        jQuery('#SiteLocation').data('itemid', row['ID']).val(row['Value1']);
                        break;
                    case 'File Prefix':
                        jQuery('#FilePrefix').data('itemid', row['ID']).val(row['Value1']);
                        break;
                }
            }

            Shp.Dialog.WaittingDialog.hide();
        },
        error: function (data, errorCode, errorMessage) {
            alert('Error');
        }
    });

}



function SaveSettings() {

    Shp.Dialog.WaittingDialog.show('Saving form values');
    var items = [{ ID: jQuery('#LibraryName').data('itemid'), Value1: jQuery('#LibraryName').val() },
        { ID: jQuery('#SiteLocation').data('itemid'), Value1: jQuery('#SiteLocation').val() },
        { ID: jQuery('#SignedContractLocation').data('itemid'), Value1: jQuery('#SignedContractLocation').val() },
        { ID: jQuery('#FilePrefix').data('itemid'), Value1: jQuery('#FilePrefix').val() }];

    Shp.Lists.UpdateItems('Settings', items, null, function (results) {
        window.top.location.href = window.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot save settings', err);
    });

}


