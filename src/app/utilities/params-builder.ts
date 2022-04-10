import { HttpParams } from "@angular/common/http";

export class ParamsBuilder {

    static build(obj: object): HttpParams {
        let params = new HttpParams();
        Object.entries(obj).forEach(value => {
            if (value[1]) {
                params = params.set(value[0], value[1]);
            }
        });
        return params;
    }

}