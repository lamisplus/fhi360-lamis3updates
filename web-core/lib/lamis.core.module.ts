import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { DateTimeConfig, SERVER_API_URL_CONFIG, ServerApiUrlConfig } from './app.constants';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { RxStompConfig } from './services/rx-stomp.config';
import { LamisSharedModule } from './shared/lamis-shared.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LamisSharedModule
    ],
    exports: [
        LamisSharedModule
    ],
    providers: []
})
export class LamisCoreModule {
    static forRoot(serverApiUrlConfig: ServerApiUrlConfig, dateTimeConfig?: DateTimeConfig): ModuleWithProviders {
        // MomentDateFormat.DATE_FORMAT = dateTimeConfig.DATE_FORMAT;
        return {
            ngModule: LamisCoreModule,
            providers: [
                AuthExpiredInterceptor,
                AuthInterceptor,
                ErrorHandlerInterceptor,
                NotificationInterceptor,
                {
                    provide: SERVER_API_URL_CONFIG,
                    useValue: serverApiUrlConfig
                },
                {
                    provide: InjectableRxStompConfig,
                    useValue: RxStompConfig
                },
                {
                    provide: RxStompService,
                    useFactory: rxStompServiceFactory,
                    deps: [InjectableRxStompConfig]
                }
            ]
        };
    }
}
