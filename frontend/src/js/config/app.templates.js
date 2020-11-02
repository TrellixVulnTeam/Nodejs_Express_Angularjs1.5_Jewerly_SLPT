angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("auth/auth.html","<div class=\"auth-page\">\n  <div class=\"container page\">\n    <div class=\"row\">\n\n      <div class=\"col-md-6 offset-md-3 col-xs-12\">\n        <h1 class=\"text-xs-center\" ng-bind=\"::$ctrl.title\"></h1>\n        <p class=\"text-xs-center\">\n          <a ui-sref=\"app.login\" ng-show=\"$ctrl.authType === \'register\'\">\n            Have an account?\n          </a>\n          <a ui-sref=\"app.register\" ng-show=\"$ctrl.authType === \'login\'\">\n            Need an account?\n          </a>\n        </p>\n        <div class=\"error\" ng-show=\"$ctrl.error\">\n        </div>\n        <!-- <list-errors errors=\"$ctrl.errors\"></list-errors> -->\n\n        <form name=\"formData\" ng-submit=\"$ctrl.submitForm()\">\n          <fieldset ng-disabled=\"$ctrl.isSubmitting\">\n\n            <fieldset  required class=\"form-group\" ng-show=\"$ctrl.authType === \'register\'\" ng-disabled=\"$ctrl.authType != \'register\'\">\n              <input required class=\"form-control form-control-lg\" type=\"text\" placeholder=\"Username\"\n                ng-model=\"$ctrl.formData.username\" name=\"Username\" ng-minlength=\"4\" ng-maxlength=\"20\"\n                autocomplete=false />\n              <div ng-messages=\"formData.Username.$error\">\n                <p ng-message=\"required\" ng-show=\"formData.Username.$dirty\">Username required</p>\n                <p ng-message=\"minlength\">Username more than 4 char</p>\n                <p ng-message=\"maxlength\">Username less than 20 char</p>\n              </div>\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input required class=\"form-control form-control-lg\" type=\"email\" placeholder=\"Email\" name=\"Email\"\n                ng-model=\"$ctrl.formData.email\" />\n              <div ng-messages=\"formData.Email.$error\">\n                <p ng-message=\"required\" ng-show=\"formData.Email.$dirty\">Email required</p>\n              </div>\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input required class=\"form-control form-control-lg\" type=\"password\" placeholder=\"Password\"\n                ng-model=\"$ctrl.formData.password\" name=\"Password\" ng-minlength=\"6\" ng-maxlength=\"40\" />\n              <div ng-messages=\"formData.Password.$error\">\n                <p ng-message=\"required\" ng-show=\"formData.Password.$dirty\">Password required</p>\n                <p ng-message=\"minlength\">Password more than 2 char</p>\n                <p ng-message=\"maxlength\">Password less than 40 char</p>\n              </div>\n            </fieldset>\n\n            <div align=\"center\">\n\n              <a href=\"http://localhost:3000/api/auth/google\" style=\"font-size: 25px; color:black\"><i\n                  class=\"ion-social-google\"></i>&nbsp;</a>\n              <a href=\"http://localhost:3000/api/auth/github\" style=\"font-size: 25px; color:black\"><i\n                  class=\"ion-social-github\"></i>&nbsp;</a>\n            </div>\n\n            <button class=\"btn btn-lg btn-primary pull-xs-right\" type=\"submit\" ng-bind=\"::$ctrl.title\">\n            </button>\n\n          </fieldset>\n        </form>\n      </div>\n\n    </div>\n  </div>\n</div>");
$templateCache.put("components/list-errors.html","<ul class=\"error-messages\" ng-show=\"$ctrl.errors\">\n  <div ng-repeat=\"(field, errors) in $ctrl.errors\">\n    <li ng-repeat=\"error in errors\">\n      {{field}} {{error}}\n    </li>\n  </div>\n</ul>\n");
$templateCache.put("editor/editor.html","<div class=\"editor-page\">\n  <div class=\"container page\">\n    <div class=\"row\">\n      <div class=\"col-md-10 offset-md-1 col-xs-12\">\n\n        <list-errors errors=\"$ctrl.errors\"></list-errors>\n\n        <form>\n          <fieldset ng-disabled=\"$ctrl.isSubmitting\">\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                ng-model=\"$ctrl.article.title\"\n                type=\"text\"\n                placeholder=\"Article Title\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control\"\n                ng-model=\"$ctrl.article.description\"\n                type=\"text\"\n                placeholder=\"What\'s this article about?\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <textarea class=\"form-control\"\n                rows=\"8\"\n                ng-model=\"$ctrl.article.body\"\n                placeholder=\"Write your article (in markdown)\">\n              </textarea>\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control\"\n                type=\"text\"\n                placeholder=\"Enter tags\"\n                ng-model=\"$ctrl.tagField\"\n                ng-keyup=\"$event.keyCode == 13 && $ctrl.addTag()\" />\n\n              <div class=\"tag-list\">\n                <span ng-repeat=\"tag in $ctrl.article.tagList\"\n                  class=\"tag-default tag-pill\">\n                  <i class=\"ion-close-round\" ng-click=\"$ctrl.removeTag(tag)\"></i>\n                  {{ tag }}\n                </span>\n              </div>\n            </fieldset>\n\n            <button class=\"btn btn-lg pull-xs-right btn-primary\" type=\"button\" ng-click=\"$ctrl.submit()\">\n              Publish Article\n            </button>\n\n          </fieldset>\n        </form>\n\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("home/home.html","<div class=\"home-page\">\n<slider></slider>\n  <!-- Splash banner that only shows when not logged in -->\n  <div class=\"banner\" show-authed=\"false\">\n    <div class=\"container\">\n      <h1 class=\"logo-font\" ng-bind=\"::$ctrl.appName | lowercase\"></h1>\n      <p>A place to share your knowledge.</p>\n    </div>\n  </div>\n\n  <div class=\"container page\">\n    <div class=\"row\">\n\n\n      <!-- Main view - contains tabs & article list -->\n      <div class=\"col-md-9\">\n        <!-- Tabs for toggling between feed, article lists -->\n        <div class=\"feed-toggle\">\n          <ul class=\"nav nav-pills outline-active\">\n\n            <li class=\"nav-item\" show-authed=\"true\">\n              <a href=\"\" class=\"nav-link\" ng-class=\"{ active: $ctrl.listConfig.type === \'feed\' }\"\n                ng-click=\"$ctrl.changeList({ type: \'feed\' })\">\n                Your Feed\n              </a>\n            </li>\n\n            <li class=\"nav-item\">\n              <a href=\"\" class=\"nav-link\"\n                ng-class=\"{ active: $ctrl.listConfig.type === \'all\' && !$ctrl.listConfig.filters }\"\n                ng-click=\"$ctrl.changeList({ type: \'all\' })\">\n                Global Feed\n              </a>\n              <br/>\n            </li>\n\n\n            <li class=\"nav-item\" ng-show=\"$ctrl.listConfig.filters.tag\">\n              <a href=\"\" class=\"nav-link active\">\n                <i class=\"ion-pound\"></i> {{$ctrl.listConfig.filters.tag}}\n              </a>\n            </li>\n            <li></li>\n\n          </ul>\n\n          <jewels-filters filters=\"$ctrl.filters\"></jewels-filters>\n\n          \n          <!-- <jewels-list jewels=\"$ctrl.jewels\"></jewels-list> -->\n\n          \n        </div>\n\n\n        <!-- List the current articles -->\n        <article-list limit=\"10\" list-config=\"$ctrl.listConfig\"></article-list>\n\n      </div>\n\n      <!-- Sidebar where popular tags are listed -->\n      <!-- <div class=\"col-md-3\">\n        <div class=\"sidebar\">\n\n          <p>Popular Tags</p>\n\n          <div class=\"tag-list\" ng-show=\"$ctrl.tags\">\n            <a href=\"\" class=\"tag-default tag-pill\"\n              ng-click=\"$ctrl.changeList({ type: \'all\', filters: { tag: tagName } })\" ng-repeat=\"tagName in $ctrl.tags\"\n              ng-bind=\"tagName\">\n            </a>\n          </div>\n\n          <div ng-show=\"!$ctrl.tagsLoaded\">\n            Loading tags...\n          </div>\n\n          <div class=\"post-preview\" ng-show=\"$ctrl.tagsLoaded && !$ctrl.tags.length\">\n            No tags are here... yet.\n          </div>\n\n        </div>\n      </div> -->\n\n      <!-- End the row & container divs -->\n    </div>\n  </div>\n\n</div>");
$templateCache.put("layout/app-view.html","<app-header></app-header>\n\n<div ui-view></div>\n\n<app-footer></app-footer>\n");
$templateCache.put("layout/footer.html","<footer>\n  <div class=\"container\">\n    <a class=\"logo-font\" ui-sref=\"app.home\" ng-bind=\"::$ctrl.appName | lowercase\"></a>\n    <span class=\"attribution\">\n      &copy; {{::$ctrl.date | date:\'yyyy\'}}.\n      An interactive learning project from <a href=\"https://thinkster.io\">Thinkster</a>.\n      Code licensed under MIT.\n    </span>\n  </div>\n</footer>\n");
$templateCache.put("layout/header.html","<nav class=\"navbar navbar-light\">\n  <div class=\"container\">\n\n    <a class=\"navbar-brand\" ui-sref=\"app.home\" ng-bind=\"::$ctrl.appName | lowercase\">\n    </a>\n\n    <!-- Show this for logged out users -->\n    <ul show-authed=\"false\" class=\"nav navbar-nav pull-xs-right\">\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.home\">\n          Home\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.jewels\">\n          Jewels\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.login\">\n          Sign in\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.register\">\n          Sign up\n        </a>\n      </li>\n\n    </ul>\n\n    <!-- Show this for logged in users -->\n    <ul show-authed=\"true\" class=\"nav navbar-nav pull-xs-right\">\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.home\">\n          Home\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.jewels\">\n          Jewels\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.editor\">\n          <i class=\"ion-compose\"></i>&nbsp;New Article\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.settings\">\n          <i class=\"ion-gear-a\"></i>&nbsp;Settings\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" ui-sref-active=\"active\" ui-sref=\"app.profile.main({ username: $ctrl.currentUser.username})\">\n          <img ng-src=\"{{$ctrl.currentUser.image}}\" class=\"user-pic\" />\n          {{ $ctrl.currentUser.username }}\n        </a>\n      </li>\n\n    </ul>\n\n\n  </div>\n</nav>");
$templateCache.put("profile/profile-jewels.html","<jewels-list limit=\"3\" list-config=\"$ctrl.listConfig\"></jewels-list>\n");
$templateCache.put("profile/profile.html","<div class=\"profile-page\">\n\n  <!-- User\'s basic info & action buttons -->\n  <div class=\"user-info\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-xs-12 col-md-10 offset-md-1\">\n\n          <img ng-src=\"{{::$ctrl.profile.image}}\" class=\"user-img\" />\n          <h4 ng-bind=\"::$ctrl.profile.username\"></h4>\n          <p ng-bind=\"::$ctrl.profile.bio\"></p>\n\n          <a ui-sref=\"app.settings\"\n            class=\"btn btn-sm btn-outline-secondary action-btn\"\n            ng-show=\"$ctrl.isUser\">\n            <i class=\"ion-gear-a\"></i> Edit Profile Settings\n          </a>\n\n          <follow-btn user=\"$ctrl.profile\" ng-hide=\"$ctrl.isUser\"></follow-btn>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Container where User\'s posts & favs are list w/ toggle tabs -->\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col-xs-12 col-md-10 offset-md-1\">\n\n        <!-- Tabs for switching between author jewels & favorites -->\n        <div class=\"jewels-toggle\">\n          <ul class=\"nav nav-pills outline-active\">\n\n            <li class=\"nav-item\">\n              <a class=\"nav-link active\"\n                ui-sref-active=\"active\"\n                ui-sref=\"app.profile.main({username: $ctrl.profile.username})\">\n                My Jewels\n              </a>\n            </li>\n\n            <li class=\"nav-item\">\n              <a class=\"nav-link\"\n                ui-sref-active=\"active\"\n                ui-sref=\"app.profile.favorites({username: $ctrl.profile.username})\">\n                Favorited Jewels\n              </a>\n            </li>\n\n          </ul>\n        </div>\n\n        <!-- List of jewels -->\n        <div ui-view></div>\n\n\n      </div>\n\n    <!-- End row & container divs -->\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("settings/settings.html","<div class=\"settings-page\">\n  <div class=\"container page\">\n    <div class=\"row\">\n      <div class=\"col-md-6 offset-md-3 col-xs-12\">\n\n        <h1 class=\"text-xs-center\">Your Settings</h1>\n\n        <list-errors errors=\"$ctrl.errors\"></list-errors>\n\n        <form ng-submit=\"$ctrl.submitForm()\">\n          <fieldset ng-disabled=\"$ctrl.isSubmitting\">\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control\"\n                type=\"text\"\n                placeholder=\"URL of profile picture\"\n                ng-model=\"$ctrl.formData.image\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"text\"\n                placeholder=\"Username\"\n                ng-model=\"$ctrl.formData.username\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <textarea class=\"form-control form-control-lg\"\n                rows=\"8\"\n                placeholder=\"Short bio about you\"\n                ng-model=\"$ctrl.formData.bio\">\n              </textarea>\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"email\"\n                placeholder=\"Email\"\n                ng-model=\"$ctrl.formData.email\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"password\"\n                placeholder=\"New Password\"\n                ng-model=\"$ctrl.formData.password\" />\n            </fieldset>\n\n            <button class=\"btn btn-lg btn-primary pull-xs-right\"\n              type=\"submit\">\n              Update Settings\n            </button>\n\n          </fieldset>\n        </form>\n\n        <!-- Line break for logout button -->\n        <hr />\n\n        <button class=\"btn btn-outline-danger\"\n          ng-click=\"$ctrl.logout()\">\n          Or click here to logout.\n        </button>\n\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("jewels/comments.html","<div class=\"card\">\n    <div class=\"card-block\">\n      <p class=\"card-text\" ng-bind=\"::$ctrl.data.body\"></p>\n    </div>\n    <div class=\"card-footer\">\n      <a class=\"comment-author\" ui-sref=\"app.profile.main({ username: $ctrl.data.author.username })\">\n        <img ng-src=\"{{::$ctrl.data.author.image}}\" class=\"comment-author-img\" />\n      </a>\n      &nbsp;\n      <a class=\"comment-author\" ui-sref=\"app.profile.main({ username: $ctrl.data.author.username })\"\n        ng-bind=\"::$ctrl.data.author.username\">\n      </a>\n      <span class=\"date-posted\" ng-bind=\"::$ctrl.data.createdAt | date: \'longDate\'\">\n      </span>\n      <span class=\"mod-options\" ng-show=\"$ctrl.canModify\">\n        <i class=\"ion-trash-a\" ng-click=\"$ctrl.deleteCm()\"></i>\n      </span>\n    </div>\n  </div>\n  ");
$templateCache.put("jewels/jewels-actions.html","<span ng-show=\"$ctrl.canModify\">\n  <a class=\"btn btn-sm btn-outline-secondary\" ui-sref=\"app.editor({ slug: $ctrl.jewels.slug })\">\n    <i class=\"ion-edit\"></i> Edit jewel\n  </a>\n\n  <button class=\"btn btn-sm btn-outline-danger\" ng-class=\"{disabled: $ctrl.isDeleting}\" ng-click=\"$ctrl.deleteJewel()\">\n    <i class=\"ion-trash-a\"></i> Delete jewel\n  </button>\n</span>\n\n<span ng-hide=\"$ctrl.canModify\">\n  <span>AUTHOR:</span><a class=\"comment-owner\" ui-sref=\"app.profile.main({ username: $ctrl.jewel.owner.username })\"\n    ng-bind=\"$ctrl.jewel.owner.username\">\n  </a>\n\n  <follow-btn user=\"$ctrl.jewel.owner\"></follow-btn>\n  <favorite-btn jewel=\"$ctrl.jewel\">\n    {{ $ctrl.jewel.favorited ? \'Unfavorite\' : \'Favorite\' }} jewel\n    <span class=\"counter\">({{$ctrl.jewel.favoritesCount}})</span>\n  </favorite-btn>\n</span");
$templateCache.put("jewels/jewels.html","<div class=\"home-page\">\n    <!-- Splash banner that only shows when not logged in -->\n    <div class=\"banner\" show-authed=\"false\">\n        <div class=\"container\">\n            <h1 class=\"logo-font\" ng-bind=\"::$ctrl.appName | lowercase\"></h1>\n            <p>DIARIO ONLINE LÍDER REGIONAL</p>\n        </div>\n    </div>\n\n    <div class=\"container page\">\n        <div class=\"row\">\n\n\n            <!-- Main view - contains tabs & jewels list -->\n            <div class=\"col-md-9\">\n                <!-- Tabs for toggling between feed, jewels lists -->\n                <div class=\"feed-toggle\">\n                    <ul class=\"nav nav-pills outline-active\">\n\n                        <li class=\"nav-item\" show-authed=\"true\">\n                            <a href=\"\" class=\"nav-link\" ng-class=\"{ active: $ctrl.listConfig.type === \'feed\' }\"\n                                ng-click=\"$ctrl.changeList({ type: \'feed\' })\">\n                                Your Feed\n                            </a>\n                        </li>\n\n                        <li class=\"nav-item\">\n                            <a href=\"\" class=\"nav-link\"\n                                ng-class=\"{ active: $ctrl.listConfig.type === \'all\' && !$ctrl.listConfig.filters }\"\n                                ng-click=\"$ctrl.changeList({ type: \'all\' })\">\n                                Global Feed\n                            </a>\n                        </li>\n\n                        <li class=\"nav-item\" ng-show=\"$ctrl.listConfig.filters.tag\">\n                            <a href=\"\" class=\"nav-link active\">\n                                <i class=\"ion-pound\"></i> {{$ctrl.listConfig.filters.tag}}\n                            </a>\n                        </li>\n\n                    </ul>\n                </div>\n\n                <!-- List the current jewel -->\n\n\n                <jewels-list limit=3 list-config=\"$ctrl.listConfig\">\n                </jewels-list>\n\n\n\n\n            </div>\n\n\n            <!-- Sidebar where popular tags are listed -->\n            <div class=\"col-md-3\">\n                <div class=\"sidebar\">\n\n                    <p>Popular Tags</p>\n\n                    <div class=\"tag-list\" ng-show=\"$ctrl.tags\">\n                        <a href=\"\" class=\"tag-default tag-pill\"\n                            ng-click=\"$ctrl.changeList({ type: \'all\', filters: { tag: tagName } })\"\n                            ng-repeat=\"tagName in $ctrl.tags\" ng-bind=\"tagName\">\n                        </a>\n                    </div>\n\n                    <div ng-show=\"!$ctrl.tagsLoaded\">\n                        Loading tags...\n                    </div>\n\n                    <div class=\"post-preview\" ng-show=\"$ctrl.tagsLoaded && !$ctrl.tags.length\">\n                        No tags are here... yet.\n                    </div>\n\n                </div>\n            </div>\n\n            <!-- End the row & container divs -->\n        </div>\n    </div>\n\n</div>");
$templateCache.put("jewels/jewelsdetails.html","<div class=\"article-page\">\n\n    <!-- Banner for jewel title, action buttons -->\n    <div class=\"banner\">\n        <div class=\"container\">\n            <div class=\"info\">\n                <span class=\"date\" ng-bind=\"$ctrl.jewel.createdAt | date: \'longDate\' \">\n                </span>\n                <h1>{{$ctrl.jewel.name}}</h1>\n            </div>\n\n\n            <!-- Show owner info + favorite & follow buttons -->\n\n            <!-- Show owner info + favorite & follow buttons -->\n            <jewels-actions jewel=\"$ctrl.jewel\">\n            </jewels-actions>\n\n\n        </div>\n    </div>\n    <!-- //Banner for jewels title, action buttons -->\n\n\n    <!-- Main view. Contains jewels html and comments -->\n    <div class=\"container page\">\n\n        <!-- Article\'s HTML & tags rendered here -->\n        <div class=\"row article-content\">\n            <div class=\"col-xs-12\">\n                <jewel-detail jewel=\"$ctrl.jewel\"></jewel-detail>\n            </div>\n        </div>\n\n        <hr />\n        <!-- Comments section -->\n        <div class=\"row\">\n            <div class=\"col-xs-12 col-md-8 offset-md-2\">\n\n                <div show-authed=\"true\">\n                    <list-errors from=\"$crl.commentForm.errors\"></list-errors>\n                    <form class=\"card comment-form\" ng-submit=\"$ctrl.addComment()\">\n                        <fieldset ng-disabled=\"$ctrl.commentForm.isSubmitting\">\n                            <div class=\"card-block\">\n                                <textarea class=\"form-control\" placeholder=\"Write a comment...\" rows=\"3\"\n                                    ng-model=\"$ctrl.commentForm.body\"></textarea>\n                            </div>\n                            <div class=\"card-footer\">\n                                <img ng-src=\"{{::$ctrl.currentUser.image}}\" class=\"comment-owner-img\" />\n\n                                <button class=\"btn btn-sm btn-primary\" type=\"submit\">\n                                    Post Comment\n                                </button>\n                                <i class=\"fa fa-comment\" style=\"font-size: 20px;\"> {{$ctrl.jewel.commentsCount}}</i>\n                            </fieldset>\n                    </form>\n                </div>\n\n\n                <div show-authed=\"false\">\n                    <a ui-sref=\"app.login\">Sign in</a> or <a ui-sref=\"app.register\">sign up</a> to add comments on this\n                    article.\n                </div>\n\n\n                <comments ng-repeat=\"cmt in $ctrl.comments\" data=\"cmt\" jewel=\"$ctrl.jewel\"\n                    delete-Cm=\"$ctrl.deleteComment(cmt.id, $index)\">\n                </comments>\n\n\n            </div>\n        </div>\n\n        <!--// Comments section -->\n\n    </div>\n    <!-- //Main view. Contains news html and comments -->\n\n\n\n</div>");
$templateCache.put("components/article-helpers/article-list.html","<article-preview\n  article=\"article\"\n  ng-repeat=\"article in $ctrl.list\">\n</article-preview>\n\n<div class=\"article-preview\"\n  ng-hide=\"!$ctrl.loading\">\n  Loading articles...\n</div>\n\n<div class=\"article-preview\"\n  ng-show=\"!$ctrl.loading && !$ctrl.list.length\">\n  No articles are here... yet.\n</div>\n\n<list-pagination\n total-pages=\"$ctrl.listConfig.totalPages\"\n current-page=\"$ctrl.listConfig.currentPage\"\n ng-hide=\"$ctrl.listConfig.totalPages <= 1\">\n</list-pagination>\n");
$templateCache.put("components/article-helpers/article-meta.html","<div class=\"article-meta\">\n  <a ui-sref=\"app.profile.main({ username:$ctrl.article.author.username })\">\n    <img ng-src=\"{{$ctrl.article.author.image}}\" />\n  </a>\n\n  <div class=\"info\">\n    <a class=\"author\"\n      ui-sref=\"app.profile.main({ username:$ctrl.article.author.username })\"\n      ng-bind=\"$ctrl.article.author.username\">\n    </a>\n    <span class=\"date\"\n      ng-bind=\"$ctrl.article.createdAt | date: \'longDate\' \">\n    </span>\n  </div>\n\n  <ng-transclude></ng-transclude>\n</div>\n");
$templateCache.put("components/article-helpers/article-preview.html","<div class=\"article-preview\">\n  <article-meta article=\"$ctrl.article\">\n    <favorite-btn\n      article=\"$ctrl.article\"\n      class=\"pull-xs-right\">\n      {{$ctrl.article.favoritesCount}}\n    </favorite-btn>\n  </article-meta>\n\n  <a ui-sref=\"app.article({ slug: $ctrl.article.slug })\" class=\"preview-link\">\n    <h1 ng-bind=\"$ctrl.article.title\"></h1>\n    <p ng-bind=\"$ctrl.article.description\"></p>\n    <span>Read more...</span>\n    <ul class=\"tag-list\">\n      <li class=\"tag-default tag-pill tag-outline\"\n        ng-repeat=\"tag in $ctrl.article.tagList\">\n        {{tag}}\n      </li>\n    </ul>\n  </a>\n</div>\n");
$templateCache.put("components/article-helpers/list-pagination.html","<nav>\n  <ul class=\"pagination\">\n\n    <li class=\"page-item\"\n      ng-class=\"{active: pageNumber === $ctrl.currentPage }\"\n      ng-repeat=\"pageNumber in $ctrl.pageRange($ctrl.totalPages)\"\n      ng-click=\"$ctrl.changePage(pageNumber)\">\n\n      <a class=\"page-link\" href=\"\">{{ pageNumber }}</a>\n\n    </li>\n\n  </ul>\n</nav>\n");
$templateCache.put("components/buttons/favorite-btn.html","<button class=\"btn btn-sm\"\n  ng-class=\"{ \'disabled\' : $ctrl.isSubmitting,\n              \'btn-outline-primary\': !$ctrl.jewel.favorited,\n              \'btn-primary\': $ctrl.jewel.favorited }\"\n  ng-click=\"$ctrl.submit($ctrl.jewel._id)\">\n  <i class=\"ion-heart\"></i> <ng-transclude></ng-transclude>\n</button>\n");
$templateCache.put("components/buttons/follow-btn.html","<button\n  class=\"btn btn-sm action-btn\"\n  ng-class=\"{ \'disabled\': $ctrl.isSubmitting,\n              \'btn-outline-secondary\': !$ctrl.user.following,\n              \'btn-secondary\': $ctrl.user.following }\"\n  ng-click=\"$ctrl.submit()\">\n  <i class=\"ion-plus-round\"></i>\n  &nbsp;\n  {{$ctrl.user.followersCount}} {{ $ctrl.user.following ? \'Unfollow\' : \'Follow\' }} {{ $ctrl.user.username }} \n</button>\n");
$templateCache.put("components/jewels-helpers/jewel-preview.html","<div class=\"jewel-preview\">\n    <div jewel=\"$ctrl.jewel\">\n        <favorite-btn \n        jewel=\"$ctrl.jewel\" class=\"pull-xs-right \">\n            {{$ctrl.jewel.favoritesCount}}\n        </favorite-btn>\n    </div>\n\n    <a ui-sref=\"app.detailsJewels({slug:$ctrl.jewel.slug})\" class=\"preview-link\">\n        <h1 ng-bind=\"$ctrl.jewel.name\"></h1>\n        <p ng-bind=\"$ctrl.jewel.price\"></p>\n        <span>Read more...</span>\n        <ul class=\"tag-list\">\n            <li class=\"tag-default tag-pill tag-outline\"\n              ng-repeat=\"tag in $ctrl.jewel.tagList\">\n              {{tag}}\n            </li>\n          </ul>\n    </a>\n\n\n\n\n</div>\n<hr>");
$templateCache.put("components/jewels-helpers/jewel_detail.html","<p id=\"brand\">{{$ctrl.jewel.brand}}</p>\n<p> {{$ctrl.jewel.type}}</p>\n<p id=\"price\">{{$ctrl.jewel.price}}</p>\n\n");
$templateCache.put("components/jewels-helpers/jewels-list.html","<jewel-preview jewel=\"jewel\" ng-repeat=\"jewel in $ctrl.list\">\n</jewel-preview>\n\n\n<div class=\"jewel-preview\" ng-hide=\"!$ctrl.loading\">\n    Cargando Noticias...\n</div>\n\n<div class=\"jewel-preview\" ng-show=\"!$ctrl.loading && !$ctrl.list.length\">\n    Aún no hay noticias...\n</div>\n\n<list-pagination total-pages=\"$ctrl.listConfig.totalPages\" current-page=\"$ctrl.listConfig.currentPage\" ng-hide=\"$ctrl.listConfig.totalPages <= 1\">\n</list-pagination>");
$templateCache.put("components/jewels-helpers/jewels_filters.html","<div class=\"container\">\n  <div class=\"row\">\n      <div class=\"col-sm-4\"  ng-repeat=\"filter in $ctrl.filters\">\n        <!-- <div   class=\"col-sm-4\"   ng-repeat=\"fil in filter\"> -->\n\n              <img ui-sref=\"app.jewels({filter:[filter.filter, filter.hwfilter]})\" ng-src= \"{{filter.img}}\"/>\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            <!-- </div> -->\n            <br/><br/><br/><br/><br/><br/><br/>\n          </div>\n  </div>\n\n</div>");
$templateCache.put("components/jewels-helpers/list-pagination.html","<nav>\n    <ul class=\"pagination\">\n  \n      <li class=\"page-item\"\n        ng-class=\"{active: pageNumber === $ctrl.currentPage }\"\n        ng-repeat=\"pageNumber in $ctrl.pageRange($ctrl.totalPages)\"\n        ng-click=\"$ctrl.changePage(pageNumber)\">\n  \n        <a class=\"page-link\" href=\"\">{{ pageNumber }}</a>\n  \n      </li>\n  \n    </ul>\n  </nav>");
$templateCache.put("components/slider-helpers/slider.html","\n<div style = \"height: 400px;\">\n    <div uib-carousel active = \"active\" interval = \"$ctrl.myInterval\" no-wrap = \"$ctrl.noWrapSlides\">\n        <div uib-slide ng-repeat = \"slide in $ctrl.slides track by slide.id\" index = \"slide.id\" style = \"height: 400px;\">\n            <img ng-src = \"{{slide.image}}\" class = \"img-fluid\" style = \"filter:blur(2px);\">\n            <div class = \"carousel-caption\" style = \"padding-bottom: 100px;\">\n                <h2>{{slide.text}}</h2>\n            </div>\n        </div>\n    </div>\n</div>");}]);