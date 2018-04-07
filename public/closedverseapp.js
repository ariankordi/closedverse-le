var app = angular.module('closedverse', []);
$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('index', {
			url: '/',
			templateUrl: 's/html/somepage.html',
			controller: "ClosedController"
		});
app.controller("ClosedController", ['$scope', 'Restangular', 'CbgenRestangular', '$q',
function ($scope, Restangular, CbgenRestangular, $q) { 
	$scope.submitJob = function () {
		var post_update_data = create_resource($scope, CbgenRestangular);
		$q.when(post_update_data.then(
						function (object) {
							// success!
						},
						function (object){
							// error!
							console.log(object.data);
						}
					))
				}
}]);// end controller
 
 app.factory('CbgenRestangular', function (Restangular) {
         return Restangular.withConfig(function (RestangularConfigurer) {
             RestangularConfigurer.setBaseUrl('/api/v1');
         });
     })
 
 populate_scope_values = function ($scope) {
     return {name: $scope.name, description: $scope.description };
 },
 
 create_resource = function ($scope, CbgenRestangular) {
 var post_data = populate_scope_values($scope)
     return CbgenRestangular.all('job').post(post_data)
 },