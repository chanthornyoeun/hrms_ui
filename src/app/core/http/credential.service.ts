import { Injectable } from "@angular/core";

export interface Credential {
    id: number;
    username: string;
    token: string;
    employeeId: number;
    profile: string;
}

@Injectable({ providedIn: 'root' })
export class CredentialService {

    private CREDENTIAL_KEY = 'credential';

    constructor() {
    }

    isAuthenticated(): boolean {
        return !!this.getCredential();
    }

    setCredential(credential: Credential, remember: boolean): void {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(this.CREDENTIAL_KEY, JSON.stringify(credential));
    }

    getCredential(): Credential {
        const credentail: string = (sessionStorage.getItem(this.CREDENTIAL_KEY) || localStorage.getItem(this.CREDENTIAL_KEY))!;
        return JSON.parse(credentail);
    }

    removeCredential(): void {
        localStorage.removeItem(this.CREDENTIAL_KEY);
        sessionStorage.removeItem(this.CREDENTIAL_KEY);
    }

}
