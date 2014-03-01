'use strict';

angular.module('directives.max-date-value')

.directive('maxDateValue', function() {
  return {
    require: 'ngModel',
    link: function(scope, _, attr, ctrl) {
      var lastDate;

      function validator(viewValue) {
        var max = scope.$eval(attr.maxDateValue);
        if (!viewValue || !max) {
          return;
        }

        var valid = (max > viewValue);

        ctrl.$setValidity('max', valid);
        if (valid) {
          lastDate = viewValue;
          return viewValue;
        }
        // Returns undefined otherwise to stop the update
      }

      scope.$watch(attr.maxDateValue, function() {
        validator(lastDate);
      });

      ctrl.$formatters.push(validator);
      ctrl.$parsers.push(function(viewValue) {
        // Max date validations are inclusive
        if (viewValue) {
          viewValue.setHours(0, 0, 0, 0);
        }

        return validator(viewValue);
      });
    }
  };
})

;
