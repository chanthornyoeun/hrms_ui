import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PrefixInterceptor } from "./prefix.interceptor";
import { TokenInterceptor } from "./token.interceptor";

export const HTTP_INTERCEPTOR_PROVIDER = [
    addInterceptor(PrefixInterceptor),
    addInterceptor(TokenInterceptor)
];

function addInterceptor<T>(interceptor: T) {
    return {
        provide: HTTP_INTERCEPTORS,
        useClass: interceptor,
        multi: true
    }
}