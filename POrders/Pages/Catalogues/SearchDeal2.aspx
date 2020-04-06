<%@ Page language="C#" MasterPageFile="~site/_catalogs/masterpage/main.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../../Content/corev15.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Bootstrap/bootstrap.css" rel="stylesheet"  type="text/css"/>
    <link href="../../Content/FontAwesome/fontawesome.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.main.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.bundle.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/datatables.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/dataTables.responsive.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/fixedColumns.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.main.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.bundle.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.shadow.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/App.css" rel="stylesheet" />

</asp:Content>


<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/tooltipster.main.min.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/tooltipster.bundle.min.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Mail/sharepoint.mail.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.responsive.js" />
            <asp:ScriptReference Path="SeachDeal2.js" />
        </Scripts>
    </asp:ScriptManagerProxy>


     <div class="row">
         <div class="col-lg-12">
              <h1 class="page-header">Search by Country</h1>
              <div class="panel panel-default">
                   <div class="panel-heading">
                       <div class="form-group">
                            <SharePoint:DVDropDownList runat="server" SelectedValue="" CssClass="form-control" ClientIDMode="Static" ID="FilterCountry" DataSourceID="DSCountries" DataTextField="Country" DataValueField="Country" required="required" onchange="javascript:GetDefaultCurrency()">
                            </SharePoint:DVDropDownList>
                       </div>
                       <div class="form-group">
                           <button type="button" class="btn btn-primary btn-sm" onclick="javascript:ChangeCountry()">Change Country</button>
                       </div>
                  </div>
              </div>

             <table class="table table-striped nowrap table-bordered table-hover dataTable no-footer dtr-inline" id="dataTable" width="100%" cellspacing="0">
                 <thead>
                     <tr>
                         <th></th>
                         <td>ID</td>
                         <th>Dart ID</th>
                         <th>Solution Number</th>
                         <th>Product Name</th>
                         <th>SKU</th>
                         <th>Billing Model</th>
                         <th>Base Fee</th>
                         <th>Upfront Charge</th>
                         <th>Printer Type</th>
                         <th>Mono Click</th>
                         <th>Color Click</th>
                         <th>Prof. Color Click</th>
                         <th>Country</th>
                         <th>Currency</th>               
                     </tr>
                 </thead>
                 <tbody>


                 </tbody>
            </table>
        </div>
    </div>
    <br /><br />



 
 


    <SharePoint:SPDataSource runat="server" DataSourceMode="List" IncludeHidden="true" ID="DSCountries" UseInternalName="true" UseServerDataFormat="true">
    <SelectParameters>
        <asp:Parameter Name="ListName" DefaultValue="Countries" />
    </SelectParameters>
</SharePoint:SPDataSource>




</asp:Content>
