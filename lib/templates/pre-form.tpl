<form role="form" name="<%= name %>" novalidate ng-init="<%= name %>.sent = false;"<% if(submitOnForm) { %> ng-submit="<%= name %>.sent = true; <%= name %>.$setPristine();<%= trySubmitFunc %><%= submitFunc %>"<% }%> autocomplete="off"<%= attrs %>><% if (!noFieldset) { %>
<fieldset><% } %>
