﻿<%@ Page language="C#" MasterPageFile="~site/_catalogs/masterpage/main.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
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
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.data.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
            <asp:ScriptReference Path="poids.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

    <div class="row">
        <div class="col-lg-12">
            <h1>Purchase Orders ID List</h1>

            <div class="panel panel-default">
             <div class="panel-heading">
                <div class="form-group">
                     <label>PO ID <span class="ms-accentText">*</span></label>
                     <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ClientIDMode="Static" MaxLength="30" ID="NewPOID" />
                 </div>
                 <div class="form-group">
                     <button type="button" class="btn btn-primary btn-sm" onclick="javascript:AddPO()">Add PO ID</button>
                 </div>
             </div>
            </div>

            <br />

             <table class="table table-striped nowrap table-bordered table-hover dataTable no-footer dtr-inline" id="dataTable" style="width:100%; border-collapse: collapse; border-spacing: 0;">
                 <thead>
                     <tr>
                         <th>Del.</th>
                         <th>PO ID</th>
                     </tr>
                 </thead>
                 <tbody>

                 </tbody>
             </table>


        </div>
    </div> 

</asp:Content>
