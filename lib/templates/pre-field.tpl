<div class="form-group"<% if(hasValidations) {%> ng-class="{'has-error': <%= formName %>.sent && (<%= formName %>['<%= name %>'].$invalid<% if (custom) { %> || (!<%= formName %>['<%= name %>'].$dirty && (<%= custom %>))<% } %>)}"<% } %>><% if(label) { %>
  <label for="<%= id %>" class="control-label"><%= label %></label><% } %>
