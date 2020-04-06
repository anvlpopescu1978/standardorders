
function pageLoad(sender, args) {


    if (isSupportedBrowser() === false) {
        Shp.Dialog.ErrorDialog.show('Unsupported browser', 'Please use Chrome or Edge');
        return;
    }


    applySecurityTrimmig();
    visualAdjusments();
    jq(window).bind('resize', function () {
        visualAdjusments();
    });

    var profilePictureUrl = _spPageContextInfo.webAbsoluteUrl +
        '/_layouts/15/userphoto.aspx?size=S&username=' +
        escapeProperly(_spPageContextInfo.userEmail);
    jQuery('#welcome').html('Welcome ' + _spPageContextInfo.userDisplayName);
    jQuery('#profilepicture').html('<img style="height: 40px; width: 40px" src="' + profilePictureUrl + '/" />');


    if (typeof (pageContentLoad) === 'function') {
        pageContentLoad(sender, args);
    }


}


function isSupportedBrowser() {
    var isSupportedBrowser = true;

    if (navigator.userAgent.match(/(MSIE)/i) === true) {
        isSupportedBrowser = false;
    }

    if (navigator.userAgent.match(/(Trident)/i) === false) {
        isSupportedBrowser = false;
    }

    if (navigator.userAgent.toUpperCase().indexOf("TRIDENT/") != -1) {
        isSupportedBrowser = false;
    }

    return isSupportedBrowser;
}

function redirectToDeniedPage() {
    if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/accessdenied.aspx') === false) {
        NavigateToPage('/Pages/AccessDenied.aspx');
    }
}

function applySecurityTrimmig() {

    var userRole = '';

    // If user is site admin, show all menus
    if (_spPageContextInfo.isSiteAdmin === true) {
        jQuery('#manageProductsMenu, #customerMenu, #assignedToMeMenu, #ordersAdminMenu, #currenciesAndCountriesMenu, #currenciesAndCountriesMenu, #manageUsers, #savetoexternallib, #contractTemplates, #approvalsMenu, #customerAdminMenu, #adminSettings, #partnerAdminMenu').show();
        userRole = 'Site Admin';
        return;
    }

    // User is not site admin
    var query = '<View><Query><Where><Eq><FieldRef Name="EntityUser" /><Value Type="Integer"><UserID /></Value></Eq></Where></Query></View>';
    Shp.Lists.GetItems('Users', null, query, function (items) {

        // User cannot be found in the list, no access at all
        if (items.get_count() === 0) {
            redirectToDeniedPage();
            return;
        }

        // Show menu items
        var role = items.itemAt(0).get_item('Role');

        switch (role) {
            case 'User':
                jQuery('#customerMenu').show();
                break;
            case 'Partner Admin':
                jQuery('#customerMenu, #partnerAdminMenu').show();
                break;
            case 'Customer Admin':
                jQuery('#customerMenu, #customerAdminMenu').show();
                break;
            case 'Power User':
                 /// jQuery('#RequesterName, #RequesterEmail, #ContactName, #ContactPhone, #ContactEmail, #ExpectedDeliveryDate').attr('disabled', 'disabled');
                jQuery('#customerMenu, #assignedToMeMenu').show();
                break;
            case 'Administrator':
            case 'Administrator (no email)':
                jQuery('#manageProductsMenu, #customerMenu, #assignedToMeMenu, #ordersAdminMenu, #currenciesAndCountriesMenu, #currenciesAndCountriesMenu, #manageUsers, #savetoexternallib, #contractTemplates, #approvalsMenu, #customerAdminMenu, #adminSettings, #partnerAdminMenu').show();
                break;
        }

        // Redirect to denied page if no access

        if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/suppliers/') === true) {
            if (!(role === 'Administrator' || role === 'Administrator (no email)' || role === 'Power User')) {
                redirectToDeniedPage();
            }
        }
        if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/partneradmin/') === true) {
            if (!(role === 'Administrator' || role === 'Administrator (no email)' || role === 'Partner Admin')) {
                redirectToDeniedPage();
            }
        }
        else if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/team/') === true) {
            if (!(role === 'Administrator' || role === 'Administrator (no email)' || role === 'Power User')) {
                redirectToDeniedPage();
            }
        }
        else if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/products/') === true) {
            if (!(role === 'Administrator' || role === 'Administrator (no email)')) {
                redirectToDeniedPage();
            }
        }
        else if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/currencies/') === true) {
            if (!(role === 'Administrator' || role === 'Administrator (no email)')) {
                redirectToDeniedPage();
            }
        }
        else if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/customeradmin/') === true) {
            if (!(role === 'Administrator' || role === 'Customer Admin')) {
                redirectToDeniedPage();
            }
        }
        else if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/countries/') === true) {
            if (!(role === 'Administrator' || role === 'Administrator (no email)')) {
                redirectToDeniedPage();
            }
        }
        else if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/users/') === true) {
            if (!(role === 'Administrator' || role === 'Administrator (no email)')) {
                redirectToDeniedPage();
            }
        }
        else if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/catalogues/') === true) {
            if (!(role === 'Administrator' || role === 'Administrator (no email)')) {
                redirectToDeniedPage();
            }
        }
        else if (_spPageContextInfo.serverRequestPath.toLowerCase().includes('/pages/administration/') === true) {
            if (!(role === 'Administrator' || role === 'Administrator (no email)')) {
                redirectToDeniedPage();
            }
        }

    }, function (err) {
        alert("Cannot apply security trimming: " + err);
    });
}




function visualAdjusments() {
    var topOffset = 50;
    var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;

    if (width < 768 || _isMobile() === true) {
        jQuery('div.navbar-collapse').addClass('collapse');
        topOffset = 100; // 2-row-menu
    } else {
        jQuery('div.navbar-collapse').removeClass('collapse');
    }

    var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
        jQuery("#page-wrapper").css("min-height", (height) + "px");
    }
}


function _isMobile() {
    // if we want a more complete list use this: http://detectmobilebrowsers.com/
    // str.test() is more efficent than str.match()
    // remember str.test is case sensitive
    var isMobile = (/iphone|ipod|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase());
    return isMobile;
}


function NavigateToPage(url) {
    /// <summary>Navigate to page</summary>
    window.top.location.href = _spPageContextInfo.webAbsoluteUrl + url;
}


function ShowMenuItem(item) {

    var subMenuItems = ['#manageProducts', '#currenciesAndCountries', '#manageOrders', '#ordersAdmin', '#assignedToMe', '#manageApprovals', '#customerAdmin', '#settingsMenu', '#partnerAdmin'];


    for (var i = 0; i < subMenuItems.length; i++) {
        if (subMenuItems[i] !== item) {
            jQuery(subMenuItems[i]).hide();
        }
        else {
            jQuery(subMenuItems[i]).toggle();

        }
    }

}



let adidasEmailTextToAdd = '';






