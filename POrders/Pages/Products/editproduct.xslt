<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:SharePoint="Microsoft.SharePoint.WebControls">
  
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/">

        <xsl:for-each select="/dsQueryResponse/Rows/Row">
          <div class="form-group">
            <label>
              Product Name <span class="ms-accentText">*</span>
            </label>
            <SharePoint:InputFormTextBox runat="server" Text="{@ProductName}" CssClass="form-control" ID="ProductName" required="required" ClientIDMode="Static" MaxLength="200" />
            <div class="invalid-feedback" style="display:none" id="validateProductName">
              <i class="fa fa-exclamation-triangle"></i> Mandatory field
            </div>
          </div>
          <div class="form-group">
            <label>
              Product Code <span class="ms-accentText">*</span>
            </label>
            <SharePoint:InputFormTextBox runat="server" Text="{@ProductCode}" CssClass="form-control" ID="ProductCode" required="required" ClientIDMode="Static" MaxLength="30" />
            <div class="invalid-feedback" style="display:none" id="validateProductCode">
              <i class="fa fa-exclamation-triangle"></i> Mandatory field
            </div>
          </div>
          <div class="form-group">
            <label>
              Currency <span class="ms-accentText">*</span>
            </label>
            <SharePoint:DVDropDownList runat="server" SelectedValue="{@Currency}" CssClass="form-control" ClientIDMode="Static" ID="ProductCurrency" DataSourceID="DSCurrencies" DataTextField="Title" DataValueField="Title" required="required">
            </SharePoint:DVDropDownList>
            <div class="invalid-feedback" style="display:none" id="validateProductCurrency">
              <i class="fa fa-exclamation-triangle"></i> Mandatory field
            </div>
          </div>
          <div class="form-group">
            <label>
              Supplier <span class="ms-accentText">*</span>
            </label>
            <SharePoint:DVDropDownList runat="server" SelectedValue="{@Supplier}" CssClass="form-control" ClientIDMode="Static" required="required" ID="ProductSupplier" DataSourceID="DSSuppliers" DataTextField="SupplierName" DataValueField="SupplierName">
            </SharePoint:DVDropDownList>
            <div class="invalid-feedback" style="display:none" id="validateProductSupplier">
              <i class="fa fa-exclamation-triangle"></i> Mandatory field
            </div>
          </div>
          <div class="form-group">
            <label>
              Price <span class="ms-accentText">*</span>
            </label>
            <SharePoint:InputFormTextBox runat="server" Text="{@Price}"  CssClass="form-control" ID="ProductPrice" ClientIDMode="Static" MaxLength="200" required="required" TextMode="Number" step=".01"  />
            <div class="invalid-feedback" style="display:none" id="validateProductPrice">
              <i class="fa fa-exclamation-triangle"></i> Mandatory field
            </div>
          </div>
          <div class="form-group">
            <label>
              Qty <span class="ms-accentText">*</span>
          </label>
            <SharePoint:InputFormTextBox runat="server" Text="{@Qty}"  CssClass="form-control" ID="ProductQty" ClientIDMode="Static" MaxLength="200" required="required" TextMode="Number"  />
            <div class="invalid-feedback" style="display:none" id="validateProductQty">
              <i class="fa fa-exclamation-triangle"></i> Mandatory field
            </div>
          </div>
          <div class="form-group">
            <label>
              Product Description <span class="ms-accentText">*</span>
          </label>
            <SharePoint:InputFormTextBox runat="server" Text="{@ProductDescription}" TextMode="MultiLine" RichText="false"  CssClass="form-control" ID="ProductDescription" ClientIDMode="Static" MaxLength="200"  required="required" />
            <div class="invalid-feedback" style="display:none" id="validateProductDescription">
              <i class="fa fa-exclamation-triangle"></i> Mandatory field
            </div>
          </div>
          <div class="form-group">
            <div class="progress progress-striped active" style="margin-bottom:0;" id="loadingImage">
              <div class="progress-bar" style="width: 100%"></div>
            </div>
            <div id="imagePlaceHolder" style="display:none; margin-left:auto; margin-right: auto">
              
            </div>
          </div>
          <div class="form-group">
            <label>Image</label>
            <input type="file" id="productImage" class="form-control" />
          </div>
          <div  class="form-group">
            <button type="button" class="btn btn-primary" style="background-color:#5cb85c; border-color:#7DCEA0" onclick="javascript:EditProduct()">
              <i class="fa fa-save"></i> Edit product details
            </button>&#160;
            <button class="btn btn-warning" onclick="javascript:CloseModal()">Close</button>
          </div>

        </xsl:for-each>

    </xsl:template>
</xsl:stylesheet>
