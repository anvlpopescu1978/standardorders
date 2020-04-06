function OpenDartPage() {
    /// <summary></summary>


    Shp.Dialog.WaittingDialog.show('Adding data to catalogues');

    let file = document.getElementById('excelFilePicker').files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        let rawData = reader.result;
        let workbook = XLSX.read(rawData, {
            type: 'binary'
        });
        workbook.SheetNames.forEach(function (sheetName) {
            if (sheetName.includes('Data')) {
                let rowObj = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
               // let jsonObj = JSON.stringify(rowObj);
                AddRows(rowObj);
                return;
            }
        });
    }
    reader.readAsBinaryString(file);
}





function country_map(country) {

    let _c;


    switch (country) {
        case 'AE':
            _c = ' "United Arab Emirates';
            break;
        case 'AR':
            _c = 'Argentina';
            break;
        case 'AT':
            _c = 'Austria';
            break;
        case 'AU':
            _c = 'Australia';
            break;
        case 'BE':
            _c = 'Belgium';
            break;
        case 'BG':
            _c = 'Bulgaria';
            break;
        case 'BR':
            _c = 'Brazil';
            break;
        case 'CA':
            _c = 'Canada';
            break;
        case 'CH':
            _c = 'Switzerland';
            break;
        case 'CL':
            _c = 'Chile';
            break;
        case 'CN':
            _c = 'China';
            break;
        case 'CO':
            _c = 'Colombia';
            break;
        case 'CR':
            _c = 'Costa Rica';
            break;
        case 'CS':
            _c = 'Serbia and Montenegro';
            break;
        case 'CZ':
            _c = 'Czech Republic';
            break;
        case 'CY':
            _c = 'Cyprus';
            break;
        case 'DE':
            _c = 'Germany';
            break;
        case 'DK':
            _c = 'Denmark';
            break;
        case 'EE':
            _c = 'Estonia';
            break;
        case 'ES':
            _c = 'Spain';
            break;
        case 'FI':
            _c = 'Spain';
            break;
        case 'FR':
            _c = 'France';
            break;
        case 'GB':
            _c = 'United Kingdom';
            break;
        case 'GO':
            _c = 'Global';
            break;
        case 'GR':
            _c = 'Greece';
            break;
        case 'HK':
            _c = 'Hong Kong';
            break;
        case 'HR':
            _c = 'Croatia';
            break;
        case 'HU':
            _c = 'Hungary';
            break;
        case 'ID':
            _c = 'Indonesia';
            break;
        case 'IE':
            _c = 'Ireland';
            break;
        case 'IL':
            _c = 'Israel';
            break;
        case 'IN':
            _c = 'India';
            break;
        case 'IS':
            _c = 'Iceland';
            break;
        case 'IT':
            _c = 'Italy';
            break;
        case 'JP':
            _c = 'Japan';
            break;
        case 'KR':
            _c = 'South Korea';
            break;
        case 'LT':
            _c = 'Lithuania';
            break;
        case 'LU':
            _c = 'Luxembourg';
            break;
        case 'LV':
            _c = 'Latvia';
            break;
        case 'MX':
            _c = 'Mexico';
            break;
        case 'MY':
            _c = 'Malaysia';
            break;
        case 'NL':
            _c = 'Netherlands';
            break;
        case 'NO':
            _c = 'Norway';
            break;
        case 'NZ':
            _c = 'New Zealand';
            break;
        case 'PE':
            _c = 'Peru';
            break;
        case 'PH':
            _c = 'Philippines';
            break;
        case 'PL':
            _c = 'Poland';
            break;
        case 'PR':
            _c = 'Puerto Rico';
            break;
        case 'PT':
            _c = 'Portugal';
            break;
        case 'QA':
            _c = 'Qatar';
            break;
        case 'RO':
            _c = 'Romania';
            break;
        case 'RU':
            _c = 'Russia';
            break;
        case 'SA':
            _c = 'Saudi Arabia';
            break;
        case 'SE':
            _c = 'Sweden';
            break;
        case 'SG':
            _c = 'Singapore';
            break;
        case 'SI':
            _c = 'Slovenia';
            break;
        case 'SK':
            _c = 'Slovak Republic';
            break;
        case 'TH':
            _c = 'Thailand';
            break;
        case 'TR':
            _c = 'Turkey';
            break;
        case 'TW':
            _c = 'Taiwan';
            break;
        case 'US':
            _c = 'United States';
            break;
        case 'VN':
            _c = 'Vietnam';
            break;
        case 'ZA':
            _c = 'South Africa';
            break;
        default:
            _c = country
    }

    return _c;

}


