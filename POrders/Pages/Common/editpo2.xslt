<xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:ddwrt2="urn:frontpage:internal">
  <xsl:output method="html" indent="no"/>
  <xsl:decimal-format NaN=""/>
  <xsl:param name="IsAdmin" />
  <xsl:param name="CanWork" />

  <xsl:template match="/">
     <br />
     <xsl:for-each select="/dsQueryResponse/Rows/Row">
       <div class="form-group">
         <label>
           Status
         </label>
         <SharePoint:DVDropDownList runat="server" Enabled="{($IsAdmin = 'Yes' or $CanWork = 'Yes')}" SelectedValue="{@Phase}" AppendDataBoundItems="true" CssClass="form-control" ClientIDMode="Static" ID="POStatus" required="required" onchange="javascript:StatusChanged()">
           <xsl:if test="@Phase = 'New'">
             <asp:ListItem Text="Assigned" Value="Assigned" />
           </xsl:if>
           <xsl:if test="@Phase = 'Assigned'">
             <asp:ListItem Text="Ordered" Value="Ordered" />
           </xsl:if>
           <xsl:if test="@Phase = 'Ordered'">
             <asp:ListItem Text="Delivered" Value="Delivered" />
           </xsl:if>
           <xsl:if test="@Phase = 'Delivered'">
             <asp:ListItem Text="Accepted" Value="Accepted" />
           </xsl:if>
           <xsl:if test="@Phase = 'Accepted'">
             <asp:ListItem Text="FIS Accepted" Value="FIS Accepted" />
           </xsl:if>
           <asp:ListItem Text="Canceled" Value="Canceled" />
         </SharePoint:DVDropDownList>        
       </div>
       <div class="form-group" id="assignedToRow">
         <label>
           Assign To
         </label>
        <SharePoint:DVDropDownList runat="server" data-prevassignedto="{@AssignedTo1.email}" SelectedValue="{@AssignedTo1.email}" Enabled="{$IsAdmin = 'Yes' or $CanWork = 'Yes'}"   AppendDataBoundItems="true" CssClass="form-control" ClientIDMode="Static" ID="AssignTo" DataSourceID="DSUsers" DataTextField="DisplayName" DataValueField="EmailAddress" required="required">
          <asp:ListItem Text="..." Value="" />
        </SharePoint:DVDropDownList>
       </div>
       <div class="form-group">
         <label>
            Comments
         </label>
       <SharePoint:InputFormTextBox runat="server" CssClass="form-control" Text="" TextMode="MultiLine" RichText="False" ClientIDMode="Static" ID="Comments" required="required" />
       </div>
       <div class="form-group">
         <xsl:choose>
           <xsl:when test="@Phase != 'Pending approval'">
             <button type="button" class="btn btn-primary" onclick="javascript:EditPO('{@ID}')">Save</button>&#160;
           </xsl:when>
           <xsl:otherwise>
             <button type="button" id="btnApprovePO" disabled="disabled" class="btn btn-primary" onclick="javascript:Approve(true)"><i class="fa fa-thumbs-up"></i>&#160;Approved</button>&#160;
             <button type="button" id="btnRejectPO" disabled="disabled" class="btn btn-danger" onclick="javascript:Approve(false)"><i class="fa fa-thumbs-down"></i>&#160;Not approved</button>&#160;
           </xsl:otherwise>
         </xsl:choose>
         <button type="button" class="btn btn-primary" onclick="javascript:GoBackToSource()"><i class="fa fa-backward"></i>&#160;Go Back</button>
       </div>
       <br />
     </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
