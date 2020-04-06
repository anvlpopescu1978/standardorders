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
  
    <xsl:template match="/">
       <table class="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" id="dataTable" width="100%" cellspacing="0">
         <thead>
           <tr>
            <th>Action</th>
            <th>Currency Code</th>
            <th>Currency Name</th>
          </tr>         
         </thead>
         <tbody>
          <xsl:for-each select="/dsQueryResponse/Rows/Row">
            <tr>
              <td style="width:100px">
                  <button type="button" onclick="javascript:DeleteCurrency('{@ID}')" class="btn btn-danger btn-xs">Delete</button>
              </td>
              <td>
                <xsl:value-of select="@Title" disable-output-escaping="yes"/>
              </td>
              <td>
                <xsl:value-of select="@CurrencyName" disable-output-escaping="yes"/>
              </td>
            </tr>          
         </xsl:for-each>
       </tbody>       
      </table>
 
  <!-- Pagination -->
  <div style="width:100%; display: block">
    <xsl:if test="$dvt_nextpagedata != '' or $dvt_prevpagedata != ''">
      <xsl:if test="$dvt_prevpagedata != '' and $dvt_firstrow &gt; 1">
         <div class="pagination-div">
            <a href="{$PagePath}?FirstRow={$dvt_firstrow -  $PageSize}&amp;Start={ddwrt:UrlEncode($dvt_prevpagedata)}&amp;SortField={ddwrt:UrlEncode($dvt_sortfield)}&amp;SortDir={ddwrt:UrlEncode($dvt_sortdir)}">Prev</a>   
        </div>
      </xsl:if>  
      <xsl:if test="$dvt_nextpagedata != ''">
       <div class="pagination-div">
         <a href="{$PagePath}?FirstRow={$dvt_firstrow + $PageSize}&amp;Start={ddwrt:UrlEncode($dvt_nextpagedata)}&amp;SortField={ddwrt:UrlEncode($dvt_sortfield)}&amp;SortDir={ddwrt:UrlEncode($dvt_sortdir)}">Next</a>
       </div>
      </xsl:if>
    </xsl:if>
  </div>  
  <!-- End of pagination -->
    
    </xsl:template>
</xsl:stylesheet>