function AddRows(rowObj) {

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

    let config = {};
    let dealSummary = {
        'Dart ID': rowObj[7]["__EMPTY"],
        'Country': country_map(rowObj[6]["__EMPTY"]),
        'Currency': GetCurrency(rowObj[21]["__EMPTY"])
    }

    let headerRow = rowObj[24];
    for (let headerProp in headerRow) {        
        config[headerRow[headerProp]] = headerProp.trim();
    }

    let approvedModels = ['3GY25A', '5FM81A', 'Z8Z04A'];
    let isSolutionApproved = false;
    let products = [];
    for (let i = 26; i < rowObj.length - 1; i++) {
        let row = rowObj[i];
        let className = row[config['Class']];
        if (className === 'solution' || className === 'printer' || className === 'accessory') {
            let product = {};
            product['DartID'] = dealSummary['Dart ID'];
            product['Class'] = row[config['Class']];
            product['SolutionNumber'] = dealSummary['Dart ID'] + '-' + row[config['Solution Number']];
            product['SolutionNumberOrdering'] = AddSuffix(product['Class']);
            product['ProductName'] = row[config['Description']];
            product['SKU'] = row[config['Key']];
            product['BillingModel'] = row[config['Billing Model']];
            product['BaseFee'] = row[config['Monthly Base Fee Output']];
            product['UpfrontCharge'] = row[config['Upfront Charge Output']];
            product['MonoClick'] = row[config['Mono Click Output']];
            product['ColorClick'] = row[config['Color Click Output']];
            product['ProfColorClick'] = row[config['Prof Color Click Output']];
            product['Country'] = dealSummary['Country'];
            product['Currency'] = dealSummary['Currency'];
            product['PrinterType'] = row[config['Printer Type']];
            product['AccesoriesList'] = row[config['Accessory list']];
            product['SLA'] = row[config['Actual HW Repair Service Desc']];    
            product['Qty'] = row[config['Qty']];  
            product['SolutionNetPrice'] = row[config['Solution Billable Net Price']];  
            product['MonthlyPages'] = row[config['Monthly Pages']];
            if (product['PrinterType'] !== 'SW-SOL') {
                products.push(product);
            }                
        }
    }

    Shp.Lists.AddItems('HPCatalogue', products, null, function (items) {
        NavigateToPage('/Pages/Catalogues/SearchDeal.aspx?dartId=' + dealSummary['Dart ID']);
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Error adding items to catalogue', err);
    });
}












function AddData(res, deal) {

    Shp.Dialog.EditFormDialog.hide();

    let solutions = [];
    for (let i = 0; i < res.length; i++) {
        let r = res[i];
        if (r['Class'] == 'solution') {
            let solution = {};
            solution['DartID'] = $select('DartID').get_value();
            solution['ProductName'] = r['Description'];
            solution['SKU'] = r['Key'];
            solution['BillingModel'] = r['Billing_x0020_Model'];
            solution['BaseFee'] = r['Monthly_x0020_Base_x0020_Fee_x0020_Output'];
            solution['MonoClick'] = r['Mono_x0020_Click_x0020_Output'];
            solution['ColorClick'] = r['Color_x0020_Click_x0020_Output'];
            solution['ProfColorClick'] = r['Prof_x0020_Color_x0020_Click_x0020_Output'];
            solution['Country'] = GetCountry(deal['Sales_x0020_Country']);
            solution['Currency'] = deal['ISO_x0020_Quote_x0020_Currency'];
            solution['SolutionNetPrice'] = r['Solution_x0020_Net_x0020_Price'];
            solution['SolutionNumber'] = r['Solution_x0020_Number'];
            solution['PrinterType'] = r['Printer_x0020_Type'];
            solution['AccesoriesList'] = r['Accessory_x0020_list'];
            solution['SLA'] = r['Actual_x0020_HW_x0020_Repair_x0020_Service_x0020_Desc'];
            solution['Qty'] = r['Qty'];
            solutions.push(solution);
        }
    }

    Shp.Lists.AddItems('Catalogue', solutions, null, function () {
        window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/SitePages/searchdeal.aspx?SearchBy=Country&Criteria=' + deal['Sales_x0020_Country'];
    }, function (err) {
        alert('Error adding catalogue lines:\n ' + err);
    });

}


