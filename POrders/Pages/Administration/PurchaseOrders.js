function pageContentLoad(sender, args) {


    //Portlet Icon Toggle
    jq(".portlet-widgets .fa-chevron-down, .portlet-widgets .fa-chevron-up").click(function () {
        jq(this).toggleClass("fa-chevron-down fa-chevron-up");
    });



    jq('#dataTable').DataTable({
        scrollX: true,
        paging: false,
        fixedColumns: {
            leftColumns: 1
        },
        'aoColumnDefs': [
            { "bSortable": false, "aTargets": [0] }
        ]
    });


}



function fixtable(element) {
    var scrollLeft = element.scrollLeft;
    var id = element.id;
    jQuery('#' + id + ' table td[class*="fixed"], #' + id + ' table th[class*="fixed"]').css({ position: 'relative', left: scrollLeft, 'z-index': 1000 });
}


function ChangeView() {
     window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Administration/purchaseorders.aspx?Status=' + $select('Status').get_value() +
                               '&SortField=' + $select('SortField').get_value() +
                               '&SortDir=' + $select('SortDir').get_value();
}


function EditPO(poId) {
    /// <summmary>Edit purchase order</summary>
    /// <param>Purchase Order Id</param>
    var url = _spPageContextInfo.webAbsoluteUrl + '/Pages/Common/EditPO.aspx?poId=' + poId;
    GoToPage(url);
}
