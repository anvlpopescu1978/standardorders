let termsAndCond = '';
let hpInfo = {};
let agreementFound = false;
let orderFound = false;

function pageContentLoad(sender, args) {
    jq('#InvoiceToCurrency, #InvoiceC').attr('disabled', 'disabled');
    jq('#ExpectedDeliveryDate').datepicker({
        minDate: 10,
        dateFormat: 'yy-mm-dd'
    });
}



function GetCustomerDetails() {

    Shp.Dialog.WaittingDialog.show('Getting legal entity data');
    ResetCustomerData();
    var customerName = $select('CustomerCompanyName').get_value();
    var caml = '<<View><Query><FieldRef Name="Legal_x0020_Entity_x0020_Name" Ascending="TRUE" /><OrderBy></OrderBy><Where><Eq><FieldRef Name="Legal_x0020_Entity_x0020_Name" /><Value Type="Text">' + customerName + '</Value></Eq></Where></Query></View>';

    Shp.Lists.GetItems('LegalEntities', null, caml, function (items) {
        var item = items.itemAt(0);
        $select('VATNumber').set_value(item.get_item('VaTNumber'));
        $select('InvoiceToCurrency').set_value(item.get_item('Country'));
        $select('InvoiceToCity').set_value(item.get_item('WorkCity'));
        $select('InvoiceToPostalCode').set_value(item.get_item('PostalCode'));
        $select('InvoiceToFirstAddressLine').set_value(item.get_item('AddressLine1'));
        $select('InvoiceToSecondAddressLine').set_value(item.get_item('AddressLine2'));
        $select('SSOWNumber').set_value(item.get_item('SSOWNumber'));
        // jq('#CPADate').val(item.get_item('CPADate').format('yyyy-MM-dd'));
        if (item.get_item('CPADate') !== null) {
            $select('CPADate').set_value(item.get_item('CPADate').format('yyyy-MM-dd'));
        }


        GetDefaultCurrency();
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get legal entities details', err);
    });
}



function AttachFile(item) {

    Shp.Attachments.add('Purchase Orders', item.get_id().toString(), document.getElementById('AttachmentsField'), null,
        function () {
         _createComments(item)
        },
        function () {
            alert(err);
        });
}




function GetCustomersList() {
    var country = $select('InvoiceToCountry').get_value();
    if (country === '') {
        ResetCustomerData();
        return;
    }

    var caml = '<<View><Query><FieldRef Name="Legal_x0020_Entity_x0020_Name" Ascending="TRUE" /><OrderBy></OrderBy><Where><Eq><FieldRef Name="Country" /><Value Type="Text">' + country + '</Value></Eq></Where></Query></View>';
    Shp.Lists.GetItems('LegalEntities', null, caml, function (items) {

        // Reset existing data
        ResetCustomerData();
        jq('#CustomerCompanyName').find('option').remove().end();
        $select('CustomerCompanyName').set_value('');

        if (items.get_count() === 0) {
            return;
        }

        jQuery('#CustomerCompanyName').append(jQuery(new Option('', '')));
        for (let i = 0; i < items.get_count(); i++) {
            let item = items.itemAt(i);
            let option = new Option(item.get_item('Legal_x0020_Entity_x0020_Name'), item.get_item('Legal_x0020_Entity_x0020_Name'));
            jQuery('#CustomerCompanyName').append(jQuery(option));
        }



    }, function (err) {
        Shp.Dialog.ErrorDialog.show('Cannot get legal entities list', err);
    });
}


function ResetCustomerData() {
    $select('VATNumber').set_value('');
    $select('InvoiceToCurrency').set_value('');
    $select('InvoiceToCity').set_value('');
    $select('InvoiceToPostalCode').set_value('');
    $select('InvoiceToFirstAddressLine').set_value('');
    $select('InvoiceToSecondAddressLine').set_value('');
    $select('ShipToCountry').set_value('');
    $select('ShipToCity').set_value('');
    $select('ShipToPostalCode').set_value('');
    $select('ShipToFirstAddressLine').set_value('');
    $select('ShipToSecondAddressLine').set_value('');

}


function CopyToShipTo() {
    /// <summary>Copy data to ship to section</summary>
    $select('ShipToCountry').set_value($select('InvoiceToCountry').get_value());
    $select('ShipToCity').set_value($select('InvoiceToCity').get_value());
    $select('ShipToPostalCode').set_value($select('InvoiceToPostalCode').get_value());
    $select('ShipToFirstAddressLine').set_value($select('InvoiceToFirstAddressLine').get_value());
    $select('ShipToSecondAddressLine').set_value($select('InvoiceToSecondAddressLine').get_value());
}


