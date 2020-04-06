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
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Mail/sharepoint.mail.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/HostOps/HostOps.js" />
            <asp:ScriptReference Path="SavedToExternalLib.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Save to External Library</h1>
             <div class="panel panel-default">
                   <div class="panel-heading">
                       <div class="form-group">
                           <label>Library Name</label> 
                            <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="LibraryName" ClientIDMode="Static" MaxLength="200" required="required" />
                       </div>
                        <div class="form-group">
                           <label>Signed Contract Location</label> 
                            <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="SignedContractLocation" ClientIDMode="Static" MaxLength="200" required="required" />
                       </div>
                       <div class="form-group">
                            <label>Site URL</label> 
                            <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="SiteLocation" ClientIDMode="Static" MaxLength="2000" required="required" />
                       </div>
                        <div class="form-group">
                            <label>File prefix</label> 
                            <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="FilePrefix" ClientIDMode="Static" MaxLength="10" required="required" />
                       </div>
                        <div class="form-group">    
                            <button type="button" class="btn btn-primary btn-sm" onclick="javascript:SaveSettings()">Save Settings</button>
                         </div>
                   </div>
             </div>
        </div>
    </div>





</asp:Content>
