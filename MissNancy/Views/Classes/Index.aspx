<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<MissNancy.Data.Classes>>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Index
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h2>
        Index</h2>
    <p>
        <%: Html.ActionLink("Create New", "Create") %>
    </p>
    <table>
        <tr>
            <th>
                ClassKey
            </th>
            <th>
                Active
            </th>
            <th>
                AgeKey
            </th>
            <th>
                LocationKey
            </th>
            <th>
                MasterTeacherKey
            </th>
            <th>
                ClassDisplay
            </th>
            <th>
                Notes
            </th>
            <th>
                CreateDate
            </th>
            <th>
                CreatedBy
            </th>
            <th>
                EditDate
            </th>
            <th>
                EditedBy
            </th>
            <th>
            </th>
        </tr>
        <% foreach (var item in Model)
           { %>
        <tr>
            <td>
                <%: Html.DisplayFor(modelItem => item.ClassKey) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.Active) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.AgeKey) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.LocationKey) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.MasterTeacherKey) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.ClassDisplay) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.Notes) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.CreateDate) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.CreatedBy) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.EditDate) %>
            </td>
            <td>
                <%: Html.DisplayFor(modelItem => item.EditedBy) %>
            </td>
            <td>
                <%: Html.ActionLink("Edit", "Edit", new { id=item.ClassKey }) %>
                |
                <%: Html.ActionLink("Details", "Details", new {  id=item.ClassKey  })%>
                |
                <%: Html.ActionLink("Delete", "Delete", new {  id=item.ClassKey  })%>
            </td>
        </tr>
        <% } %>
    </table>
</asp:Content>
