import { InjectionToken } from '@angular/core';

export const SERVER_API_URL_CONFIG = new InjectionToken<ServerApiUrlConfig>('SERVER_API_URL_CONFIG');

export interface ServerApiUrlConfig {
    SERVER_API_URL: string;
}

export interface DateTimeConfig {
    DATE_FORMAT: string;
    TIME_FORMAT?: string;
}
