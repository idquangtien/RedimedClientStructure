var app = angular.module('app.loggedIn.home',[
    'app.loggedIn.home.controller'
]);

app.config(function($stateProvider){
	$stateProvider
		.state('loggedIn.home',{
            abstract: true,
            templateUrl: 'modules/home/views/home.html',
            controller: 'homeCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'app',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            //path file load
                        ] 
                    }]);
                }] 
            }
            
		})
		.state('loggedIn.home.list', {
			url: '/home/list',
			templateUrl: 'modules/home/views/homeList.html',
            controller: 'homeListCtrl',
		});
});