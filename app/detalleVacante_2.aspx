<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="detalleVacante.aspx.vb" Inherits="AdminBT_FarmaciasSimilares.detalleVacante" %>
<%@ Import Namespace="System.Data" %>

<%@ Import Namespace="AdminBT_FarmaciasSimilares" %>
<%
    Dim daoForms As New DaoSimiForms("SimiForms/SimiForms.xml")
    
    Dim params As New List(Of Parametro)
    Dim claveVacante As Integer = 0
    Try
        claveVacante = Request("claveVacante")
    Catch ex As Exception

    End Try
    Dim vacantes As DataSet = daoForms.consultarForm("Vacantes", params, claveVacante, 8)
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title></title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <link href='https://fonts.googleapis.com/css?family=Oswald:400,700,300' rel='stylesheet' type='text/css'>
    <style>
        body{padding:25px;padding-top:10px;}
        div.vacante{}
        h1{
	        font-family: 'Oswald', sans-serif;
	        font-size: 1.5em;
	        font-style: normal;
	        line-height: normal;
	        font-weight: bold;
	        font-variant: normal;
	        text-transform: none;
	        text-align:center;
	        border:1px;
	        padding:7px;
            margin-top:0;
            margin-bottom: 30px;
            color: #333;
            text-decoration:underline;
        }
        span {
	        font-family: 'Oswald', sans-serif !important;
	        font-size: 11px;
	        font-style: normal;
	        line-height: normal;
	        font-weight: normal;
	        font-variant: normal;
	        text-transform: none;
	        color: #616161;
        }
        div.vacante label{
	        font-family: 'Oswald', sans-serif;
	        font-size: 12px;
	        font-style: normal;
	        line-height: normal;
	        font-variant: normal;
	        text-transform: none;
	        color: #616161;
	        font-weight: bolder;
        }
        a.postularse{color:#069;clear:both;font-size:12px;font-family: 'Oswald', sans-serif;text-decoration:none;padding:5px 12px 5px 12px;border:1px solid #aed0ea;background-color:#eee;margin:auto;display:block;width:150px;text-align:center;}
        a:hover {border:1px solid #74b2e2;}
        
    </style>
    <script type="text/javascript">
        window.onload = function () {
            try { parent.SimiformLoadAux(); } catch (e) { }
        }
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</head>
<body>
    <div class="row" id="vacantes">
        <%
            Dim indice As Integer = 0
            Dim i As Integer = 0
            Dim contactos As String = ""
            Dim coma As String = ""
            Dim row As DataRow
            Dim escribir As Boolean = 0
            Dim emails As String = ""
            For i = 0 To vacantes.Tables(0).Rows.Count - 1
                row = vacantes.Tables(0).Rows(i)
                emails &= coma & row("email")
                contactos &= coma & row("nombre_contacto") & ", " & row("email")
                indice= vacantes.Tables(0).Rows(i).Item("indice")
                If (i + 1 < vacantes.Tables(0).Rows.Count) Then
                    If (indice = vacantes.Tables(0).Rows(i + 1).Item("indice")) Then
                        coma = ", "
                    Else
                        escribir = True
                    End If
                Else
                    escribir = True
                End If
                If escribir Then
         %>
            <div class="vacante col-md-12 col-sm-12 col-xs-12" onclick="try{verVacante(this, <%=row("indice")%>);}catch(e){}" id="vacante_<%=row("indice")%>">
                <h1>Vacante: <%=row("nombre_vacante")%></h1>
                <label>Fecha de Publicación:&nbsp;&nbsp;&nbsp; </label><span><%=row("fecha_registro")%></span> 
                <p id="descripcion"><%=HttpUtility.UrlDecode(row("descripcion"), System.Text.Encoding.UTF8)%></p>   
                <div style="display:none;"><label>Contacto: </label><span><%=contactos%></span></div>
                <form method="post" action="bolsaTrabajo.aspx" target="_self" id="frm_registroBT">
                    <input type="hidden" name="contacto" value="<%=contactos%>"/>
                    <input type="hidden" name="contactos" value="<%=emails%>"/>
                    <input type="hidden" name="vacante_solicitada" value="<%=row("nombre_vacante")%>"/>
                    <a href='javascript:document.getElementById("frm_registroBT").submit();' class="postularse">Postularse</a>

                </form>
            </div>
                        <%
                            contactos = ""
                            coma = ""
                            escribir = False
                    End If
            Next
            
                    %>
    </div>
</body>
</html>

