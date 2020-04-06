function pageContentLoad(sender, args) {
    /// <summary>Page content load logic</summary>
    /// <param>Sender</param>
    /// <param>Args</param>

    jq('#dataTable').DataTable({
        info: false,
        ordering: false,
        scrollX: true,
        paging: false,
        fixedColumns: {
            leftColumns: 1
        },
        'aoColumnDefs': [
            { "bSortable": false, "bSearchable": false, "aTargets": [0] }
        ],
        'drawCallback': function (settings) {
            jQuery('#dataTable a.country-details').tooltipster({
                contentAsHTML: true,
                interactive: true
            });

            jQuery("#dataTable a.comments-details").tooltipster({
                trigger: 'click',
                contentAsHTML: true,
                interactive: true,
                theme: 'tooltipster-shadow',
                functionBefore: function (helper, origin) {
                    var $origin = jQuery(helper.origin);
                    var poId = $origin.attr('data-id');
                    if (Boolean($origin.data('loaded')) !== true) {
                    }
                }
            });
        }
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
