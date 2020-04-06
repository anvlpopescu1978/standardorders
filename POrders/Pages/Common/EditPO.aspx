<%@ Page language="C#" EnableViewState="false" MasterPageFile="~site/_catalogs/masterpage/main.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
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
    <link href="../../Content/DataTable/dataTables.responsive.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/fixedColumns.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.main.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.bundle.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Tooltipster/tooltipster.shadow.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Timeline/timeline.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/App.css" rel="stylesheet" />
</asp:Content>


<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server" EnableViewState="false">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/tooltipster.main.min.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/tooltipster.bundle.min.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.data.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Mail/sharepoint.mail.js" />
            <asp:ScriptReference Path="EditPO.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

    <div class="row">
     <div class="col-lg-12" style="margin: 0px">
            <h1 class="page-header">Edit Purchase Order</h1>
  
             <div class="panel panel-default">
                 <div class="panel-heading">


    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Info</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Edit PO</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="attachments-tab" data-toggle="tab" href="#attachments" role="tab" aria-controls="profile" aria-selected="false">Attachments</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="messages-tab" data-toggle="tab" href="#messages" role="tab" aria-controls="messages" aria-selected="false">Products</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false">Comments History</a>
      </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:GoBackToSource()">Go Back</a>
        </li>

    </ul>

    <div class="tab-content">

       <div class="tab-pane" id="attachments" role="tabpanel" aria-labelledby="attachments-tab">
           <br />
           <div class="row">
                <div class="col-md-12">
                   <div class="form-group">
                        <label>Add Attachment</label>
                        <input type="file" class="form-control" id="AttachmentsField" />
                    </div>
                     <button class="btn btn-primary btn-sm" onclick="javascript:AddAttachment()">Attach File</button>
                </div>
           </div>
           <br />
           <div class="row">
               <div class="col-md-12">
                   <table style="width: 100%" cellspacing="0" class="table table-striped table-bordered table-hover nowrap dataTable no-footer dtr-inline" id="tblAttachments">
                       <thead>
                           <tr>
                               <th style="width:100px">Delete</th>
                               <th></th>
                           </tr>
                       </thead>
                       <tbody>

                       </tbody>
                   </table>
              </div>
           </div>
       </div>

      <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
           <!-- PO -->
          <br />

   <div class="form-row">
      <div class="form-group col-md-12">
         <div class="create-po-header">
             <h3>Invoicing Details</h3>
        </div>
      </div>
    </div>

	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
            <label>Country</label>
            <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="InvoiceToCountry"  ReadOnly="true"  Text="" ClientIDMode="Static" MaxLength="200" required="required" />

	</div>
 	<div class="form-group col-md-6" style="padding-right:0px">
        <label>Company Name</label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="CustomerCompanyName" ReadOnly="true" Text="" ClientIDMode="Static" MaxLength="200" required="required" />
	</div>    
	</div>

	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
       <label>City</label>
       <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="InvoiceToCity" Text=""  ReadOnly="true"  ClientIDMode="Static" MaxLength="200" required="required" />
	</div>
 	<div class="form-group col-md-6" style="padding-right:0px">
            <label>Postal Code</label>
            <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="InvoiceToPostalCode" Text=""  ReadOnly="true"  ClientIDMode="Static" MaxLength="200" required="required" />
	</div>   
	</div>

	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
            <label>Address</label>
            <SharePoint:InputFormTextBox runat="server" CssClass="form-control"  ReadOnly="true" Text="" ID="InvoiceToFirstAddressLine" ClientIDMode="Static" MaxLength="200" required="required" />

    </div>
 	<div class="form-group col-md-6" style="padding-right:0px">
         <label>VAT Number</label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="VATNumber" ReadOnly="true" Text="" ClientIDMode="Static" MaxLength="200" required="required" />
	</div>   
	</div>

	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
        <label>Site Statement of Work Number</label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="SSOWNumber" ReadOnly="true" Text="" ClientIDMode="Static" MaxLength="200" required="required" />
    </div>
 	<div class="form-group col-md-6" style="padding-right:0px">
        <label>CPA Date</label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="CPADate" ReadOnly="true" Text="" ClientIDMode="Static" MaxLength="200" required="required" />
	</div>   
	</div>


	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
            <label>Currency</label>
            <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="InvoiceToCurrency"  ReadOnly="true"  Text="" ClientIDMode="Static" MaxLength="200" required="required" />
    </div>
 	<div class="form-group col-md-6" style="padding-right:0px">
            <label>Invoice Currency</label>
            <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="NewCurrencyField"  ReadOnly="true"  Text="" ClientIDMode="Static" MaxLength="200" required="required" />
	</div>   
	</div>


        <div class="form-row">
         <div class="form-group col-md-6" style="padding-left:0px">
           <label>Requestor Name:</label>
           <input type="text" class="form-control" readonly="readonly"  value="" placeholder="Requester Name" maxlength="200" id="RequesterName" required="required" />
         </div>
         <div class="form-group col-md-6" style="padding-right:0px">
           <label>Requestor Email:</label>
           <input type="text" class="form-control" readonly="readonly"  value="" placeholder="Requester Email" maxlength="200" id="RequesterEmail" required="required" />
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
           <label>Ship To</label>
           <input type="text" class="form-control" id="shipToSite" readonly="readonly"  required="required"/>
       </div>

     <div class="form-group">
        <label>Partner Address </label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control"  ReadOnly="true"   Text="" ID="InvoiceToSecondAddressLine" ClientIDMode="Static" MaxLength="200" />
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
       <label>Country</label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control"  ReadOnly="true"   Text="" ID="ShipToCountry" ClientIDMode="Static" MaxLength="200" />
	</div>
 	<div class="form-group col-md-6" style="padding-right:0px">
       <label>City</label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control"  ReadOnly="true"   Text="" ID="ShipToCity" ClientIDMode="Static" MaxLength="200" required="required" />
	</div>
	</div>  

 	<div class="form-row">	
	<div class="form-group col-md-6" style="padding-left:0px">
      <label>Postal Code</label>
       <SharePoint:InputFormTextBox runat="server" ReadOnly="true"  CssClass="form-control" Text="" ID="ShipToPostalCode" ClientIDMode="Static" MaxLength="200" required="required" />
	</div>
 	<div class="form-group col-md-6" style="padding-right:0px">
      <label>Address</label>
      <SharePoint:InputFormTextBox runat="server"  ReadOnly="true" Text=""  CssClass="form-control" ID="ShipToFirstAddressLine" ClientIDMode="Static" MaxLength="200" required="required" />
	</div>
	</div>  


       <div class="form-group">
         <label>
           Site Name <span class="ms-accentText">*</span>
         </label>
         <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="CentreName" ReadOnly="true" ClientIDMode="Static" MaxLength="200" required="required" />
         <div class="invalid-feedback" style="display:none" id="validateCentreName">
           <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
       </div>



       <div class="form-row">
         <div class="form-group col-md-6" style="padding-left:0px">
           <label>Site Contact Name:</label>
           <input type="text" class="form-control" readonly="readonly"  value="" placeholder="Contact Name" maxlength="200" id="ContactName" required="required" />
         </div>
         <div class="form-group col-md-6" style="padding-right:0px">
           <label>Site Contact Phone:</label>
           <input type="text" class="form-control" readonly="readonly"   value="" placeholder="Contact Phone" maxlength="200" id="ContactPhone" required="required" />
         </div>
       </div>



       <div class="form-row">
         <div class="form-group col-md-6" style="padding-left:0px">
           <label>Contact Email:</label>
           <input type="text" class="form-control" value="" readonly="readonly" placeholder="Contact Email" maxlength="200" id="ContactEmail" required="required" />
         </div>
         <div class="form-group col-md-6" style="padding-right:0px">
           <label>Expected Delivery Date:</label>
           <input type="text" class="form-control" readonly="readonly" id="ExpectedDeliveryDate" required="required" />
         </div>
       </div>

        <div class="form-row">
             <label>Customer Requested Date</label>
             <input type="text" class="form-control" value="" readonly="readonly" placeholder="Customer Requested Date" maxlength="200" id="CustomerRequestedDate" required="required" />
        </div>
       





       
        <div class="form-group" style="display:none">
         <label>Created By</label>
         <SharePoint:InputFormTextBox runat="server"  ReadOnly="true"   Text="" CssClass="form-control" ID="AuthorEmail" ClientIDMode="Static" MaxLength="200" />
       </div>

       <div class="form-group" style="display:none">
         <label>Terms</label>
         <textarea id="TermsAndConditions"></textarea>
       </div>

          <br />
          <!-- End PO -->
      </div>

      <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">

          <!-- PO Editable area -->
         <WebPartPages:XsltListViewWebPart runat="server" CacheXslStorage="false" SuppressWebPartChrome="True" ID="EditableArea"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/Purchase Orders" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
            <XmlDefinition>
             <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
             <Query>
			    <Where>
				    <Eq><FieldRef Name="ID" /><Value Type="Integer">{poId}</Value></Eq>
			    </Where>
		    </Query>
		    <RowLimit Paged="TRUE">50</RowLimit>
		        <JSLink>clienttemplates.js</JSLink>
		        <XslLink Default="TRUE">main.xsl</XslLink>
		        <Toolbar Type="Standard"/>
	        </View>
            </XmlDefinition>
            <ParameterBindings>
	            <ParameterBinding Name="poId" Location="QueryString(poId)" DefaultValue="0" />
                <ParameterBinding Name="IsAdmin" Location="Control(ctl00$ContentPlaceHolderMaim$CurrentUserRole$UserIsAdmin)" DefaultValue="0" />
	            <ParameterBinding Name="CanWork" Location="Control(ctl00$ContentPlaceHolderMaim$CurrentUserRole$UserCanWork)" DefaultValue="0" />
            </ParameterBindings>
            <Xsl>
                <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharept/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:pcm="urn:PageContentManager" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office" ddwrt:ghost="show_all">
                    <xsl:include href="main.xslt"/>
                    <xsl:include href="/_layouts/15/xsl/internal.xsl"/>
                    <xsl:include href="editpo2.xslt"/>           
                </xsl:stylesheet>
            </Xsl>
        </WebPartPages:XsltListViewWebPart>
          <!-- End of PO editable area -->

      </div>
      <div class="tab-pane" id="messages" role="tabpanel" aria-labelledby="messages-tab">
          <!-- Products -->
          <br />

          <div style="width:100%; overflow: auto">
                     <WebPartPages:XsltListViewWebPart runat="server" CacheXslStorage="false" SuppressWebPartChrome="True" ID="BasketWP"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/HPBasket" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
            <XmlDefinition>
             <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
             <Query>
			    <Where>
                    <And>
				    <Eq><FieldRef Name="OrderID"  LookupId="TRUE"/><Value Type="Lookup">{poId}</Value></Eq>
                        <In>
                            <FieldRef Name="Class" />
                            <Values>
                                <Value Type="Text">solution</Value>
                                <Value Type="Text">printer</Value>
                                <Value Type="Text">accessory</Value>
                            </Values>
                        </In>
			        </And>
                  </Where>
                 <OrderBy>
                    <FieldRef Name="SolutionNumber" Ascending="TRUE" />
                    <FieldRef Name="SolutionNumberOrdering" Ascending="TRUE" />
                 </OrderBy>
		    </Query>
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
                    <xsl:include href="basket.xslt"/>           
                </xsl:stylesheet>
            </Xsl>
        </WebPartPages:XsltListViewWebPart>