function ValidateForm() {
    var errors = 0;


    if ($select('shipToSite').check_validity() === false) {
        jQuery('#validateshipToSite').show();
        errors++;
    }
    else {
        jQuery('#validateshipToSite').hide();
    }

    if ($select('CentreName').check_validity() === false) {
        jQuery('#validateCentreName').show();
        errors++;
    }
    else {
        jQuery('#validateCentreName').hide();
    }

    if ($select('RequesterName').check_validity() === false) {
        jQuery('#validateRequesterName').show();
        errors++;
    }
    else {
        jQuery('#validateRequesterName').hide();
    }

    if ($select('RequesterEmail').check_validity() === false) {
        jQuery('#validateRequesterEmail').show();
        errors++;
    }
    else {
        jQuery('#validateRequesterEmail').hide();
    }

    if ($select('ContactName').check_validity() === false) {
        jQuery('#validateContactName').show();
        errors++;
    }
    else {
        jQuery('#validateContactName').hide();
    }


    if ($select('ContactPhone').check_validity() === false) {
        jQuery('#validateContactPhone').show();
        errors++;
    }
    else {
        jQuery('#validateContactPhone').hide();
    }

    if ($select('ContactEmail').check_validity() === false) {
        jQuery('#validateContactEmail').show();
        errors++;
    }
    else {
        jQuery('#validateContactEmail').hide();
    }

    if ($select('ExpectedDeliveryDate').check_validity() === false) {
        jQuery('#validateExpectedDeliveryDate').show();
        errors++;
    }
    else {
        jQuery('#validateExpectedDeliveryDate').hide();
    }


    if ($select('CustomerCompanyName').check_validity() === false) {
        jQuery('#validateCustomerCompanyName').show();
        errors++;
    }
    else {
        jQuery('#validateCustomerCompanyName').hide();
    }

    if ($select('VATNumber').check_validity() === false) {
        jQuery('#validateVATNumber').show();
        errors++;
    }
    else {
        jQuery('#validateVATNumber').hide();
    }

    if ($select('InvoiceToCountry').check_validity() === false) {
        jQuery('#validateInvoiceToCountry').show();
        errors++;
    }
    else {
        jQuery('#validateInvoiceToCountry').hide();
    }

    if ($select('InvoiceToCurrency').check_validity() === false) {
        jQuery('#validateInvoiceToCurrency').show();
        errors++;
    }
    else {
        jQuery('#validateInvoiceToCurrency').hide();
    }


    if ($select('InvoiceToCity').check_validity() === false) {
        jQuery('#validateInvoiceToCity').show();
        errors++;
    }
    else {
        jQuery('#validateInvoiceToCity').hide();
    }

    if ($select('InvoiceToPostalCode').check_validity() === false) {
        jQuery('#validateInvoiceToPostalCode').show();
        errors++;
    }
    else {
        jQuery('#validateInvoiceToPostalCode').hide();
    }

    if ($select('InvoiceToFirstAddressLine').check_validity() === false) {
        jQuery('#validateInvoiceToFirstAddressLine').show();
        errors++;
    }
    else {
        jQuery('#validateInvoiceToFirstAddressLine').hide();
    }

    if ($select('ShipToCountry').check_validity() === false) {
        jQuery('#validateShipToCountry').show();
        errors++;
    }
    else {
        jQuery('#validateShipToCountry').hide();
    }

    if ($select('ShipToCity').check_validity() === false) {
        jQuery('#validateShipToCity').show();
        errors++;
    }
    else {
        jQuery('#validateShipToCity').hide();
    }

    if ($select('ShipToPostalCode').check_validity() === false) {
        jQuery('#validateShipToPostalCode').show();
        errors++;
    }
    else {
        jQuery('#validateShipToPostalCode').hide();
    }

    if ($select('ShipToFirstAddressLine').check_validity() === false) {
        jQuery('#validateShipToFirstAddressLine').show();
        errors++;
    }
    else {
        jQuery('#validateShipToFirstAddressLine').hide();
    }

    if ($select('POComments').check_validity() === false) {
        jQuery('#validatePOComments').show();
        errors++;
    }
    else {
        jQuery('#validatePOComments').hide();
    }


    if ($select('ShipToSecondAddressLine').check_validity() === false) {
        jQuery('#validateShipToSecondAddressLine').show();
        errors++;
    }
    else {
        jQuery('#validateShipToSecondAddressLine').hide();
    }
    

    jQuery('#basketTable tbody input[type="number"]').each(function (index) {
        var el = jQuery(this);
        var inputElement = $select(el.attr('id'));
        if (inputElement.check_validity() === false) {
            errors++;
            el.addClass('is-invalid');
            el.data('toogle', 'tooltip');
            el.attr('title', 'Value not in rage');
        }
        else {
            el.removeClass('is-invalid');
            el.removeData('toogle');
            el.removeAttr('title');
        }

    });

    return errors;
}


