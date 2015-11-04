<div<%= containerAttrs %>>
  <p>&nbsp;</p>
  <button type="submit" class="btn btn-primary" ng-click="<%= formName %>.sent = true; <%= formName %>.$setPristine();<%= trySubmitFunc %><%= submitFunc %>" ng-disabled="<%= formName %>.sent && !<%= formName %>.$valid"<%= attrs %>><%= label %></button><%= additionalContent %>
</div>
