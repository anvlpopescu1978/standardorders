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
    <link href="../../Content/jQuery.UI/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/App.css" rel="stylesheet" />
</asp:Content>


<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
        <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/jquery.number.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.data.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Mail/sharepoint.mail.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.responsive.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.fixedColumns.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Moment/moment-with-locales.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Bootstrap.DatePicker/bootstrap-datetimepicker.min.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery.UI/jquery-ui-1.12.1.js" />
            <asp:ScriptReference Path="CreatePO.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

<div class="row">
    <div class="col-lg-12">
         <h1 class="page-header">Create Purchase Order</h1>
          <div class="panel panel-default">
              <div class="panel-heading">

                
     <!-- Form controls -->
   <div class="form-row">
      <div class="form-group col-md-12">
         <div class="create-po-header">
             <h3>Invoicing Details</h3>
        </div>
      </div>
    </div>

	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
        <label>Country <span class="ms-accentText">*</span></label>
        <SharePoint:DVDropDownList runat="server" SelectedValue="" CssClass="form-control" ClientIDMode="Static" ID="InvoiceToCountry" DataSourceID="DSCountries" DataTextField="Country" DataValueField="Country" required="required" onchange="javascript:GetCustomersList()">
        </SharePoint:DVDropDownList>
         <div class="invalid-feedback" style="display:none" id="validateInvoiceToCountry">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
	</div>
 	<div class="form-group col-md-6" style="padding-right:0px">
        <label>Company Name <span class="ms-accentText">*</span></label> 
         <SharePoint:DVDropDownList runat="server" SelectedValue="" CssClass="form-control" ClientIDMode="Static" ID="CustomerCompanyName" required="required" onchange="javascript:GetCustomerDetails()">
        </SharePoint:DVDropDownList>
          <div class="invalid-feedback" style="display:none" id="validateCustomerCompanyName">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
	</div>    
	</div>


	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
        <label>City <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox ReadOnly="true" runat="server" CssClass="form-control" ID="InvoiceToCity" ClientIDMode="Static" MaxLength="200" required="required" />
         <div class="invalid-feedback" style="display:none" id="validateInvoiceToCity">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
	</div>
 	<div class="form-group col-md-6" style="padding-right:0px">
        <label>Postal Code <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox ReadOnly="true" runat="server" CssClass="form-control" ID="InvoiceToPostalCode" ClientIDMode="Static" MaxLength="200" required="required" />
         <div class="invalid-feedback" style="display:none" id="validateInvoiceToPostalCode">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
	</div>    
	</div>

    <div class="form-row">
        <div class="form-group col-md-6" style="padding-left:0px">
        <label>Address  <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox ReadOnly="true" runat="server" CssClass="form-control" ID="InvoiceToFirstAddressLine" ClientIDMode="Static" MaxLength="200" required="required" />
         <div class="invalid-feedback" style="display:none" id="validateInvoiceToFirstAddressLine">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
        </div>
         <div class="form-group col-md-6" style="padding-right:0px">
        <label>VAT Number <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox ReadOnly="true" runat="server" CssClass="form-control" ID="VATNumber" ClientIDMode="Static" MaxLength="200" required="required" />
         <div class="invalid-feedback" style="display:none" id="validateVATNumber">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
         </div>
    </div>


    <div class="form-row">
        <div class="form-group col-md-6" style="padding-left:0px">
        <label>CPA Date <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox ReadOnly="true" runat="server" CssClass="form-control" ID="CPADate" ClientIDMode="Static" MaxLength="200" required="required" />
        </div>
         <div class="form-group col-md-6" style="padding-right:0px">
         <label>Site Statment of Work Number</label>
         <input type="text" maxlength="200" readonly="readonly" required="required" id="SSOWNumber" class="form-control" />

         </div>
    </div>


    <div class="form-row">
        <div class="form-group col-md-6" style="padding-left:0px">
        <label>Currency <span class="ms-accentText">*</span></label>
        <SharePoint:DVDropDownList runat="server" SelectedValue="" ReadOnly="True" CssClass="form-control" ClientIDMode="Static" ID="InvoiceToCurrency" DataSourceID="DSCurrencies" DataTextField="Title" DataValueField="Title" required="required" onchange="javascript:ClearBasket()">
        </SharePoint:DVDropDownList>
         <div class="invalid-feedback" style="display:none" id="validateInvoiceToCurrency">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
        </div>
         <div class="form-group col-md-6" style="padding-right:0px">
        <label>Invoice Currency <span class="ms-accentText">*</span></label>
        <SharePoint:DVDropDownList runat="server" ReadOnly="True" SelectedValue="" CssClass="form-control" ClientIDMode="Static" ID="InvoiceC" DataSourceID="DSCurrencies" DataTextField="Title" DataValueField="Title" required="required">
        </SharePoint:DVDropDownList>
         <div class="invalid-feedback" style="display:none" id="validateInvoiceC">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
        </div>
    </div>







                  
   <div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
		<label>Requestor Name <span class="ms-accentText">*</span></label>
		<input type="text" class="form-control" placeholder="Contact Name" maxlength="200" id="RequesterName" required="required" />
        <div class="invalid-feedback" style="display:none" id="validateRequesterName">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
        </div>
	</div>
 	<div class="form-group col-md-6" style="padding-right:0px">
 		<label>Requestor Email <span class="ms-accentText">*</span></label>
 		<input type="text" class="form-control" placeholder="Contact Phone" maxlength="200" id="RequesterEmail" required="required" />
        <div class="invalid-feedback" style="display:none" id="validateRequesterEmail">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
        </div>
	</div>
	</div>



    <div class="form-row">
      <div class="form-group col-md-12">
         <div class="create-po-header">
             <h3>Ship To</h3>
        </div>
      </div>
    </div>


     <div class="form-group">
            <label>Ship To <span class="ms-accentText">*</span></label>
             <select id="shipToSite" class="form-control" required="required" onchange="ShipToSiteChanged()">
                 <option value="" selected>...</option>
                 <option value="Partner">Partner</option>
                 <option value="Customer Site">Customer Site</option>
             </select>
             <div class="invalid-feedback" style="display:none" id="validateshipToSite">
                <i class="fa fa-exclamation-triangle"></i> Mandatory field
            </div>
     </div>


   <div class="form-group" style="display:none">
        <label>Partner Address </label>
        <SharePoint:InputFormTextBox runat="server" ReadOnly="true" CssClass="form-control" ID="InvoiceToSecondAddressLine" ClientIDMode="Static" MaxLength="200" />
   </div> 

    <div class="form-row">
      <div class="form-group col-md-12">
         <div class="create-po-header">
             <h3>Site Address</h3>
        </div>
      </div>
    </div>

	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
         <label>Country <span class="ms-accentText">*</span></label>
        <SharePoint:DVDropDownList runat="server" SelectedValue="" CssClass="form-control" ClientIDMode="Static" ID="ShipToCountry" DataSourceID="DSCountries" DataTextField="Country" DataValueField="Country" required="required">
        </SharePoint:DVDropDownList>
         <div class="invalid-feedback" style="display:none" id="validateShipToCountry">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
	</div>
 	<div class="form-group col-md-6" style="padding-right:0px">
        <label>City <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="ShipToCity" ClientIDMode="Static" MaxLength="200" required="required" />
         <div class="invalid-feedback" style="display:none" id="validateShipToCity">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
	</div>
	</div>

	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
        <label>Postal Code <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="ShipToPostalCode" ClientIDMode="Static" MaxLength="200" required="required" />
        <div class="invalid-feedback" style="display:none" id="validateShipToPostalCode">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
	</div>
 	<div class="form-group col-md-6 date" style="padding-right:0px">
        <label>Address  <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="ShipToFirstAddressLine" ClientIDMode="Static" MaxLength="200" required="required" />
         <div class="invalid-feedback" style="display:none" id="validateShipToFirstAddressLine">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
	</div>    
	</div>

	<div class="form-row">	
	<div class="form-group col-md-12" style="padding-left:0px; padding-right:0px">
        <label>Site Name <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="CentreName" ClientIDMode="Static" MaxLength="200" required="required" />
           <div class="invalid-feedback" style="display:none" id="validateCentreName">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div> 
	</div> 
	</div>

	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
		<label>Site Contact Name <span class="ms-accentText">*</span></label>
		<input type="text" class="form-control" placeholder="Contact Name" maxlength="200" id="ContactName" required="required" />
        <div class="invalid-feedback" style="display:none" id="validateContactName">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
        </div>
	</div>
 	<div class="form-group col-md-6" style="padding-right:0px">
 		<label>Site Contact Phone <span class="ms-accentText">*</span></label>
 		<input type="text" class="form-control" placeholder="Contact Phone" maxlength="200" id="ContactPhone" required="required" />
        <div class="invalid-feedback" style="display:none" id="validateContactPhone">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
        </div>
	</div>
	</div>

	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
		<label>Site Contact Email <span class="ms-accentText">*</span></label>
		<input type="text" class="form-control" placeholder="Contact Email" maxlength="200" id="ContactEmail" required="required" />
        <div class="invalid-feedback" style="display:none" id="validateContactEmail">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
        </div>
	</div>
 	<div class="form-group col-md-6 date" style="padding-right:0px">
        <label>Expected Delivery Date (Average timeframe is 6 weeks) <span class="ms-accentText">*</span></label>
 		 <input type="text" class="form-control" id="ExpectedDeliveryDate" required="required" />
         <div class="invalid-feedback" style="display:none" id="validateExpectedDeliveryDate">
                <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
	</div>    
	</div>



    <div class="form-group">
         <label>Comments</label>
        <SharePoint:InputFormTextBox RichText="false"  runat="server" CssClass="form-control" ID="POComments" ClientIDMode="Static" TextMode="MultiLine" />
    </div>

    <div class="form-group" style="display:none">
        <textarea id="termsAndConditions"></textarea>
    </div>

    <div class="form-group">
        <label>Attachment</label>
        <input type="file" id="AttachmentsField"  class="form-control" />
    </div>

     <div class="create-po-header">
         <h5>Products</h5>
    </div>

