<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" 
    xmlns:ddwrt2="urn:frontpage:internal" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:SharePoint="Microsoft.SharePoint.WebControls">  
    <xsl:output method="html" indent="yes"/>
    <xsl:param name="dvt_sortdir" />
    <xsl:param name="dvt_sortfield" />
    <xsl:param name="dvt_nextpagedata" />
    <xsl:param name="dvt_prevpagedata" />
    <xsl:param name="dvt_firstrow" select="1"/>
    <xsl:param name="PagePath"/>
    <xsl:param name="PagePathFinal" select="concat($PagePath,'?')"/>

  <xsl:param name="XmlDefinition" select="."/>
    <xsl:param name="PageSize" select="$XmlDefinition/RowLimit" />
    <xsl:param name="Status" />

  <xsl:template match="/">
    
  <div class="row">
    <br />
    <div class="col-lg-12" style="margin: 0px">
         <h1 class="page-header">IWG Orders</h1>
    </div>


    <div class="col-lg-12" style="margin: 0px">
    <div class="portlet portlet-blue">
      <div class="portlet-heading">
        <div class="portlet-title">
          <h4>Apply Filters</h4>
        </div>
        <div class="portlet-widgets">
          <a data-toggle="collapse"  href="#filters" aria-expanded="false">
            <i class="fa fa-chevron-down"></i>
          </a>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="portlet-body panel-collapse collapse" id="filters">
        <div class="form-group" style="width:100%">
          <label for="Country">Status:</label>
          <SharePoint:DVDropDownList runat="server" SelectedValue="{$Status}" AppendDataBoundItems="True" CssClass="form-control" ClientIDMode="Static" ID="Status" DataSourceID="DSPhases" DataTextField="Phase" DataValueField="Phase" onchange="javascript:StatusChanged()">
            <asp:ListItem Text="All" Value="e" />
            <asp:ListItem Text="New" Value="New" />
            <asp:ListItem Text="Assigned" Value="Assigned" />
            <asp:ListItem Text="Ordered" Value="Ordered" />
            <asp:ListItem Text="Delivered" Value="Delivered" />
            <asp:ListItem Text="Canceled" Value="Canceled" />
          </SharePoint:DVDropDownList>
        </div>

        <div class="form-group" style="width:100%">
          <label for="SortField">Sort By:</label>
          <SharePoint:DVDropDownList runat="server" SelectedValue="{$dvt_sortfield}" AppendDataBoundItems="True" CssClass="form-control" ClientIDMode="Static" ID="SortField">
            <asp:ListItem Text="ID" Value="ID" />
            <asp:ListItem Text="Status" Value="Status" />
            <asp:ListItem Text="Customer Name" Value="CustomerName" />
          </SharePoint:DVDropDownList>
        </div>

        <div class="form-group" style="width:100%">
          <label for="SortField">Sort Dir:</label>

          <xsl:choose>
            <xsl:when test="$dvt_sortdir = 'ascending' or $dvt_sortdir  = 'TRUE' or $dvt_sortdir  = 'Asc'">
              <xsl:value-of select="ddwrt:SetVar('Direction', 'Asc')"/>
            </xsl:when>
            <xsl:when test="$dvt_sortdir = 'descending' or $dvt_sortdir  = 'FALSE' or $dvt_sortdir  = 'Desc'">
              <xsl:value-of select="ddwrt:SetVar('Direction', 'Desc')"/>
            </xsl:when>
          </xsl:choose>
          <SharePoint:DVDropDownList runat="server" SelectedValue="{ddwrt:GetVar('Direction')}" AppendDataBoundItems="True" CssClass="form-control" ClientIDMode="Static" ID="SortDir">
            <asp:ListItem Text="Ascending" Value="Asc" />
            <asp:ListItem Text="Descending" Value="Desc" />
          </SharePoint:DVDropDownList>
        </div>

        <div class="form-group" style="width:100%; text-align: right;">
          <button type="button" class="btn  btn-primary" onclick="javascript:ChangeView()">Change View</button>
        </div>

      </div>
    </div>
  </div>


    <div class="col-lg-12" style="margin: 0px">
      <div class="portlet portlet-green">
        <div class="portlet-heading">
          <div class="portlet-title">
            <h4>Orders</h4>
          </div>
          <div class="portlet-widgets">
            <a data-toggle="collapse"  href="#orders">
              <i class="fa fa-chevron-up"></i>
            </a>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="portlet-body panel-collapse collapse in" id="orders">
          <table class="table table-striped table-bordered nowrap" id="dataTable" style="width: 100%;"  cellspacing="0">
            <thead>
              <tr>
                <th style="width:110px; background-color:#fff">Edit</th>
                <th style="width:50px">
                  ID
                </th>
                <th>
                  Company<br />Name
                </th>
                <th>
                  VAT<br />Number
                </th>
                <th>
                  Assigned To
                </th>
                <th>
                  Status
                </th>
                <th>
                  Currency
                </th>
                <th>
                  Ship To<br />Country
                </th>
                <th>
                  Qty
                </th>
                <th>
                  Attachments
                </th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="/dsQueryResponse/Rows/Row">
                <tr>
                  <td>
                    <button type="button" class="btn btn-sm btn-primary" onclick="javascript:EditPO('{@ID}')">Edit</button>
                  </td>
                  <td>
                    <xsl:value-of select="@ID" disable-output-escaping="yes"/>
                  </td>
                  <td>
                    <xsl:value-of select="@CustomerName" disable-output-escaping="yes"/>
                  </td>
                  <td>
                    <xsl:value-of select="@VATNumber" disable-output-escaping="yes"/>
                  </td>
                  <td>
                    <xsl:value-of select="@AssignedTo1.title" disable-output-escaping="yes"/>
                  </td>
                  <td>
                    <xsl:value-of select="@Phase" disable-output-escaping="yes"/>
                  </td>
                  <td>
                    <xsl:value-of select="@Currency" disable-output-escaping="yes"/>
                  </td>
                  <td>
                    <xsl:value-of select="@_x0028_Shipto_x0029_Country" disable-output-escaping="yes"/>
                  </td>
                  <td>
                    <xsl:value-of select="@_x0023_Devices" disable-output-escaping="yes"/>
                  </td>
                  <td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="@Attachments != '0'">Yes</xsl:when>
                        <xsl:otherwise>No</xsl:otherwise>
                      </xsl:choose>
                    </td>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <!-- Pagination -->
          <div style="width:100%; display: block">
            <xsl:if test="$dvt_nextpagedata or $dvt_prevpagedata">
              <xsl:if test="$dvt_prevpagedata and $dvt_firstrow &gt; 1">
                <a href="{$PagePath}?FirstRow={$dvt_firstrow -  $PageSize}&amp;Start={ddwrt:UrlEncode($dvt_prevpagedata)}&amp;Status={$Status}" class="link-navigation">
                  Prev
                </a>&#160;&#160;
              </xsl:if>
              <xsl:if test="$dvt_nextpagedata">
                <a href="{$PagePath}?FirstRow={$dvt_firstrow + $PageSize}&amp;Start={ddwrt:UrlEncode($dvt_nextpagedata)}&amp;Status={$Status}" class="link-navigation">
                  Next
                </a>
              </xsl:if>
            </xsl:if>
          </div>
          <!-- End of pagination -->
        </div>
      </div>
    </div>  
    
    
  </div>





  

  

  </xsl:template>
</xsl:stylesheet>
