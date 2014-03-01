'use strict';

angular.module('directives.match')

.directive('match', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attr, ctrl) {
      var form = elm.controller('form');
      var widget = form[form.$name + attr.match];
      if (!widget) {
        throw new Error('field ' + attr.match + ' is not present in form');
      }

      widget.$parsers.push(function(value) {
        ctrl.$setValidity('match', value === ctrl.$viewValue);
        return value;
      });

      function validator(value) {
        if (value == widget.$viewValue && value) {
          ctrl.$setValidity('match', true);
          return value;
        }
        ctrl.$setValidity('match', false);
      }
      ctrl.$formatters.push(validator);
      ctrl.$parsers.push(validator);
    }
  };
})

;
