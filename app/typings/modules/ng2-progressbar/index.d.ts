// Generated by typings
// Source: node_modules/ng2-progressbar/components/progress/progress.component.d.ts
declare module '~ng2-progressbar/components/progress/progress.component' {
import { OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { NgProgressService } from '~ng2-progressbar/service/progress.service';
export class ProgressComponent implements OnChanges, OnDestroy {
    progress: NgProgressService;
    /** Progress options  */
    ease: string;
    positionUsing: string;
    showSpinner: boolean;
    direction: string;
    color: string;
    thick: boolean;
    maximum: number;
    minimum: number;
    speed: number;
    trickleSpeed: number;
    /** Start/Stop Progressbar */
    toggle: any;
    constructor(progress: NgProgressService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
}
declare module 'ng2-progressbar/components/progress/progress.component' {
export * from '~ng2-progressbar/components/progress/progress.component';
}

// Generated by typings
// Source: node_modules/ng2-progressbar/service/progress.service.d.ts
declare module '~ng2-progressbar/service/progress.service' {
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeWhile';
export class NgProgressService {
    progress: number;
    maximum: number;
    minimum: number;
    speed: number;
    trickleSpeed: number;
    /** Progress state */
    state: Subject<{}>;
    /** Trickling stream */
    trickling: Subject<{}>;
    constructor();
    /** Start */
    start(): void;
    /** Done */
    done(): void;
    /** Increment Progress */
    inc(amount?: any): void;
    /** Set progress state */
    set(n: any): void;
    /** Is progress started*/
    isStarted(): boolean;
    /** Update Progressbar State */
    updateState(progress: any, active: any): void;
}
}
declare module 'ng2-progressbar/service/progress.service' {
export * from '~ng2-progressbar/service/progress.service';
}

// Generated by typings
// Source: node_modules/ng2-progressbar/service/browser-xhr.provider.d.ts
declare module '~ng2-progressbar/service/browser-xhr.provider' {
import { BrowserXhr } from '@angular/http';
import { NgProgressService } from '~ng2-progressbar/service/progress.service';
export class NgProgressCustomBrowserXhr extends BrowserXhr {
    private service;
    currentRequest: number;
    constructor(service: NgProgressService);
    build(): any;
    private done();
}
}
declare module 'ng2-progressbar/service/browser-xhr.provider' {
export * from '~ng2-progressbar/service/browser-xhr.provider';
}

// Generated by typings
// Source: node_modules/ng2-progressbar/progress.module.d.ts
declare module '~ng2-progressbar/progress.module' {
import { ProgressComponent } from '~ng2-progressbar/components/progress/progress.component';
import { NgProgressService } from '~ng2-progressbar/service/progress.service';
import { NgProgressCustomBrowserXhr } from '~ng2-progressbar/service/browser-xhr.provider';
export class NgProgressModule {
}
export { NgProgressService, NgProgressCustomBrowserXhr, ProgressComponent };
}
declare module 'ng2-progressbar/progress.module' {
export * from '~ng2-progressbar/progress.module';
}

// Generated by typings
// Source: node_modules/ng2-progressbar/index.d.ts
declare module '~ng2-progressbar/index' {
export * from '~ng2-progressbar/progress.module';
}
declare module 'ng2-progressbar/index' {
export * from '~ng2-progressbar/index';
}
declare module 'ng2-progressbar' {
export * from '~ng2-progressbar/index';
}