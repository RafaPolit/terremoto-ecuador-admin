/* globals $, bootbox */
'use strict';

angular.module('clientApp').directive('clickConfirm', function($parse, _){

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $(element).click(function(event) {

        if(_(attrs).has('stopPropagation')) {
          event.stopPropagation();
        }

        bootbox.dialog( {
          title: 'Atención!',
          message: attrs.confirmText,
          buttons: {
            'cancel' : {
              'label' : 'Cancelar',
              'className' : 'btn-sm'
            },
            'confirm' : {
              'label' : '<i class="icon-ok"></i> Confirmar',
              'className' : 'btn-sm btn-primary',
              'callback' : function() {
                scope.$apply(function() { $parse(attrs.clickConfirm)(scope); });
              }
            }
          }
        });
      });
    }
  };
});