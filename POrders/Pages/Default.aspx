<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~site/_catalogs/masterpage/main.master" Language="C#" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../Content/Bootstrap/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../Content/FontAwesome/fontawesome.css" rel="stylesheet" type="text/css" />
    <link href="../Content/Charts/morris.css" rel="stylesheet" type="text/css" />
    <link href="../Content/DateRangePicker/daterangepicker.css" rel="stylesheet" type="text/css" />
    <link href="../Content/App.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ContentPlaceHolderID="ContentPlaceHolderMaim" runat="server">
    <asp:ScriptManagerProxy runat="server">
        <Scripts>
            <asp:ScriptReference Path="../Scripts/Framework/Controls/sharepoint.controls.js" />
            <asp:ScriptReference Path="../Scripts/Framework/Lists/sharepoint.data.js" />
            <asp:ScriptReference Path="../Scripts/Framework/Lists/sharepoint.lists.js" />
            <asp:ScriptReference Path="../Scripts/Framework/Moment/moment-with-locales.js" />
            <asp:ScriptReference Path="../Scripts/Framework/DateRangePicker/daterangepicker.min.js" />
            <asp:ScriptReference Path="../Scripts/Framework/EasyPieChart/easypiechart.js" />
            <asp:ScriptReference Path="Default.js" />
        </Scripts>
    </asp:ScriptManagerProxy>

    <div class="row">
        <div class="col-lg-12">
             <h1 class="page-header">Welcome</h1>
             <div class="panel panel-default">
                 <div class="panel-header">
                    <div id="reportrange" style="background: #0096D6; color:#fff; cursor: pointer; padding: 5px 10px;  width: 100%; text-align:right">
                        <i class="fa fa-calendar"></i>&nbsp;
                        <span></span> <i class="fa fa-caret-down"></i>
                    </div><br />
                </div>
                 <div class="panel-body">



    <div class="row">
      
      <!-- New -->
      <div class="col-lg-3 col-md-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-4">
                <div id="easy-pie-new" class="easy-pie-chart" data-percent="0"><span class="percent"></span></div>
              </div>
              <div class="col-xs-8 text-right">
                <div class="huge" id="devicesNew">0 devices</div>
                <div id="countNew">0 New POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: GoToOrders('New');">
            <div class="panel-footer">
              <span class="pull-left">View Orders</span>
              <span class="pull-right">
                <i class="fa fa-arrow-circle-right"></i>
              </span>
              <div class="clearfix"></div>
            </div>
          </a>
        </div>
      </div>

     <!-- Assigned -->
      <div class="col-lg-3 col-md-6">
        <div class="panel panel-yellow">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-4">
                  <div id="easy-pie-assigned" class="easy-pie-chart" data-percent="0"><span class="percent"></span></div>
              </div>
              <div class="col-xs-8 text-right">
                <div class="huge" id="devicesAssigned">0 devices</div>
                <div id="countAssigned">0 Assigned POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: GoToOrders('Assigned');">
            <div class="panel-footer">
              <span class="pull-left">View Orders</span>
              <span class="pull-right">
                <i class="fa fa-arrow-circle-right"></i>
              </span>
              <div class="clearfix"></div>
            </div>
          </a>
        </div>
      </div>

      <!-- Ordered -->
      <div class="col-lg-3 col-md-6">
        <div class="panel panel-green">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-4">
               <div id="easy-pie-ordered" class="easy-pie-chart" data-percent="0"><span class="percent"></span></div>
              </div>
              <div class="col-xs-8 text-right">
                <div class="huge" id="devicesOrdered">0 devices</div>
                <div id="countOrdered">0 Ordered POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: GoToOrders('Ordered');">
            <div class="panel-footer">
              <span class="pull-left">View Orders</span>
              <span class="pull-right">
                <i class="fa fa-arrow-circle-right"></i>
              </span>
              <div class="clearfix"></div>
            </div>
          </a>
        </div>
      </div>     
      
      <!-- Delivered -->
      <div class="col-lg-3 col-md-6">
        <div class="panel panel-red">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-4">
               <div id="easy-pie-delivered" class="easy-pie-chart" data-percent="0"><span class="percent"></span></div>
              </div>
              <div class="col-xs-8 text-right">
                <div class="huge" id="devicesDelivered">0 devices</div>
                <div id="countDelivered">0 Delivered POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: GoToOrders('Delivered');">
            <div class="panel-footer">
              <span class="pull-left">View Orders</span>
              <span class="pull-right">
                <i class="fa fa-arrow-circle-right"></i>
              </span>
              <div class="clearfix"></div>
            </div>
          </a>
        </div>
      </div>

      <!-- Cancel -->
      <div class="col-lg-3 col-md-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-4">
                <div id="easy-pie-canceled" class="easy-pie-chart" data-percent="0"><span class="percent"></span></div>
              </div>
              <div class="col-xs-8 text-right">
                <div class="huge" id="devicesCanceled">0 devices</div>
                <div id="countCanceled">0 Canceled POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: GoToOrders('Cancel');">
            <div class="panel-footer">
              <span class="pull-left">View Orders</span>
              <span class="pull-right">
                <i class="fa fa-arrow-circle-right"></i>
              </span>
              <div class="clearfix"></div>
            </div>
          </a>
        </div>
      </div>
      
    </div>

           

                  </div>
                </div>
             </div>
    </div>

</asp:Content>
