<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~site/_catalogs/masterpage/main.master" Language="C#" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../Content/Bootstrap/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../Content/FontAwesome/fontawesome.css" rel="stylesheet" type="text/css" />
    <link href="../Content/Charts/morris.css" rel="stylesheet" type="text/css" />
    <link href="../Content/App.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../Scripts/Framework/Charts/raphael.js" />
            <asp:ScriptReference Path="../Scripts/Framework/Charts/morris.js" />
            <asp:ScriptReference Path="Default.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

    <div class="row">
        <div class="col-lg-12">
             <h1 class="page-header">Access Denied</h1>
             <div class="panel panel-default">
                 <div class="panel-heading">
                     <!-- Webpart here -->

                      Access denied. Please contact administrator.

                     <!-- End of Webpart here -->
                </div>
             </div>
        </div>
    </div>

</asp:Content>
