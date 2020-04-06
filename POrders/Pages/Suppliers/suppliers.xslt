<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/">
       <table class="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" id="dataTable" style="width:100%" cellspacing="0">
         <thead>
           <tr>
            <th>Action</th>
            <th>Supplier<br />Name</th>
            <th>Contact<br />Phone</th>
            <th>Contact<br />Person</th>
            <th>Address</th>
          </tr>         
         </thead>
         <tbody>
          <xsl:for-each select="/dsQueryResponse/Rows/Row">
            <tr>
              <td>
                  <button type="button" class="btn btn-primary btn-xs" onclick="javascript:EditSupplier('{@ID}')">Edit</button>&#160;
                  <button type="button" class="btn btn-danger btn-xs" onclick="javascript:DeleteSupplier('{@ID}')">Delete</button>
              </td>
              <td>
                <xsl:value-of select="@SupplierName" disable-output-escaping="yes"/>
              </td>
              <td>
                <xsl:value-of select="@Phone" disable-output-escaping="yes"/>
              </td>
              <td>
                <xsl:value-of select="@ContactPerson.title" disable-output-escaping="yes"/>
              </td>
               <td>
                <xsl:value-of select="@Address" disable-output-escaping="yes"/>
              </td>
            </tr>          
         </xsl:for-each>
       </tbody>       
      </table>
    </xsl:template>
</xsl:stylesheet>
