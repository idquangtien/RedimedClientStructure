var app = angular.module('app.security.login.controller', [
]);

app.controller('securityLoginCtrl', function($scope, $state){
	$scope.login = function(){
        $state.go('loggedIn.home.list');
	};
	$scope.createUser = function(){
		$state.go('security.createUser');
	}
	
});