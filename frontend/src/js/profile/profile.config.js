function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.profile', {
    abstract: true,
    url: '/@:username',
    controller: 'ProfileCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {
      profile: function(Profile, $state, $stateParams) {
        return Profile.get($stateParams.username).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        )
      }
    }

  })

  .state('app.profile.main', {
    url:'',
    controller: 'ProfileJewelsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-jewels.html',
    title: 'Profile'
  })
  .state('app.profile.favorites', {
    url:'/favorites',
    controller: 'ProfileJewelsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-jewels.html',
    title: 'Favorites'
  });

};

export default ProfileConfig;
