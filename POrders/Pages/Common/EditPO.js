
function pageContentLoad(sender, args, role) {


    if ($select('UserCanWork').get_value() !== 'Yes') {
        jq('#AgreementID').attr('disabled', 'disabled');
    }

    if ($select('POStatus').get_value() === 'Pending approval' || $select('POStatus').get_value() === 'Not approved') {
        jq('#POStatus, #AssignTo').attr('disabled', 'disabled');
    }

    if (jq('#shipToSite').val() !== 'Parner') {
        jq('#InvoiceToSecondAddressLine').parent('td.form-group').hide();
    }

    DisplayAttachments();
    StatusChanged();
    DisplayContracts();

    let getPOData = $SPData.GetListItems('Purchase Orders', '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + Shp.Page.GetParameterFromUrl('poId') + '</Value></Eq></Where></Query></View>');
    Promise.all([getPOData]).then(function (results) {
        let items = results[0];
        let order = items.itemAt(0);


        $select('shipToSite').set_value(order.get_item('ShipTo'));
        $select('CustomerCompanyName').set_value(order.get_item('CustomerName'));
        $select('VATNumber').set_value(order.get_item('VATNumber'));
        $select('SSOWNumber').set_value(order.get_item('SSOWNumber'));
        $select('InvoiceToCountry').set_value(order.get_item('_x0028_Invoiceto_x0029_Country'));
        $select('NewCurrencyField').set_value(order.get_item('InvoiceCurrency'));        
        $select('InvoiceToCurrency').set_value(order.get_item('Currency'));
        $select('InvoiceToCity').set_value(order.get_item('_x0028_Invoiceto_x0029_City'));
        $select('InvoiceToPostalCode').set_value(order.get_item('_x0028_Invoiceto_x0029_PostalCode'));
        $select('InvoiceToFirstAddressLine').set_value(order.get_item('_x0028_Invoiceto_x0029_AddressLine1')); 
        $select('InvoiceToSecondAddressLine').set_value(order.get_item('_x0028_Invoiceto_x0029_AddressLine2'));          
        $select('RequesterEmail').set_value(order.get_item('RequesterEmail'));  
        $select('RequesterName').set_value(order.get_item('RequesterName'));  
        $select('CentreName').set_value(order.get_item('CentreName'));  
        $select('ShipToSecondAddressLine').set_value(order.get_item('_x0028_Shipto_x0029_AddressLine2'));  
        $select('ContactName').set_value(order.get_item('ContactName'));  
        $select('ContactPhone').set_value(order.get_item('ContactPhone')); 
        $select('ContactEmail').set_value(order.get_item('ContactEmail')); 
        $select('ExpectedDeliveryDate').set_value(order.get_item('ExpectedDeliveryDate').format('yyyy-MM-dd')); 
        $select('CustomerRequestedDate').set_value(order.get_item('CustomerRequesstedDate').format('yyyy-MM-dd'));
        $select('ShipToCountry').set_value(order.get_item('_x0028_Shipto_x0029_Country')); 
        $select('ShipToCity').set_value(order.get_item('_x0028_Shipto_x0029_City')); 
        $select('ShipToPostalCode').set_value(order.get_item('_x0028_Shipto_x0029_PostalCode')); 
        $select('ShipToFirstAddressLine').set_value(order.get_item('_x0028_Shipto_x0029_AddressLine1'));     
        $select('CPADate').set_value(order.get_item('CPADate').format('yyyy-MM-dd'));     
        $select('AuthorEmail').set_value(order.get_item('Author').$7_2);

        jq('#ExpectedDeliveryDate').datepicker({
            dateFormat: 'yy-mm-dd'
        }); 


    }, function (err) {
            Shp.Dialog.ErrorDialog.show('Cannot get PO data', err);
    });


}


function DisplayAttachments() {

    Shp.Lists.GetAttachments('Purchase Orders', parseFloat(Shp.Page.GetParameterFromUrl('poId')), null,
        function (results) {
            let html = '';
            for (let i = 0; i < results.length; i++) {
                html += '<tr>' +
                    '<td><button class="btn btn-sm btn-danger" onclick="javascript:DeleteAttachedFile(\'' + results[i]['fileName'] + '\', this)">Delete</button></td>' +
                    '<td><a href="' + results[i]['serverRelativeUrl'] + '" target="_blank">' + results[i]['fileName'] + '</a></td>' +
                    '</tr>';
            }
            jq('#tblAttachments tbody').html(html);
        }, function (err) {

        });

}


function DisplayContracts() {

    let getApprovers = $SPData.GetListItems('Users','<View><Query><Where><Or><Eq><FieldRef Name="Role" /><Value Type="Text">Administrator</Value></Eq><Eq><FieldRef Name="Role" /><Value Type="Text">Approver</Value></Eq></Or></Where></Query></View>');
    Promise.all([getApprovers]).then(function (values) {
        let approvers = values[0];
        for (var k = 0; k < approvers.get_count(); k++) {
            if (approvers.itemAt(k).get_item('EmailAddress') === _spPageContextInfo.userEmail) {
                jq('#btnApprovePO, #btnRejectPO').removeAttr('disabled');
                break;
            }
        }
    });    
}


function DeleteAttachedFile(fileName, btn) {
    Shp.Lists.DeleteAttachments('Purchase Orders', Shp.Page.GetParameterFromUrl('poId'), [fileName], null, 
        function () {
            jq(btn).closest('tr').remove();
        }, function (err) {
            alert('Cannot delete file: ' + err);
        });
}



function AddAttachment() {


    if (document.getElementById('AttachmentsField').files.length === 0) {
        return;
    }

    Shp.Attachments.add('Purchase Orders', Shp.Page.GetParameterFromUrl('poId'), document.getElementById('AttachmentsField'), null,
        function () {
            window.location.href = window.location.href;
        },
        function () {
            alert(err);
        });
}



function StatusChanged() {
    if ($select('POStatus').get_value() === 'New' || $select('POStatus').get_value() === 'Canceled') {
        jQuery('#assignedToRow').hide();
        jQuery('#AssignTo').removeAttr('required');
    }
    else {
        jQuery('#assignedToRow').show();
        jQuery('#AssignTo').attr('required', 'required');
    }

    if ($select('POStatus').get_value() === 'Pending Approval') {

    }
}


function EditPO(poId) {
    /// <summary>Edit PO</summary>

    var errors = 0;

    if ($select('CentreName').check_validity() === false) {
        jQuery('#validateCentreName').show();
        errors++;
    }
    else {
        jQuery('#validateCentreName').hide();
    }

    if ($select('RequesterEmail').check_validity() === false) {
        jQuery('#RequesterEmail').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#RequesterEmail').removeClass('is-invalid');
    }

    if ($select('RequesterName').check_validity() === false) {
        jQuery('#RequesterName').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#RequesterName').removeClass('is-invalid');
    }

    if ($select('ContactName').check_validity() === false) {
        jQuery('#ContactName').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#ContactName').removeClass('is-invalid');
    }

    if ($select('ContactPhone').check_validity() === false) {
        jQuery('#ContactPhone').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#ContactPhone').removeClass('is-invalid');
    }

    if ($select('ShipToSecondAddressLine').check_validity() === false) {
        jQuery('#ShipToSecondAddressLine').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#ShipToSecondAddressLine').removeClass('is-invalid');
    }

    if ($select('ContactEmail').check_validity() === false) {
        jQuery('#ContactEmail').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#ContactEmail').removeClass('is-invalid');
    }

    if ($select('ExpectedDeliveryDate').check_validity() === false) {
        jQuery('#ExpectedDeliveryDate').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#ExpectedDeliveryDate').removeClass('is-invalid');
    }

    if ($select('POStatus').check_validity() === false) {
        jQuery('#POStatus').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#POStatus').removeClass('is-invalid');
    }
    if ($select('AssignTo').check_validity() === false) {
        jQuery('#AssignTo').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#AssignTo').removeClass('is-invalid');
    }
    if ($select('Comments').check_validity() === false) {
        jQuery('#Comments').addClass('is-invalid');
        errors++;
    }
    else {
        jQuery('#Comments').removeClass('is-invalid');
    }

    if (errors > 0) {
        Shp.Dialog.ErrorDialog.show('Invalid form fields', 'Some fields are invalid');
        return;
    }

   

    Shp.Dialog.WaittingDialog.show('Saving data');

    var po = {};
    po['ID'] = poId;
    po["Phase"] = $select('POStatus').get_value();
    po['AgreementID'] = $select('AgreementID').get_value();
    po['AssignedTo1'] = $select('AssignTo').get_value() === '' ? null : new SP.FieldUserValue.fromUser($select('AssignTo').get_value());

    /*
    po['ContactName'] = $select('ContactName').get_value();
    po['ContactPhone'] = $select('ContactPhone').get_value();
    po['ContactEmail'] = $select('ContactEmail').get_value();
    po['CentreName'] = $select('CentreName').get_value(); 
    let expectedDeliveryDate = $select('ExpectedDeliveryDate').get_value();
    po['ExpectedDeliveryDate'] = expectedDeliveryDate.trim() === '' ? null : Date.parseInvariant(expectedDeliveryDate.trim(), 'yyyy-MM-dd');
    po['RequesterName'] = $select('RequesterName').get_value();
    po['RequesterEmail'] = $select('RequesterEmail').get_value();
    po['_x0028_Shipto_x0029_AddressLine2'] = $select('ShipToSecondAddressLine').get_value(); */

    Shp.Lists.UpdateItem('Purchase Orders', po, null, function (item) {
        AddComment(item);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Unable to update purchase order', err); 
    });
}


function AddComment(item) {
    /// <summary>Add comments</summary>
    /// <param>Item</param>

    var comments = {};
    comments['Comments1'] = $select('Comments').get_value();
    comments['ModifiedDate'] = new Date();
    comments['Phase'] = $select('POStatus').get_value();
    comments['PoId'] = item.get_id();

    Shp.Lists.AddItem('Comments', comments, null, function (results) {
        SendEmail(item);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Unable to add comments', err); 
    });
}


function SendEmail(po) {
     /// <summary>Send email</summary>
    let country = po.get_item('_x0028_Invoiceto_x0029_Country');
    let camlQuery = '<View><Query><Where><Eq><FieldRef Name="Country" /><Value Type="Text">' + country + '</Value></Eq></Where></Query></View>';
    Shp.Lists.GetItems('Countries', null, camlQuery, function (items) {
        let countryData = items.itemAt(0);
        _SendEmail(po, countryData);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Unable to send email', err); 
    });
}


function _SendEmail(poData, countryData) {
    /// <summary>Send email (internal)</summary>


    function GetCommentsHistory() {
        let h = '';
        jQuery('#settings ul.callouts li').each(function (index) {
            h += '<div style="width:100%;">' +
                '<i>' + jQuery(this).html().replace(/(<hr.*?>)/gim, '</i><br />') +
                '</div><hr /><br /><br />';
        });
        return h;
    }

    function GetPriceAndQty() {
        var p = 0;
        var q = 0;
        jQuery('#dataTable tbody tr').each(function (index) {
            var tr = jQuery(this);
            var tds = tr.children();
            p += parseFloat(tds.eq(5).text().replace(/','/gim, ''));
            q += parseFloat(tds.eq(7).text().replace(/','/gim, ''));
        });
        return { 'price': p, 'qty': q };
    }

    function GetProductsFromCart_email() {
        var html = '';
        jQuery('#messages #dataTable tbody tr').each(function (index) {
            var tr = jQuery(this);
            var tds = tr.children();
            var className = tds.eq(3).html().trim();
            let bgkColor = className === 'solution' ? "#eeeeee" : "#ffffff";
            html += '<tr>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(0).text() + '</td>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(1).text() + '</td>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(2).text() + '</td>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(3).text() + '</td>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(4).text() + '</td>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(5).text() + '</td>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(8).text() + '</td>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(7).text() + '</td>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(9).text() + '</td>' +
                '<td style="white-space:nowrap; background-color:' + bgkColor + ';">' + tds.eq(10).text() + '</td>' +
                '</tr>'
        });
        return html;
    }

    /// <summary>Add comments</summary>
    var accountingData = GetPriceAndQty();
    var to = [$select('AssignTo').get_value(), $select('AuthorEmail').get_value(), _spPageContextInfo.userLoginName];
    jQuery('#listOfAdministrators tr td').each(function (index) {
        to.push(jQuery(this).html().trim());
    });
    to.push(jq('#AssignTo').attr('data-prevassignedto'));
    let uniqueTo = [];
    jq.each(to, function (i, el) {
        if (jq.inArray(el, uniqueTo) === -1) uniqueTo.push(el);
    });


    var from = _spPageContextInfo.userLoginName;
    var subject = 'Purchase order changed: ' + 'Status ' + $select('POStatus').get_value() + '- Company ' + $select('CustomerCompanyName').get_value() + ' - ' +
        $select('InvoiceToCountry').get_value() + ' - ' +
        jq('#poTotalDevices').text().split('.')[0] + ' devices';
    var body = '';
        // Email Header
    body += '<table style="width: 100%; color:#ffffff; font-family:\'Arial\'">' +
        '<tr>' +
        '<td style="background-color:#ffffff"><img src="https://content.ext.hp.com/sites/ExternalContent/img/HPLogo_White.gif" /></td>' +
        '<td style="background-color:#ffffff; color:#0096D6 ;text-align:center; vertical-align: middle;">' + subject +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="text-align:left; vertical-align: middle; background-color:#0096D6;" colspan="2">' +
        '<a style="color:#ffffff;" href="' + _spPageContextInfo.webAbsoluteUrl + '/Pages/Common/EditPO.aspx?poId=' + Shp.Page.GetParameterFromUrl('poId') + '">Click for details</a>' +
        '</td>' +
        '</tr>' +
        '</table>';
    body += '<table style="width: 100%; background-color:#ffffff; color:#000000; font-family:\'Arial\'">' +

        /* INVOICE DETAILS */
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>Invoicing Details</i></td></tr>' +
        // PO Number
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">MPS Order Portal ID:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_id() + '</td>' +
        '</tr>' +
        // Company name
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Company Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('CustomerName') + '</td>' +
        '</tr>' +
        // Invoice to country
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Country:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('_x0028_Invoiceto_x0029_Country') + '</td>' +
        '</tr>' +
        // Invoice to city
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">City:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('_x0028_Invoiceto_x0029_City') + '</td>' +
        '</tr>' +
        // Invoice to address
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Address Line 1:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('_x0028_Invoiceto_x0029_AddressLine1') + '</td>' +
        '</tr>' +
        // Invoice to postal code
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Postal Code:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('_x0028_Invoiceto_x0029_PostalCode') + '</td>' +
        '</tr>' +
        // VAT number
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">VAT Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('VATNumber') + '</td>' +
        '</tr>' +
        // SSOW Number
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Site Statement of Work Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('SSOWNumber') + '</td>' +
        '</tr>' +
        // CPA Date
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">CPA Date:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + jq('#CPADate').val() + '</td>' +
        '</tr>' +
        // Currency
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Currency:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('Currency') + '</td>' +
        '</tr>' +
        // Invoice Currency
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Invoice Currency:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('InvoiceCurrency') + '</td>' +
        '</tr>' +
        // Term
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Term:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + '60 months' + '</td>' +
        '</tr>' +
        // Requester Name
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Requestor Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('RequesterName') + '</td>' +
        '</tr>' +
        // Requester Email
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Requestor Email:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('RequesterEmail') + '</td>' +
        '</tr>' +
        /// HP Affiliate
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>HP Affiliate</i></td></tr>' +
        // HP Legal Entity
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Company Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + countryData.get_item('Legal_x0020_Entity_x0020_Name') + '</td>' +
        '</tr>' +
        // HP VAT No
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">VAT Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('VATNumber') + '</td>' +
        '</tr>' +
        // HP Country
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Country:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + countryData.get_item('Country') + '</td>' +
        '</tr>' +
        // HP City
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">City:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + countryData.get_item('WorkCity') + '</td>' +
        '</tr>' +
        // HP Address Line
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Address:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + countryData.get_item('Address1') + '</td>' +
        '</tr>' +
        // HP Postal Code
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Postal Code:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + countryData.get_item('PostalCode') + '</td>' +
        '</tr>' +
        /* SHIP TO */
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>Ship To</i></td></tr>' +
        // Ship To
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Ship To:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;"><b>' + jq('#shipToSite').val() + '</b></td>' +
        '</tr>' +
        // Partner Address
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Partner Address:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('_x0028_Invoiceto_x0029_AddressLine2') + '</td>' +
        '</tr>' +
        /// SITE ADDRESS
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>Site Address</i></td></tr>' +
        // Centre Name
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Site Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('CentreName').get_value() + '</td>' +
        '</tr>' +
        // Contact Name
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Site Contact Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('ContactName') + '</td>' +
        '</tr>' +
        // Contact Phone
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Site Contact Phone:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('ContactPhone') + '</td>' +
        '</tr>' +
        // Contact Email
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Site Contact E-Mail:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('ContactEmail') + '</td>' +
        '</tr>' +
        // Expected Delivery Date
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Expected Install Date:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('ExpectedDeliveryDate').format('yyyy-MM-dd') + '</td>' +
        '</tr>' +
        // Customer Requested Date
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Requested Delivery Date:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('CustomerRequesstedDate').format('yyyy-MM-dd') + '</td>' +
        '</tr>' +
        // Country
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Country:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('_x0028_Shipto_x0029_Country') + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">City:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('_x0028_Shipto_x0029_City') + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Postal Code:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('_x0028_Shipto_x0029_PostalCode') + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Address Line:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poData.get_item('_x0028_Shipto_x0029_AddressLine1') + '</td>' +
        '</tr>' +
        // OTHER
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>Other</i></td></tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Assigned To:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('AssignTo').get_text() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Comments:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('Comments').get_value() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Terms & Conditions:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + countryData.get_item('Terms_x0026_Conditions') + '</td>' +
        '</tr>' +
        '</table><br /><br />';  
        /* Fleet table */
    body += '<table style="width: 100%; font-family:\'Arial\'">' +
        '<thead>' +
        '<tr>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Custom Group</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Product<br />Name</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">SKU</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Class</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Currency</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Qty</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">HW Price Charge<br />(Per Device)</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Base Fee<br />(Per Device)</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Mono<br />Click</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Color<br />Click</td>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        GetProductsFromCart_email() +
        '</tbody>' +
        '<tfoot>' +
        '<tr>' +
        '<td colspan="5"></td>' +
        '<td style="background-color:#0096D6; color:#fff">' + jq('#poTotalDevices').html() + '</td>' +
        '<td style="background-color:#0096D6; color:#fff">' + jq('#poUpfrontCharge').html() + '</td>' +
        '<td colspan="2"></td>' +
        '</tr>' +
        '</tfoot>' +
        '</table>';



    var emailProperties = new Shp.Utility.EmailProperties(uniqueTo, from, subject, body);
    Shp.Utility.Email.SendEmail(emailProperties, function (data) {
        GoBackToSource();
    });

}



function PrintContract(settings) {
    /// <summary>Print contract</summary>
    /// <param name="settings" type="Object">Settings</name>


    function _ChooseTemplate(rows) {

        let _options = '';
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let fileUrl = row['ServerRelativeUrl'];
            let fileTitle = row['ServerRelativeUrl'].split('/');
            _options += '<option value="' + fileUrl + '">' + fileTitle[fileTitle.length - 1] + '</option>';
        }

        let html = '<div class="form-group">' +
            '<select id="templateSelector" class="form-control">' +
            _options +
            '</select>' +
            '</div>';

        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.PromptDialog.show("Choose contract template", html, function () {
            _downloadSelectedContract(jQuery('#templateSelector').val());
        });

    }

    function _downloadSelectedContract(contractUrl) {
        Shp.Dialog.PromptDialog.hide();
        Shp.Dialog.WaittingDialog.show('Prepare contract to be saved');

        let getHPData = $SPData.GetListItems('Countries', '<View><Query><Eq><FieldRef Name="Country" /><Value Type="Text">' + $select('InvoiceToCountry').get_value() + '</Value></Eq></Query></View>');
        let getContract = function () {
            return new Promise(function (resolve, reject) {
                jQuery.post(contractUrl, '', function (response) {
                    resolve(response);
                }).fail(function () {
                    reject('Cannot get template data');
                });
            });
        };

        Promise.all([getHPData, getContract()]).then(function (values) {
            let hp = values[0].itemAt(0);
            let invoice_address = $select('InvoiceToFirstAddressLine').get_value() +
                ' ' + $select('InvoiceToSecondAddressLine').get_value() +
                ', ' + $select('InvoiceToCity').get_value() +
                ', ' + $select('InvoiceToCountry').get_value() +
                ', ' + $select('InvoiceToPostalCode').get_value();
            let shipto_address = $select('ShipToFirstAddressLine').get_value() +
                ' ' + $select('ShipToSecondAddressLine').get_value() +
                ', ' + $select('ShipToCity').get_value() +
                ', ' + $select('ShipToCountry').get_value() +
                ', ' + $select('ShipToPostalCode').get_value();
            let hp_address = hp.get_item('Address1') +
                ' ' + hp.get_item('Address1') +
                ', ' + hp.get_item('WorkCity') +
                ', ' + hp.get_item('Country') +
                ', ' + hp.get_item('PostalCode');

            let preview = values[1].replace('{{SSOW Contract No}}', jq('#SSOWNumber').val())
                .replace('{{Country}}', jq('#InvoiceToCountry').val())
                .replace('{{Currency}}', jq('#InvoiceToCurrency').val())
                .replace('{{Currency}}', jq('#InvoiceToCurrency').val())
                .replace('{{Qty}}', jq('#poTotalDevices').html())
                .replace('{{HP Address}}', hp_address)
                .replace('{{Customer Address}}', shipto_address)
                .replace('{{Customer Legal Entity}}', jq('#CustomerCompanyName').val())
                .replace('{{Price}}', jq('#poTotalPrice').html())
                .replace('{{VAT Number}}', jq('#VATNumber').val())
                .replace('{{Invoice Address}}', invoice_address)
                .replace('{{HP Legal Entity}}', hp.get_item('Legal_x0020_Entity_x0020_Name'))
                .replace('{{Issuance Date}}', (new Date()).format('yyyy-MM-dd'));
            let parser = new DOMParser();
            let content = parser.parseFromString(preview, 'text/html');
            content.getElementById('fleetTableBody').innerHTML = CreateFleet();
            content = '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml>' + content.documentElement.innerHTML + '</html>';

            Shp.Dialog.WaittingDialog.hide();
            Shp.Dialog.PromptDialog.show('Contract preview', content, function () {
                let blob = new Blob([content], { type: 'application/html' });
                // Settings are provided, it means is sent to external location
                if (settings) {
                    _SaveToExternalLocation(content, settings);
                }
                else {
                    let URL = window.URL || window.webkitURL;
                    let downloadUrl = URL.createObjectURL(blob);
                    let downloadLink = document.createElement("a");
                    document.body.appendChild(downloadLink);
                    downloadLink.href = downloadUrl;
                    downloadLink.download = 'document.html';
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            }); 
        });           

    }



    Shp.Dialog.WaittingDialog.show("Getting templates data");
    let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('HPTemplates')/RootFolder/Files/";
    executor.executeAsync({
        url: url,
        method: 'GET',
        headers: { "Accept": "application/json; odata=verbose" },
        error: function (data, errorCode, errorMessage) {
            Shp.Dialog.WaittingDialog.hide();
            Shp.Dialog.ErrorDialog.show('Cannot get templates', data.body);
        },
        success: function (results) {
            let response = JSON.parse(results.body);
            let rows = response.d.results;
            _ChooseTemplate(rows);
        }
    });
}





function ReadListSettings(resolve, reject) {
    /// <summary>Read List Settings</summary>
    /// <param name="resolve" type="Function" mayBeNull="false" optional="false">Resolve</param>
    /// <param name="resolve" type="Function" mayBeNull="false" optional="false">Reject</param>

    let promiseObj = new Promise(function (resolve, reject) {
        let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Settings')/items";
        let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        let promiseObj = new Promise(function (resolve, reject) {
            executor.executeAsync({
                url: url,
                method: 'GET',
                headers: { "Accept": "application/json; odata=verbose" },
                error: function (data, errorCode, errorMessage) {
                    reject(errorMessage);
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
    });

    return promiseObj
}



function ViewContract() {
    /// <summary>View contract</summary>

     function ReadSettings() {
        let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Settings')/items";
        let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        let promiseObj = new Promise(function (resolve, reject) {
            executor.executeAsync({
                url: url,
                method: 'GET',
                headers: { "Accept": "application/json; odata=verbose" },
                error: function (data, errorCode, errorMessage) {
                    reject(errorMessage);
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

    ReadSettings().then(function (settings) {
        Shp.Dialog.EditFormDialog.show("View Contracts", _spPageContextInfo.webAbsoluteUrl +
            '/Pages/Common/ViewContract.aspx?prefix=' +
            settings['File Prefix'] + '_' + Shp.Page.GetParameterFromUrl('poId') + '_');
    });

}


function SaveToExternalLocation2() {
    Shp.Dialog.PromptDialog.show('Contract to be sent to sigurature',
        'Please confirm you are sure to send the contract to be signed',
        function () {
            SaveToExternalLocation2();
        });
}

function SaveToExternalLocation() {
    /// <summary>Save to external location</summary>

    function ReadSettings() {
        let url = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Settings')/items";
        let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        let promiseObj = new Promise(function (resolve, reject) {
            executor.executeAsync({
                url: url,
                method: 'GET',
                headers: { "Accept": "application/json; odata=verbose" },
                error: function (data, errorCode, errorMessage) {
                    reject(errorMessage);
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

    ReadSettings().then(function (settings) {
        PrintContract(settings);
    }, function (err) {
        Shp.Dialog.ErrorDialog.show('Cannot get template information', err);
    });


    return;
     
    function ReadFile() {
        var deffered = jQuery.Deferred();
        var html = GetCustomerData();
        var blob = new Blob([html]);

        var reader = new FileReader();
        reader.onload = function (e) {
            deffered.resolve(e.target.result);
        };
        reader.readAsBinaryString(blob);
        return deffered.promise();
    }

    ReadFile().then(function (fileContent) {

        // Read settings file
        let url = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.AppContextSite(@TargetSite)/web/lists/getByTitle(@TargetLibrary)/items?" +
            "@TargetSite='" + settings["List URL"] + "'" +
            "&@TargetLibrary='" + settings["List Name"]; 
        let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
        executor.executeAsync({
            url: url,
            method: 'GET',
            headers: { "Accept": "application/json; odata=verbose" },
            error: function (data, errorCode, errorMessage) {
                alert('Error');
            },
            success: function (results) {
                let settings = {};
                let response = JSON.parse(results.body);
                let rows = response.d.results;
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i]
                    settings[row['Title']] = row['Value1'];
                }
                _SaveToExternalLocation(fileContent, settings);
            }
        });

    });
}


function _SaveToExternalLocation(fileContent, settings) {

    let url = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.AppContextSite(@TargetSite)/web/lists/getByTitle(@TargetLibrary)/RootFolder/files/add(url=@TargetFileName,overwrite='true')?" +
        "@TargetSite='" + settings["List URL"] + "'" +
        "&@TargetLibrary='" + settings["List Name"] + "'" +
        "&@TargetFileName='" + settings["File Prefix"] + "_" + Shp.Page.GetParameterFromUrl("poId") +  "_" + "contract.html" + "'";
    let executor = new SP.RequestExecutor(_spPageContextInfo.webAbsoluteUrl);
    executor.executeAsync({
        url: url,
        method: 'POST',   
        binaryStringRequestBody: true,
        body: fileContent,
        headers: { "Accept": "application/json; odata=verbose" },
        error: function (data, errorCode, errorMessage) {
            Shp.Dialog.ErrorDialog.show('File to load file to location', data.body);
        },
        success: function () {
            window.top.location.href = window.location.href;
            // Do nothing in case of success
        }
    });
}


function toBin(str) {
    var st, i, j, d;
    var arr = [];
    var len = str.length;
    for (i = 1; i <= len; i++) {
        //reverse so its like a stack
        d = str.charCodeAt(len - i);
        for (j = 0; j < 8; j++) {
            arr.push(d % 2);
            d = Math.floor(d / 2);
        }
    }
    //reverse all bits again.
    return arr.reverse().join("");
}


function GoBackToSource() {
    var source = Shp.Page.GetParameterFromUrl('Source');
    if (source !== '') {
        __doPostBack('ctl00$ContentPlaceHolderMaim$MyOrders', '__redirectsource');
    }
    else {
        if ($select('UserIsAdmin').get_value() === "Yes") {
            window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Administration/PurchaseOrders.aspx';
        }
        else if ($select('UserCanWork').get_value() === "Yes") {
            window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Team/PurchaseOrders.aspx';
        }
        else {
            window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/PO/MyOrders.aspx';
        }
    }
}


function GetCustomerData() {

    var customerData = '';
    customerData += '';
    customerData += '<table style="width: 100%; color:#000000; font-family:\'Arial\'">';
    /* Company name, VAT number, currency */
    customerData += '<tr>' +
        // Company name
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Company Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('CustomerCompanyName').get_value() + '</td>' +
        '</tr>' +
        // VAT number
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">VAT Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('VATNumber').get_value() + '</td>' +
        '</tr>' +
        // Currency
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Currency:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToCurrency').get_value() + '</td>' +
        '</tr>';
    /* Invoice to address */
    customerData += '<tr><td  colspan="2" style="background-color:#EEEEEE; border-bottom:1px #EEEEEE solid;">Invoice To Address</td></tr>';
        // Invoice to country
    customerData += '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Country:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToCountry').get_value() + '</td>' +
        '</tr>' +
        // Invoice to city
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">City:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToCity').get_value() + '</td>' +
        '</tr>' +
        // Invoice to postal code
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Portal Code:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToPostalCode').get_value() + '</td>' +
        '</tr>' +
        // Invoice to address 1
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Address:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToFirstAddressLine').get_value() + '</td>' +
        '</tr>';
    /* Ship to address */
    customerData += '<tr><td  colspan="2" style="background-color:#EEEEEE; border-bottom:1px #EEEEEE solid;">Ship To Address</td></tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Country:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('ShipToCountry').get_value() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">City:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('ShipToCity').get_value() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Postal Code:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('ShipToPostalCode').get_value() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Address Line:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('ShipToFirstAddressLine').get_value() + '</td>' +
        '</tr>' +
        '<tr>';
    customerData += '</table><br /><br />';
    /* Fleet table */
    customerData += '<table style="width: 100%; font-family:\'Arial\'">' +
        '<thead>' +
        '<tr>' +
        '<td style="height:22px; color:#ffffff; background-color:#2e2e2e; vertical-align: middle; width: 200px;">Product<br />Name</td>' +
        '<td style="height:22px; color:#ffffff; background-color:#2e2e2e; vertical-align: middle; width: 200px;">Product<br />Code</td>' +
        '<td style="height:22px; color:#ffffff; background-color:#2e2e2e; vertical-align: middle; width: 200px;">Supplier</td>' +
        '<td style="height:22px; color:#ffffff; background-color:#2e2e2e; vertical-align: middle; width: 200px;">Qty</td>' +
        '<td style="height:22px; color:#ffffff; background-color:#2e2e2e; vertical-align: middle; width: 200px;">Price/Unit</td>' +
        '<td style="height:22px; color:#ffffff; background-color:#2e2e2e; vertical-align: middle; width: 200px;">Price</td>' +
        '<td style="height:22px; color:#ffffff; background-color:#2e2e2e; vertical-align: middle; width: 200px;">Currency</td>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        // TODO: add basket here
        '</tbody>' +
        '</table>';

    return customerData;

}


function CreateFleet() {
    let html = '<tbody>';
    jq('#messages #dataTable tbody tr').each(function (index) {
        let tr = jQuery(this);
        let tds = tr.children();
        let className = tds.eq(3).text().trim();
        let bkgColor = className === 'solution' ? '#eeeeee' : '#ffffff';

        html += '<tr>' +
            // Product Name
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(1).text() + '</td>' +
            // SKU
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(2).text() + '</td>' +
            // Class
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + className + '</td>' +
            // Currency
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(4).text() + '</td>' +
            // Qty
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(5).text() + '</td>' +
            // Billing Model
            '<td style="display: none; border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(6).text() + '</td>' +
            // Base Fee
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(7).text() + '</td>' +
            // Upfront Charge
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(8).text() + '</td>' +
            // Mono Click
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(9).text() + '</td>' +
            // Color Click
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(10).text() + '</td>' +
            // Prof. Color Click
            '<td style="display: none; border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(11).text() + '</td>' +
            // Monthly Pages
            '<td style="border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(13).text() + '</td>' +
            // Price
            '<td style="display: none; border-bottom:1px #000000 solid; background-color:' + bkgColor + '">' + tds.eq(12).text() + '</td>' +
            '</tr>';
    });
    return html;
}


function Approve(isApproved) {

    Shp.Dialog.WaittingDialog.show('Saving data');

    let saveTicket, addPOId, sendEmail, addComments;
    let comments = {};
    comments['Comments1'] = $select('Comments').get_value();
    comments['ModifiedDate'] = new Date();
    comments['Phase'] = $select('POStatus').get_value();
    comments['PoId'] = Shp.Page.GetParameterFromUrl('poId');

    let tos = [], emailBody, emailSubject;
    jQuery('#listOfAdministrators tr td').each(function (index) {
        tos.push(jQuery(this).html().trim());
    });

    let ticket = {
        'Phase': isApproved === true ? 'Approved' : 'Not approved',
        'ID': Shp.Page.GetParameterFromUrl('poId')
    };
    let po = {
        'POID': $select('AgreementID').get_value()
    };


    // Define email variables
    tos.push($select('AuthorEmail').get_value());
    if (ticket['Phase'] === 'Approved') {
        emailSubject = 'Purchase order approved: ' + 'Status ' + ticket['Phase'] + '- Company ' + $select('CustomerCompanyName').get_value() + ' - ' +
            $select('InvoiceToCountry').get_value() + ' - ' +
            jq('#poTotalDevices').text().split('.')[0] + ' devices';
    }
    else {
        emailSubject = 'Purchase order not approved: ' + 'Status ' + ticket['Phase']  + '- Company ' + $select('CustomerCompanyName').get_value() + ' - ' +
            $select('InvoiceToCountry').get_value() + ' - ' +
            jq('#poTotalDevices').text().split('.')[0] + ' devices';
    }

    emailBody  = '<table style="width: 100%; color:#ffffff; font-family:\'Arial\'">' +
        '<tr>' +
        '<td style="background-color:#ffffff"><img src="https://content.ext.hp.com/sites/ExternalContent/img/HPLogo_White.gif" /></td>' +
        '<td style="background-color:#ffffff; color:#0096D6 ;text-align:center; vertical-align: middle;">' + emailSubject +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="text-align:left; vertical-align: middle; background-color:#0096D6;" colspan="2">' +
        '<a style="color:#ffffff;" href="' + _spPageContextInfo.webAbsoluteUrl + '/Pages/Common/EditPO.aspx?poId=' + Shp.Page.GetParameterFromUrl('poId') + '">Click for details</a>' +
        '</td>' +
        '</tr>' +
        '</table>';
    emailBody += '<table style="width: 100%; background-color:#ffffff; color:#000000; font-family:\'Arial\'">' +
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">PO Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + Shp.Page.GetParameterFromUrl('poId') + '</td>' +
        '</tr>' +
        // PO ID
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">PO ID:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('AgreementID').get_value() + '</td>' +
        '</tr>' +
        // SSOW Number
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">SSOW Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('SSOWNumber').get_value() + '</td>' +
        '</tr>' +
        // Currency
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Currency:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToCurrency').get_value()  + '</td>' +
        '</tr>' +
        /// CUSTOMER AFFILIATE
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>Customer Affiliate</i></td></tr>' +
        // Requester Name
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Requestor Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('RequesterName').get_value() + '</td>' +
        '</tr>' +
        // Requester Email
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Requestor Email:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('RequesterEmail').get_value() + '</td>' +
        '</tr>' +
        // Company name
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Company Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('CustomerCompanyName').get_value() + '</td>' +
        '</tr>' +
        // VAT number
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">VAT Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('VATNumber').get_value() + '</td>' +
        '</tr>' +
        // Invoice to country
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Country:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToCountry').get_value() + '</td>' +
        '</tr>' +
        // Invoice to city
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">City:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToCity').get_value()  + '</td>' +
        '</tr>' +
        // Invoice to address 1
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Address Line:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToFirstAddressLine').get_value()  + '</td>' +
        '</tr>' +
        // OTHER
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>Other</i></td></tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Assigned To:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('AssignTo').get_text() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Comments:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('Comments').get_value() + '</td>' +
        '</tr>' +
        '</table><br /><br />';
    // End of Define email variables



    // Is approved
    if (isApproved == true) {
        saveTicket = $SPData.UpdateItem('Purchase Orders', ticket);
        addPOId = $SPData.AddItem('POIDS', po);
        addComments = $SPData.AddItem('Comments', comments);
        Promise.all([saveTicket, addPOId, addComments]).then(function (results) {
            let emailProperties = new Shp.Utility.EmailProperties(tos, _spPageContextInfo.userEmail, emailSubject, emailBody);
            Shp.Utility.Email.SendEmail(emailProperties, function (data) {
                GoBackToSource();
            });
        }, function (err) {
            Shp.Dialog.WaittingDialog.hide();
            Shp.Dialog.ErrorDialog.show('Error saving data', err);
        });
    }
    // Not approved
    else {
        saveTicket = $SPData.UpdateItem('Purchase Orders', ticket);
        addComments = $SPData.AddItem('Comments', comments);
        Promise.all([saveTicket, addComments]).then(function (results) {
            let emailProperties = new Shp.Utility.EmailProperties(tos, _spPageContextInfo.userEmail, emailSubject, emailBody);
            Shp.Utility.Email.SendEmail(emailProperties, function (data) {
                GoBackToSource();
            });
        }, function (err) {
            Shp.Dialog.WaittingDialog.hide();
            Shp.Dialog.ErrorDialog.show('Error saving data', err);
        });
    }

}