<xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:ddwrt2="urn:frontpage:internal">
  <xsl:output method="html" indent="no"/>
  <xsl:decimal-format NaN="0" name="en-us" grouping-separator="," decimal-separator="."/>
   <xsl:template match="/">
     <xsl:value-of select="ddwrt:SetVar('Total', 0)"/>
     <xsl:value-of select="ddwrt:SetVar('TotalUpfrontCharge', 0)"/>
     <xsl:value-of select="ddwrt:SetVar('TotalBaseFee', 0)"/>
     <xsl:value-of select="ddwrt:SetVar('Qtities', 0)"/>
     <xsl:value-of select="ddwrt:SetVar('SolutionQty', 0)"/>
     <table class="table table-striped table-bordered table-hover nowrap dataTable no-footer dtr-inline" id="dataTable" style="width: 100%"  cellspacing="0">
       <thead>
         <tr>
           <th>Sol. No.</th>
           <th>Product Name</th>
           <th>SKU</th>
           <th>Class</th>
           <th>Currency</th>
           <th>Qty</th>
           <th style="display:none">Billing Model</th>
           <th>Base Fee</th>
           <th>Upfront Charge</th>
           <th>Mono Click</th>
           <th>Color Click</th>
           <th style="display:none">Prof. Color Click</th>    
           <th style="display:none">Price</th>
           <th>Monthly Pages</th>
         </tr>
       </thead>
       <tbody>
         <xsl:for-each select="/dsQueryResponse/Rows/Row">
           <xsl:sort select="@SolutionNumber" data-type="text" order="ascending"/>
           <xsl:sort select="@SolutionNumberOrdering" data-type="text" order="ascending"/>
           <xsl:if test="@Class='solution'">
             <xsl:value-of select="ddwrt:SetVar('SolutionQty', number(translate(@Qty, ',', '')))" />
             <xsl:value-of select="ddwrt:SetVar('Price', number(translate(@Qty, ',', '')) * number(translate(@SolutionNetPrice, ',', '')))" />
             <xsl:value-of select="ddwrt:SetVar('Total', ddwrt:GetVar('Total') + ddwrt:GetVar('Price'))"/>
             <xsl:if test="@BaseFee != ''">
               <xsl:value-of select="ddwrt:SetVar('TotalBaseFee', ddwrt:GetVar('TotalBaseFee') + number(translate(@BaseFee, ',', '')))"/>
             </xsl:if>
             <xsl:if test="@UpfrontCharge != ''">
               <xsl:value-of select="ddwrt:SetVar('TotalUpfrontCharge', ddwrt:GetVar('TotalUpfrontCharge') + number(translate(@UpfrontCharge, ',', '')))"/>
             </xsl:if>
           </xsl:if>
           <xsl:if test="@Class='printer'">
             <xsl:value-of select="ddwrt:SetVar('Qtities', ddwrt:GetVar('Qtities') + number(translate(@Qty, ',', '') * ddwrt:GetVar('SolutionQty')))"/>
           </xsl:if>
           <tr>
             <xsl:if test="@Class='solution'">
               <xsl:attribute name="class">solution-info-line</xsl:attribute>
             </xsl:if>
             <!-- Index 0: Solution Number -->
             <td>
               <xsl:value-of disable-output-escaping="yes" select="@SolutionNumber" />
             </td>
             <!-- Index 1: Product Name -->
             <td>
               <xsl:value-of select="@ProductName" disable-output-escaping="yes"/>
             </td>
             <!-- Index 2: SKU -->
             <td>
               <xsl:value-of select="@SKU" disable-output-escaping="yes"/>
             </td>
             <!-- Index 3: Class -->
             <td>
               <xsl:value-of select="@Class" disable-output-escaping="yes"/>
             </td>
             <!-- Index 4: Currency -->
             <td>
               <xsl:if test="@Class = 'solution'">
               <xsl:value-of select="@Currency" disable-output-escaping="yes"/>
               </xsl:if>
             </td>
             <!-- Index 5:  Qty -->
             <td>
               <xsl:choose>
                 <xsl:when test="@Class = 'solution'">
                   <xsl:value-of select="@Qty" disable-output-escaping="yes"/>            
                 </xsl:when>
                 <xsl:otherwise>
                   <xsl:value-of select="number(translate(@Qty, ',', '')) * ddwrt:GetVar('SolutionQty')" disable-output-escaping="yes"/>
                 </xsl:otherwise>
               </xsl:choose>
             </td>
             <!-- Index 6:  Billing Model -->         
             <td style="display:none">
               <xsl:if test="@Class = 'solution'">
               <xsl:value-of select="@BillingModel" disable-output-escaping="yes"/>
               </xsl:if>
             </td>
             <!-- Index 7:  Base Fee -->
             <td>
               <xsl:if test="@Class = 'solution'">
                 <xsl:value-of select="@BaseFee" disable-output-escaping="yes"/>
               </xsl:if>
             </td>
             <!-- Index 8: Upfront Charge -->
             <td>
               <xsl:if test="@Class = 'solution'">
                 <xsl:value-of select="@UpfrontCharge" disable-output-escaping="yes"/>
               </xsl:if>
             </td>
             <!-- Index 9: Mono Click -->
             <td>
               <xsl:if test="@Class = 'solution'">
               <xsl:value-of disable-output-escaping="yes" select="@MonoClick" />
               </xsl:if>
             </td>
             <!-- Index 10: Color Click -->
             <td>
               <xsl:if test="@Class = 'solution'">
               <xsl:value-of disable-output-escaping="yes" select="@ColorClick" />
               </xsl:if>
             </td>
             <!-- Index 11: Prof. Color Click -->
             <td style="display:none">
               <xsl:if test="@Class = 'solution'">
               <xsl:value-of disable-output-escaping="yes" select="@ProfColorClick" />
               </xsl:if>
             </td>
             <!-- Index 12: Price -->
             <td style="display:none">
               <xsl:if test="@Class = 'solution'">
               <xsl:value-of select="format-number(ddwrt:GetVar('Price'), '##0.00', 'en-us')" disable-output-escaping="yes"/>
               </xsl:if>
             </td>
             <!-- Index 13: Monthly Pages -->
             <td>
               <xsl:if test="@Class = 'solution'">
                 <xsl:value-of select="@MonthlyPages" disable-output-escaping="yes"/>
               </xsl:if>
             </td>
           </tr>
         </xsl:for-each>       
       </tbody>
       <tfoot>
         <tr>
           <td colspan="5"></td>
           <td style="background-color:#0096D6; color:#fff" id="poTotalDevices">
             <xsl:value-of select="format-number(ddwrt:GetVar('Qtities'), '##0.00', 'en-us')" disable-output-escaping="yes"/>
           </td>
           <td style="display:none"></td>
           <td style="background-color:#0096D6; color:#fff" id="poTotalBaseFee">
             <xsl:value-of select="format-number(ddwrt:GetVar('TotalBaseFee'), '##0.00', 'en-us')" disable-output-escaping="yes"/>
           </td>
           <td style="background-color:#0096D6; color:#fff" id="poUpfrontCharge">
             <xsl:value-of select="format-number(ddwrt:GetVar('TotalUpfrontCharge'), '##0.00', 'en-us')" disable-output-escaping="yes"/>
           </td>
           <td colspan="3"></td>
           <td style="display: none; background-color:#0096D6; color:#fff" id="poTotalPrice">
             <xsl:value-of select="format-number(ddwrt:GetVar('Total'), '##0.00', 'en-us')" disable-output-escaping="yes"/>
           </td>
         </tr>
       </tfoot>
     </table>
  </xsl:template>
</xsl:stylesheet>
