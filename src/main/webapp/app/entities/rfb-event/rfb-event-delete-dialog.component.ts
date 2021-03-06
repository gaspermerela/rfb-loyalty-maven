import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { RfbEvent } from './rfb-event.model';
import { RfbEventPopupService } from './rfb-event-popup.service';
import { RfbEventService } from './rfb-event.service';

@Component({
    selector: 'jhi-rfb-event-delete-dialog',
    templateUrl: './rfb-event-delete-dialog.component.html'
})
export class RfbEventDeleteDialogComponent {

    rfbEvent: RfbEvent;

    constructor(
        private rfbEventService: RfbEventService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rfbEventService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rfbEventListModification',
                content: 'Deleted an rfbEvent'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success(`A Event is deleted with identifier ${id}`, null, null);
    }
}

@Component({
    selector: 'jhi-rfb-event-delete-popup',
    template: ''
})
export class RfbEventDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rfbEventPopupService: RfbEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.rfbEventPopupService
                .open(RfbEventDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