function GetDefaultCurrency(legalEntityInfo) {
    /// <summary>Get default currency for selected country</summary>

    ClearBasket();
    var cc = $select('InvoiceToCountry').get_value();
    var caml = '<View><Query><Where><Eq><FieldRef Name="Country" /><Value Type="Text">' + cc + '</Value></Eq></Where></Query></View>';
    Shp.Lists.GetItems('Countries', null, caml, function (items) {
        Shp.Dialog.WaittingDialog.hide();
        if (items.get_count() === 0) {
            $select('InvoiceToCurrency').set_value('');
            termsAndCond = '';
            return;
        }
        $select('InvoiceToCurrency').set_value(items.itemAt(0).get_item('DefaultCurrency'));
        $select('InvoiceC').set_value(items.itemAt(0).get_item('DefaultCurrency'));


        termsAndCond = items.itemAt(0).get_item('Terms_x0026_Conditions');
        hpInfo = items.itemAt(0);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot get default currency', err);
    });

}


function ClearBasket() {
    /// <summary>Clear basket</summary>
    jQuery('#basketTable tbody').html('');
}


function RemoveFromBasket(el) {
    /// <summary>Remove product from basket</summary>
    jQuery(el).parent().parent().remove();
}


function AddToBasket() {
    /// <summary>Add to basket</summary>

    var args = {};
    jQuery('#basketTable tbody tr').each(function (index) {
        args[jQuery(this).data('productid')] = true;
    });

    var url = _spPageContextInfo.webAbsoluteUrl + '/Pages/PO/AddToBasket.aspx?country=' + escapeProperly($select('InvoiceToCountry').get_value()) + '&currency=' + escapeProperly($select('InvoiceToCurrency').get_value());
    Shp.Dialog.EditFormDialog.show("", url, args);
}


