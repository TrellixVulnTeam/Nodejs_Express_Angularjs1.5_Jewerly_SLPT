angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("auth/auth.html","<div class=\"auth-page\">\n  <div class=\"container page\">\n    <div class=\"row\">\n\n      <div class=\"col-md-6 offset-md-3 col-xs-12\">\n        <h1 class=\"text-xs-center\" ng-bind=\"::$ctrl.title\"></h1>\n        <p class=\"text-xs-center\">\n          <a ui-sref=\"app.login\"\n            ng-show=\"$ctrl.authType === \'register\'\">\n            Have an account?\n          </a>\n          <a ui-sref=\"app.register\"\n            ng-show=\"$ctrl.authType === \'login\'\">\n            Need an account?\n          </a>\n        </p>\n        <a href=\"http://localhost:3000/api/auth/github\" style=\"font-size: 25px; color:black\"><i class=\"ion-social-github\"></i>&nbsp;Github</a>\n\n        <list-errors errors=\"$ctrl.errors\"></list-errors>\n\n        <form ng-submit=\"$ctrl.submitForm()\">\n          <fieldset ng-disabled=\"$ctrl.isSubmitting\">\n\n            <fieldset class=\"form-group\" ng-show=\"$ctrl.authType === \'register\'\">\n              <input class=\"form-control form-control-lg\"\n                type=\"text\"\n                placeholder=\"Username\"\n                ng-model=\"$ctrl.formData.username\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"email\"\n                placeholder=\"Email\"\n                ng-model=\"$ctrl.formData.email\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"password\"\n                placeholder=\"Password\"\n                ng-model=\"$ctrl.formData.password\" />\n            </fieldset>\n\n            <button class=\"btn btn-lg btn-primary pull-xs-right\"\n              type=\"submit\"\n              ng-bind=\"::$ctrl.title\">\n            </button>\n\n          </fieldset>\n        </form>\n      </div>\n\n    </div>\n  </div>\n</div>\n");
$templateCache.put("components/list-errors.html","<ul class=\"error-messages\" ng-show=\"$ctrl.errors\">\n  <div ng-repeat=\"(field, errors) in $ctrl.errors\">\n    <li ng-repeat=\"error in errors\">\n      {{field}} {{error}}\n    </li>\n  </div>\n</ul>\n");
$templateCache.put("editor/editor.html","<div class=\"editor-page\">\n  <div class=\"container page\">\n    <div class=\"row\">\n      <div class=\"col-md-10 offset-md-1 col-xs-12\">\n\n        <list-errors errors=\"$ctrl.errors\"></list-errors>\n\n        <form>\n          <fieldset ng-disabled=\"$ctrl.isSubmitting\">\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                ng-model=\"$ctrl.article.title\"\n                type=\"text\"\n                placeholder=\"Article Title\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control\"\n                ng-model=\"$ctrl.article.description\"\n                type=\"text\"\n                placeholder=\"What\'s this article about?\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <textarea class=\"form-control\"\n                rows=\"8\"\n                ng-model=\"$ctrl.article.body\"\n                placeholder=\"Write your article (in markdown)\">\n              </textarea>\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control\"\n                type=\"text\"\n                placeholder=\"Enter tags\"\n                ng-model=\"$ctrl.tagField\"\n                ng-keyup=\"$event.keyCode == 13 && $ctrl.addTag()\" />\n\n              <div class=\"tag-list\">\n                <span ng-repeat=\"tag in $ctrl.article.tagList\"\n                  class=\"tag-default tag-pill\">\n                  <i class=\"ion-close-round\" ng-click=\"$ctrl.removeTag(tag)\"></i>\n                  {{ tag }}\n                </span>\n              </div>\n            </fieldset>\n\n            <button class=\"btn btn-lg pull-xs-right btn-primary\" type=\"button\" ng-click=\"$ctrl.submit()\">\n              Publish Article\n            </button>\n\n          </fieldset>\n        </form>\n\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("home/home.html","<div class=\"home-page\">\n\n  <!-- Splash banner that only shows when not logged in -->\n  <div class=\"banner\" show-authed=\"false\">\n    <div class=\"container\">\n      <h1 class=\"logo-font\" ng-bind=\"::$ctrl.appName | lowercase\"></h1>\n      <p>A place to share your knowledge.</p>\n    </div>\n  </div>\n\n  <div class=\"container page\">\n    <div class=\"row\">\n\n\n      <!-- Main view - contains tabs & article list -->\n      <div class=\"col-md-9\">\n        <!-- Tabs for toggling between feed, article lists -->\n        <div class=\"feed-toggle\">\n          <ul class=\"nav nav-pills outline-active\">\n\n            <li class=\"nav-item\" show-authed=\"true\">\n              <a href=\"\" class=\"nav-link\" ng-class=\"{ active: $ctrl.listConfig.type === \'feed\' }\"\n                ng-click=\"$ctrl.changeList({ type: \'feed\' })\">\n                Your Feed\n              </a>\n            </li>\n\n            <li class=\"nav-item\">\n              <a href=\"\" class=\"nav-link\"\n                ng-class=\"{ active: $ctrl.listConfig.type === \'all\' && !$ctrl.listConfig.filters }\"\n                ng-click=\"$ctrl.changeList({ type: \'all\' })\">\n                Global Feed\n              </a>\n            </li>\n\n\n            <li class=\"nav-item\" ng-show=\"$ctrl.listConfig.filters.tag\">\n              <a href=\"\" class=\"nav-link active\">\n                <i class=\"ion-pound\"></i> {{$ctrl.listConfig.filters.tag}}\n              </a>\n            </li>\n            <li></li>\n\n          </ul>\n\n          <jewels-list jewels=\"$ctrl.jewels\"></jewels-list>\n        </div>\n\n        <!-- List the current articles -->\n        <article-list limit=\"10\" list-config=\"$ctrl.listConfig\"></article-list>\n\n      </div>\n\n      <!-- Sidebar where popular tags are listed -->\n      <div class=\"col-md-3\">\n        <div class=\"sidebar\">\n\n          <p>Popular Tags</p>\n\n          <div class=\"tag-list\" ng-show=\"$ctrl.tags\">\n            <a href=\"\" class=\"tag-default tag-pill\"\n              ng-click=\"$ctrl.changeList({ type: \'all\', filters: { tag: tagName } })\" ng-repeat=\"tagName in $ctrl.tags\"\n              ng-bind=\"tagName\">\n            </a>\n          </div>\n\n          <div ng-show=\"!$ctrl.tagsLoaded\">\n            Loading tags...\n          </div>\n\n          <div class=\"post-preview\" ng-show=\"$ctrl.tagsLoaded && !$ctrl.tags.length\">\n            No tags are here... yet.\n          </div>\n\n        </div>\n      </div>\n\n      <!-- End the row & container divs -->\n    </div>\n  </div>\n\n</div>");
$templateCache.put("jewels/jewels.html","<jewels-list jewels=\"$ctrl.jewels\"></jewels-list>");
$templateCache.put("jewels/jewelsdetails.html","<jewel-detail jewel=\"$ctrl.jewel\"></jewel-detail>\n");
$templateCache.put("layout/app-view.html","<app-header></app-header>\n\n<div ui-view></div>\n\n<app-footer></app-footer>\n");
$templateCache.put("layout/footer.html","<footer>\n  <div class=\"container\">\n    <a class=\"logo-font\" ui-sref=\"app.home\" ng-bind=\"::$ctrl.appName | lowercase\"></a>\n    <span class=\"attribution\">\n      &copy; {{::$ctrl.date | date:\'yyyy\'}}.\n      An interactive learning project from <a href=\"https://thinkster.io\">Thinkster</a>.\n      Code licensed under MIT.\n    </span>\n  </div>\n</footer>\n");
$templateCache.put("layout/header.html","<nav class=\"navbar navbar-light\">\n  <div class=\"container\">\n\n    <a class=\"navbar-brand\" ui-sref=\"app.home\" ng-bind=\"::$ctrl.appName | lowercase\">\n    </a>\n\n    <!-- Show this for logged out users -->\n    <ul show-authed=\"false\" class=\"nav navbar-nav pull-xs-right\">\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.home\">\n          Home\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.jewels\">\n          Jewels\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.login\">\n          Sign in\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.register\">\n          Sign up\n        </a>\n      </li>\n\n    </ul>\n\n    <!-- Show this for logged in users -->\n    <ul show-authed=\"true\" class=\"nav navbar-nav pull-xs-right\">\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.home\">\n          Home\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.jewels\">\n          Jewels\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.editor\">\n          <i class=\"ion-compose\"></i>&nbsp;New Article\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.settings\">\n          <i class=\"ion-gear-a\"></i>&nbsp;Settings\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.profile.main({ username: $ctrl.currentUser.username})\">\n          <img ng-src=\"{{$ctrl.currentUser.image}}\" class=\"user-pic\" />\n          {{ $ctrl.currentUser.username }}\n        </a>\n      </li>\n\n    </ul>\n\n\n  </div>\n</nav>");
$templateCache.put("profile/profile-articles.html","<article-list limit=\"5\" list-config=\"$ctrl.listConfig\"></article-list>\n");
$templateCache.put("profile/profile.html","<div class=\"profile-page\">\n\n  <!-- User\'s basic info & action buttons -->\n  <div class=\"user-info\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-xs-12 col-md-10 offset-md-1\">\n\n          <img ng-src=\"{{::$ctrl.profile.image}}\" class=\"user-img\" />\n          <h4 ng-bind=\"::$ctrl.profile.username\"></h4>\n          <p ng-bind=\"::$ctrl.profile.bio\"></p>\n\n          <a ui-sref=\"app.settings\"\n            class=\"btn btn-sm btn-outline-secondary action-btn\"\n            ng-show=\"$ctrl.isUser\">\n            <i class=\"ion-gear-a\"></i> Edit Profile Settings\n          </a>\n\n          <follow-btn user=\"$ctrl.profile\" ng-hide=\"$ctrl.isUser\"></follow-btn>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Container where User\'s posts & favs are list w/ toggle tabs -->\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col-xs-12 col-md-10 offset-md-1\">\n\n        <!-- Tabs for switching between author articles & favorites -->\n        <div class=\"articles-toggle\">\n          <ul class=\"nav nav-pills outline-active\">\n\n            <li class=\"nav-item\">\n              <a class=\"nav-link active\"\n                ui-sref-active=\"active\"\n                ui-sref=\"app.profile.main({username: $ctrl.profile.username})\">\n                My Articles\n              </a>\n            </li>\n\n            <li class=\"nav-item\">\n              <a class=\"nav-link\"\n                ui-sref-active=\"active\"\n                ui-sref=\"app.profile.favorites({username: $ctrl.profile.username})\">\n                Favorited Articles\n              </a>\n            </li>\n\n          </ul>\n        </div>\n\n        <!-- List of articles -->\n        <div ui-view></div>\n\n\n      </div>\n\n    <!-- End row & container divs -->\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("settings/settings.html","<div class=\"settings-page\">\n  <div class=\"container page\">\n    <div class=\"row\">\n      <div class=\"col-md-6 offset-md-3 col-xs-12\">\n\n        <h1 class=\"text-xs-center\">Your Settings</h1>\n\n        <list-errors errors=\"$ctrl.errors\"></list-errors>\n\n        <form ng-submit=\"$ctrl.submitForm()\">\n          <fieldset ng-disabled=\"$ctrl.isSubmitting\">\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control\"\n                type=\"text\"\n                placeholder=\"URL of profile picture\"\n                ng-model=\"$ctrl.formData.image\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"text\"\n                placeholder=\"Username\"\n                ng-model=\"$ctrl.formData.username\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <textarea class=\"form-control form-control-lg\"\n                rows=\"8\"\n                placeholder=\"Short bio about you\"\n                ng-model=\"$ctrl.formData.bio\">\n              </textarea>\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"email\"\n                placeholder=\"Email\"\n                ng-model=\"$ctrl.formData.email\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"password\"\n                placeholder=\"New Password\"\n                ng-model=\"$ctrl.formData.password\" />\n            </fieldset>\n\n            <button class=\"btn btn-lg btn-primary pull-xs-right\"\n              type=\"submit\">\n              Update Settings\n            </button>\n\n          </fieldset>\n        </form>\n\n        <!-- Line break for logout button -->\n        <hr />\n\n        <button class=\"btn btn-outline-danger\"\n          ng-click=\"$ctrl.logout()\">\n          Or click here to logout.\n        </button>\n\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("components/buttons/favorite-btn.html","<button class=\"btn btn-sm\"\n  ng-class=\"{ \'disabled\' : $ctrl.isSubmitting,\n              \'btn-outline-primary\': !$ctrl.article.favorited,\n              \'btn-primary\': $ctrl.article.favorited }\"\n  ng-click=\"$ctrl.submit()\">\n  <i class=\"ion-heart\"></i> <ng-transclude></ng-transclude>\n</button>\n");
$templateCache.put("components/buttons/follow-btn.html","<button\n  class=\"btn btn-sm action-btn\"\n  ng-class=\"{ \'disabled\': $ctrl.isSubmitting,\n              \'btn-outline-secondary\': !$ctrl.user.following,\n              \'btn-secondary\': $ctrl.user.following }\"\n  ng-click=\"$ctrl.submit()\">\n  <i class=\"ion-plus-round\"></i>\n  &nbsp;\n  {{ $ctrl.user.following ? \'Unfollow\' : \'Follow\' }} {{ $ctrl.user.username }}\n</button>\n");
$templateCache.put("components/article-helpers/article-list.html","<article-preview\n  article=\"article\"\n  ng-repeat=\"article in $ctrl.list\">\n</article-preview>\n\n<div class=\"article-preview\"\n  ng-hide=\"!$ctrl.loading\">\n  Loading articles...\n</div>\n\n<div class=\"article-preview\"\n  ng-show=\"!$ctrl.loading && !$ctrl.list.length\">\n  No articles are here... yet.\n</div>\n\n<list-pagination\n total-pages=\"$ctrl.listConfig.totalPages\"\n current-page=\"$ctrl.listConfig.currentPage\"\n ng-hide=\"$ctrl.listConfig.totalPages <= 1\">\n</list-pagination>\n");
$templateCache.put("components/article-helpers/article-meta.html","<div class=\"article-meta\">\n  <a ui-sref=\"app.profile.main({ username:$ctrl.article.author.username })\">\n    <img ng-src=\"{{$ctrl.article.author.image}}\" />\n  </a>\n\n  <div class=\"info\">\n    <a class=\"author\"\n      ui-sref=\"app.profile.main({ username:$ctrl.article.author.username })\"\n      ng-bind=\"$ctrl.article.author.username\">\n    </a>\n    <span class=\"date\"\n      ng-bind=\"$ctrl.article.createdAt | date: \'longDate\' \">\n    </span>\n  </div>\n\n  <ng-transclude></ng-transclude>\n</div>\n");
$templateCache.put("components/article-helpers/article-preview.html","<div class=\"article-preview\">\n  <article-meta article=\"$ctrl.article\">\n    <favorite-btn\n      article=\"$ctrl.article\"\n      class=\"pull-xs-right\">\n      {{$ctrl.article.favoritesCount}}\n    </favorite-btn>\n  </article-meta>\n\n  <a ui-sref=\"app.article({ slug: $ctrl.article.slug })\" class=\"preview-link\">\n    <h1 ng-bind=\"$ctrl.article.title\"></h1>\n    <p ng-bind=\"$ctrl.article.description\"></p>\n    <span>Read more...</span>\n    <ul class=\"tag-list\">\n      <li class=\"tag-default tag-pill tag-outline\"\n        ng-repeat=\"tag in $ctrl.article.tagList\">\n        {{tag}}\n      </li>\n    </ul>\n  </a>\n</div>\n");
$templateCache.put("components/article-helpers/list-pagination.html","<nav>\n  <ul class=\"pagination\">\n\n    <li class=\"page-item\"\n      ng-class=\"{active: pageNumber === $ctrl.currentPage }\"\n      ng-repeat=\"pageNumber in $ctrl.pageRange($ctrl.totalPages)\"\n      ng-click=\"$ctrl.changePage(pageNumber)\">\n\n      <a class=\"page-link\" href=\"\">{{ pageNumber }}</a>\n\n    </li>\n\n  </ul>\n</nav>\n");
$templateCache.put("components/jewels-helpers/jewel_detail.html","<h2> {{$ctrl.jewel.name}}</h2>\n<p id=\"brand\">{{$ctrl.jewel.brand}}</p>\n<p id=\"price\">{{$ctrl.jewel.price}}</p>\n\n");
$templateCache.put("components/jewels-helpers/jewels_list.html","<div class=\"jewels\" ng-repeat=\"jewel in $ctrl.jewels\">\n  <h2> {{jewel.name}}</h2>\n  <p id=\"brand\">{{jewel.brand}}</p>\n  <p id=\"price\">{{jewel.price}}</p>\n  <button ui-sref=\"app.detailsJewels({slug:jewel.slug})\">Show jewel</button>\n\n</div>\n");}]);