function pageContentLoad(sender, args) {
    /// <summary>Page content load logic</summary>

    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('HPTemplates')/RootFolder/Files/";
    let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);

    executor.executeAsync({
        url: url,
        method: 'GET',
        headers: { "Accept": "application/json; odata=verbose" },
        error: function (data, errorCode, errorMessage) {
            Shp.Dialog.ErrorDialog.show('Cannot get templates', data.body);
        },
        success: function (results) {
            let response = JSON.parse(results.body);
            let rows = response.d.results;
            ShowResults(rows);
        }
    });

}

function ShowResults(rows) {
    var tabledata = [];
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let fileTitle = row['ServerRelativeUrl'].split('/');
        tabledata.push({
            Id: row["Id"],
            Url: row['ServerRelativeUrl'],
            Title: fileTitle[fileTitle.length - 1]
        });
    }

    jq('#dataTable').DataTable({
        data: tabledata,
        searching: false,
        info: false,
        ordering: false,
        scrollX: true,
        paging: false,
        columns: [
            {
                data: function (row) {
                    return '<button class="btn btn-xs btn-danger" onclick="javascript:DeleteTemplate(\'' + row['Url'] + '\')">Delete</button>';
                }
            },
            {
                data: function (row) {
                    return '<a href="' +  row['Url'] + '" target="_blank">' + row['Title'] + '</a>';
                }
            }
        ]
    });
}


function DeleteTemplate(serverRelativeUrl) {

    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + serverRelativeUrl+ "')";
    let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);

    executor.executeAsync({
        url: url,
        method: 'POST',       
        headers: {
            "Accept": "application/json; odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-HTTP-Method": "DELETE",
            "If-Match": "*"
         },
        error: function (data, errorCode, errorMessage) {
            Shp.Dialog.ErrorDialog.show('Cannot delete template', data.body);
        },
        success: function () {
            window.top.location.href = window.location.href;
        }
    });

}


function UploadTemplate() {
    /// <summary>Upload template</summary>

    function ReadFile() {
        let deffered = jQuery.Deferred();
        let input = document.getElementById("templateLocator");
        let parts = jQuery('#templateLocator')[0].value.split('\\');
        let file = input.files[0];
        let fileName = parts[parts.length - 1];
        let reader = new FileReader();
        reader.onload = function (e) {
            deffered.resolve(e.target.result, fileName);
        };
        reader.readAsBinaryString(file);
        return deffered.promise();

    }

    ReadFile().then(function (fileContent, fileName) {


        let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        let url = _spPageContextInfo.webAbsoluteUrl +
            "/_api/web/lists/getByTitle('HPTemplates')/RootFolder/Files/add(url='" + fileName + "',overwrite='true')";

        executor.executeAsync({
            method: 'POST',
            url: url,
            binaryStringRequestBody: true,
            body: fileContent,
            headers: { "Accept": "application/json; odata=verbose" },
            success: function () {
                window.top.location.href = window.location.href;
            },
            error: function (data, errorCode, errorMessage) {
                Shp.Dialog.ErrorDialog.show('Cannot get templates', data.body);
            }
        });
     
    });

}









