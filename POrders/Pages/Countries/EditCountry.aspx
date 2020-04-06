<%@ Page language="C#" MasterPageFile="~site/_catalogs/masterpage/dialog.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
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
             <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
             <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
             <asp:ScriptReference Path="EditCountry.js" />
         </Scripts>
     </asp:ScriptManagerProxy>

 <div class="row">
     <div class="col-lg-12">
        <h1 class="page-header">Edit Country</h1>

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
                       <label>Invoice To Currency</label>
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
                         <label>Partner Address</label>
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
                       <button type="button" class="btn btn-primary btn-sm" onclick="javascript:SaveCountry()">Save Changes</button>&#160;
                       <button type="button" class="btn btn-danger btn-sm" onclick="javascript:CloseEdit()">Close</button>
                   </div>



               </div>
          </div>

    </div>
</div>


<SharePoint:SPDataSource ID="DSCurrencies" runat="server" UseServerDataFormat="true" UseInternalName="true" SelectCommand="<![CDATA[<View><Query><OrderBy><FieldRef Name='Title' Ascending='TRUE' /></OrderBy></Query></View>]]>">
<SelectParameters>
    <asp:Parameter Name="ListName" DefaultValue="Currencies" />
</SelectParameters>
</SharePoint:SPDataSource>

</asp:Content>