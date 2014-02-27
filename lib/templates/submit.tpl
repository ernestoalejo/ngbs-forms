<div<%= containerAttrs %>>
  <p>&nbsp;</p>
  <button type="submit" class="btn btn-primary" ng-disabled="<%= formName %>.sent && !<%= formName %>.$valid"<%= attrs %>><%= label %></button><%= additionalContent %>
</div>