<div class="form-group" style="overflow:auto">
    <table class="table table-striped table-bordered table-hover nowrap dataTable no-footer dtr-inline" id="basketTable" style="width:100%; border-collapse: collapse; border-spacing: 0;">
		<thead>
			<tr>
                <!-- Index 0 -->
				<th><button type="button" class="btn btn-xs btn-primary" onclick="javascript:AddToBasket()">New</button></th>
	            <!-- Index 1 -->
                <th>Custom Group</th>
                <!-- Index 2 -->
                <th>Product Name</th>
                <!-- Index 3-->
                <th>SKU</th>
                <!-- Index 4 -->
                <th>Class</th>
                <!-- Index 5 -->
                <th style="display:none">Billing Model</th>
                <!-- Index 6 -->
                <th>Base Fee</th>
                <!-- Index 7 -->
                <th>HW Price</th>
                <!-- Index 8 -->
                <th style="display:none">Solution Net Price</th>
                <!-- Index 9 -->
                <th>Currency</th>
                <!-- Index 10 -->
                <th>Qty</th>
                <!-- Index 11 -->
                <th>Mono Click</th>
                <!-- Index 12 -->
                <th>Color Click</th>
                <!-- Index 13 -->
                <th style="display:none">Prof. Color Click</th>
                <!-- Index 14 -->
                <th style="display:none">Printer Type</th>
                <!-- Index 15 -->
                <th>SLA</th>
                <!-- Index 16 -->
                <th style="display:none">Monthly Pages</th>
			</tr>
		</thead>
        <tbody>

        </tbody>
     </table>
