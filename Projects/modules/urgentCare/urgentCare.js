var app = angular.module('app.loggedIn.urgentCare',[
	'app.loggedIn.urgentCare.controller'
]);

app.config(function($stateProvider){
	$stateProvider
		.state('loggedIn.urgentCare',{
			abstract: true,
			templateUrl: 'modules/urgentCare/views/urgentCare.html',
			controller: 'urgentCareCtrl'
		})
		.state('loggedIn.urgentCare.list', {
			url: '/urgentCare/list',
			templateUrl: 'modules/urgentCare/views/urgentCareList.html',
			controller: 'urgentCareListCtrl'
		});
});