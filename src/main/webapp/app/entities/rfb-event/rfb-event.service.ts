import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { RfbEvent } from './rfb-event.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RfbEventService {

    private resourceUrl = 'api/rfb-events';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rfbEvent: RfbEvent): Observable<RfbEvent> {
        const copy = this.convert(rfbEvent);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(rfbEvent: RfbEvent): Observable<RfbEvent> {
        const copy = this.convert(rfbEvent);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<RfbEvent> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.eventDate = this.dateUtils
            .convertLocalDateFromServer(entity.eventDate);
    }

    private convert(rfbEvent: RfbEvent): RfbEvent {
        const copy: RfbEvent = Object.assign({}, rfbEvent);
        copy.eventDate = this.dateUtils
            .convertLocalDateToServer(rfbEvent.eventDate);
        return copy;
    }
}
