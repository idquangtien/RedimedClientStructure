var app = angular.module('app', [
    "ui.router", // ANGULAR UI ROUTER
    'app.loggedIn'
]);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state("init", {
            url: "/",
            controller: function($state, $timeout){
                $timeout(function() {
                    $state.go("loggedIn.home.list");
                }, 500);
            }
        });
});