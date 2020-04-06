<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:SharePoint="Microsoft.SharePoint.WebControls">
  
    <xsl:output method="html" indent="yes"/>
  <xsl:template match="/">

    <table class="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" id="dataTable" style="width: 100%"  cellspacing="0">
      <thead>
        <tr>
          <th style="width:110px; background-color:#fff">Edit</th>
          <th>
            Company Name
          </th>
          <th>
            VAT Number
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
            Price
          </th>
          <th>Ship To Country </th>
          <th>
            Invoice To Country
          </th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="/dsQueryResponse/Rows/Row">
          <tr>
            <td>
              <button type="button" class="btn btn-sm btn-primary" onclick="jaavascript:EDitPOS('{@ID}'">Edit</button>
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
              <xsl:value-of select="@TotalPrice" disable-output-escaping="yes"/>
            </td>
            <td>
                <xsl:value-of select="@_x0028_Shipto_x0029_Country" disable-output-escaping="yes"/>
            </td>
            <td>
                <xsl:value-of select="@_x0028_Invoiceto_x0029_Country" disable-output-escaping="yes"/>
            </td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
</xsl:stylesheet>