function _AddToBasket(line) {
    /// <summary>Add to basket internal method</summary>
    /// <param name="line">Line</param>

    function DrawButton() {
        let html = '';
        if (line['Class'] === 'solution') {
            html = '<button type="button" class="btn btn-xs btn-danger" onclick="javascript:_removeFromBasket(this)">Remove</button>';
        }
        return html;
    }

    function SetShow() {
        let html = '';
        //  if (line['Class'] !== 'solution' && line['Class'] !== 'printer' && line['Class'] !== 'accessory') {
        if (line['Class'] !== 'solution' && line['Class'] !== 'printer' && line['Class'] !== 'accessory') {
            html = 'style="display:none"';
        }
        return  html;
    }

    function generateRowAtrr(rowAttr) {
        return 'data-solution="' + rowAttr['Solution Number'] + '" data-customgroup="' + rowAttr['Custom Group'] + '"  data-productid="' + rowAttr['Product ID'] + '" data-initialqty="' + rowAttr['Qty'] + '"';

    }

   // let html = '<tr ' + SetShow() + ' ' + generateRowAtrr(line) + ' class="printer">' +

    let html = '<tr ' + SetShow() + ' ' + generateRowAtrr(line) + ' class="' + line['Class'] + '" data-price="' + line['Solution Net Price'] + '">' +
        '<td>' + DrawButton() + '</td> ' +
        //index 1
        '<td>' + line['Custom Group'] + '</td>' +
        // index 2
        '<td>' + line['Product Name'] + '</td>' +
        //index 3
        '<td>' + line['SKU'] + '</td>' +
        //index 4
        '<td>' + line['Class'] + '</td>' +
        // index 5
        '<td style="display:none">' + (line['Class'] === 'solution' ? line['Billing Model'] : '<span style="display:none">' + line['Billing Model'] + '</span>') + '</td>' +
        // index 6
        '<td>' + (line['Class'] === 'solution' ? line['Base Fee'] : '<span style="display:none">' + line['Base Fee'] + '</span>') + '</td>' +
        // index 7
        '<td>' + (line['Class'] === 'solution' ? line['Upfront Charge'] : '<span style="display:none">' + line['Upfront Charge'] + '</span>') + '</td>' +
        // index 8
        '<td style="display:none">' + (line['Class'] === 'solution' ? line['Solution Net Price'] : '<span style="display:none">' + line['Solution Net Price'] + '</span>') + '</td>' +
        // index 9
        '<td>' + (line['Class'] === 'solution' ? line['Currency'] : '<span style="display:none">' + line['Currency'] + '</span>') + '</td>' +
        // index 10
        '<td>' + '<input type="number" ' + ((line['Class'] === 'solution') ? '' : 'disabled="disabled"') + ' min="1"  value="1" style="min-width:100px" class="form-control" required="required" id="qty' + line['Product ID'] + 'control" />' + '</td>' +
       // '<td>' + '<input type="number" ' + ((line['Class'] === 'solution') ? '' : 'disabled="disabled"') + ' min="1" value="1" style="min-width:100px" class="form-control" required="required" id="qty' + line['Product ID'] + 'control" />' + '</td>' +
        // index 11
        '<td>' + (line['Class'] === 'solution' ? line['Mono Click'] : '<span style="display:none">' + line['Mono Click'] + '</span>') + '</td>' +
        // index 12
        '<td>' + (line['Class'] === 'solution' ? line['Color Click'] : '<span style="display:none">' + line['Color Click'] + '</span>') + '</td>' +
        // index 13
        '<td style="display:none">' + (line['Class'] === 'solution' ? line['Prof Color Click'] : '<span style="display:none">' + line['Prof Color Click'] + '</span>') + '</td>' +
        // index 14
        '<td style="display:none">' + (line['Class'] === 'solution' ? line['Printer Type'] : '<span style="display:none">' + line['Printer Type'] + '</span>') + '</td>' +
        // index 15
        '<td>' + (line['Class'] === 'solution' ? line['SLA'] : '<span style="display:none">' + line['SLA'] + '</span>') + '</td>' +    
        // index 16
        '<td style="display:none">' + (line['Class'] === 'solution' ? line['Monthly Pages'] : '<span style="display:none">' + line['Monthly Pages'] + '</span>') + '</td>' +  
        '</tr>';


    jQuery('#basketTable tbody').append(jQuery(html));
}


function _removeFromBasket(element) {
    let solutionNumber = jq(element).parent().parent().data('solution');
    jq('#basketTable tbody tr[data-solution="' + solutionNumber + '"]').remove();
}



function CreatePO() {
    /// <summary>First we get partner name for current user</summary>

    if (ValidateForm() > 0) {
        jq('#basketTable tbody input[type="number"][data-toggle="tooltip"]').tooltip();
        return;
    }

    if (jq('#basketTable tbody tr').length === 0) {
        Shp.Dialog.warningDialog.show("No product added to basket", "Please add at least one product to basket to continue");
        return;
    }

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

        Shp.Dialog.PromptDialog.show("Terms & Conditions", termsAndCond.split("\n").join("<br />"), function () {
            $select('termsAndConditions').set_value(termsAndCond);
            Shp.Dialog.PromptDialog.hide();
            _CreatePO(item.get_item('Partner'));
        });

    }, function (err) {
            Shp.Dialog.ErrorDialog.show("Cannot get partner information", err);
    });
}



