import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.route";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withComponentInputBinding(), 
        withRouterConfig({
            paramsInheritanceStrategy: "always"
        }))]
}