import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ResourceService } from './resource.service';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly resourceService: ResourceService,
  ) {}

  async postApi(data, url, key) {
    const body = data;
    const { API_URL } = this.resourceService.getEnviroments();
    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    };
    const response = this.httpService
      .post(`${API_URL}/${url}`, body, { headers })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return response.data;
        }),
      );

    return await lastValueFrom(response);
  }

  async getApi(url, key) {
    const { API_URL } = this.resourceService.getEnviroments();
    const data = this.httpService.get(`${API_URL}/${url}/${key}`).pipe(
      map((response: AxiosResponse<any>) => {
        return response.data;
      }),
    );
    return await lastValueFrom(data);
  }
}