function GetCurrency(currency) {
    var _c = '';
    switch (currency) {
        case 'AD':
            _c = 'AUD';
            break;
        case 'AE':
            _c = 'AED';
            break;
        case 'AF':
            _c = 'AFN';
            break;
        case 'AP':
            _c = 'ARS';
            break;
        case 'BC':
            _c = 'BRL';
            break;
        case 'BH':
            _c = 'BDT';
            break;
        case 'BN':
            _c = 'BND';
            break;
        case 'BO':
            _c = 'BOB';
            break;
        case 'BP':
            _c = 'GBP';
            break;
        case 'CC':
            _c = 'CRC';
            break;
        case 'CD':
            _c = 'CAD';
            break;
        case 'CK':
            _c = 'CZK';
            break;
        case 'CL':
            _c = 'CLP';
            break;
        case 'CO':
            _c = 'COP';
            break;
        case 'DK':
            _c = 'DKK';
            break;
        case 'DO':
            _c = 'DOP';
            break;
        case 'EC':
            _c = 'EUR';
            break;
        case 'ES':
            _c = 'ECS';
            break;
        case 'GT':
            _c = 'GTQ';
            break;
        case 'HD':
            _c = 'HKD';
            break;
        case 'HF':
            _c = 'HUF';
            break;
        case 'HL':
            _c = 'HNL';
            break;
        case 'IR':
            _c = 'IDR';
            break;
        case 'JY':
            _c = 'JPY';
            break;
        case 'KH':
            _c = 'KHR';
            break;
        case 'KW':
            _c = 'KRW';
            break;
        case 'LA':
            _c = 'LAK';
            break;
        case 'LK':
            _c = 'LKR';
            break;
        case 'MD':
            _c = 'MYR';
            break;
        case 'MM':
            _c = 'MMK';
            break;
        case 'MN':
            _c = 'MNT';
            break;
        case 'MP':
            _c = 'MXN';
            break;
        case 'ND':
            _c = 'NZD';
            break;
        case 'NI':
            _c = 'NIO';
            break;
        case 'NK':
            _c = 'NOK';
            break;
        case 'NR':
            _c = 'NPR';
            break;
        case 'PA':
            _c = 'PAB';
            break;
        case 'PL':
            _c = 'PHP';
            break;
        case 'PN':
            _c = 'PEN';
            break;
        case 'PR':
            _c = 'PKR';
            break;
        case 'PY':
            _c = 'PYG';
            break;
        case 'PZ':
            _c = 'PLN';
            break;
        case 'RD':
            _c = 'ZAR';
            break;
        case 'RM':
            _c = 'CNY';
            break;
        case 'RR':
            _c = 'RUB';
            break;
        case 'RS':
            _c = 'INR';
            break;
        case 'SD':
            _c = 'SGD';
            break;
        case 'SF':
            _c = 'CHF';
            break;
        case 'SK':
            _c = 'SEK';
            break;
        case 'SR':
            _c = 'SVC';
            break;
        case 'TB':
            _c = 'THB';
            break;
        case 'TD':
            _c = 'TWD';
            break;
        case 'UD':
            _c = 'USD';
            break;
        case 'UY':
            _c = 'UYU';
            break;
        case 'VB':
            _c = 'VEB';
            break;
        case 'VD':
            _c = 'VND';
            break;
        case 'VF':
            _c = 'VEF';
            break;
    }
    if (_c === '') {
        _c = currency;
    }
    return _c;
}
