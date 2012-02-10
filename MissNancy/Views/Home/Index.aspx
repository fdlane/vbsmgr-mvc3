<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Home Page
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: ViewBag.Message %></h2>
    <p>
        To meet Miss Nancy, please attend Knoxville Christian Center <a href="http://knoxvillechristiancenter.org/"
            title="Knoxville Christian Center Website">http://knoxvillechristiancenter.org/</a>.
    </p>
</asp:Content>
