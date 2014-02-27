<span class="help-block" ng-show="<%= formName %>.sent && (<%= formName %>['<%= name %>'].$invalid<% if (custom) { %> || (!<%= formName %>['<%= name %>'].$dirty && (<%= custom %>))<% } %>)">
