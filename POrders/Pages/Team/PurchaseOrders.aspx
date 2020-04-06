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
    <link href="../../Content/Tooltipster/tooltipster.shadow.min.css" rel="stylesheet" type="text/css" />
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
            <asp:ScriptReference Path="../../Scripts/Framework/Mail/sharepoint.mail.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.fixedColumns.js" />
            <asp:ScriptReference Path="PurchaseOrders.js" />
        </Scripts>
    </asp:ScriptManagerProxy>




           <WebPartPages:XsltListViewWebPart runat="server" SuppressWebPartChrome="True" ID="MyOrders"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/Purchase Orders" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
            <XmlDefinition>
             <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
             <Query>
			    <Where>
                    <And>
                        <Eq><FieldRef Name="AssignedTo1" LookupID="True" /><Value Type="Integer"><UserID /></Value></Eq>
                        <Contains><FieldRef Name="Phase" /><Value Type="Text">{Status}</Value></Contains>
                    </And>
				    <Contains><FieldRef Name="Phase" /><Value Type="Text">{Status}</Value></Contains>
			    </Where>
		    </Query>
		    <RowLimit Paged="TRUE">50</RowLimit>
		        <JSLink>clienttemplates.js</JSLink>
		        <XslLink Default="TRUE">main.xsl</XslLink>
		        <Toolbar Type="Standard"/>
	        </View>
            </XmlDefinition>
            <ParameterBindings>
	            <ParameterBinding Name="dvt_sortdir" Location="QueryString(SortDir)" DefaultValue="FALSE" />
	            <ParameterBinding Name="dvt_sortfield" Location="QueryString(SortField)" DefaultValue="ID" />
	            <ParameterBinding Name="Status" Location="QueryString(Status)" DefaultValue="e" />
	            <ParameterBinding Name="dvt_startposition" Location="QueryString(Start)" />
	            <ParameterBinding Name="dvt_firstrow" Location="QueryString(FirstRow)" />
            </ParameterBindings>
            <Xsl>
                <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:pcm="urn:PageContentManager" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office" ddwrt:ghost="show_all">
                    <xsl:include href="../Common/main.xslt"/>
                    <xsl:include href="/_layouts/15/xsl/internal.xsl"/>
                    <xsl:include href="orders.xslt"/>           
                </xsl:stylesheet>
            </Xsl>
        </WebPartPages:XsltListViewWebPart>




<SharePoint:SPDataSource runat="server" DataSourceMode="List" SelectCommand="&lt;View&gt;&lt;/View&gt;" UseInternalName="True" ID="DSPhases">
    <SelectParameters><asp:Parameter Name="ListName" DefaultValue="Phases" /></SelectParameters>
</SharePoint:SPDataSource>

      <div style="display:none">
     <WebPartPages:XsltListViewWebPart runat="server" SuppressWebPartChrome="True" ID="CurrentUserRole"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/Users" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
            <XmlDefinition>
             <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
             <Query>
			    <Where>
				    <Eq><FieldRef Name="EntityUser" /><Value Type="Integer"><UserID /></Value></Eq>
			    </Where>
		    </Query>
		    <RowLimit Paged="TRUE">50</RowLimit>
		        <JSLink>clienttemplates.js</JSLink>
		        <XslLink Default="TRUE">main.xsl</XslLink>
		        <Toolbar Type="Standard"/>
	        </View>
            </XmlDefinition>
            <ParameterBindings>
	            <ParameterBinding Name="dvt_sortdir" Location="QueryString(SortDir)" DefaultValue="FALSE" />
	            <ParameterBinding Name="dvt_sortfield" Location="QueryString(SortField)" DefaultValue="ID" />
	            <ParameterBinding Name="poId" Location="QueryString(poId)" DefaultValue="0" />
	            <ParameterBinding Name="dvt_startposition" Location="QueryString(Start)" />
	            <ParameterBinding Name="dvt_firstrow" Location="QueryString(FirstRow)" />
            </ParameterBindings>
            <Xsl>
                <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:pcm="urn:PageContentManager" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office" ddwrt:ghost="show_all">
                    <xsl:include href="main.xslt"/>
                    <xsl:include href="/_layouts/15/xsl/internal.xsl"/>
                    <xsl:include href="../Common/userrole.xslt"/>
                </xsl:stylesheet>
            </Xsl>
        </WebPartPages:XsltListViewWebPart>
    </div>

</asp:Content>
