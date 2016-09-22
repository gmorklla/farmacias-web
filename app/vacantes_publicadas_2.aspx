<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="vacantes_publicadas.aspx.vb" Inherits="AdminBT_FarmaciasSimilares.vacantes_publicadas1" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="AdminBT_FarmaciasSimilares" %>
<%
    Dim daoForms As New DaoSimiForms("SimiForms/SimiForms.xml")
    Dim admin As String = Nothing
    Try
        admin = Request("admin")
    Catch ex As Exception
    End Try
    
    Dim vacantes As DataSet = daoForms.consultarForm("Vacantes", 5)
    Dim objVacante As Vacante
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script type="text/javascript" src="js/jquery-1.5.1.min.js"></script>
    <script src="js/jquery-ui-1.8.11.custom.min.js" type="text/jscript"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <link href='https://fonts.googleapis.com/css?family=Oswald:400,700,300' rel='stylesheet' type='text/css'>
    <style>
        body{font-family: 'Oswald', sans-serif;font-size: 1.2em;font-style: normal;line-height: normal;font-weight: 700;font-variant: normal;text-transform: none;color: #616161;}
        thead {background-color:darkgray; color:white; text-transform:uppercase; font-size:1.5em;}
    </style>
    <script>        window.onload = function () { try { parent.SimiformLoadAux(); } catch (e) { } }</script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
</head>
<body>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <table id="vacantes" cellspacing="0" cellpadding="5" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th class="col-md-2 col-sm-2 col-xs-3"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> Fecha</th>
                    <th class="col-md-5 col-sm-5 col-xs-5"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>Ubicación</th>
                    <th class="col-md-5 col-sm-5 col-xs-4"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span> Vacante</th>
                </tr>
            </thead>
            <tbody>
        <%
            Dim indice As Integer = 0
            Dim i As Integer = 0
            Dim contactos As String = ""
            Dim coma As String = ""
            Dim row As DataRow
            Dim escribir As Boolean = 0
            Dim togle As Boolean = true
            For Each row In vacantes.Tables(0).Rows
                If (togle) Then
         %>
                <tr class="row_a" onclick="try{verVacante(this, <%=row("indice")%>);}catch(e){}" id="vacante_<%=row("indice")%>">
                    <td><%=CDate(row("fecha_registro")).ToString("dd/MM/yyyy")%></td>
                    <td><%=row("localidad")%></td> 
                    <%If admin is Nothing Then%>
                    <td><a href="detalleVacante_2.aspx?claveVacante=<%=row("indice")%>" class="verDetalle"><%=row("nombre_vacante")%></a></td>                
                    <%Else%> 
                    <td><%=row("nombre_vacante")%></td>     
                    <%End If%>   
                </tr>
            <%
                togle = Not togle
            Else
            %>

                <tr class="row_b" onclick="try{verVacante(this, <%=row("indice")%>);}catch(e){}" id="vacante_<%=row("indice")%>">
                <td><%=CDate(row("fecha_registro")).ToString("dd/MM/yyyy")%></td>
                <td><%=row("localidad")%></td> 
                <%If admin is Nothing Then%>
                <td><a href="detalleVacante.aspx?claveVacante=<%=row("indice")%>" class="verDetalle"><%=row("nombre_vacante")%></a></td>                
                <%Else%> 
                <td><%=row("nombre_vacante")%></td>     
                <%End If%>
                </tr>
            <%
                togle = Not togle
            End If
            Next
            %>
            </tbody>
    </table>
</body>
</html>

