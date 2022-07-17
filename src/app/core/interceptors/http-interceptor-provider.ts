import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PrefixInterceptor } from "./prefix.interceptor";
import { TokenInterceptor } from "./token.interceptor";
import { GlobalErrorHandlerInterceptor } from "./global-error-handler.interceptor";

export const HTTP_INTERCEPTOR_PROVIDER = [
    addInterceptor(TokenInterceptor),
    addInterceptor(PrefixInterceptor),
    addInterceptor(GlobalErrorHandlerInterceptor)
];

function addInterceptor<T>(interceptor: T) {
    return {
        provide: HTTP_INTERCEPTORS,
        useClass: interceptor,
        multi: true
    }
}
