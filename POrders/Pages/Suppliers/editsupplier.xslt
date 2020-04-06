<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:SharePoint="Microsoft.SharePoint.WebControls">
  
    <xsl:output method="html" indent="yes" />
    <xsl:template match="/">
          <xsl:for-each select="/dsQueryResponse/Rows/Row">
            <div style="display:block; padding: 15px">

            <div class="form-group">
              <label>
                Supplier Name <span class="ms-accentText">*</span>
              </label>
              <SharePoint:InputFormTextBox runat="server" Text="{@Title}" CssClass="form-control" ID="SupplierName{@ID}" ClientIDMode="Static" MaxLength="200" required="required"   />
              <div class="invalid-feedback" style="display:none" id="validateSupplierName">
                <i class="fa fa-exclamation-triangle"></i> Mandatory field</div>
               </div>
            <div class="form-group">
              <label>Contact Phone No. <span class="ms-accentText">*</span>
            </label>
              <SharePoint:InputFormTextBox runat="server"  Text="{@Phone}" CssClass="form-control" ID="SupplierPhone{@ID}" TextMode="Phone" ClientIDMode="Static"  MaxLength="200" required="required"    />
              <div class="invalid-feedback" style="display:none" id="validateSupplierPhone">
                <i class="fa fa-exclamation-triangle"></i> Mandatory field
              </div>         
            </div>
            <div class="form-group">
              <label>Address <span class="ms-accentText">*</span>
            </label>
              <SharePoint:InputFormTextBox runat="server"  Text="{@Address}" CssClass="form-control" ID="SupplierAddress{@ID}"  TextMode="MultiLine" RichText="false" ClientIDMode="Static"  MaxLength="500" required="required"  />
              <div class="invalid-feedback" style="display:none" id="validateSupplierAddress">
                <i class="fa fa-exclamation-triangle"></i> Mandatory field
              </div>
             </div>
            <div  class="form-group">
              <label>Contact Person <span class="ms-accentText">*</span>
            </label>
              <SharePoint:ClientPeoplePicker runat="server" InitialUserAccounts="{@ContactPerson.email}" ID="SupplierContactPerson{@ID}" AllowMultipleEntities="false" ClientIDMode="Static"  />
               <div class="invalid-feedback" style="display:none" id="validateSupplierContactPerson">
                <i class="fa fa-exclamation-triangle"></i> Mandatory field
              </div>
            </div>

              <div  class="form-group">
                <button class="btn btn-primary" onclick="javascript:SaveEditForm()">Save</button>&#160;&#160;&#160;
                <button class="btn btn-warning" onclick="javascript:CloseModal()">Close</button>
              </div>
              
              </div>
         </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
