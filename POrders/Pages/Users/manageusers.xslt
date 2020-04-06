<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" 
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:SharePoint="Microsoft.SharePoint.WebControls">
  
    <xsl:output method="html" indent="yes"/>
   <xsl:param name="selectedUser" />
    <xsl:template match="/">
      <table class="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" id="dataTable" style="width:100%" cellspacing="0">
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Role</th>
            <th>Partner</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="/dsQueryResponse/Rows/Row">
            <tr>
              <td style="width:180px; white-space:nowrap; text-align: center">
                <xsl:choose>
                <xsl:when test="$selectedUser = @ID">
                  <button type="button" class="btn btn-primary btn-sm" onclick="javascript:SaveUser('{@ID}')">Save</button>&#160;
                  <button type="button" class="btn btn-danger btn-sm" onclick="javascript:CancelSave()">Cancel</button>
                </xsl:when>
                <xsl:otherwise>
                  <button type="button" class="btn btn-danger btn-sm" onclick="javascript:DeleteUser('{@ID}')">Delete</button>&#160;
                  <button type="button" class="btn btn-warning btn-sm" onclick="javascript:SelectUser('{@ID}')">Select</button>
                </xsl:otherwise>
                </xsl:choose>
              </td>
              <td>
                <xsl:value-of select="@DisplayName" disable-output-escaping="yes" />
              </td>
               <td>
                <xsl:value-of select="@EmailAddress" disable-output-escaping="yes" />
              </td>
              <td>
                <xsl:choose>
                  <xsl:when test="$selectedUser = @ID">
                    <SharePoint:DVDropDownList runat="server" DataSourceID="DSUserRoles" DataValueField="Title" DataTextField="Title" SelectedValue="{@Role}" CssClass="form-control" ClientIDMode="Static" ID="RoleForUser"  required="required">
                    </SharePoint:DVDropDownList>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="@Role" disable-output-escaping="yes" />
                  </xsl:otherwise>
                </xsl:choose>
              </td>
              <td>
                <xsl:choose>
                  <xsl:when test="$selectedUser = @ID">
                    <SharePoint:DVDropDownList runat="server" DataSourceID="DSPartners" DataValueField="Title" DataTextField="Title" SelectedValue="{@Partner}" CssClass="form-control" ClientIDMode="Static" ID="PartnerSubscription"  required="required">
                    </SharePoint:DVDropDownList>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="@Partner" disable-output-escaping="yes" />
                  </xsl:otherwise>
                </xsl:choose>             
              </td>
            </tr>
            
          </xsl:for-each>
        </tbody>
      </table>


    </xsl:template>
</xsl:stylesheet>
