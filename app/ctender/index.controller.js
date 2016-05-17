(function () {
    'use strict';

    angular
        .module('app')
        .controller('Ctender.IndexController', Controller);

    function Controller($window, UserService, TenderService, FlashService) {
        var vm = this;
        vm.tenders = null;
        vm.submitTender = submitTender;
        vm.arr = null;
        vm.y1=null;
        vm.y2=null;
        vm.user=null;
        vm.x=null;
        vm.y=null;
        vm.flag1=false;
        vm.flag2=false;
        
        initController();
        
        function initController() {
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                if(vm.user.type!="Contractor")
                vm.x=true;
                console.log(user);
                console.log(vm.x);
            });
            
            TenderService.GetAll().then(function (tender) {
                console.log(tender);
                vm.tenders = tender;
                vm.arr = $.map(tender, function(el) { return el });
                console.log(vm.arr);
            });
            
        }
        
        function submitTender(){
            if(vm.y1!=undefined&&vm.y2!=undefined){
                angular.forEach(vm.tenders,function(value,index){
                    console.log("$"+value.tenderid+value.level+vm.user.type);
                    if(value.tenderid==vm.y1){
                        vm.flag1=true;
                        vm.x=value;
                        console.log("1"+vm.x);
                    }
                    if(value.tenderid==vm.y2){
                        vm.flag2=true;
                        vm.y=value;
                        console.log(vm.y);
                    }
            });
        }
        }
    }
})();