function _CreatePO(partner) {
    /// <summary>Create purchase order</summary>
    Shp.Dialog.WaittingDialog.show('Create purchase order');

    var po = {};
    po['PartnerName'] = partner;
    po['CentreName'] = $select('CentreName').get_value();
    po['CustomerName'] = $select('CustomerCompanyName').get_value();
    po['VATNumber'] = $select('VATNumber').get_value();
    po['_x0028_Invoiceto_x0029_Country'] = $select('InvoiceToCountry').get_value();
    po['Currency'] = $select('InvoiceToCurrency').get_value();
    po['InvoiceCurrency'] = $select('InvoiceC').get_value();
    po['_x0028_Invoiceto_x0029_City'] = $select('InvoiceToCity').get_value();
    po['_x0028_Invoiceto_x0029_PostalCode'] = $select('InvoiceToPostalCode').get_value();
    po['_x0028_Invoiceto_x0029_AddressLine1'] = $select('InvoiceToFirstAddressLine').get_value();
    po['_x0028_Shipto_x0029_Country'] = $select('ShipToCountry').get_value();
    po['_x0028_Shipto_x0029_City'] = $select('ShipToCity').get_value();
    po['_x0028_Shipto_x0029_PostalCode'] = $select('ShipToPostalCode').get_value();
    po['_x0028_Shipto_x0029_AddressLine1'] = $select('ShipToFirstAddressLine').get_value();
    po['_x0028_Shipto_x0029_AddressLine2'] = $select('ShipToSecondAddressLine').get_value();
    po['ContactName'] = $select('ContactName').get_value();
    po['ContactPhone'] = $select('ContactPhone').get_value();
    po['ContactEmail'] = $select('ContactEmail').get_value();
    po['ShipTo'] = jq('#shipToSite').val();
    if(jq('#shipToSite').val() === 'Partner') {
        po['_x0028_Invoiceto_x0029_AddressLine2'] = $select('InvoiceToSecondAddressLine').get_value();
    }

    let expectedDeliveryDate = $select('ExpectedDeliveryDate').get_value();
    po['ExpectedDeliveryDate'] = expectedDeliveryDate.trim() === '' ? null : Date.parseInvariant(expectedDeliveryDate.trim(), 'yyyy-MM-dd');
    po['SSOWNumber'] = $select('SSOWNumber').get_value();
    if ($select('CPADate').get_value() !== '') {
        po['CPADate'] = $select('CPADate').get_date('yyyy-MM-dd');
    }  
    po['TermsandConditions'] = jq('#termsAndConditions').val().trim();
    po['AgreementID'] = $select('AgreementID').get_value();
    po['RequesterName'] = $select('RequesterName').get_value();
    po['RequesterEmail'] = $select('RequesterEmail').get_value();
    if (expectedDeliveryDate.trim() !== '') {
        let customerRequestedDate = Date.parseInvariant(expectedDeliveryDate.trim(), 'yyyy-MM-dd');
        po['CustomerRequesstedDate'] = new Date(customerRequestedDate.setDate(customerRequestedDate.getDate() - 7));
    }
    po["Phase"] = 'New';
    
    Shp.Lists.AddItem('Purchase Orders', po, null, function (item) {
        if (document.getElementById("AttachmentsField").files.length === 0) {
            _createComments(item);
        }
        else {
            AttachFile(item);           
        }        
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show("Cannot create purchase order", err);
    });

}

function _createComments(po) {
    var comments = {};
    comments['POComments'];
    comments['Comments1'] = $select('POComments').get_value().trim() === '' ? 'No comments added' : $select('POComments').get_value();
    comments['PoId'] = po.get_id();
    Shp.Lists.AddItem('Comments', comments, null, function (results) {
        _attachBasket(po);
    }, function (err) {
    });
}


function _attachBasket(item) {
    /// <summary>Attach shopping cart to basket</summary>

    
    var products = [];
    var price = 0;
    var devices = 0;

    var solutionQty;
    jQuery('#basketTable tbody tr').each(function (index) {
        var tr = jQuery(this);
        var product = {};
        var tds = tr.children();
        // index 1
        product['DartID'] = tr.data('solution');
        // index 2
        product['ProductName'] = tds.eq(2).text();
        // index 3
        product['SKU'] = tds.eq(3).text();
        // index 4
        product['Class'] = tds.eq(4).text();
        // index 5       
        product['BillingModel'] = tds.eq(5).text();
        // index 6
        product['BaseFee'] = tds.eq(6).text().replace(/,/gim,'');
        // index 7 
        product['UpfrontCharge'] = tds.eq(7).text().replace(/,/gim, '');
        // index 8
        product['SolutionNetPrice'] = tds.eq(8).text().replace(/,/gim, '');
        // index 9
        product['Currency'] = tds.eq(9).text();
        // index 10
        product['Qty'] = tds.eq(10).find('input').val();
        // index 11
        product['MonoClick'] = tds.eq(11).text();
        // index 12
        product['ColorClick'] = tds.eq(12).text();
        // index 13
        product['ProfColorClick'] = tds.eq(13).text();
        // index 14
        product['PrinterType'] = tds.eq(14).text();
        // index 15
        product['SLA'] = tds.eq(15).text();
        // index 16
        product['MonthlyPages'] = tds.eq(16).text();

        product['CustomGroup'] = tr.data('customgroup');

       // product['ProductID'] = tr.data('productid');
        product['OrderID'] = item.get_id();
        product['SolutionNumberOrdering'] = AddSuffix(product['Class']);
        product['SolutionNumber'] = tr.data('solution');

        if (product['Class'] === 'solution') {
            solutionQty = parseFloat(product['Qty']);
            price += parseFloat(jq(this).data('price')) * solutionQty;
            devices += solutionQty;            
        }

        /*
        if (product['Class'] === 'printer') {
            devices += parseFloat(product['Qty']) * solutionQty;
        } */
        
        products.push(product);
    });

    Shp.Lists.AddItems('HPBasket', products, null, function (items) {
        _updatePO(item.get_id(), price, devices);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Error adding products to basket', err);
    });

}

