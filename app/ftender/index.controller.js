(function () {
    'use strict';

    angular
        .module('app')
        .controller('Ftender.IndexController', Controller);

    function Controller($window, UserService, TenderService, FlashService) {
        var vm = this;
        vm.submitTender = submitTender;
        vm.user=null;
        vm.tender=null;
        vm.x=false;
        
    function dateDiffInDays(a, b) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
        
        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                if(vm.user.type=="Contractor")
                vm.x=true;
                console.log(user);
                console.log(vm.x);
            });
        }
        
        function submitTender() {
            vm.tender.contractorName=vm.user.firstName + vm.user.lastName;
            vm.tender.email=vm.user.email;
            vm.tender.level="Pending With PWD";
            vm.tender.timeline=dateDiffInDays(vm.tender.startdate,vm.tender.enddate);
            vm.tender.tenderid=vm.user.username+vm.tender.tendername;
            if(vm.tender.tendername=="undefined"||vm.tender.bid==undefined||vm.tender.past==undefined||vm.tender.material==undefined||vm.tender.startdate==undefined||vm.tender.enddate==undefined){
                FlashService.Error("Fill in all the fields");
            }
            else{
                /*vm.tender.bid=vm.tender.bid.toString();
                vm.tender.past=vm.tender.past.toString();
        */    TenderService.Create(vm.tender)
                .then(function () {
                    FlashService.Success('Tender Submitted');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
            }
        }
    }
})();

