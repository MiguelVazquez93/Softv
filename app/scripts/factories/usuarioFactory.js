'use strict';
angular.module('softvApp')
	.factory('usuarioFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			
		};
		factory.GetRolList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getRolList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		return factory;
	});