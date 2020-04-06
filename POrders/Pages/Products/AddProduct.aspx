<%@ Page language="C#" MasterPageFile="~site/_catalogs/masterpage/main.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../../Content/corev15.css" rel="stylesheet" />
    <link href="../../Content/Bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="../../Content/FontAwesome/fontawesome.css" rel="stylesheet" />
    <link href="../../Content/App.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/jQuery/jquery.number.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="AddProduct.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

<div class="row">
    <div class="col-lg-12">
         <h1 class="page-header">Add Product</h1>
         <div class="panel panel-default">
              <div class="panel-heading">

     <div class="form-group">
        <label>Product Name <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="ProductName" required="required" ClientIDMode="Static" MaxLength="200" />
         <div class="invalid-feedback" style="display:none" id="validateProductName">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
     </div>
     <div class="form-group">
        <label>Product Code <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="ProductCode" required="required" ClientIDMode="Static" MaxLength="30" />
         <div class="invalid-feedback" style="display:none" id="validateProductCode">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
     </div>
     <div class="form-group">
        <label>Country <span class="ms-accentText">*</span></label>
        <SharePoint:DVDropDownList runat="server" SelectedValue="" CssClass="form-control" ClientIDMode="Static" ID="Country" DataSourceID="DSCountries" DataTextField="Country" DataValueField="CountryCode" required="required" onchange="javascript:GetDefaultCurrency()">
        </SharePoint:DVDropDownList>
         <div class="invalid-feedback" style="display:none" id="validateCountry">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
     </div>
     <div class="form-group">
        <label>Currency <span class="ms-accentText">*</span></label>
        <SharePoint:DVDropDownList runat="server" SelectedValue="" CssClass="form-control" ClientIDMode="Static" ID="ProductCurrency" DataSourceID="DSCurrencies" DataTextField="Title" DataValueField="Title" required="required">
        </SharePoint:DVDropDownList>
         <div class="invalid-feedback" style="display:none" id="validateProductCurrency">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
     </div>
     <div class="form-group">
        <label>Supplier <span class="ms-accentText">*</span></label>
        <SharePoint:DVDropDownList runat="server" SelectedValue="" CssClass="form-control" ClientIDMode="Static" required="required" ID="ProductSupplier" DataSourceID="DSSuppliers" DataTextField="SupplierName" DataValueField="SupplierName">
        </SharePoint:DVDropDownList>
         <div class="invalid-feedback" style="display:none" id="validateProductSupplier">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
     </div>
     <div class="form-group">
        <label>Price <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server"  CssClass="form-control" ID="ProductPrice" ClientIDMode="Static" MaxLength="200" required="required" TextMode="Number" step=".01"  />
         <div class="invalid-feedback" style="display:none" id="validateProductPrice">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
     </div>
     <div class="form-group">
        <label>Qty <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server"  CssClass="form-control" ID="ProductQty" ClientIDMode="Static" MaxLength="200" required="required" TextMode="Number"  />
         <div class="invalid-feedback" style="display:none" id="validateProductQty">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
     </div>
     <div class="form-group">
        <label>Product Description <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" TextMode="MultiLine" RichText="false"  CssClass="form-control" ID="ProductDescription" ClientIDMode="Static" MaxLength="200"  required="required" />
         <div class="invalid-feedback" style="display:none" id="validateProductDescription">
            <i class="fa fa-exclamation-triangle"></i> Mandatory field
         </div>
     </div>
    <div class="form-group">
        <label>Image</label>
        <input type="file" id="productImage" class="form-control" />
    </div>
    <div  class="form-group">
        <button type="button" class="btn btn-primary btn-sm" onclick="javascript:AddProduct()">Add product</button>
   </div>



              </div>
         </div>
    </div>
</div>

<SharePoint:SPDataSource runat="server" DataSourceMode="List" IncludeHidden="true" ID="DSCountries" UseInternalName="true" UseServerDataFormat="true">
    <SelectParameters>
        <asp:Parameter Name="ListName" DefaultValue="Countries" />
    </SelectParameters>
</SharePoint:SPDataSource>
<SharePoint:SPDataSource runat="server" DataSourceMode="List" IncludeHidden="true" ID="DSCurrencies" UseInternalName="true" UseServerDataFormat="true">
    <SelectParameters>
        <asp:Parameter Name="ListName" DefaultValue="Currencies" />
    </SelectParameters>
</SharePoint:SPDataSource>
<SharePoint:SPDataSource runat="server" DataSourceMode="List" IncludeHidden="true" ID="DSSuppliers" UseInternalName="true"  UseServerDataFormat="true">
    <SelectParameters>
        <asp:Parameter Name="ListName" DefaultValue="Suppliers" />
    </SelectParameters>
</SharePoint:SPDataSource>
</asp:Content>