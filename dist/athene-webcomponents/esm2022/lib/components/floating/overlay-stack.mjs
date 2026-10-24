import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { installTopLayerStyles, supportsTopLayer } from './floating';
import * as i0 from "@angular/core";
/**
 * The open overlays (popovers, menus, pickers, dialogs) in opening order.
 * One document listener each for Escape and outside pointer-downs, so only
 * the topmost overlay reacts to Escape and a click inside a nested overlay
 * does not close its parent. Also owns the page scroll lock of modal dialogs.
 */
export class AthOverlayStack {
    constructor() {
        this.doc = inject(DOCUMENT);
        this.entries = [];
        this.listening = false;
        this.escapeTask = 0;
        this.locks = 0;
        this.savedScroll = null;
        this.onKeydown = (event) => {
            if (event.key !== 'Escape' || event.defaultPrevented)
                return;
            const top = this.entries[this.entries.length - 1];
            // A modal dialog handles Escape through its native `cancel` event.
            if (!top || top.modal)
                return;
            event.preventDefault();
            this.markEscape();
            if (top.closeOnEscape())
                top.dismiss('escape');
        };
        this.onPointerDown = (event) => {
            const path = event.composedPath();
            for (let i = this.entries.length - 1; i >= 0; i--) {
                const entry = this.entries[i];
                if (entry.modal)
                    return;
                const panel = entry.panel();
                const anchor = entry.anchor();
                if ((panel && path.includes(panel)) || (anchor && path.includes(anchor)))
                    return;
                if (!entry.closeOnOutsideClick())
                    return;
                entry.dismiss('outside');
            }
        };
    }
    /** Registers an overlay as the new topmost one. */
    open(entry) {
        this.remove(entry);
        this.entries.push(entry);
        this.listen();
    }
    /** Unregisters an overlay (idempotent). */
    close(entry) {
        this.remove(entry);
        if (this.entries.length === 0)
            this.unlisten();
    }
    isTop(entry) {
        return this.entries[this.entries.length - 1] === entry;
    }
    /** How many overlays are open. */
    get size() {
        return this.entries.length;
    }
    /**
     * True while the current Escape key press has already closed an overlay.
     * A native modal `<dialog>` checks this in its `cancel` event, which the
     * browser fires after the keydown, so one press closes one layer.
     */
    escapeConsumed() {
        return this.escapeTask !== 0;
    }
    /**
     * A modal dialog that opens goes on top of the top layer. Elements marked
     * `data-ath-top-layer` (the toast container) are moved back above it, so a
     * toast raised while a dialog is open is still seen.
     */
    raiseTopLayer() {
        if (!supportsTopLayer())
            return;
        installTopLayerStyles();
        for (const el of Array.from(this.doc.querySelectorAll('[data-ath-top-layer]'))) {
            try {
                if (!el.hasAttribute('popover'))
                    el.setAttribute('popover', 'manual');
                if (el.matches(':popover-open'))
                    el.hidePopover();
                el.showPopover();
            }
            catch {
                // Not connected; nothing to raise.
            }
        }
    }
    /** Locks page scrolling while at least one lock is held (modal dialogs). */
    lockScroll() {
        if (this.locks++ > 0)
            return;
        const root = this.doc.documentElement;
        const body = this.doc.body;
        const view = this.doc.defaultView;
        const scrollbar = view ? view.innerWidth - root.clientWidth : 0;
        this.savedScroll = { overflow: root.style.overflow, paddingRight: body.style.paddingRight };
        root.style.overflow = 'hidden';
        if (scrollbar > 0)
            body.style.paddingRight = `${scrollbar}px`;
    }
    unlockScroll() {
        if (this.locks === 0 || --this.locks > 0)
            return;
        if (this.savedScroll) {
            this.doc.documentElement.style.overflow = this.savedScroll.overflow;
            this.doc.body.style.paddingRight = this.savedScroll.paddingRight;
        }
        this.savedScroll = null;
    }
    remove(entry) {
        const i = this.entries.indexOf(entry);
        if (i >= 0)
            this.entries.splice(i, 1);
    }
    markEscape() {
        const view = this.doc.defaultView;
        if (!view)
            return;
        view.clearTimeout(this.escapeTask);
        this.escapeTask = view.setTimeout(() => (this.escapeTask = 0));
    }
    /**
     * Registered only while an overlay is open. No `NgZone`: in a zone.js app
     * the listeners run in the Angular zone like any template listener, so a
     * dismissal's handlers (the overlay's `closed`, the app's reaction) are
     * followed by change detection; zoneless, the signals and output
     * listeners they touch schedule it.
     */
    listen() {
        if (this.listening)
            return;
        this.listening = true;
        this.doc.addEventListener('keydown', this.onKeydown);
        this.doc.addEventListener('pointerdown', this.onPointerDown, true);
    }
    unlisten() {
        if (!this.listening)
            return;
        this.listening = false;
        this.doc.removeEventListener('keydown', this.onKeydown);
        this.doc.removeEventListener('pointerdown', this.onPointerDown, true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayStack, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayStack, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayStack, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9mbG9hdGluZy9vdmVybGF5LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxZQUFZLENBQUM7O0FBa0JyRTs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyxlQUFlO0lBRDVCO1FBRW1CLFFBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkIsWUFBTyxHQUFzQixFQUFFLENBQUM7UUFDekMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGdCQUFXLEdBQXNELElBQUksQ0FBQztRQThFN0QsY0FBUyxHQUFHLENBQUMsS0FBb0IsRUFBUSxFQUFFO1lBQzFELElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBQzdELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEQsbUVBQW1FO1lBQ25FLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUM5QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksR0FBRyxDQUFDLGFBQWEsRUFBRTtn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QUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7K0dBcklVLGVBQWU7bUhBQWYsZUFBZSxjQURGLE1BQU07OzRGQUNuQixlQUFlO2tCQUQzQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaW5zdGFsbFRvcExheWVyU3R5bGVzLCBzdXBwb3J0c1RvcExheWVyIH0gZnJvbSAnLi9mbG9hdGluZyc7XG5cbi8qKiBXaHkgYW4gb3ZlcmxheSBjbG9zZWQuICovXG5leHBvcnQgdHlwZSBBdGhPdmVybGF5Q2xvc2VSZWFzb24gPSAnZXNjYXBlJyB8ICdvdXRzaWRlJyB8ICdzZWxlY3QnIHwgJ3RhYicgfCAncHJvZ3JhbW1hdGljJztcblxuLyoqIFdoYXQgYW4gb3BlbiBvdmVybGF5IHRlbGxzIHRoZSBzdGFjayBhYm91dCBpdHNlbGYuICovXG5leHBvcnQgaW50ZXJmYWNlIEF0aE92ZXJsYXlFbnRyeSB7XG4gIC8qKiBUaGUgb3ZlcmxheSdzIGJveDsgY2xpY2tzIGluc2lkZSBpdCBhcmUgbm90IFwib3V0c2lkZVwiLiAqL1xuICBwYW5lbCgpOiBIVE1MRWxlbWVudCB8IG51bGw7XG4gIC8qKiBUaGUgdHJpZ2dlciBvciBhbmNob3I7IGNsaWNrcyBvbiBpdCBhcmUgbGVmdCB0byBpdHMgb3duIHRvZ2dsZS4gKi9cbiAgYW5jaG9yKCk6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgLyoqIE1vZGFsIG92ZXJsYXlzIChkaWFsb2dzKSBzdG9wIG91dHNpZGUtY2xpY2sgaGFuZGxpbmcgZm9yIGV2ZXJ5dGhpbmcgYmVsb3cgdGhlbS4gKi9cbiAgcmVhZG9ubHkgbW9kYWw/OiBib29sZWFuO1xuICBjbG9zZU9uRXNjYXBlKCk6IGJvb2xlYW47XG4gIGNsb3NlT25PdXRzaWRlQ2xpY2soKTogYm9vbGVhbjtcbiAgZGlzbWlzcyhyZWFzb246ICdlc2NhcGUnIHwgJ291dHNpZGUnKTogdm9pZDtcbn1cblxuLyoqXG4gKiBUaGUgb3BlbiBvdmVybGF5cyAocG9wb3ZlcnMsIG1lbnVzLCBwaWNrZXJzLCBkaWFsb2dzKSBpbiBvcGVuaW5nIG9yZGVyLlxuICogT25lIGRvY3VtZW50IGxpc3RlbmVyIGVhY2ggZm9yIEVzY2FwZSBhbmQgb3V0c2lkZSBwb2ludGVyLWRvd25zLCBzbyBvbmx5XG4gKiB0aGUgdG9wbW9zdCBvdmVybGF5IHJlYWN0cyB0byBFc2NhcGUgYW5kIGEgY2xpY2sgaW5zaWRlIGEgbmVzdGVkIG92ZXJsYXlcbiAqIGRvZXMgbm90IGNsb3NlIGl0cyBwYXJlbnQuIEFsc28gb3ducyB0aGUgcGFnZSBzY3JvbGwgbG9jayBvZiBtb2RhbCBkaWFsb2dzLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEF0aE92ZXJsYXlTdGFjayB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZG9jID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSBlbnRyaWVzOiBBdGhPdmVybGF5RW50cnlbXSA9IFtdO1xuICBwcml2YXRlIGxpc3RlbmluZyA9IGZhbHNlO1xuICBwcml2YXRlIGVzY2FwZVRhc2sgPSAwO1xuICBwcml2YXRlIGxvY2tzID0gMDtcbiAgcHJpdmF0ZSBzYXZlZFNjcm9sbDogeyBvdmVyZmxvdzogc3RyaW5nOyBwYWRkaW5nUmlnaHQ6IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFJlZ2lzdGVycyBhbiBvdmVybGF5IGFzIHRoZSBuZXcgdG9wbW9zdCBvbmUuICovXG4gIG9wZW4oZW50cnk6IEF0aE92ZXJsYXlFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlKGVudHJ5KTtcbiAgICB0aGlzLmVudHJpZXMucHVzaChlbnRyeSk7XG4gICAgdGhpcy5saXN0ZW4oKTtcbiAgfVxuXG4gIC8qKiBVbnJlZ2lzdGVycyBhbiBvdmVybGF5IChpZGVtcG90ZW50KS4gKi9cbiAgY2xvc2UoZW50cnk6IEF0aE92ZXJsYXlFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlKGVudHJ5KTtcbiAgICBpZiAodGhpcy5lbnRyaWVzLmxlbmd0aCA9PT0gMCkgdGhpcy51bmxpc3RlbigpO1xuICB9XG5cbiAgaXNUb3AoZW50cnk6IEF0aE92ZXJsYXlFbnRyeSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVudHJpZXNbdGhpcy5lbnRyaWVzLmxlbmd0aCAtIDFdID09PSBlbnRyeTtcbiAgfVxuXG4gIC8qKiBIb3cgbWFueSBvdmVybGF5cyBhcmUgb3Blbi4gKi9cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbnRyaWVzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIHdoaWxlIHRoZSBjdXJyZW50IEVzY2FwZSBrZXkgcHJlc3MgaGFzIGFscmVhZHkgY2xvc2VkIGFuIG92ZXJsYXkuXG4gICAqIEEgbmF0aXZlIG1vZGFsIGA8ZGlhbG9nPmAgY2hlY2tzIHRoaXMgaW4gaXRzIGBjYW5jZWxgIGV2ZW50LCB3aGljaCB0aGVcbiAgICogYnJvd3NlciBmaXJlcyBhZnRlciB0aGUga2V5ZG93biwgc28gb25lIHByZXNzIGNsb3NlcyBvbmUgbGF5ZXIuXG4gICAqL1xuICBlc2NhcGVDb25zdW1lZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lc2NhcGVUYXNrICE9PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbW9kYWwgZGlhbG9nIHRoYXQgb3BlbnMgZ29lcyBvbiB0b3Agb2YgdGhlIHRvcCBsYXllci4gRWxlbWVudHMgbWFya2VkXG4gICAqIGBkYXRhLWF0aC10b3AtbGF5ZXJgICh0aGUgdG9hc3QgY29udGFpbmVyKSBhcmUgbW92ZWQgYmFjayBhYm92ZSBpdCwgc28gYVxuICAgKiB0b2FzdCByYWlzZWQgd2hpbGUgYSBkaWFsb2cgaXMgb3BlbiBpcyBzdGlsbCBzZWVuLlxuICAgKi9cbiAgcmFpc2VUb3BMYXllcigpOiB2b2lkIHtcbiAgICBpZiAoIXN1cHBvcnRzVG9wTGF5ZXIoKSkgcmV0dXJuO1xuICAgIGluc3RhbGxUb3BMYXllclN0eWxlcygpO1xuICAgIGZvciAoY29uc3QgZWwgb2YgQXJyYXkuZnJvbSh0aGlzLmRvYy5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignW2RhdGEtYXRoLXRvcC1sYXllcl0nKSkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghZWwuaGFzQXR0cmlidXRlKCdwb3BvdmVyJykpIGVsLnNldEF0dHJpYnV0ZSgncG9wb3ZlcicsICdtYW51YWwnKTtcbiAgICAgICAgaWYgKGVsLm1hdGNoZXMoJzpwb3BvdmVyLW9wZW4nKSkgZWwuaGlkZVBvcG92ZXIoKTtcbiAgICAgICAgZWwuc2hvd1BvcG92ZXIoKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBOb3QgY29ubmVjdGVkOyBub3RoaW5nIHRvIHJhaXNlLlxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBMb2NrcyBwYWdlIHNjcm9sbGluZyB3aGlsZSBhdCBsZWFzdCBvbmUgbG9jayBpcyBoZWxkIChtb2RhbCBkaWFsb2dzKS4gKi9cbiAgbG9ja1Njcm9sbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sb2NrcysrID4gMCkgcmV0dXJuO1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLmRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuZG9jLmJvZHk7XG4gICAgY29uc3QgdmlldyA9IHRoaXMuZG9jLmRlZmF1bHRWaWV3O1xuICAgIGNvbnN0IHNjcm9sbGJhciA9IHZpZXcgPyB2aWV3LmlubmVyV2lkdGggLSByb290LmNsaWVudFdpZHRoIDogMDtcbiAgICB0aGlzLnNhdmVkU2Nyb2xsID0geyBvdmVyZmxvdzogcm9vdC5zdHlsZS5vdmVyZmxvdywgcGFkZGluZ1JpZ2h0OiBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB9O1xuICAgIHJvb3Quc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICBpZiAoc2Nyb2xsYmFyID4gMCkgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHtzY3JvbGxiYXJ9cHhgO1xuICB9XG5cbiAgdW5sb2NrU2Nyb2xsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvY2tzID09PSAwIHx8IC0tdGhpcy5sb2NrcyA+IDApIHJldHVybjtcbiAgICBpZiAodGhpcy5zYXZlZFNjcm9sbCkge1xuICAgICAgdGhpcy5kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gdGhpcy5zYXZlZFNjcm9sbC5vdmVyZmxvdztcbiAgICAgIHRoaXMuZG9jLmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gdGhpcy5zYXZlZFNjcm9sbC5wYWRkaW5nUmlnaHQ7XG4gICAgfVxuICAgIHRoaXMuc2F2ZWRTY3JvbGwgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmUoZW50cnk6IEF0aE92ZXJsYXlFbnRyeSk6IHZvaWQge1xuICAgIGNvbnN0IGkgPSB0aGlzLmVudHJpZXMuaW5kZXhPZihlbnRyeSk7XG4gICAgaWYgKGkgPj0gMCkgdGhpcy5lbnRyaWVzLnNwbGljZShpLCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZG9ubHkgb25LZXlkb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSAhPT0gJ0VzY2FwZScgfHwgZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZW50cmllc1t0aGlzLmVudHJpZXMubGVuZ3RoIC0gMV07XG4gICAgLy8gQSBtb2RhbCBkaWFsb2cgaGFuZGxlcyBFc2NhcGUgdGhyb3VnaCBpdHMgbmF0aXZlIGBjYW5jZWxgIGV2ZW50LlxuICAgIGlmICghdG9wIHx8IHRvcC5tb2RhbCkgcmV0dXJuO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5tYXJrRXNjYXBlKCk7XG4gICAgaWYgKHRvcC5jbG9zZU9uRXNjYXBlKCkpIHRvcC5kaXNtaXNzKCdlc2NhcGUnKTtcbiAgfTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG9uUG9pbnRlckRvd24gPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3QgcGF0aCA9IGV2ZW50LmNvbXBvc2VkUGF0aCgpO1xuICAgIGZvciAobGV0IGkgPSB0aGlzLmVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzW2ldO1xuICAgICAgaWYgKGVudHJ5Lm1vZGFsKSByZXR1cm47XG4gICAgICBjb25zdCBwYW5lbCA9IGVudHJ5LnBhbmVsKCk7XG4gICAgICBjb25zdCBhbmNob3IgPSBlbnRyeS5hbmNob3IoKTtcbiAgICAgIGlmICgocGFuZWwgJiYgcGF0aC5pbmNsdWRlcyhwYW5lbCkpIHx8IChhbmNob3IgJiYgcGF0aC5pbmNsdWRlcyhhbmNob3IpKSkgcmV0dXJuO1xuICAgICAgaWYgKCFlbnRyeS5jbG9zZU9uT3V0c2lkZUNsaWNrKCkpIHJldHVybjtcbiAgICAgIGVudHJ5LmRpc21pc3MoJ291dHNpZGUnKTtcbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBtYXJrRXNjYXBlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXcgPSB0aGlzLmRvYy5kZWZhdWx0VmlldztcbiAgICBpZiAoIXZpZXcpIHJldHVybjtcbiAgICB2aWV3LmNsZWFyVGltZW91dCh0aGlzLmVzY2FwZVRhc2spO1xuICAgIHRoaXMuZXNjYXBlVGFzayA9IHZpZXcuc2V0VGltZW91dCgoKSA9PiAodGhpcy5lc2NhcGVUYXNrID0gMCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyZWQgb25seSB3aGlsZSBhbiBvdmVybGF5IGlzIG9wZW4uIE5vIGBOZ1pvbmVgOiBpbiBhIHpvbmUuanMgYXBwXG4gICAqIHRoZSBsaXN0ZW5lcnMgcnVuIGluIHRoZSBBbmd1bGFyIHpvbmUgbGlrZSBhbnkgdGVtcGxhdGUgbGlzdGVuZXIsIHNvIGFcbiAgICogZGlzbWlzc2FsJ3MgaGFuZGxlcnMgKHRoZSBvdmVybGF5J3MgYGNsb3NlZGAsIHRoZSBhcHAncyByZWFjdGlvbikgYXJlXG4gICAqIGZvbGxvd2VkIGJ5IGNoYW5nZSBkZXRlY3Rpb247IHpvbmVsZXNzLCB0aGUgc2lnbmFscyBhbmQgb3V0cHV0XG4gICAqIGxpc3RlbmVycyB0aGV5IHRvdWNoIHNjaGVkdWxlIGl0LlxuICAgKi9cbiAgcHJpdmF0ZSBsaXN0ZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdGVuaW5nKSByZXR1cm47XG4gICAgdGhpcy5saXN0ZW5pbmcgPSB0cnVlO1xuICAgIHRoaXMuZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5ZG93bik7XG4gICAgdGhpcy5kb2MuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLm9uUG9pbnRlckRvd24sIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSB1bmxpc3RlbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuaW5nKSByZXR1cm47XG4gICAgdGhpcy5saXN0ZW5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLmRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pO1xuICAgIHRoaXMuZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5vblBvaW50ZXJEb3duLCB0cnVlKTtcbiAgfVxufVxuIl19