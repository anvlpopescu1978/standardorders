<%@ Page Language="C#" MasterPageFile="~site/_catalogs/masterpage/main.master" MaintainScrollPositionOnPostback="true" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../../Content/corev15.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Bootstrap/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/FontAwesome/fontawesome.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/datatables.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/DataTable/fixedColumns.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/App.css" rel="stylesheet" type="text/css" />
</asp:Content>


<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../../Scripts/Framework/Dialog/sharepoint.dialog.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/datatables.js" />
            <asp:ScriptReference Path="../../Scripts/Framework/DataTable/dataTables.fixedColumns.js" />
            <asp:ScriptReference Path="ManageUsers.js" />
        </Scripts>
    </asp:ScriptManagerProxy>


    <div class="row">

        <div class="col-lg-12" style="margin: 0px">
            <h1 class="page-header">Manage Users</h1>
            <div class="portlet portlet-blue">
                <div class="portlet-heading">
                    <div class="portlet-title">
                        <h4><i class="fa fa-users"></i>&nbsp;New user</h4>
                    </div>
                    <div class="portlet-widgets">
                        <a data-toggle="collapse" href="#addnewusersection" aria-expanded="false">
                            <i class="fa fa-chevron-down"></i>
                        </a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="portlet-body panel-collapse collapse" id="addnewusersection">
                    <div class="form-group">
                        <label>New user <span class="ms-accentText">*</span></label>
                        <SharePoint:ClientPeoplePicker runat="server" ID="NewUserToAdd" AllowMultipleEntities="false" ClientIDMode="Static" />
                        <div class="invalid-feedback" style="display: none" id="validateNewUserToAdd">
                            <i class="fa fa-exclamation-triangle"></i>Mandatory field
                        </div>
                    </div>


                    <div class="form-group">
                        <label>Company/Parner Name <span class="ms-accentText">*</span></label>
                        <SharePoint:DVDropDownList runat="server" DataSourceID="DSPartners" DataValueField="Title" DataTextField="Title" SelectedValue="" CssClass="form-control" ClientIDMode="Static" ID="PartnerSelector" required="required">
                            <asp:ListItem Text="..." Value="" />
                        </SharePoint:DVDropDownList>
                        <div class="invalid-feedback" style="display: none" id="validatePartner">
                            <i class="fa fa-exclamation-triangle"></i>Mandatory field
                        </div>
                    </div>

                    <div class="form-group">
                        <label>User Role <span class="ms-accentText">*</span></label>
                        <SharePoint:DVDropDownList runat="server" DataSourceID="DSUserRoles" DataValueField="Title" DataTextField="Title" SelectedValue="" CssClass="form-control" ClientIDMode="Static" ID="UserRole" required="required">
                            <asp:ListItem Text="..." Value="" />
                        </SharePoint:DVDropDownList>
                        <div class="invalid-feedback" style="display: none" id="validateIsWorker">
                            <i class="fa fa-exclamation-triangle"></i>Mandatory field
                        </div>
                    </div>



                    <div class="form-group">
                        <button type="button" class="btn btn-default  btn-sm" onclick="AddNewUser()">Add new user</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12" style="margin: 0px">
            <div class="portlet portlet-purple">
                <div class="portlet-heading">
                    <div class="portlet-title">
                        <h4><i class="fa fa-sort"></i>&nbsp;Sort Data</h4>
                    </div>
                    <div class="portlet-widgets">
                        <a data-toggle="collapse" href="#sortdata" aria-expanded="false">
                            <i class="fa fa-chevron-down"></i>
                        </a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="portlet-body panel-collapse collapse" id="sortdata">
                    <div class="form-group">
                        <label>Sort By</label>
                        <select class="form-control" id="SortField">
                            <option value="ID">Created Date</option>
                            <option value="DisplayName">Name</option>
                            <option value="EmailAddress">Email</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-control" id="SortDirection">
                            <option value="Asc">Ascending</option>
                            <option value="Desc">Descending</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-default btn-sm" onclick="javascript:ChangeView()">Change View</button>&#160;
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12" style="margin: 0px">
            <div class="portlet portlet-green">
                <div class="portlet-heading">
                    <div class="portlet-title">
                        <h4><i class="fa fa-table"></i>&nbsp;Users</h4>
                    </div>
                    <div class="portlet-widgets">
                        <a data-toggle="collapse" href="#usersection" aria-expanded="true">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="portlet-body panel-collapse collapse in" id="usersection">
                    <WebPartPages:XsltListViewWebPart runat="server" SuppressWebPartChrome="True" ID="EditProduct" IsIncluded="True" GhostedXslLink="main.xsl" ListUrl="Lists/Users" ClientIDMode="Static" EnableViewState="true" EnableOriginalValue="true">
                        <XmlDefinition>
         <View MobileView="TRUE"  Type="HTML"  Level="1" BaseViewID="1" ContentTypeID="0x" ImageUrl="/_layouts/15/images/generic.png?rev=44">
           <JSLink>clienttemplates.js</JSLink>
		    <XslLink Default="TRUE">main.xsl</XslLink>
		    <Toolbar Type="Standard"/>
	    </View>
                        </XmlDefinition>
                        <ParameterBindings>
	            <ParameterBinding Name="productId" Location="QueryString(productId)" />
                <ParameterBinding Name="selectedUser" Location="Postback" />
	            <ParameterBinding Name="dvt_sortdir" Location="QueryString(SortDir)" DefaultValue="FALSE" />
	            <ParameterBinding Name="dvt_sortfield" Location="QueryString(SortField)" DefaultValue="ID" />
                        </ParameterBindings>
                        <Xsl>
            <xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:pcm="urn:PageContentManager" xmlns:ddwrt2="urn:frontpage:internal" xmlns:o="urn:schemas-microsoft-com:office:office" ddwrt:ghost="show_all">
                <xsl:include href="/_layouts/15/xsl/main.xsl"/> 
                <xsl:include href="/_layouts/15/xsl/internal.xsl"/>
                <xsl:include href="manageusers.xslt"/>           
            </xsl:stylesheet>
                        </Xsl>
                    </WebPartPages:XsltListViewWebPart>
                </div>
            </div>

        </div>
    </div>
    <SharePoint:SPDataSource runat="server" ID="DSUserRoles" UseServerDataFormat="true" DataSourceMode="List" SelectCommand="<View></View>">
        <SelectParameters>
            <asp:Parameter Name="ListName" DefaultValue="UserRoles" />
        </SelectParameters>
    </SharePoint:SPDataSource>

    <SharePoint:SPDataSource runat="server" ID="DSPartners" UseServerDataFormat="true" DataSourceMode="List" SelectCommand="<View></View>">
        <SelectParameters>
            <asp:Parameter Name="ListName" DefaultValue="Companies" />
        </SelectParameters>
    </SharePoint:SPDataSource>

</asp:Content>
