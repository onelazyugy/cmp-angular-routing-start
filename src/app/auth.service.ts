// fake auth service, but in reality, it should handle login and logout user
export class AuthService {
    loggedIn = false;

    // simulating call to backend to check if user is authenticated or not
    isAuthenticated() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.loggedIn);
            }, 800);
        });
        return promise;
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}
