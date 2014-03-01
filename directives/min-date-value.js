'use strict'

angular.module('directive.min-date-value')

.directive('minDateValue', function() {
  return {
    require: 'ngModel',
    link: function(scope, _, attr, ctrl) {
      var lastDate;

      function validator(viewValue) {
        var min = scope.$eval(attr.minDateValue);
        if (!viewValue || !min) {
          return;
        }

        var valid = (min < viewValue);

        ctrl.$setValidity('min', valid);
        if (valid) {
          lastDate = viewValue;
          return viewValue;
        }
        // Returns undefined otherwise to stop the update
      }

      scope.$watch(attr.minDateValue, function() {
        validator(lastDate);
      });

      ctrl.$formatters.push(validator);
      ctrl.$parsers.push(function(viewValue) {
        // Min date validations are inclusive
        if (viewValue) {
          viewValue.setHours(23, 59, 59, 999);
        }

        return validator(viewValue);
      });
    }
  };
})

;
