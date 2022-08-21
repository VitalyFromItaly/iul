import { TResult } from './Domain';

export default class Model {
  setAttributeImages(rawResult: TResult[]): TResult[] {
    if (!rawResult) {
      return rawResult;
    }

    rawResult.forEach((result) => {
      const { attributes } = result;
      if (attributes) {
        result.attributes.forEach((attr) => {
          attr.png = result.png;
          attr.res_id = result.res_id;
        });
      }
    });
    return rawResult;
  }
}
