export default class Cities {
    constructor(AppConstants, $http, $q, GraphQLClient) {
      'ngInject';

  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
  
    }
  
    /**
     * RETURN ALL OPINIONS
     */
    query() {
      let query = `
            {
              cities{
                slug
                name
                shop{
                  slug
                  name
                }
              }
            }
          `;
      return this._GQL.get(query);
    }
  
  
    /**
     * 
     * RETURN ONE OPINION
     * 
     */
  
    queryOne(slug) {
      let query = `
       {
         city(slug:"${slug}") {
        slug
        name
        shop{
          slug
          name
        }
      }
    }
       `;
       return this._GQL.get(query);
    }
  
  
  
  
  
    // destroy(slug) {
    //   return this._$http({
    //     url: this._AppConstants.api + '/opinions/' + slug,
    //     method: 'DELETE'
    //   })
    // }
  
    // save(opinion) {
    //   let request = {};
  
    //   if (opinion.slug) {
    //     request.url = `${this._AppConstants.api}/opinions/${opinion.slug}`;
    //     request.method = 'PUT';
    //     delete opinion.slug;
  
    //   } else {
    //     request.url = `${this._AppConstants.api}/opinions/`;
    //     request.method = 'POST';
    //   }
  
    //   request.data = { opinion: opinion };
  
    //   return this._$http(request).then((res) => res.data.opinion);
    // }
  
  
  
  
  }