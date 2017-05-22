
// Router.configure({
//     layoutTemplate: 'masterLayout',
//     loadingTemplate: 'loading',
//     notFoundTemplate: 'pageNotFound',
//     yieldTemplates: {
//         nav: {to: 'nav'},
//         footer: {to: 'footer2'},
//     }
// });

// Router.configure({
//     layoutTemplate: 'mainLayout',
//     loadingTemplate: 'loading',
//     notFoundTemplate: 'notFound',
//     yieldTemplates: {
//         nav: {to: 'nav'},
//         footer: {to: 'footer'},
//     }
// });

Router.configure({
    layoutTemplate: 'layout2',
    notFoundTemplate: 'notFound'
 });

// Router.route('/', function () {
//     this.render('home');
// });


// Router.route('/landing', function () {
//     this.render('landing');
//     this.layout('blankLayout')
// });


Router.map(function() {
    this.route('landing', { path: '/',layoutTemplate: 'landingLayout',});
    this.route('private');
    this.route('otro');
    this.route('subirImages');
    this.route('login3');
    this.route('loginTwo', { layoutTemplate: 'blankLayout',});
    this.route('login', { layoutTemplate: 'blankLayout',});
});


//Autorizacion 

Router.plugin('ensureSignedIn', {
  only: ['private', 'subirImages']
});

var myPostLogout = function(){
    //example redirect after logout
    Router.go('/landing');
};

AccountsTemplates.configure({
    onLogoutHook: myPostLogout
});


//Routeo a modulos de autentificacion
AccountsTemplates.configureRoute('signIn', {
  name: 'ingresar',
  path: '/login2'
});


AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
