<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~site/_catalogs/masterpage/main.master" Language="C#" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../../Content/corev15.css" rel="stylesheet" />
    <link href="../../Content/Bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="../../Content/FontAwesome/fontawesome.css" rel="stylesheet" />
    <link href="../../Content/App.css" rel="stylesheet" />
</asp:Content>
<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="AddSupplier.js" />
        </Scripts>
    </asp:ScriptManagerProxy>
<div class="row">
    <div class="col-lg-12">
         <h1 class="page-header">Add Supplier</h1>
          <div class="panel panel-default">
              <div class="panel-heading">

     <div class="form-group">
        <label>Supplier Name <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="SupplierName" ClientIDMode="Static" MaxLength="200" />
         <SharePoint:InputFormRequiredFieldValidator runat="server" BreakBefore="true" BreakAfter="false" ErrorMessage="Mandatory field" Display="Dynamic" ControlToValidate="SupplierName" />
     </div>
              
     <div class="form-group">
        <label>Contact Phone No. <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="SupplierPhone" TextMode="Phone" ClientIDMode="Static"  MaxLength="200"   />
        <SharePoint:InputFormRequiredFieldValidator runat="server" BreakBefore="true" BreakAfter="false" ErrorMessage="Mandatory field" Display="Dynamic" ControlToValidate="SupplierPhone" />
     </div>

      <div class="form-group">
        <label>Address <span class="ms-accentText">*</span></label>
        <SharePoint:InputFormTextBox runat="server" CssClass="form-control" ID="SupplierAddress"  TextMode="MultiLine" RichText="false" ClientIDMode="Static"  MaxLength="500" />
        <SharePoint:InputFormRequiredFieldValidator runat="server" BreakBefore="true" BreakAfter="false" ErrorMessage="Mandatory field" Display="Dynamic" ControlToValidate="SupplierAddress" />
     </div> 
                  
    <div  class="form-group">
        <label>Contact Person <span class="ms-accentText">*</span></label>
        <SharePoint:ClientPeoplePicker runat="server" ID="SupplierContactPerson" AllowMultipleEntities="false" ClientIDMode="Static"  />
        <SharePoint:InputFormCustomValidator runat="server" ControlToValidate="" ValidateEmptyText="true" ClientValidationFunction="validateContactPerson" ErrorMessage="Mandatory field" BreakAfter="false" BreakBefore="True" Display="Dynamic" />
    </div>

    <div  class="form-group">
        <button type="button" class="btn btn-primary btn-sm" onclick="javascript:AddSupplier()">Add supplier</button>
   </div>

              </div>
         </div>
    </div>
</div>

</asp:Content>
