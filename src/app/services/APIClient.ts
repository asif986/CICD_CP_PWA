import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {WebServer} from './WebServer';
import {ToastController} from '@ionic/angular';
import 'rxjs/add/operator/map';
import {from} from 'rxjs/observable/from';
import {Observable} from 'rxjs';
import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class APIClient {
   //constructor(private nativeHttp: HTTP, public toastController: ToastController, public  webServer: WebServer) { }
constructor(  public http: HttpClient , public toastController: ToastController, public  webServer: WebServer) { }

/*Call Get & Post Data From With Cors*/
// public get(urlWithQueryParams: string): Observable<any> {
//           console.log(urlWithQueryParams);
//           return from(this.nativeHttp.get(urlWithQueryParams, {}, {})).map((res: any) => {
//             return {
//                 json() {
//                     return JSON.parse(res.data);
//                 },
//                 text(ignoredEncodingHint) {
//                     return res.data.toString();
//                 },
//                 body: this.parseBodyFromNativeHttpResponse(res,{}),
//                 headers: new Headers(res.headers)
//             };
//         });

// }

// public post(url: string, postData: any): Observable<any> {

//         return from(this.nativeHttp.post(url, postData,{})).map((res: any) => {
//             return {
//                 json() {
//                     return JSON.parse(res.data);
//                 },
//                 text(ignoredEncodingHint) {
//                     return res.data.toString();
//                 },
//                 body: this.parseBodyFromNativeHttpResponse(res,{}),
//                 headers: new Headers(res.headers)
//             };
//         });

// }

// private parseBodyFromNativeHttpResponse(res, options) {
//     if (res.data) {
//         if (options === undefined || options.responseType === undefined || options.responseType === 'json') {
//             return JSON.parse(res.data);
//         }
//         return res.data;
//     }
//     return null;
// }

// private parseHeadersForNativeHttp(options) {
//     let headers: Headers | {} | null = options !== undefined && options.headers !== undefined ? options.headers : {};
//     if (headers instanceof Headers) {
//         let newHeaders: any = {};
//         headers.forEach(function (value, name) {
//             newHeaders[name.toString()] = value.toString();
//         });
//         headers = newHeaders;
//     }
//     return headers;
// }

// Without NativeHttp 
// public get(urlWithQueryParams: string) {
//     const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
//     const options = {
//         headers: httpHeaders,
//         observe: 'response' as 'body',
//     };
//     return this.http.get<any>(urlWithQueryParams, options)
//         .map(response => {
//             return response;
//         }, error => {
//             // this.authService.hideLoader();
//             console.log(error);
//         });
// }


// public post(url: string, postData: any) {
//     const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
//     // httpHeaders = new HttpHeaders().set('Authorization', localStorage.getItem('Auth'));
//     const options = {
//         headers: httpHeaders,
//         observe: 'response' as 'body',
//     };

//     return this.http.post<any>(url, postData, options);
// }

//}


//   constructor(  public http: HttpClient , public toastController: ToastController, public  webServer: WebServer) { }

//   /*Get Data*/
  get(urlWithQueryParams: string) {
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


   /*   httpHeaders.set('Content-Type', 'application/json');
      httpHeaders.set('Accept', 'application/json');

      httpHeaders.set('Access-Control-Allow-Origin', 'http://192.168.1.18:8001');*/

    const options = {
      headers: httpHeaders,
      observe: 'response' as 'body',
    };
    return this.http.get<any>(urlWithQueryParams, options)
        .map(response => {
          return response;
        }, error => {
        // this.authService.hideLoader();
        console.log(error);
    });
  }

  /*Post Data*/
    post(url: string, postData: any) {
        const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
      //  httpHeaders.set('Content-Type', 'application/json');
      //   httpHeaders.set('Accept', 'application/json');

        //httpHeaders.set('Access-Control-Allow-Origin', 'http://vjpartners.co.in/ongoing/v7_new_merge/vj-sales-modules/public/api/');
        // httpHeaders = new HttpHeaders().set('Authorization', localStorage.getItem('Auth'));
        const options = {
            headers: httpHeaders,
            observe: 'response' as 'body',
        };

        return this.http.post<any>(url, postData, options);
    }


}
