<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:ddwrt2="urn:frontpage:internal">
      <xsl:template match="/">
      <xsl:variable name="InfoRow" select="/dsQueryResponse/Rows/Row[position() =  1]" />
      <xsl:value-of select="ddwrt:SetVar('IsAdmin', 'No')" />
      <xsl:value-of select="ddwrt:SetVar('CanWork', 'No')" />
      <xsl:choose>
        <xsl:when test="$InfoRow/@Role = 'Administrator' or $InfoRow/@Role = 'Administrator (no email)'">
          <xsl:value-of select="ddwrt:SetVar('IsAdmin', 'Yes')" />
          <xsl:value-of select="ddwrt:SetVar('CanWork', 'Yes')" />
        </xsl:when>
        <xsl:when test="$InfoRow/@Role = 'Power User'">
          <xsl:value-of select="ddwrt:SetVar('IsAdmin', 'No')" />
          <xsl:value-of select="ddwrt:SetVar('CanWork', 'Yes')" />
        </xsl:when>
      </xsl:choose>

        <table style="display:none" id="AdministratorsTable">
          <xsl:for-each select="/dsQueryResponse/Rows/Row[@Role = 'Administrator']">
            <tr>
              <td>
                <xsl:value-of select="@EmailAddress" disable-output-escaping="yes"/>
              </td>
            </tr>          
          </xsl:for-each>
        </table>
      

      <SharePoint:InputFormTextBox runat="server" ID="UserIsAdmin" Text="{ddwrt:GetVar('IsAdmin')}" ClientIDMode="Static" MaxLength="200"  />
      <SharePoint:InputFormTextBox runat="server" ID="UserCanWork" Text="{ddwrt:GetVar('CanWork')}" ClientIDMode="Static" MaxLength="200"  />

    </xsl:template>
</xsl:stylesheet>