</div>
     <!-- End of form controls -->
    <div class="form-group">
        <br />
        <button type="button" class="btn btn-primary btn-sm" onclick="javascript:CreatePO()">Create Purchase Order</button>
    </div>

              </div>
          </div>
    </div>
</div>




    
<SharePoint:SPDataSource runat="server" DataSourceMode="List" IncludeHidden="true" ID="DSCurrencies" UseInternalName="true" UseServerDataFormat="true">
    <SelectParameters>
        <asp:Parameter Name="ListName" DefaultValue="Currencies" />
    </SelectParameters>
</SharePoint:SPDataSource>


<SharePoint:SPDataSource runat="server" DataSourceMode="List" IncludeHidden="true" ID="DSCountries" UseInternalName="true" UseServerDataFormat="true" 
        SelectCommand='<![CDATA[<View><Query><OrderBy><FieldRef Name="Country" /></OrderBy></Query></View>]]>'>
    <SelectParameters>
        <asp:Parameter Name="ListName" DefaultValue="Countries" />
    </SelectParameters>
</SharePoint:SPDataSource>




    <WebPartPages:XsltListViewWebPart runat="server" SuppressWebPartChrome="True" ID="ShowUsers"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/Users" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
        <XmlDefinition>
         <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
              <Query>
			    <Where>
                    <Or>
                        <Eq><FieldRef Name="Role" /><Value Type="Text">Administrator</Value></Eq>
                        <Eq><FieldRef Name="Role" /><Value Type="Text">Approver</Value></Eq>
                    </Or>
			    </Where>
		    </Query>          
             <JSLink>clienttemplates.js</JSLink>
		    <XslLink Default="TRUE">main.xsl</XslLink>
		    <Toolbar Type="Standard"/>
	    </View>
        </XmlDefinition>
        <ParameterBindings>
	            <ParameterBinding Name="productId" Location="QueryString(productId)" />
        </ParameterBindings>
        <Xsl>
            <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:pcm="urn:PageContentManager" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office" ddwrt:ghost="show_all">
                <xsl:include href="/_layouts/15/xsl/main.xsl"/> 
                <xsl:include href="/_layouts/15/xsl/internal.xsl"/>
                <xsl:include href="../Common/users.xslt"/>           
            </xsl:stylesheet>
        </Xsl>
    </WebPartPages:XsltListViewWebPart>


    <style type="text/css">

        #basketTable tbody tr.solution td {
            background-color: #0096D6 !important;
            color:#ffffff;
        }

    </style>

</asp:Content>


