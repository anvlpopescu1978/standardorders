﻿<%@ Page language="C#" MasterPageFile="~site/_catalogs/masterpage/main.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
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
             <asp:ScriptReference Path="LegalEntities.js" />
         </Scripts>
     </asp:ScriptManagerProxy>

 <div class="row">
     <div class="col-lg-12">
        <h1 class="page-header">Legal Entities</h1>

          <div class="panel panel-default">
                <a data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Show/Hide Form</a>
          </div>
          <div class="panel panel-default collapse multi-collapse" id="multiCollapseExample1">
               <div class="panel-heading">
                   <div class="form-group">
                       <label>Country</label>
                       <SharePoint:DVDropDownList runat="server" AppendDataBoundItems="true" ClientIDMode="Static" CssClass="form-control" ID="NewCountry" required="required" DataSourceID="DSCountries" DataTextField="Country" DataValueField="CountryCode">
                          <asp:ListItem Text="..." Value="" />
                       </SharePoint:DVDropDownList>
                   </div>

                    <div class="form-group">
                         <label>Legal Entity Name</label>
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
                       <label>SSOW Number</label>
                       <input type="text" maxlength="200" required="required" id="SSOWNumber" class="form-control" />
                   </div>
                   <div class="form-group">
                       <label>CPA Date</label>
                       <input type="date" required="required" id="CPADate" class="form-control" />
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
                       <button type="button" class="btn btn-primary btn-sm" onclick="javascript:AddLegalEntity()">Add Legal Entity</button>
                   </div>
               </div>
          </div>


                 <table class="table table-striped nowrap table-bordered table-hover dataTable no-footer dtr-inline" id="dataTable" width="100%" cellspacing="0">
                <thead>
                   <tr>
                        <th style="width:100px">Delete</th>
                        <th style="width:100px">Edit</th>
                        <th>Legal Entity</th>
                        <th>Country</th>
                        <th>VAT Number</th>
                        <th>City</th>
                        <th>Postal Code</th>
                        <th>Address</th>
                    </tr>
                </thead>
                 <tbody>
                </tbody>
           </table>



    </div>

  
    

</div>


<SharePoint:SPDataSource ID="DSCountries" runat="server" UseServerDataFormat="true" UseInternalName="true" 
    SelectCommand='<![CDATA[<View><Query><OrderBy><FieldRef Name="Country" /></OrderBy></Query></View>]]>'>
<SelectParameters>
    <asp:Parameter Name="ListName" DefaultValue="Countries" />
</SelectParameters>
</SharePoint:SPDataSource>

</asp:Content>