</div>
          <br />
          <!-- End Products -->
      </div>

      <div class="tab-pane" id="settings" role="tabpanel" aria-labelledby="settings-tab">
        <br />
            <!-- History -->
          <div style="width:100%; overflow: auto">
             <WebPartPages:XsltListViewWebPart runat="server" ViewFlag="1" CacheXslStorage="false" SuppressWebPartChrome="True" ID="CommentsHistory"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/Comments" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
            <XmlDefinition>
             <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
             <Query>
			    <Where>
				    <Eq><FieldRef Name="PoId"  LookupId="TRUE"/><Value Type="Lookup">{poId}</Value></Eq>
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
	            <ParameterBinding Name="location" Location="ServerVariable(URL)" />
            </ParameterBindings>
            <Xsl>
                <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:pcm="urn:PageContentManager" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office" ddwrt:ghost="show_all">
                    <xsl:include href="main.xslt"/>
                    <xsl:include href="/_layouts/15/xsl/internal.xsl"/>
                    <xsl:include href="history.xslt"/>           
                </xsl:stylesheet>
            </Xsl>
        </WebPartPages:XsltListViewWebPart>
              </div>
              </div>
            <!-- Comments History -->
        <br  />
  
    </div>
     
    <br />


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
                    <xsl:include href="userrole.xslt"/>           
                </xsl:stylesheet>
            </Xsl>
        </WebPartPages:XsltListViewWebPart>


       <WebPartPages:XsltListViewWebPart runat="server" SuppressWebPartChrome="True" ID="XsltListViewWebPart1"  IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/Users" ClientIDMode="Static" EnableViewState="false" EnableOriginalValue="true">
            <XmlDefinition>
             <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
             <Query>
			    <Where>
                      <Eq><FieldRef Name="Role" /><Value Type="Text">Administrator</Value></Eq>
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
                    <xsl:include href="administrators.xslt"/>           
                </xsl:stylesheet>
            </Xsl>
        </WebPartPages:XsltListViewWebPart>

    </div>



                 </div>
             </div>
      </div>
    </div>





    <SharePoint:SPDataSource runat="server" SelectCommand="<![CDATA[<View></View>]]>" DataSourceMode="List" IncludeHidden="true" ID="DSUsers" UseInternalName="true" UseServerDataFormat="true">
    <SelectParameters>
        <asp:Parameter Name="ListName" DefaultValue="Users" />
    </SelectParameters>
    </SharePoint:SPDataSource>

</asp:Content>
