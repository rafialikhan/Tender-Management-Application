(function () {
    'use strict';

    angular
        .module('app')
        .controller('Stender.IndexController', Controller);

    function Controller($window, UserService, TenderService, FlashService) {
        var vm = this;
        vm.tenders = null;
        vm.arr = null;

        
        initController();
        
        function initController() {
            // get current user
            TenderService.GetAll().then(function (tender) {
                console.log(tender);
                vm.tenders = tender;
                vm.arr = $.map(tender, function(el) { return el });
                console.log(vm.arr);
            });
        }
        
        console.log(vm.tenders);
        console.log("HI");
        
    }
    
})();