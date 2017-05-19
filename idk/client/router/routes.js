
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
});


//Autorizacion 

Router.plugin('ensureSignedIn', {
  only: ['private', 'subirImages']
});


//Routeo a modulos de autentificacion
AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin'
});


AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
//AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
