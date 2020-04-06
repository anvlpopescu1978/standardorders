function pageContentLoad(sender, args) {

    //Portlet Icon Toggle
    jq(".portlet-widgets .fa-chevron-down, .portlet-widgets .fa-chevron-up").click(function () {
        jq(this).toggleClass("fa-chevron-down fa-chevron-up");
    });


    let caml = '<View><Query><Where><Eq><FieldRef Name="EntityUser" /><Value Type="Integer"><UserID /></Value></Eq></Where></Query></View>';
    $SPData.GetListItems('Users', caml).then(function (results) {

        if (results.get_count() === 0) {
            Shp.Dialog.ErrorDialog.show("Current user is unregistered", "Current user is unregistered");
            return;
        }

        let item = results.itemAt(0);
        if (item.get_item('Partner') === null || item.get_item('Partner') === '') {
            Shp.Dialog.ErrorDialog.show("Current user does not have a registered partner", "Current user does not have a registered partner");
            return;
        }

        ShowData(item.get_item('Partner'));

    }, function (err) {
        Shp.Dialog.ErrorDialog.show("Cannot get partner information", err);
    });
}


function ExportData() {
    /// <summary>Export data</summary>

    let wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Partner Orders",
        Subject: "Partner Orders"
    }
    wb.SheetNames.push("Orders");
    let ws_data = [['ID', 'Company Name', 'VAT Number', 'Assigned To', 'Status', 'Currency', 'Price', 'Ship To Country', 'Qty']];
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Orders"] = ws;
    let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'orders.xlsx');

}


function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}



function ShowData(partner) {
    /// <summary>Show data</summary>
    GetOrders(partner).then(function (rows) {

        jq('#dataTable').DataTable({
            info: false,
            ordering: true,
            scrollX: false,
            paging: false,
            data: rows,
            columns: [
                {
                    data: null,
                    render: function (d) {
                        let html = '<button onclick="EditPO(' +  d['ID'] + ')" type="button" class="btn btn-sm btn-primary">Edit</button>';
                        return html;
                    }
                },
                { data: 'ID' },
                { data: 'CustomerName' },
                { data: 'VATNumber' },
                {
                    data: null,
                    render: function (d) {
                        html = '';
                        if (d["AssignedTo1"].hasOwnProperty("Title") === true) {
                            return d["AssignedTo1"]["Title"];
                        }
                        return html;
                    }
                },
                { data: 'Phase' },
                { data: 'Currency' },
                { data: 'OData__x0028_Shipto_x0029_Country' },
                { data: 'OData__x0023_Devices' },
                {
                    data: null,
                    render: function (d) {
                        let html = 'No';
                        if (d['Attachments'] === true) {
                            html = 'Yes';
                        }
                        return html;
                    }
                }]
        });


    }, function (err) {
            Shp.Dialog.ErrorDialog.show("Cannot get orders", err);
    });
}




function GetOrders(partner) {
    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Purchase Orders')/items?$top=3000&$expand=AssignedTo1/Title&$select=*,AssignedTo1/Title&$filter=PartnerName eq '" + partner + "'";
    let promise = new Promise(function (resolve, reject) {
        let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        executor.executeAsync({
            url: url,
            method: 'GET',
            headers: { "Accept": "application/json; odata=verbose" },
            error: function (data, errorCode, errorMessage) {
                reject(data.body);
            },
            success: function (results) {
                let response = JSON.parse(results.body);
                let rows = response.d.results;
                resolve(rows);
            }
        });
    });
    return promise;
}


function EditPO(poId) {
    /// <summmary>Edit purchase order</summary>
    /// <param>Purchase Order Id</param>
    var url = _spPageContextInfo.webAbsoluteUrl + '/Pages/Common/EditPO.aspx?poId=' + poId;
    GoToPage(url);
}

