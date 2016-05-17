(function () {
    'use strict';
    
    angular
        .module('app')
        .factory('TenderService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetBytendername = GetBytendername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/users/tcurrent').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/users/').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/users/t' + _id).then(handleSuccess, handleError);
        }

        function GetBytendername(tendername) {
            return $http.get('/api/users/t' + tendername).then(handleSuccess, handleError);
        }

        function Create(tender) {
            return $http.post('/api/users/tregister', tender).then(handleSuccess, handleError);
        }

        function Update(tender) {
            return $http.put('/api/users/t' + tender._id, tender).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
