import { TResult } from './Domain';
import { context } from '~/core/context';

export default class Model {
  setAttributeImages(rawResult: TResult[]): TResult[] {
    if (!rawResult) {
      return rawResult;
    }
    const { baseUrl, port } = context.$config;
    const url = `${baseUrl}:${port}/res_png/`;
    rawResult.forEach((result) => {
      const { attributes } = result;
      if (attributes) {
        result.attributes.forEach((attr) => {
          attr.png = result.png;
          attr.res_id = result.res_id;
          attr.urlImage = null;
          if (attr.attr_type_id === -1 && result.png) {
            const imgUrl = url + result.res_id;
            attr.urlImage = imgUrl;
            attr.attr_value = imgUrl;
          }
        });
      }
    });
    return rawResult;
  }
}
