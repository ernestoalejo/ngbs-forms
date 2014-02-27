<% options.forEach(function(option) { %><div class="radio"<%= containerAttrs %>>
  <label>
    <input id="<%= attrs.id %><%= option.item %>" value="<%= option.key %>"<%= attrs %>>
    <%= option.label %>
  </label>
</div>
<% }); %>
