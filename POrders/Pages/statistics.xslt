<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:asp="http://schemas.microsoft.com/ASPNET/20"
    xmlns:ddwrt2="urn:frontpage:internal" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:SharePoint="Microsoft.SharePoint.WebControls">
  <xsl:output method="html" indent="yes"/>
  <xsl:template match="/">
    <xsl:value-of select="ddwrt:SetVar('New', 0)" />
    <xsl:value-of select="ddwrt:SetVar('Assigned', 0)" />
    <xsl:value-of select="ddwrt:SetVar('Ordered', 0)" />
    <xsl:value-of select="ddwrt:SetVar('Delivered', 0)" />
    <xsl:value-of select="ddwrt:SetVar('Cancel', 0)" />
    <xsl:value-of select="ddwrt:SetVar('CountNew', 0)" />
    <xsl:value-of select="ddwrt:SetVar('CountAssigned', 0)" />
    <xsl:value-of select="ddwrt:SetVar('CountOrdered', 0)" />
    <xsl:value-of select="ddwrt:SetVar('CountDelivered', 0)" />
    <xsl:value-of select="ddwrt:SetVar('CountCancel', 0)" />   
    
    <xsl:for-each select="/dsQueryResponse/Rows/Row">
      <xsl:if test="@_x0023_Devices != ''">
        <xsl:value-of select="ddwrt:SetVar('CountDevices', number(translate(@_x0023_Devices,',','')))"/>
        <xsl:choose>
          <xsl:when test="@Phase = 'New'">
            <xsl:value-of select="ddwrt:SetVar('New', ddwrt:GetVar('New') + ddwrt:GetVar('CountDevices'))"/>
            <xsl:value-of select="ddwrt:SetVar('CountNew', ddwrt:GetVar('CountNew') + 1)"/>
          </xsl:when>
          <xsl:when test="@Phase = 'Assigned'">
            <xsl:value-of select="ddwrt:SetVar('Assigned', ddwrt:GetVar('Assigned') + ddwrt:GetVar('CountDevices'))"/>
            <xsl:value-of select="ddwrt:SetVar('CountAssigned', ddwrt:GetVar('CountAssigned') + 1)"/>
          </xsl:when>
          <xsl:when test="@Phase = 'Ordered'">
            <xsl:value-of select="ddwrt:SetVar('Ordered', ddwrt:GetVar('Ordered') + ddwrt:GetVar('CountDevices'))"/>
            <xsl:value-of select="ddwrt:SetVar('CountOrdered', ddwrt:GetVar('CountOrdered') + 1)"/>
          </xsl:when>
          <xsl:when test="@Phase = 'Delivered'">
            <xsl:value-of select="ddwrt:SetVar('Delivered', ddwrt:GetVar('Delivered') + ddwrt:GetVar('CountDevices'))"/>
            <xsl:value-of select="ddwrt:SetVar('CountDelivered', ddwrt:GetVar('CountDelivered') + 1)"/>
          </xsl:when>
          <xsl:when test="@Phase = 'Canceled'">
            <xsl:value-of select="ddwrt:SetVar('Cancel', ddwrt:GetVar('Cancel') + ddwrt:GetVar('CountDevices'))"/>
            <xsl:value-of select="ddwrt:SetVar('CountCancel', ddwrt:GetVar('CountCancel') + 1)"/>
          </xsl:when>
        </xsl:choose>
      </xsl:if>
    </xsl:for-each>

    <div class="row">
      
      <!-- New -->
      <div class="col-lg-3 col-md-6">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-3">
                <i class="fa fa-tasks fa-5x"></i>
              </div>
              <div class="col-xs-9 text-right">
                <div class="huge">
                  <xsl:value-of select="ddwrt:GetVar('New')" disable-output-escaping="yes" /> devices
                </div>
                <div>
                  <xsl:value-of select="ddwrt:GetVar('CountNew')" disable-output-escaping="yes" /> 
                  New POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: NavigateToPage('/Pages/PO/MyOrders.aspx?Status=New');">
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
              <div class="col-xs-3">
                <i class="fa fa-tasks fa-5x"></i>
              </div>
              <div class="col-xs-9 text-right">
                <div class="huge">
                  <xsl:value-of select="ddwrt:GetVar('Assigned')" disable-output-escaping="yes" /> devices
                </div>
                <div>
                  <xsl:value-of select="ddwrt:GetVar('CountAssigned')" disable-output-escaping="yes" /> 
                  Assigned POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: NavigateToPage('/Pages/PO/MyOrders.aspx?Status=Assigned');">
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
              <div class="col-xs-3">
                <i class="fa fa-tasks fa-5x"></i>
              </div>
              <div class="col-xs-9 text-right">
                <div class="huge">
                  <xsl:value-of select="ddwrt:GetVar('Ordered')" disable-output-escaping="yes" /> devices
                </div>
                <div>
                  <xsl:value-of select="ddwrt:GetVar('CountOrdered')" disable-output-escaping="yes" /> 
                  Ordered POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: NavigateToPage('/Pages/PO/MyOrders.aspx?Status=Ordered');">
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
              <div class="col-xs-3">
                <i class="fa fa-tasks fa-5x"></i>
              </div>
              <div class="col-xs-9 text-right">
                <div class="huge">
                  <xsl:value-of select="ddwrt:GetVar('Delivered')" disable-output-escaping="yes" /> devices
                </div>
                <div>
                  <xsl:value-of select="ddwrt:GetVar('CountDelivered')" disable-output-escaping="yes" /> 
                  Delivered POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: NavigateToPage('/Pages/PO/MyOrders.aspx?Status=Delivered');">
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
              <div class="col-xs-3">
                <i class="fa fa-tasks fa-5x"></i>
              </div>
              <div class="col-xs-9 text-right">
                <div class="huge">
                  <xsl:value-of select="ddwrt:GetVar('Cancel')" disable-output-escaping="yes" /> devices
                </div>
                <div>
                  <xsl:value-of select="ddwrt:GetVar('CountCancel')" disable-output-escaping="yes" /> 
                  Canceled POs</div>
              </div>
            </div>
          </div>
          <a href="javascript: NavigateToPage('/Pages/PO/MyOrders.aspx?Status=Cancel');">
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

  </xsl:template>
</xsl:stylesheet>
