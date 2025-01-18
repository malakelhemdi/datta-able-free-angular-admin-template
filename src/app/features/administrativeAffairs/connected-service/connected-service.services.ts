import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';

@Injectable()
export class ConnectedServiceServices {
  url: string | undefined;

  constructor(private appConfig: AppConfig) {
    this.url = this.appConfig.defaultUrl;
  }
}
