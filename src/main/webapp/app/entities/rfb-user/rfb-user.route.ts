import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RfbUserComponent } from './rfb-user.component';
import { RfbUserDetailComponent } from './rfb-user-detail.component';
import { RfbUserPopupComponent } from './rfb-user-dialog.component';
import { RfbUserDeletePopupComponent } from './rfb-user-delete-dialog.component';

import { Principal } from '../../shared';

export const rfbUserRoute: Routes = [
    {
        path: 'rfb-user',
        component: RfbUserComponent,
        data: {
            authorities: ['ROLE_RUNNER'],
            pageTitle: 'RfbUsers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rfb-user/:id',
        component: RfbUserDetailComponent,
        data: {
            authorities: ['ROLE_RUNNER'],
            pageTitle: 'RfbUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rfbUserPopupRoute: Routes = [
    {
        path: 'rfb-user-new',
        component: RfbUserPopupComponent,
        data: {
            authorities: ['ROLE_RUNNER'],
            pageTitle: 'RfbUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rfb-user/:id/edit',
        component: RfbUserPopupComponent,
        data: {
            authorities: ['ROLE_RUNNER'],
            pageTitle: 'RfbUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rfb-user/:id/delete',
        component: RfbUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_RUNNER'],
            pageTitle: 'RfbUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
