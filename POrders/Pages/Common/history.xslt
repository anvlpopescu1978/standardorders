<xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:ddwrt2="urn:frontpage:internal">
  <xsl:output method="html" indent="no"/>
  <xsl:decimal-format NaN="0" name="en-us" grouping-separator="," decimal-separator="."/>
  <xsl:param name="location" />
  <xsl:template match="/">
    <ul class="timeline">
      <xsl:for-each select="/dsQueryResponse/Rows/Row">        
        <li>
          <xsl:if test="(position() mod 2) = 0">
            <xsl:attribute name="class">timeline-inverted</xsl:attribute>
          </xsl:if>
          <div class="timeline-badge">
            <i class="glyphicon glyphicon-check"></i>
          </div>
          <div class="timeline-panel">
            <div class="timeline-heading">
              <p>
                <small class="text-muted">
                  <xsl:value-of select="concat(@Author.title, ' says on ', @Created)" disable-output-escaping="yes" />
                  <br />
                  Status: <xsl:value-of select="@Phase" disable-output-escaping="yes"/> Modified Date: <xsl:value-of select="@ModifiedDate" disable-output-escaping="yes"/>
                </small>
              </p>
            </div>
            <div class="timeline-body">
              <xsl:value-of select="@Comments1" disable-output-escaping="yes"/>
            </div>
          </div>
        </li>
      </xsl:for-each>
    </ul>
  </xsl:template>
</xsl:stylesheet>
