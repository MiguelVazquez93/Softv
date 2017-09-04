'use strict';

angular
    .module('softvApp')
    .controller('ModalCiudadFormAddCtrl', function(CatalogosFactory, $uibModalInstance, ngNotify, $state){

        function initData(){
            CatalogosFactory.GetEstadoList2_web().then(function(data){
                vm.EstadoList = data.GetEstadoList2_webResult;
            });
        }

        function AddRelEst(){
            if(vm.Estado != undefined && vm.Estado != 0){
                var RelEst = {};
                RelEst.IdEstado = vm.Estado.IdEstado;
                var RelEstView = {};
                RelEstView.IdEstado = vm.Estado.IdEstado;
                RelEstView.Estado = vm.Estado.Nombre;
                if(ExistsRelEst(RelEst.IdEstado) == false){
                    vm.RelEstList.push(RelEst);
                    vm.RelEstViewList.push(RelEstView);
                }else{
                    ngNotify.set('ERROR, Ya existe esta relación.', 'warn');
                }
            }else{
                ngNotify.set('ERROR, Selecciona un estado.', 'warn');
            }
        }

        function ExistsRelEst(IdEstado){
            var ResultExists = 0;
            for(var i = 0; vm.RelEstList.length > i; i ++){
                if(vm.RelEstList[i].IdEstado == IdEstado){
                    ResultExists = ResultExists + 1
                }
            }
            return (ResultExists > 0)? true : false;
        }

        function DeleteRelEst(IdEstado){
            for(var i = 0; vm.RelEstList.length > i; i ++){
                if(vm.RelEstList[i].IdEstado == IdEstado){
                    vm.RelEstList.splice(i, 1);
                    vm.RelEstViewList.splice(i, 1);
                }
            }
        }

        function SaveCiudad(){
            if(vm.RelEstList.length > 0){
                var lstRelEstado = {};
                lstRelEstado.Nombre = vm.Ciudad;
                var RelMunicipioEstAdd = vm.RelEstList;
                CatalogosFactory.AddRelEstMunL(lstRelEstado, RelMunicipioEstAdd).then(function(data){
                    if(data.AddRelEstMunLResult > 0){
                        ngNotify.set('CORRECTO, se añadió una ciudad nueva.', 'success');
                        $state.reload('home.catalogos.ciudades');
                        cancel();
                    }else{
                        ngNotify.set('ERROR, al añadir una ciudad nueva.', 'warn');
                        $state.reload('home.catalogos.ciudades');
                        cancel();
                    }
                });
            }else{
                 ngNotify.set('ERROR, Para añadir una nueva ciudad, se tiene que ingresar mínimo una relación.', 'warn');
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        var vm = this;
        vm.Titulo = 'Nuevo Registro';
        vm.Icono = 'fa fa-plus';
        vm.RelEstList = [];
        vm.RelEstViewList = [];
        vm.AddRelEst = AddRelEst;
        vm.DeleteRelEst = DeleteRelEst;
        vm.SaveCiudad = SaveCiudad;
        vm.cancel = cancel;
        initData();

    });