function _updatePO(poId, price, devices) {

    var po = {};
    po['ID'] = poId;
    po['TotalPrice'] = price;
    po['_x0023_Devices'] = devices;

    Shp.Lists.UpdateItem('Purchase Orders', po, null, function (item) {
        _updateStock(poId);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot update price', err);
    });

}

function _updateStock(poId) {
    var products = [];
    jQuery('#basketTable tbody tr').each(function (index) {
        var tr = jQuery(this);
        var tds = tr.children();
        if (tds.eq(4).text().trim() === 'solution') {
            var product = {};
            product['ID'] = tr.data('productid');
            product['Qty'] = parseFloat(tr.data('initialqty')) - parseFloat(tds.eq(10).find('input').val());
            products.push(product);
        }    
    });

    if (products.length === 0) {
        _sendEmail(poId);
        return;
    }


    Shp.Lists.UpdateItems('HPCatalogue', products, null, function (items) {
        _sendEmail(poId);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot update stock', err);
    });
}

function _sendEmail(poId) {
    /// <summary>Send Email</summary>
    /// <param name="poId">Purchase Order Id</param>

    function GetPriceAndQty() {
        var p = 0;
        var q = 0;
        let temp_solutionQty = 0;
        let temp_class = '';

        jQuery('#basketTable tbody tr').each(function (index) {
            var tr = jQuery(this);
            var tds = tr.children();
            temp_class = tds.eq(4).text();

            // Is solution
            if (temp_class.trim().toLowerCase() === 'solution') {
                temp_solutionQty = parseFloat($select('qty' + tr.data('productid') + 'control').get_value());
                let temp_p = parseFloat(tds.eq(6).text());
                p += temp_p * temp_solutionQty;
                q += temp_solutionQty;
            }

            // Is printer
            /*
            if (temp_class.trim().toLowerCase() === 'printer') {
                let temp_q = parseFloat($select('qty' + tr.data('productid') + 'control').get_value()) *
                    temp_solutionQty;
                q += temp_q;
            }  */
            
           
          
        });
        return { 'price': p, 'qty': q};
    }

    function GetToEmailAddress() {
        // Get email address to send email to
        var tos = [];
        jQuery('#UsersTable tbody tr').each(function (index) {
            var tr = jQuery(this);
            var userRole = tr.children().eq(4).text().trim();
            var acceptedUserRoles = ['Approver', 'Administrator'];
            if (Array.contains(acceptedUserRoles, userRole) === true) {
                tos.push(tr.children().eq(1).text());
            }
        });
        tos.push(_spPageContextInfo.userLoginName);
        tos.push('IWG.EMEA.orderdesk@hp.com');
        return tos;
    }


    var fleet = GetProductsFromCart_email();
    var accountingData = GetPriceAndQty();
    var to = GetToEmailAddress();
    var expectedDeliveryDate = Date.parseInvariant($select('ExpectedDeliveryDate').get_value(), 'yyyy-MM-dd');
    var customerRequestedDate = new Date(expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() - 7));

    var from = _spPageContextInfo.userLoginName;
    var subject_prefix = 'New purchase order:';
    var subject = subject_prefix + ' ' + 'Company ' + $select('CustomerCompanyName').get_value() + ' - ' +
        $select('InvoiceToCountry').get_value() + ' - ' +
         accountingData['qty'] + ' devices';


    var body = '<table style="width: 100%; color:#ffffff; font-family:\'Arial\'">' +
        '<tr>' +
        '<td style="background-color:#ffffff"><img src="https://content.ext.hp.com/sites/ExternalContent/img/HPLogo_White.gif" /></td>' +
        '<td style="background-color:#ffffff; color:#0096D6 ;text-align:center; vertical-align: middle;">' + subject +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="text-align:left; vertical-align: middle; background-color:#0096D6;" colspan="2">' +
        '<a style="color:#ffffff;" href="' + _spPageContextInfo.webAbsoluteUrl + '/Pages/Common/EditPO.aspx?poId=' + poId + '">Click for details</a>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '<table style="width: 100%; color:#000000; font-family:\'Arial\'">' +
    /* INVOICE DETAILS */
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>Invoicing Details</i></td></tr>' +

        // PO Number
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">MPS Order Portal ID:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + poId + '</td>' +
        '</tr>' +

        // Company name
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Company Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('CustomerCompanyName').get_value() + '</td>' +
        '</tr>' +

        // Invoice to country
        '<tr>' +
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

        // Invoice to address
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Address Line 1:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToFirstAddressLine').get_value() + '</td>' +
        '</tr>' +

        // VAT number
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">VAT Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('VATNumber').get_value() + '</td>' +
        '</tr>' +

        // SSOW Number
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">SSOW Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('SSOWNumber').get_value() + '</td>' +
        '</tr>' +

        // CPA Date
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">CPA Date:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + jq('#CPADate').val() + '</td>' +
        '</tr>' +

        // Currency
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Currency:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceToCurrency').get_value() + '</td>' +
        '</tr>' +

        // Invoice Currency
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Invoice Currency:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('InvoiceC').get_value() + '</td>' +
        '</tr>' +

        // Term
        '<tr>' +
        '<td style="background-color:#EEEEEE; height:22px; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Term:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + '60 months' + '</td>' +
        '</tr>' +

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

        /*  HP Affiliate */
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>HP Affiliate</i></td></tr>' +

        // HP Legal Entity
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Company Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + hpInfo.get_item('Legal_x0020_Entity_x0020_Name') + '</td>' +
        '</tr>' +

        // HP VAT No
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">VAT Number:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + jq('#VATNumber').val() + '</td>' +
        '</tr>' +

        // HP Country
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Country:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + hpInfo.get_item('Country') + '</td>' +
        '</tr>' +

        // HP City
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">City:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + hpInfo.get_item('WorkCity') + '</td>' +
        '</tr>' +

        // HP Address Line 1
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Address:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + hpInfo.get_item('Address1') + '</td>' +
        '</tr>' +

        // HP Postal Code
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Postal Code:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + hpInfo.get_item('PostalCode') + '</td>' +
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
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + jq('#InvoiceToSecondAddressLine').val() + '</td>' +
        '</tr>' +


        /// SITE ADDRESS
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>Site Address</i></td></tr>' +

        // Centre Contact Name 
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Site Contact Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('ContactName').get_value() + '</td>' +
        '</tr>' +

        // Centre Name
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Site Name:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('CentreName').get_value() + '</td>' +
        '</tr>' +

        // Contact Phone
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Site Contact Phone:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('ContactPhone').get_value() + '</td>' +
        '</tr>' +

        // Contact Email
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Site Contact E-Mail:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('ContactEmail').get_value() + '</td>' +
        '</tr>' +

        // Expected Delivery Date
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Expected Install Date:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('ExpectedDeliveryDate').get_date('yyyy-MM-dd').split('T')[0] + '</td>' +
        '</tr>' +

        // Customer Requested Date
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Requested Delivery  Date:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + customerRequestedDate.format('yyyy-MM-dd') + '</td>' +
        '</tr>' +

        // Country
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
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Address Line 1:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('ShipToFirstAddressLine').get_value() + '</td>' +
        '</tr>' +
        // OTHER
        '<tr><td  colspan="2" style="background-color:#EEEEEE; color:#000000; border-bottom:1px #EEEEEE solid;"><i>Other</i></td></tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Assigned To:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;"></td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Comments:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + $select('POComments').get_value() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="height:22px; background-color:#EEEEEE; color:#000000; vertical-align: middle; width: 200px; border-bottom:1px #EEEEEE solid;">Terms & Conditions:</td>' +
        '<td style="height: 22px; color:#000000; vertical-align: middle; border-bottom:1px #EEEEEE solid;">' + hpInfo.get_item('Terms_x0026_Conditions') + '</td>' +
        '</tr>' +
        '</table><br /><br />' +
        '<table style="width: 100%; font-family:\'Arial\'">' +
        '<thead>' +
        '<tr>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Custom Group</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Product Name</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">SKU</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Class</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">HW Price<br />(Per Device)</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Base Fee<br />(Per Device)</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Currency</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Qty</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Mono Click</td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle; width: 200px;">Color Click</td>' +
         '</tr>' +
        '</thead>' +
        '<tbody>' +
        fleet['html'] +
        '</tbody>' +
        '<tfoot>' +
        '<tr>' +
        '<td colspan="4"></td>' +
        // Upfront charge total
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle;">' + fleet['upfrontCharge'] + '</td>' +
        '<td colspan="2"></td>' +
        '<td style="height:22px; background-color:#0096D6; color:#ffffff; vertical-align: middle;">' + fleet['qty'] + '</td>' +
        '<td colspan="2"></td>' +
        '</tr>' +
        '</tfoot>' +
        '</table>';


       
    var emailProperties = new Shp.Utility.EmailProperties(to, from, subject, body);
    Shp.Utility.Email.SendEmail(emailProperties, function (data) {
        window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/PO/MyOrders.aspx';
    });

}


