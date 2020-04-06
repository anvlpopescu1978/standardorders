
function pageContentLoad(sender, args) {
    ShowDateRange();
}

function ShowDateRange() {

    var sDate = Shp.Page.GetParameterFromUrl('StartDate') === '' ? moment().subtract('days', 29) : moment(Shp.Page.GetParameterFromUrl('StartDate') + 'T00:00:00Z');
    var eDate = Shp.Page.GetParameterFromUrl('EndDate') === '' ? moment() : moment(Shp.Page.GetParameterFromUrl('EndDate') + 'T00:00:00Z');
    jq('#reportrange span').html(sDate.format('YYYY-MM-DD') + ' to ' + eDate.format('YYYY-MM-DD'));


    jq('#reportrange').daterangepicker({
        startDate: sDate,
        endDate: eDate,
        dateLimit: {
            days: 60
        },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 Days': [moment().subtract('days', 6), moment()],
            'Last 30 Days': [moment().subtract('days', 29), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')],
            'Last 2 Years Days': [moment().subtract('years', 6), moment()]
        },
        opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small',
        format: 'yyyy-MM-dd',
        separator: ' to ',
        locale: {
            applyLabel: 'Submit',
            fromLabel: 'From',
            toLabel: 'To',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstDay: 1
        }
    }

    );


    jq('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');
        window.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Default.aspx?StartDate=' + startDate + '&EndDate=' + endDate;
    });


    // Get data and show statistics
    let caml = '<view>' +
        '<Query>' +
        '<Where>' +
        '<And>' +
        '<Geq><FieldRef Name="Created" /><Value Type="DateTime">' + sDate.format('YYYY-MM-DD') + '</Value></Geq>' +
        '<Leq><FieldRef Name="Created" /><Value Type="DateTime">' + eDate.format('YYYY-MM-DD') + '</Value></Leq>' +
        '</And>' +
        '</Where>' +
        '</Query>' +
        '</View > ';
    let phaseNew = 0, phaseAssigned = 0, phaseOrdered = 0, phaseDelivered = 0, phaseCanceled = 0; 
    let devicesNew = 0, devicesAssigned = 0, devicesOrdered = 0, devicesDelivered = 0, devicesCanceled = 0;
    let getOrders = $SPData.GetListItems('Purchase Orders', caml);
    Promise.all([getOrders]).then(function (results) {
        let items = results[0];
        for (let k = 0; k < items.get_count(); k++) {
            let item = items.itemAt(k);
            let devices = item.get_item('_x0023_Devices') === null ? 0 : item.get_item('_x0023_Devices');
            switch (item.get_item('Phase')) {
                case 'New':
                    phaseNew++;
                    devicesNew += devices;
                    break;
                case 'Assigned':
                    phaseAssigned++;
                    devicesAssigned += devices;
                    break;
                case 'Ordered':
                    phaseOrdered++;
                    devicesOrdered += devices;
                    break;
                case 'Delivered':
                    phaseDelivered++;
                    devicesDelivered += devices;
                    break;
                case 'Canceled':
                    phaseCanceled++;
                    devicesCanceled += devices;
                    break;
                default:
                    break;
            }
        }

        jq('#countNew').html(phaseNew + ' New POs');
        jq('#countAssigned').html(phaseAssigned + ' Assigned POs');
        jq('#countOrdered').html(phaseOrdered + ' Ordered POs');
        jq('#countDelivered').html(phaseDelivered + ' Delivered POs');
        jq('#countCanceled').html(phaseCanceled + ' Canceled POs');

        jq('#devicesCanceled').html(devicesCanceled + ' devices');
        jq('#devicesDelivered').html(devicesDelivered + ' devices');
        jq('#devicesOrdered').html(devicesOrdered + ' devices');
        jq('#devicesAssigned').html(devicesAssigned + ' devices');
        jq('#devicesNew').html(devicesNew + ' devices');


        let totalOrders = phaseNew + phaseAssigned + phaseOrdered + phaseDelivered + phaseCanceled;
        if (totalOrders > 0) {
            jq('#easy-pie-new').attr('data-percent', (phaseNew / totalOrders * 100).toFixed(1));  
            jq('#easy-pie-assigned').attr('data-percent', (phaseAssigned / totalOrders * 100).toFixed(1));  
            jq('#easy-pie-ordered').attr('data-percent', (phaseOrdered / totalOrders * 100).toFixed(1));  
            jq('#easy-pie-delivered').attr('data-percent', (phaseDelivered / totalOrders * 100).toFixed(1));  
            jq('#easy-pie-canceled').attr('data-percent', (phaseCanceled / totalOrders * 100).toFixed(1));  

        }


        // Create pie charts
        jq('#easy-pie-new, #easy-pie-assigned, #easy-pie-ordered, #easy-pie-delivered, #easy-pie-canceled').easyPieChart({
            barColor: "rgba(255,255,255,.5)",
            trackColor: "rgba(255,255,255,.5)",
            scaleColor: "rgba(255,255,255,.5)",
            lineWidth: 20,
            animate: 1500,
            size: 175,
            onStep: function (from, to, percent) {
                jq(this.el).find('.percent').text(Math.round(percent));
            }
        });



    }, function (err) {
            Shp.Dialog.ErrorDialog.show('Cannot get orders', err);
    });

}


function GoToOrders(status) {

    var query = '<View><Query><Where><Eq><FieldRef Name="EntityUser" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq></Where></Query></View>';
    Shp.Lists.GetItems('Users', null, query, function (items) {
        if (items.get_count() === 0) {
            return;
        }
        var role = items.itemAt(0).get_item('Role');
        switch (role) {
            case 'User':
                window.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/PO/MyOrders.aspx';
                break;
            case 'Administrator':
                window.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Administration/PurchaseOrders.aspx?Status=' + status;
                break;
            case 'Administrator (no email)':
                window.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Administration/PurchaseOrders.aspx?Status=' + status;
                break;
            case 'Power User':
                window.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Team/PurchaseOrders.aspx?Status=' + status;
                break;
            case 'Customer Admin':
                window.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/CustomerAdmin/PurchaseOrders.aspx?Status=' + status;
                break;
            default:
                break;
        }


    }, function (err) {
            Shp.Dialog.ErrorDialog.show('Cannot get user information', err);
    });

}

