<%@ Page language="C#" MasterPageFile="~site/_catalogs/masterpage/dialog.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../../Content/corev15.css" rel="stylesheet" />
    <link href="../../Content/Bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="../../Content/FontAwesome/fontawesome.css" rel="stylesheet" />
    <link href="../../Content/DataTable/datatables.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/fixedColumns.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.main.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.bundle.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.shadow.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/App.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/jquery.number.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/tooltipster.main.min.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/tooltipster.bundle.min.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.fixedColumns.js" />
            <asp:ScriptReference Path="AddToBasket.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

<WebPartPages:XsltListViewWebPart runat="server" SuppressWebPartChrome="True" ID="AddToBasket"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/HPCatalogue" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
        <XmlDefinition>
         <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
             <Query>
                <Where>
		            <And>
   		                <Eq><FieldRef Name="Country" /><Value Type="Text">{country}</Value></Eq>
                        <Eq><FieldRef Name="Currency" /><Value Type="Text">{currency}</Value></Eq>
		            </And>
                </Where>
                 <OrderBy>
                    <FieldRef Name="SolutionNumber" />
                    <FieldRef Name="SolutionNumberOrdering" />
                 </OrderBy>
             </Query>
		    <JSLink>clienttemplates.js</JSLink>
		    <XslLink Default="TRUE">main.xsl</XslLink>
		    <Toolbar Type="Standard"/>
	    </View>
        </XmlDefinition>
        <ParameterBindings>
	            <ParameterBinding Name="country" Location="QueryString(country)" />
            	<ParameterBinding Name="currency" Location="QueryString(currency)" />
        </ParameterBindings>
        <Xsl>
            <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:pcm="urn:PageContentManager" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office" ddwrt:ghost="show_all">
                <xsl:include href="/_layouts/15/xsl/main.xsl"/> 
                <xsl:include href="/_layouts/15/xsl/internal.xsl"/>
                <xsl:include href="addtobasket.xslt"/>           
            </xsl:stylesheet>
        </Xsl>
    </WebPartPages:XsltListViewWebPart>


</asp:Content>