function GetProductsFromCart_email() {
    // Get product from cart
    var html = '';
    var price = 0;
    var solutionQty = 0;
    var totalQty = 0;
    var totalBaseFee = 0;
    var totalUpfrontCharge = 0;

    jQuery('#basketTable tbody tr').each(function (index) {
        var tr = jQuery(this);
        var tds = tr.children();
        var clsName = tds.eq(4).text();
        var cls = tds.eq(4).text() === 'solution' ? '#eeeeee' : '#ffffff';

        if (clsName === 'solution') {
            solutionQty = parseFloat(tds.eq(10).find('input').val());
        }

        if (clsName === 'solution' || clsName === 'printer' || clsName === 'accessory') {
            var qty = clsName === 'solution' ? parseFloat(tds.eq(10).find('input').val()) :
                parseFloat(tds.eq(10).find('input').val()) * solutionQty;
            var currentPrice = parseFloat(tds.eq(8).text().replace(/,/gim, '')) * qty;
            html += '<tr>' +
                // Custom Group 
                '<td style="white-space: nowrap; background-color:' + cls + '">' + (clsName === 'solution' ? tr.data('customgroup') : '') + '</td>' +
                // Product Name : index 2
                '<td style="white-space: nowrap; background-color:' + cls + '">' + tds.eq(2).text() + '</td>' +
                // SKU : index 3
                '<td style="white-space: nowrap; background-color:' + cls + '">' + tds.eq(3).text() + '</td>' +
                // Class : index 4
                '<td style="white-space: nowrap; background-color:' + cls + '">' + tds.eq(4).text() + '</td>' +
                // Upfront-charge  : index 7
                '<td style="white-space: nowrap; background-color:' + cls + '">' + (clsName === 'solution' ? tds.eq(7).text() : '') + '</td>' +
                // Base fee : index 5
                '<td style="white-space: nowrap; background-color:' + cls + '">' + (clsName === 'solution' ? tds.eq(6).text() : '') + '</td>' +

                // Currency : index 9
                '<td style="white-space: nowrap; background-color:' + cls + '">' + (clsName === 'solution' ? tds.eq(9).text() : '') + '</td>' +
                // Qty : index 10
                '<td style="white-space: nowrap; background-color:' + cls + '">' + qty + '</td>' +
                // Mono Click
                '<td style="white-space: nowrap; background-color:' + cls + '">' + (clsName === 'solution' ? tds.eq(11).text() : '') + '</td>' +
                // Color Click
                '<td style="white-space: nowrap; background-color:' + cls + '">' + (clsName === 'solution' ? tds.eq(12).text() : '') + '</td>' +
                '</tr>';

            // Financial calculati on 
            if (clsName === 'solution') {
                price += currentPrice;
                totalUpfrontCharge += parseFloat(tds.eq(7).text()) * solutionQty;
            }

            // Total number of devices
            if (clsName === 'printer') {
                totalQty += qty;
            }
        }
    });

    return { html: html, tcp: price, baseFee: totalBaseFee, upfrontCharge: totalUpfrontCharge, qty: totalQty };
};



function AddSuffix(cls) {
    let _c;
    switch (cls) {
        case 'solution':
            _c = 'A';
            break;
        case 'printer':
            _c = 'B';
            break;
        case 'accessory':
            _c = 'C';
            break;
        case 'supply':
            _c = 'D';
            break;
        default:
            _c = 'E';
    }
    return _c;
}



function ShipToSiteChanged() {

    let shipTo = jq('#shipToSite').val();
    if (shipTo === 'Partner') {
        jq('#InvoiceToSecondAddressLine').parent('div.form-group').show();
        jq('#InvoiceToSecondAddressLine').attr('required', 'required');
    }
    else {
        jq('#InvoiceToSecondAddressLine').parent('div.form-group').hide();
        jq('#InvoiceToSecondAddressLine').removeAttr('required');
    }
}




