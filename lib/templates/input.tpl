<div<%= containerAttrs %>>
  <% if (prefix || suffix) { %><div class="input-group">
    <% if (prefix) { %><span class="<%= prefixClass %>"><%= prefix %></span>
    <% } %><% } %><input<%= attrs %>><% if (suffix) { %>
    <span class="<%= suffixClass %>"><%= suffix %></span><% } %><% if (prefix || suffix) { %>
  </div><% } %>
</div>
