<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<MissNancy.Data.Classes>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Create
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<h2>Create</h2>

<script src="<%: Url.Content("~/Scripts/jquery.validate.min.js") %>" type="text/javascript"></script>
<script src="<%: Url.Content("~/Scripts/jquery.validate.unobtrusive.min.js") %>" type="text/javascript"></script>

<% using (Html.BeginForm()) { %>
    <%: Html.ValidationSummary(true) %>
    <fieldset>
        <legend>Classes</legend>       

        <div class="editor-label">
            <%: Html.LabelFor(model => model.Active) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.Active) %>
            <%: Html.ValidationMessageFor(model => model.Active) %>
        </div>

        <div class="editor-label">
            <%: Html.LabelFor(model => model.AgeKey) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.AgeKey) %>
            <%: Html.ValidationMessageFor(model => model.AgeKey) %>
        </div>

        <div class="editor-label">
            <%: Html.LabelFor(model => model.LocationKey) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.LocationKey) %>
            <%: Html.ValidationMessageFor(model => model.LocationKey) %>
        </div>

        <div class="editor-label">
            <%: Html.LabelFor(model => model.MasterTeacherKey) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.MasterTeacherKey) %>
            <%: Html.ValidationMessageFor(model => model.MasterTeacherKey) %>
        </div>

        <div class="editor-label">
            <%: Html.LabelFor(model => model.ClassDisplay) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.ClassDisplay) %>
            <%: Html.ValidationMessageFor(model => model.ClassDisplay) %>
        </div>

        <div class="editor-label">
            <%: Html.LabelFor(model => model.Notes) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.Notes) %>
            <%: Html.ValidationMessageFor(model => model.Notes) %>
        </div>

        <div class="editor-label">
            <%: Html.LabelFor(model => model.CreateDate) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.CreateDate) %>
            <%: Html.ValidationMessageFor(model => model.CreateDate) %>
        </div>

        <div class="editor-label">
            <%: Html.LabelFor(model => model.CreatedBy) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.CreatedBy) %>
            <%: Html.ValidationMessageFor(model => model.CreatedBy) %>
        </div>

        <div class="editor-label">
            <%: Html.LabelFor(model => model.EditDate) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.EditDate) %>
            <%: Html.ValidationMessageFor(model => model.EditDate) %>
        </div>

        <div class="editor-label">
            <%: Html.LabelFor(model => model.EditedBy) %>
        </div>
        <div class="editor-field">
            <%: Html.EditorFor(model => model.EditedBy) %>
            <%: Html.ValidationMessageFor(model => model.EditedBy) %>
        </div>

        <p>
            <input type="submit" value="Create" />
        </p>
    </fieldset>
<% } %>

<div>
    <%: Html.ActionLink("Back to List", "Index") %>
</div>

</asp:Content>
