(function () {
    'use strict';

    angular
        .module('app')
        .controller('Vtender.IndexController', Controller);

    function Controller($window, UserService, TenderService, FlashService) {
        var vm = this;
        vm.tenders = null;
        vm.submitTender = submitTender;
        vm.arr = null;
        vm.y=null;
        vm.user=null;
        vm.x=false;
        vm.flag=false;
        
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
            console.log("hi");
            if(vm.y!=undefined){
                angular.forEach(vm.tenders,function(value,index){
                    console.log("$"+value.tenderid+value.level+vm.user.type);
                    if(value.tenderid==vm.y){
                        vm.flag=true;
                        if(vm.user.type=="Pwd"&&value.level=="Pending With PWD"){
                            TenderService.Delete(value._id);
                            value.level="Pending with Government User";
                            console.log("&")
                            TenderService.Create(value)
                                .then(function () {
                                    FlashService.Success('Tender verified');
                                })
                                .catch(function (error) {
                                    FlashService.Error(error);
                                });
                            }
                        else if(vm.user.type=="Government"&&value.level=="Pending with Government User"){
                            vm.flag=true;
                            TenderService.Delete(value._id);
                            value.level="Tender Approved";
                            console.log("&")
                            TenderService.Create(value)
                                .then(function () {
                                    FlashService.Success('Tender verified');
                                })
                                .catch(function (error) {
                                    FlashService.Error(error);
                                });
                            }
                        else if(vm.user.type=="Government"&&value.level=="Pending With PWD"){
                                    window.alert("First Tender has to be verified With PWD");
                            }
                        else if(vm.user.type=="Pwd"&&value.level=="Pending with Government User"){
                            console.log("%");
                                    window.alert("Tender already approved by PWD");        
                        }
                    }
            });
            }
            if(!vm.flag){
                FlashService.Error("Not Found");
            }
        }
        
    }
})();

