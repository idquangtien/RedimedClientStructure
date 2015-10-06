var app = angular.module('app.security', [
	'app.security.controller'
]);

app.config(function($stateProvider){
	$stateProvider
		.state('security', {
			abstract: false,
			views: {
				'root': {
					templateUrl: 'modules/security/views/securityView.html',
					controller: 'securityCtrl'
				}
			}
		})
		.state('security.login', {
			url: '/login',
			views: {
				'main-content': {
					templateUrl: 'modules/security/views/login.html',
					controller: 'securityLoginCtrl',
					data: {pageTitle: 'Login', pageSubTitle: 'statistics & reports'}
				}
			},
			resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad){
                	return $ocLazyLoad.load({
                		name: 'app',
                		insertBefore: '#ng_load_plugins_before',
                		files: [
                			'theme/assets/global/plugins/select2/select2.css',
                			'theme/assets/admin/pages/css/login-soft.css',

                			'theme/assets/global/plugins/jquery-validation/js/jquery.validate.min.js',
                			'theme/assets/global/plugins/backstretch/jquery.backstretch.min.js',
                			'theme/assets/global/plugins/select2/select2.min.js',

                			'modules/security/controllers/securityLoginCtrl.js'
                		]
                	});
                }]
            }
		})
		.state('security.createUser', {
			url: '/createUser',
			views: {
				'main-content': {
					templateUrl: 'modules/security/views/createUser.html'
				}
			}
		});
});