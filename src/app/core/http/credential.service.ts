import { Injectable } from "@angular/core";

interface Credential {
    id: number;
    username: string;
    token: string;
}

@Injectable({providedIn: 'root'})
export class CredentialService {

    private CREDENTIAL_KEY = 'credential';
    
    constructor() {
    }

    isAuthenticated(): boolean {
        return !!this.getCredential();
    }

    setCredential(credential: Credential): void {
        localStorage.setItem(this.CREDENTIAL_KEY, JSON.stringify(credential));
    }

    getCredential(): Credential {
        return JSON.parse(localStorage.getItem(this.CREDENTIAL_KEY)!);
    }

    removeCredential(): void {
        localStorage.removeItem(this.CREDENTIAL_KEY);
    }
    
}