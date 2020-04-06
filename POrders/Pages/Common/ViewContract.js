
function pageContentLoad(sender, args) {
    alert('here');
    ReadContracts();

}

function ReadContracts() {
    /// <summary>Read contract</summary>

    ReadListSettings().then(function (settings) {

        let url = _spPageContextInfo.webAbsoluteUrl +
            '/_api/SP.AppContextSite(@TargetSite)/web/lists/getByTitle(@TargetLibrary)/items';
        let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);






    }, function (err) {
        Shp.Dialog.err("Error getting settings", err);
    });
}


function ReadListSettings() {
    /// <summary>Read List Settings</summary>
    /// <param name="resolve" type="Function" mayBeNull="false" optional="false">Resolve</param>
    /// <param name="resolve" type="Function" mayBeNull="false" optional="false">Reject</param>

    let promiseObj = new Promise(function (resolve, reject) {
        let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Settings')/items";
        let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        executor.executeAsync({
            url: url,
            method: 'GET',
            headers: { "Accept": "application/json; odata=verbose" },
            error: function (data, errorCode, errorMessage) {
                reject(data.body);
            },
            success: function (results) {
                let settings = {};
                let response = JSON.parse(results.body);
                let rows = response.d.results;
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i]
                    settings[row['Title']] = row['Value1'];
                }
                resolve(settings);
            }
        });
    });

    return promiseObj;
}



