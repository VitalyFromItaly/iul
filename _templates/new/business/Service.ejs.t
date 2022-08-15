---
to: business/<%= section %>/<%= name %>/Service.ts
---
import { IService } from './Domain';
import { ISwagger } from '~/@types/domain';

export default class Service implements IService {
  constructor(private swagger: ISwagger) {}

  async read(documentId: number): Promise<any> {
    const { data } = await this.swagger.document.preview(documentId);
    return data.data;
  }
}
