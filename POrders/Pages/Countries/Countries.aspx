<%@ Page language="C#" MasterPageFile="~site/_catalogs/masterpage/main.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../../Content/corev15.css" rel="stylesheet" />
    <link href="../../Content/Bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="../../Content/FontAwesome/fontawesome.css" rel="stylesheet" />
    <link href="../../Content/DataTable/datatables.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/dataTables.responsive.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/fixedColumns.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/App.css" rel="stylesheet" type="text/css" />
</asp:Content>

 <asp:Content runat="server" ContentPlaceHolderID="ContentPlaceHolderMaim">
     <asp:ScriptManagerProxy runat="server">
         <Scripts>
             <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.responsive.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.fixedColumns.js" />
             <asp:ScriptReference Path="Countries.js" />
         </Scripts>
     </asp:ScriptManagerProxy>

 <div class="row">
     <div class="col-lg-12">
        <h1 class="page-header">Add Country</h1>
          <div class="panel panel-default">
               <div class="panel-heading">
                   <div class="form-group">
                       <label>Country Code</label>
                       <input type="text" maxlength="2" required="required" id="NewContryCode" class="form-control" />
                   </div>
                   <div class="form-group">
                       <label>Country Name</label>
                       <input type="text" maxlength="100" required="required" id="NewCountryName" class="form-control" />
                   </div>
                   <div class="form-group">
                       <label>Default Currency</label>
                       <SharePoint:DVDropDownList runat="server" AppendDataBoundItems="true" ClientIDMode="Static" CssClass="form-control" ID="NewDefaultCurrency" required="required" DataSourceID="DSCurrencies" DataTextField="Title" DataValueField="Title">
                          <asp:ListItem Text="..." Value="" />
                       </SharePoint:DVDropDownList>
                   </div>
                   <div class="form-group">
                       <label>Invoice Currency</label>
                       <SharePoint:DVDropDownList runat="server" AppendDataBoundItems="true" ClientIDMode="Static" CssClass="form-control" ID="InvoiceCurrency" required="required" DataSourceID="DSCurrencies" DataTextField="Title" DataValueField="Title">
                          <asp:ListItem Text="..." Value="" />
                       </SharePoint:DVDropDownList>
                   </div>
                    <div class="form-group">
                         <label>HP Legal Entity Name</label>
                         <input type="text" maxlength="100" required="required" id="NewLegalEntityName" class="form-control" />
                    </div>

                    <div class="form-group">
                         <label>VAT Number</label>
                         <input type="text" maxlength="100" required="required" id="NewVATNumber" class="form-control" />
                    </div>

                    <div class="form-group">
                         <label>City</label>
                         <input type="text" maxlength="100" required="required" id="NewCity" class="form-control" />
                    </div>

                   <div class="form-group">
                         <label>Address Line 1</label>
                         <input type="text" maxlength="200" required="required" id="NewFirstAddressLine" class="form-control" />
                    </div>

                    <div class="form-group">
                         <label>Parner Address</label>
                         <input type="text" maxlength="200" required="required" id="NewSecondAddressLine" class="form-control" />
                    </div>

                     <div class="form-group">
                         <label>Postal Code</label>
                         <input type="text" maxlength="30" required="required" id="NewPostalCode" class="form-control" />
                    </div>

                    <div class="form-group">
                         <label>Terms &amp; Conditions</label>
                         <textarea id="NewTemsAndConditions" required="required" class="form-control" style="height:50px">

                         </textarea>
                    </div>

                   <div class="form-group">
                       <button type="button" class="btn btn-primary btn-sm" onclick="javascript:AddNewCountry()">Add Country</button>
                   </div>
               </div>
          </div>
     </div>
 </div>


 <div class="row">
    <div class="col-lg-12">
         <h1 class="page-header">Countries</h1>
          <div class="panel panel-default">
          <div class="panel-heading">
              <div class="form-group">
                  <label>Sort By</label>
                  <select class="form-control" id="SortField">
                      <option value="CountryCode">Currency Code</option>
                      <option value="Country">Currency Name</option>
                      <option value="DefaultCurrency">Default Currency</option>
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

    <WebPartPages:XsltListViewWebPart runat="server" SuppressWebPartChrome="True" ID="ViewCountries"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/Countries" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
        <XmlDefinition>
         <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
		    
             <RowLimit Paged="TRUE">50</RowLimit> 
            <JSLink>clienttemplates.js</JSLink>
		    <XslLink Default="TRUE">main.xsl</XslLink>
		    <Toolbar Type="Standard"/>
	    </View>
        </XmlDefinition>
        <ParameterBindings>
	        <ParameterBinding Name="dvt_sortdir" Location="QueryString(SortDir)" DefaultValue="TRUE" />
	        <ParameterBinding Name="dvt_sortfield" Location="QueryString(SortField)" DefaultValue="CountryCode" />
	        <ParameterBinding Name="dvt_startposition" Location="QueryString(Start)" />
	        <ParameterBinding Name="dvt_firstrow" Location="QueryString(FirstRow)" />
        </ParameterBindings>
        <Xsl>
            <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:pcm="urn:PageContentManager" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office" ddwrt:ghost="show_all">
                <xsl:include href="../Common/main.xslt"/>
                <xsl:include href="/_layouts/15/xsl/internal.xsl"/>
                <xsl:include href="countries.xslt"/>           
            </xsl:stylesheet>
        </Xsl>
    </WebPartPages:XsltListViewWebPart>


          </div>
    </div>
</div>



<SharePoint:SPDataSource ID="DSCurrencies" runat="server" UseServerDataFormat="true" UseInternalName="true" SelectCommand="<![CDATA[<View><Query><OrderBy><FieldRef Name='Title' Ascending='TRUE' /></OrderBy></Query></View>]]>">
<SelectParameters>
    <asp:Parameter Name="ListName" DefaultValue="Currencies" />
</SelectParameters>
</SharePoint:SPDataSource>
</asp:Content>