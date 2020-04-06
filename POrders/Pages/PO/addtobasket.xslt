<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" exclude-result-prefixes="msxsl" xmlns:SharePoint="Microsoft.SharePoint.WebControls">
  
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/">
      <xsl:param name="approvedDevices">*3GY25A*5FM81A*Z8Z04A*</xsl:param>


      <div class="card-body">
          <table class="table table-striped table-bordered nowrap" id="dataTable" width="100%" style="white-space:nowrap" cellspacing="0">
            <thead>
              <tr>
                <th>Select</th>
                <th>Custom Group</th>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Class</th>
                <th style="display:none">Billing Model</th>
                <th>Base Fee</th>
                <th>HW Price</th>
                <th style="display:none">Solution Net Price</th>
                <th>Currency</th>
                <th style="display:none">Qty</th>
                <th>Mono Click</th>
                <th>Color Click</th>
                <th style="display:none">Prof. Color Click"</th>
                <th style="display:none">Printer Type</th>
                <th>SLA</th>
                <th style="display:none">Monthly Pages</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="/dsQueryResponse/Rows/Row">
               
                <xsl:if test="@Class = 'solution'">
                <xsl:value-of select="ddwrt:SetVar('solutionsku', @SKU)" />
                <xsl:value-of select="ddwrt:SetVar('solutionid', @ID)"/>
                </xsl:if>
                <xsl:if test="not(@Class = 'printer' and number(translate(@Qty, ',', '')) = 0)">
                <tr class="{@Class}">
                  <xsl:if test="(@Class != 'solution' and @Class != 'printer' and @Class != 'accessory') and contains(ddwrt:GetVar('solutionsku'), @SKU) = false">
                    <xsl:attribute name="style">display:none</xsl:attribute>
                  </xsl:if>
                   <td>
                      <xsl:choose>
                        <xsl:when test="@Class = 'solution'">
                          <input type="checkbox" 
                             data-class="{@Class}"
                             data-lineid="{@ID}"
                             id="Select{@ID}Line"
                             data-dartid="{@DartID}"
                             data-productid="{@ID}"
                             data-solutionnumber="{@SolutionNumber}"
                             data-productname="{@ProductName}"
                             data-sku="{@SKU}" 
                             data-upfroncharge="{translate(@UpfrontCharge, ',', '')}" 
                             data-customgroup="{@CustomGroup}"
                             data-billingmodel="{@BillingModel}"
                             data-basefee="{translate(@BaseFee, ',', '')}"
                             data-price="{translate(@SolutionNetPrice, ',', '')}"
                             data-printertype="{@PrinterType}"
                             data-acclist="{@AccesoriesList}"
                             data-sla="{@SLA}" 
                             data-monthlypages="{@MonthlyPages}"
                             data-qty="{translate(@Qty, ',', '')}"
                             data-currency="{@Currency}"
                             data-country="{@Country}"
                             data-monoclick="{translate(@MonoClick, ',', '')}"
                             data-colorclick="{translate(@ColorClick, ',', '')}"
                             data-profcolorclick="{translate(@ProfColorClick, ',', '')}" 
                                 onclick="javascript:selectComponents(this)"  />                      
                        </xsl:when>
                        <xsl:otherwise>
                          <div style="display:none">
                          <input type="checkbox" 
                                 data-componentfor="{ddwrt:GetVar('solutionid')}" 
                                 data-class="{@Class}"
                                 id="Select{@ID}Line"
                                 data-dartid="{@DartID}" 
                                 data-monthlypages="{@MonthlyPages}"
                                 data-solutionnumber="{@SolutionNumber}"
                                 data-productname="{@ProductName}"
                                 data-upfroncharge="{translate(@UpfrontCharge, ',', '')}"
                                 data-sku="{@SKU}"
                                 data-billingmodel="{@BillingModel}" 
                                 data-customgroup="{@CustomGroup}"
                                 data-basefee="{translate(@BaseFee, ',', '')}"
                                 data-price="{translate(@SolutionNetPrice, ',', '')}"
                                 data-printertype="{@PrinterType}"
                                 data-acclist="{@AccesoriesList}"
                                 data-sla="{@SLA}"
                                 data-qty="{translate(@Qty, ',', '')}"
                                 data-currency="{@Currency}"
                                 data-country="{@Country}"
                                 data-monoclick="{translate(@MonoClick, ',', '')}"
                                 data-colorclick="{translate(@ColorClick, ',', '')}"
                                 data-profcolorclick="{translate(@ProfColorClick, ',', '')}" />
                          </div>
                        </xsl:otherwise>
                      </xsl:choose>
                  </td>
                  <td>
                    <xsl:value-of select="@CustomGroup" disable-output-escaping="yes" />
                  </td>
                  <td>
                    <xsl:value-of select="@ProductName" disable-output-escaping="yes" />
                  </td>
                  <td>
                    <xsl:value-of select="@SKU" disable-output-escaping="yes" />
                  </td>
                  <td>
                    <xsl:value-of select="@Class" disable-output-escaping="yes" />
                  </td>
                  <td style="display:none">
                    <xsl:if test="@Class = 'solution'">
                      <xsl:value-of select="@BillingModel" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td>
                    <xsl:if test="@Class = 'solution'">
                      <xsl:value-of select="@BaseFee" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td>
                    <xsl:if test="@Class = 'solution'">
                    <xsl:value-of select="@UpfrontCharge" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td style="display:none">
                    <xsl:if test="@Class = 'solution'">
                      <xsl:value-of select="@SolutionNetPrice" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td>
                    <xsl:if test="@Class = 'solution'">
                    <xsl:value-of select="@Currency" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td style="display:none">
                    <xsl:if test="@Class = 'solution'">
                      <xsl:value-of select="@Qty" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td>
                    <xsl:if test="@Class = 'solution'">
                    <xsl:value-of select="@MonoClick" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td>
                    <xsl:if test="@Class = 'solution'">
                    <xsl:value-of select="@ColorClick" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td style="display:none">
                    <xsl:if test="@Class = 'solution'">
                    <xsl:value-of select="@ProfColorClick" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td style="display:none">
                    <xsl:if test="@Class = 'solution'">
                    <xsl:value-of select="@PrinterType" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td>
                    <xsl:if test="@Class = 'solution'">
                    <xsl:value-of select="@SLA" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                  <td style="display:none">
                    <xsl:if test="@Class = 'solution'">
                    <xsl:value-of select="@MonthlyPages" disable-output-escaping="yes" />
                    </xsl:if>
                  </td>
                </tr>
                </xsl:if>
              </xsl:for-each>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="10">

                </td>
              </tr>
            </tfoot>
          </table>

          <div class="form-group">
            <button type="button" class="btn btn-primary" style="display:none" id="btnAddToPO" onclick="javascript:AddToBasket()"> Add to purchase order </button>&#160;
            <button type="button" class="btn btn-warning" onclick="javascript:Close()">Close </button>
          </div>

      </div>
         
    </xsl:template>
</xsl:stylesheet>
