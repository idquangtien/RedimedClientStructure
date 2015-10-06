var app = angular.module('app.loggedIn.patient', [
	'app.loggedIn.patient.controller'
]);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/patient/patient');
	$stateProvider
		.state('loggedIn.patient', {
			abstract: true,
			templateUrl: 'modules/patient/views/patient.html',
			controller: 'patientCtrl'
		})
		.state('loggedIn.patient.list', {
			url: '/patient/list',
			templateUrl: 'modules/patient/views/patientList.html',
			controller: 'patientListCtrl'
		});
});