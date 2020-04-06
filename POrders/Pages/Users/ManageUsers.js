function pageContentLoad(sender, args) {


    //Portlet Icon Toggle
    jq(".portlet-widgets .fa-chevron-down, .portlet-widgets .fa-chevron-up").click(function () {
        jq(this).toggleClass("fa-chevron-down fa-chevron-up");
    });


    var sortField = Shp.Page.GetParameterFromUrl('SortField') === '' ? 'ID' : Shp.Page.GetParameterFromUrl('SortField');
    var sortDir = Shp.Page.GetParameterFromUrl('SortDir') === '' ? 'Desc' : Shp.Page.GetParameterFromUrl('SortDir');
    $select('SortField').set_value(sortField);
    $select('SortDirection').set_value(sortDir);

    EditUserChanged();
   
    var tbl = jq('#dataTable').DataTable({
        info: false,
        ordering: false,
        scrollX: true,
        paging: false,
        fixedColumns: {
            leftColumns: 1
        },
        'aoColumnDefs': [
            { "bSortable": false, "bSearchable": false, "aTargets": [0] }
        ]
    });   

}

function EditUserChanged() {
    if ($select('IsEditAdmin').get_value() === 'Yes') {
        jq('#IsEditTeamMember').removeAttr('required');
        jq('#IsEditTeamMember').hide();
    }
    else {
        jq('#IsEditTeamMember').attr('required', 'required');
        jq('#IsEditTeamMember').show();
    }
}



function ChangeView() {
    window.top.location.href = _spPageContextInfo.webAbsoluteUrl + '/Pages/Users/ManageUsers.aspx?' +
        'SortField=' + escapeProperly($select('SortField').get_value()) +
        '&SortDir=' + escapeProperly($select('SortDirection').get_value());
}


function AddNewUser() {

    var newUser = $selectClientPicker('NewUserToAdd').get_allUserInfo()[0];
    // Validation
    var errors = 0;
    if (newUser === null) {
        jq('#validateNewUserToAdd').show();
        errors++;
    }
    else {
        jq('#validateNewUserToAdd').hide();
    }
    if ($select('UserRole').check_validity() === false) {
        jq('#validateIsAdministrator').show();
        errors++;
    }
    else {
        jq('#validateIsAdministrator').hide();
    }

    if (errors > 0)
        return;
    // End Validation

    Shp.Dialog.WaittingDialog.show("Adding new user");

    var user = {};
    user['DisplayName'] = newUser.DisplayText;
    user['EmailAddress'] = newUser.EntityData.Email;
    user['LoginName'] = newUser.Key;
    user['EntityUser'] = SP.FieldUserValue.fromUser(newUser.Key);
    user['Role'] = $select('Role').get_value();
    user['Partner'] = $select('PartnerSelector').get_value();

    Shp.Lists.AddItem('Users', user, null, function (item) {
        window.top.location.href = window.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot add user', err);
    });

}


function DeleteUser(id) {
    Shp.Dialog.WaittingDialog.show('Deleting user');
    Shp.Lists.DeleteItem('Users', parseInt(id), null, function () {
        window.top.location.href = window.location.href;
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Shp.Dialog.ErrorDialog.show('Cannot delete user', err);
    });
}

function SelectUser(id) {
    __doPostBack('ctl00$ContentPlaceHolderMaim$EditProduct', 'selectedUser={' + id + '}')
}


function CancelSave() {
    SelectUser('0');
}

function RefreshData() {
    __doPostBack('ctl00$ContentPlaceHolderMaim$EditProduct', 'selectedUser={o}; __refresh')

}


function SaveUser(id) {
    Shp.Dialog.WaittingDialog.show('Save user\'s details');
    var user = {};
    user['ID'] = id;
    user['Admin'] = $select('IsEditAdmin').get_value();
    user['Role'] = $select('RoleForUser').get_value();
    user['Partner'] = $select('PartnerSubscription').get_value();

    Shp.Lists.UpdateItem('Users', user, null, function (item) {
        RefreshData();
    }, function (err) {
        Shp.Dialog.WaittingDialog.hide();
        Show.Dialog.ErrorDialog.show('Cannot save data', err);
    });
}