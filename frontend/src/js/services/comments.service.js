export default class Comments {
  constructor(AppConstants, $http) {
      'ngInject';

      this._AppConstants = AppConstants;
      this._$http = $http;
  }


  // Add a comment to an jewel
  add(slug, payload) {
      return this._$http({
          url: `${this._AppConstants.api}/jewels/${slug}/comments`,
          method: 'POST',
          data: { comment: { body: payload } }
      }).then((res) => res.data.comment);

  }

  getAll(slug) {
      return this._$http({
          url: `${this._AppConstants.api}/jewels/${slug}/comments`,
          method: 'GET',
      }).then((res) => res.data.comments);

  }

  //Destroy the comment
  destroy(commentId, jewelSlug) {
      return this._$http({
          url: `${this._AppConstants.api}/jewels/${jewelSlug}/comments/${commentId}`,
          method: 'DELETE',
      });
  }

}