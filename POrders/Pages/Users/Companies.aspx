<%@ Page language="C#" MasterPageFile="~site/_catalogs/masterpage/main.master" MaintainScrollPositionOnPostback="true" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../../Content/corev15.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Bootstrap/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/FontAwesome/fontawesome.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/datatables.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/fixedColumns.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/datatables.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/jQuery.UI/jquery-ui.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/App.css" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.data.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.bootstrap.js" />
            <asp:ScriptReference Path="Companies.js" />
        </Scripts>
    </asp:ScriptManagerProxy>


<div class="row">
  <br />
   <div class="col-lg-12" style="margin: 0px">
        <h1 class="page-header">IWG Partners &amp; Entities</h1>
  </div> 
  <div class="col-lg-12">
        <div class="portlet portlet-blue">
            <div class="portlet-heading">
                <div class="portlet-title">
                    <h4>Partners &amp; Entities</h4>
                </div>
                <div class="portlet-widgets">
                    <div class="dropdown">
                      <a role="button" data-target="#myModal" data-toggle="modal" id="addCompanyBtn"><i class="fa fa-plus"></i></a>
                      <div class="dropdown-menu" aria-labelledby="addCompanyBtn">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="portlet-body">
                <div class="table-responsive">
                <table class="table table-borderless" style="width:100%" id="tblCompanies">
                    <thead>
                        <tr>
                            <th style="width:30px"></th>
                            <th>Parner Name</th>
                        </tr>
                    </thead>
                    <tbody>
                
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>   
    

</div>

 

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog" data-backdrop="static">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Add IWG Partner</h4>
      </div>
      <div class="modal-body">
          <div class="form-group">
              <label>Partner Name</label>
              <input type="text" class="form-control" maxlength="150" id="newIWGPartner" required />
          </div>        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="javascript:AddPartner()">Save</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

</asp:Content>