/***
Metronic AngularJS App Main Script
***/

/* App */
var app = angular.module("app.loggedIn", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "app.loggedIn.controller",
    "app.loggedIn.home",
    "app.loggedIn.appointment"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
app.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
app.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

// /* Setup App Main Controller */
// app.controller('loggedInCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
//     $scope.$on('$viewContentLoaded', function() {
//         alert('loggedInCtrl');
//         Metronic.initComponents(); // init core components
//         //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
//     });
// }]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
app.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
app.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
app.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
app.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
app.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);


/* Setup Rounting For All Pages */
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/loggedIn");  
    
    $stateProvider
        // loggedIn
        .state('loggedIn', {
            abstract: true,
            data: {pageTitle: 'Todo'},
            views:{
                'root':{
                    templateUrl: 'modules/loggedIn.html',
                    controller: 'loggedInCtrl'
                }
            },
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'app',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'theme/assets/global/plugins/bootstrap-select/bootstrap-select.min.css',
                            'theme/assets/global/plugins/select2/select2.css',
                            'theme/assets/global/plugins/jquery-multi-select/css/multi-select.css',

                            'theme/assets/global/plugins/bootstrap-select/bootstrap-select.min.js',
                            'theme/assets/global/plugins/select2/select2.min.js',
                            'theme/assets/global/plugins/jquery-multi-select/js/jquery.multi-select.js',

                            'theme/assets/admin/pages/scripts/components-dropdowns.js',

                            //iCheck
                            'theme/assets/global/plugins/icheck/skins/all.css',
                            'theme/assets/global/plugins/icheck/icheck.min.js',
                            //picker
                            'theme/assets/global/plugins/clockface/css/clockface.css',
                            'theme/assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
                            'theme/assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            'theme/assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            'theme/assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                            'theme/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

                            'theme/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                            'theme/assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                            'theme/assets/global/plugins/clockface/js/clockface.js',
                            'theme/assets/global/plugins/bootstrap-daterangepicker/moment.min.js',
                            'theme/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
                            'theme/assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            'theme/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

                            'theme/assets/admin/pages/scripts/components-pickers.js',
                            //page_portfolio
                            "theme/assets/global/plugins/fancybox/source/jquery.fancybox.css",
                            "theme/assets/admin/pages/css/portfolio.css",
                        ] 
                    }]);
                }] 
            }
        });

}]);

/* Init global settings and run the app */
app.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);