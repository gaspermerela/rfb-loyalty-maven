import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { RfbEventAttendance } from './rfb-event-attendance.model';
import { RfbEventAttendancePopupService } from './rfb-event-attendance-popup.service';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';

@Component({
    selector: 'jhi-rfb-event-attendance-delete-dialog',
    templateUrl: './rfb-event-attendance-delete-dialog.component.html'
})
export class RfbEventAttendanceDeleteDialogComponent {

    rfbEventAttendance: RfbEventAttendance;

    constructor(
        private rfbEventAttendanceService: RfbEventAttendanceService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rfbEventAttendanceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rfbEventAttendanceListModification',
                content: 'Deleted an rfbEventAttendance'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success(`A Event Attendance is deleted with identifier ${id}`, null, null);
    }
}

@Component({
    selector: 'jhi-rfb-event-attendance-delete-popup',
    template: ''
})
export class RfbEventAttendanceDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rfbEventAttendancePopupService: RfbEventAttendancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.rfbEventAttendancePopupService
                .open(RfbEventAttendanceDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
