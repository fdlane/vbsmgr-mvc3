<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<MissNancy.Data.Classes>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Details
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h2>
        Details</h2>
    <fieldset>
        <legend>Classes</legend>
        <div class="display-label">
            ClassKey</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.ClassKey) %>
        </div>
        <div class="display-label">
            Active</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.Active) %>
        </div>
        <div class="display-label">
            AgeKey</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.AgeKey) %>
        </div>
        <div class="display-label">
            LocationKey</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.LocationKey) %>
        </div>
        <div class="display-label">
            MasterTeacherKey</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.MasterTeacherKey) %>
        </div>
        <div class="display-label">
            ClassDisplay</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.ClassDisplay) %>
        </div>
        <div class="display-label">
            Notes</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.Notes) %>
        </div>
        <div class="display-label">
            CreateDate</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.CreateDate) %>
        </div>
        <div class="display-label">
            CreatedBy</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.CreatedBy) %>
        </div>
        <div class="display-label">
            EditDate</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.EditDate) %>
        </div>
        <div class="display-label">
            EditedBy</div>
        <div class="display-field">
            <%: Html.DisplayFor(model => model.EditedBy) %>
        </div>
    </fieldset>
    <p>
        <%: Html.ActionLink("Edit", "Edit", new { id=Model.ClassKey }) %>
        |
        <%: Html.ActionLink("Back to List", "Index") %>
    </p>
</asp:Content>
