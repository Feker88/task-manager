import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApiIdentification } from "../../services/api-identification";
import {Login} from "./login"
import {TestBed} from "@angular/core/testing"
import { provideRouter, Router } from "@angular/router";
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideLocationMocks } from '@angular/common/testing';
import {ComponentFixture} from '@angular/core/testing'
import { of } from "rxjs";

describe('login Component' ,() => {
    
    let component: Login;
    let fixture: ComponentFixture<Login>;
    let apiService: jasmine.SpyObj<ApiIdentification>;
    let router: Router;

    // to run before each test so every test have a fresh component
    // jasmine wait for the testbed  set up to finish before starting the test
    beforeEach(async() => {
        //localStorage.clear() ?? 

        //Recreate the login method to a fake one: test should not callt the real API.
        const apiSpy = jasmine.createSpyObj ('api-identification',['login'])
        //testBed : appeler le  module de test et le configurer, à faire pour chaque composant
        await TestBed.configureTestingModule({
                imports:[Login],
                providers: [
                    // give the apispy object instead of the real servide 
                    {provide:ApiIdentification, useValue: apiSpy},
                    //Login component need Rourter
                    provideRouter([]),
                    //replaces the browser's URL handling with a fake,
                    // so navigation in a test doesn't change the real address bar.
                    provideLocationMocks(),
                    //provides HttpClient, because your component imports it.
                     //intercepts HTTP calls so none reach the network.
                    provideHttpClient(withInterceptorsFromDi()),
                    provideHttpClientTesting(),
                ]
        }).compileComponents();
        fixture= TestBed.createComponent(Login);
        //Keeps a reference to the component class so your tests can read and set its properties, such as component.loginForm.
        component = fixture.componentInstance;
        //apiservice + router permet de récupérer tous les services en question . 
        apiService = TestBed.inject(ApiIdentification) as jasmine.SpyObj<ApiIdentification>
        router = TestBed.inject(Router);
    });

    it('should create the component' , () => {
        expect(component).toBeTruthy();
        });

     it('should have invalid form when empty' , () => {
        expect(component.loginForm.valid).toBeFalse();
    });

     it('it should call API and navigate success' , () => {
        // accessToken : same proprety stored by localstorage
        const mockresponse = {accessToken: 'abc1523'}
        apiService.login.and.returnValue(of(mockresponse));
        spyOn(router,'navigate');

        component.loginForm.setValue({
            email:'testunit@test.fr',
            password: 'password'
        });
        component.onSubmit();
        expect(apiService.login).toHaveBeenCalledOnceWith({
            email:'testunit@test.fr',
            password: 'password'
        })

        //Expected 'undefined' to be 'abc1523'.
        expect(localStorage.getItem('token')).toBe('abc1523');

        expect(router.navigate).toHaveBeenCalledOnceWith(['tasks']);

        expect(component.error()).toBe('');
    });

});