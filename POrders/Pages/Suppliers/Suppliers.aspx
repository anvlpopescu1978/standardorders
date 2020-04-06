<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~site/_catalogs/masterpage/main.master" Language="C#" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../../Content/corev15.css" rel="stylesheet" />
    <link href="../../Content/Bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="../../Content/FontAwesome/fontawesome.css" rel="stylesheet" />
    <link href="../../Content/DataTable/datatables.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/dataTables.responsive.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/fixedColumns.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/App.css" rel="stylesheet" />
</asp:Content>
<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/Bootstrap/modal.fullscreen.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.responsive.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.fixedColumns.js" />
            <asp:ScriptReference Path="Suppliers.js" />
        </Scripts>
    </asp:ScriptManagerProxy>



<div class="row">
    <div class="col-lg-12">
         <h1 class="page-header">Suppliers</h1>
         <div class="panel panel-default">
 
        <!-- Panel heading -->
          <div class="panel-heading">
              <div class="form-group">
                  <label>Sort By</label>
                  <select class="form-control" id="SortField">
                      <option value="ID">Created Date</option>
                      <option value="SupplierName">Supplier Name</option>
                      <option value="Phone">Phone</option>
                      <option value="ContactPerson">Contact Person</option>
                      <option value="Address">Address</option>
                  </select>
              </div>
              <div class="form-group">
                  <select class="form-control" id="SortDirection">
                      <option value="Asc">Ascending</option>
                      <option value="Desc">Descending</option>
                  </select>
              </div>
              <div class="form-group">
                  <button type="button" class="btn btn-primary btn-small" onclick="javascript:ChangeView()">Change View</button>&#160;
              </div>
          </div>
        <!-- End of panel heading -->

        <!-- Content -->
    <WebPartPages:XsltListViewWebPart runat="server" SuppressWebPartChrome="True"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/Suppliers" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
        <XmlDefinition>
         <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
		    <JSLink>clienttemplates.js</JSLink>
		    <XslLink Default="TRUE">main.xsl</XslLink>
		    <Toolbar Type="Standard"/>
	    </View>
        </XmlDefinition>
        <ParameterBindings>
	        <ParameterBinding Name="dvt_sortdir" Location="QueryString(SortDir)" DefaultValue="FALSE" />
	        <ParameterBinding Name="dvt_sortfield" Location="QueryString(SortField)" DefaultValue="ID" />
        </ParameterBindings>
        <Xsl>
            <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:pcm="urn:PageContentManager" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office" ddwrt:ghost="show_all">
                <xsl:include href="/_layouts/15/xsl/main.xsl"/> 
                <xsl:include href="/_layouts/15/xsl/internal.xsl"/>
                <xsl:include href="suppliers.xslt"/>           
            </xsl:stylesheet>
        </Xsl>
    </WebPartPages:XsltListViewWebPart>
     <!-- End of content -->

        </div>
    </div>
</div>

</asp:Content>
