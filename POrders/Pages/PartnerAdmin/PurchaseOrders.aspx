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
    <link href="../../Content/DataTable/fixedColumns.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/App.css" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/tooltipster.main.min.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/tooltipster.bundle.min.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.data.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Filesaver/Blob.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Filesaver/FileSaver.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/XLSX/jszip.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/XLSX/xlsx.js" />
            <asp:ScriptReference Path="PurchaseOrders.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

  <div class="row">
    <br />
    <div class="col-lg-12" style="margin: 0px">
         <h1 class="page-header">Partner Purchase Orders</h1>
    </div>

    <div class="col-lg-12" style="margin: 0px">
    <div class="portlet portlet-blue">
      <div class="portlet-heading">
        <div class="portlet-title">
          <h4><i class="fa fa-table"></i>&nbsp;Orders</h4>
        </div>
        <div class="portlet-widgets">
          <a  href="javascript:ExportData()">
            <i class="fa fa-file-excel-o"></i>
          </a>
            <span class="divider"></span>
          <a data-toggle="collapse"  href="#ordersview" aria-expanded="false">
            <i class="fa fa-chevron-up"></i>
          </a>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="portlet-body panel-collapse collapse in" id="ordersview">

        <table class="table table-striped table-borderless nowrap" id="dataTable" style="width: 100%;" >
            <thead>
              <tr>
                <th style="width:50px;">Edit</th>
                <th style="width:50px">ID </th>
                <th>Company Name</th>
                <th>VAT Number</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Currency</th>
                <th>Ship To Country</th>
                <th>Qty</th>
                <th>Attachments</th>
              </tr>
            </thead>
            <tbody>       
            </tbody>
          </table>


      </div>
    </div>
  </div>
  </div>
      

</asp:Content>
