<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:SharePoint="Microsoft.SharePoint.WebControls">
    <xsl:param name="userSelected" />
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/">
      <table class="table table-bordered" id="UsersTable" width="100%" cellspacing="0" style="display:none">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Admin</th>
            <th>Team Member</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="/dsQueryResponse/Rows/Row">
            <tr>
              <td>
                <xsl:value-of select="@DisplayName" disable-output-escaping="yes" />
              </td>
               <td>
                <xsl:value-of select="@EmailAddress" disable-output-escaping="yes" />
              </td>
              <td>
                   <xsl:value-of select="@Admin" disable-output-escaping="yes" />
                </td>
              <td>
                <xsl:value-of select="@TeamMember" disable-output-escaping="yes" />
              </td>
              <td>
                <xsl:value-of select="@Role" disable-output-escaping="yes" />
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>


    </xsl:template>
</xsl:stylesheet>
