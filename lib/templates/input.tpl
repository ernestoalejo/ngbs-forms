<div<%= containerAttrs %>>
  <% if (prefix || suffix) { %><div class="input-group">
    <% if (prefix) { %><span class="input-group-addon"><%= prefix %></span>
    <% } %><% } %><input<%= attrs %>><% if (suffix) { %>
    <span class="input-group-addon"><%= suffix %></span><% } %><% if (prefix || suffix) { %>
  </div><% } %>
</div>
