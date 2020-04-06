<xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:ddwrt2="urn:frontpage:internal">
  <xsl:output method="html" indent="no"/>
  <xsl:decimal-format NaN=""/>
   <xsl:template match="/">
     <xsl:for-each select="/dsQueryResponse/Rows/Row">
       <div class="form-group">
         <label>
           Company Name
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="CustomerCompanyName" ReadOnly="true" Text="{@CustomerName}" ClientIDMode="Static" MaxLength="200" required="required" />
       </div>
       <div class="form-group">
         <label>
           VAT Number
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="VATNumber" ReadOnly="true" Text="{@VATNumber}" ClientIDMode="Static" MaxLength="200" required="required" />
       </div>
       
       <div class="form-group">
         <label>
           SSOW Number
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="SSOWNumber" ReadOnly="true" Text="{@SSOWNumber}" ClientIDMode="Static" MaxLength="200" required="required" />
       </div>


       <div  style="display:block; font-weight:bold; padding-top:5px; padding-bottom:5px; padding-left:5px">
         <h3>Invoice To Address &amp; Currency</h3>
       </div>
       <div class="form-group">
         <label>
           Country
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="InvoiceToCountry"  ReadOnly="true"  Text="{@_x0028_Invoiceto_x0029_Country}" ClientIDMode="Static" MaxLength="200" required="required" />
       </div>
       <div class="form-group">
         <label>
           Currency
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="InvoiceToCurrency"  ReadOnly="true"  Text="{@Currency}" ClientIDMode="Static" MaxLength="200" required="required" />
       </div>
       <div class="form-group">
         <label>
           City
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="InvoiceToCity" Text="{@_x0028_Invoiceto_x0029_City}"  ReadOnly="true"  ClientIDMode="Static" MaxLength="200" required="required" />
       </div>
       <div class="form-group">
         <label>
           Postal Code
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="InvoiceToPostalCode" Text="{@_x0028_Invoiceto_x0029_PostalCode}"  ReadOnly="true"  ClientIDMode="Static" MaxLength="200" required="required" />
       </div>
       <div class="form-group">
         <label>
           Address 1
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control"  ReadOnly="true" Text="{@_x0028_Invoiceto_x0029_AddressLine1}" ID="InvoiceToFirstAddressLine" ClientIDMode="Static" MaxLength="200" required="required" />
       </div>
 
     <div class="form-group">
        <label>Address 2 </label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control"  ReadOnly="true"   Text="{@_x0028_Invoiceto_x0029_AddressLine2}" ID="InvoiceToSecondAddressLine" ClientIDMode="Static" MaxLength="200" />
    </div>

     <div  style="display:block; font-weight:bold; padding-top:5px; padding-bottom:5px; padding-left:5px">
         <h3>Ship To Address</h3>
      </div>

       <div class="form-row">
         <div class="form-group col-md-6" style="padding-left:0px">
           <label>Requestor Name:</label>
           <input type="text" class="form-control"  value="{@ContactName}" placeholder="Requester Name" maxlength="200" id="RequesterName" required="required" />
         </div>
         <div class="form-group col-md-6" style="padding-right:0px">
           <label>Requestor Email:</label>
           <input type="text" class="form-control"  value="{@ContactPhone}" placeholder="Requester Email" maxlength="200" id="RequesterEmail" required="required" />
         </div>
       </div>

       <div class="form-row">
         <div class="form-group col-md-6" style="padding-left:0px">
           <label>Centre Contact Name:</label>
           <input type="text" class="form-control"  value="{@ContactName}" placeholder="Contact Name" maxlength="200" id="ContactName" required="required" />
         </div>
         <div class="form-group col-md-6" style="padding-right:0px">
           <label>Centre Contact Phone:</label>
           <input type="text" class="form-control"  value="{@ContactPhone}" placeholder="Contact Phone" maxlength="200" id="ContactPhone" required="required" />
         </div>
       </div>

       <div class="form-group">
         <label>
           Centre Name <span class="ms-accentText">*</span>
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="CentreName" ClientIDMode="Static" MaxLength="200" required="required" />
         <div class="invalid-feedback" style="display:none" id="validateCentreName">
           <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
       </div>

       <div class="form-group">
         <label>Centre Number</label>
         <SharePoint:InputFormTextBox runat="server" Text="{@_x0028_Shipto_x0029_AddressLine2}" required="required" CssClass="form-control" ID="ShipToSecondAddressLine" ClientIDMode="Static" MaxLength="200" />
       </div>

       <div class="form-row">
         <div class="form-group col-md-6" style="padding-left:0px">
           <label>Contact Email:</label>
           <input type="text" class="form-control" value="{@ContactEmail}" placeholder="Contact Email" maxlength="200" id="ContactEmail" required="required" />
         </div>
         <div class="form-group col-md-6" style="padding-right:0px">
           <label>Expected Delivery Date:</label>
           <input type="date" class="form-control" value="{ddwrt:FormatDateTime(string(@ExpectedDeliveryDate),1033,'yyyy-MM-dd')}" id="ExpectedDeliveryDate" required="required" />
         </div>
       </div>
       
       <div class="form-group">
         <label>
           Country
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control"  ReadOnly="true"   Text="{@_x0028_Shipto_x0029_Country}" ID="ShipToCountry" ClientIDMode="Static" MaxLength="200" />
       </div>

       <div class="form-group">
         <label>
           City
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control"  ReadOnly="true"   Text="{@_x0028_Shipto_x0029_City}" ID="ShipToCity" ClientIDMode="Static" MaxLength="200" required="required" />
       </div>

       <div class="form-group">
         <label>
           Postal Code
         </label>
         <SharePoint:InputFormTextBox runat="server" ReadOnly="true"  CssClass="form-control" Text="{@_x0028_Shipto_x0029_PostalCode}" ID="ShipToPostalCode" ClientIDMode="Static" MaxLength="200" required="required" />
       </div>

       <div class="form-group">
         <label>
           Address 1
         </label>
         <SharePoint:InputFormTextBox runat="server"  ReadOnly="true" Text="{@_x0028_Shipto_x0029_AddressLine1}"  CssClass="form-control" ID="ShipToFirstAddressLine" ClientIDMode="Static" MaxLength="200" required="required" />
       </div>
       
        <div class="form-group" style="display:none">
         <label>Created By</label>
         <SharePoint:InputFormTextBox runat="server"  ReadOnly="true"   Text="{@Author.email}" CssClass="form-control" ID="AuthorEmail" ClientIDMode="Static" MaxLength="200" />
       </div>

       <div class="form-group" style="display:none">
         <label>Terms</label>
         <textarea id="TermsAndConditions" value="{@TermsandConditions}">

         </textarea>
       </div>
        
     </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>


