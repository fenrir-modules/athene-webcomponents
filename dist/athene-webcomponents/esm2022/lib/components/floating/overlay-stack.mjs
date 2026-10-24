import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject } from '@angular/core';
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
        this.zone = inject(NgZone);
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
                this.zone.run(() => top.dismiss('escape'));
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
                this.zone.run(() => entry.dismiss('outside'));
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
    listen() {
        if (this.listening)
            return;
        this.listening = true;
        this.zone.runOutsideAngular(() => {
            this.doc.addEventListener('keydown', this.onKeydown);
            this.doc.addEventListener('pointerdown', this.onPointerDown, true);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9mbG9hdGluZy9vdmVybGF5LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sWUFBWSxDQUFDOztBQWtCckU7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8sZUFBZTtJQUQ1QjtRQUVtQixRQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLFNBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsWUFBTyxHQUFzQixFQUFFLENBQUM7UUFDekMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGdCQUFXLEdBQXNELElBQUksQ0FBQztRQThFN0QsY0FBUyxHQUFHLENBQUMsS0FBb0IsRUFBUSxFQUFFO1lBQzFELElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPO1lBQzdELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEQsbUVBQW1FO1lBQ25FLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUM5QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxD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O0lBQ0wsQ0FBQztJQUVPLFFBQVE7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxPQUFPO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7K0dBaklVLGVBQWU7bUhBQWYsZUFBZSxjQURGLE1BQU07OzRGQUNuQixlQUFlO2tCQUQzQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnN0YWxsVG9wTGF5ZXJTdHlsZXMsIHN1cHBvcnRzVG9wTGF5ZXIgfSBmcm9tICcuL2Zsb2F0aW5nJztcblxuLyoqIFdoeSBhbiBvdmVybGF5IGNsb3NlZC4gKi9cbmV4cG9ydCB0eXBlIEF0aE92ZXJsYXlDbG9zZVJlYXNvbiA9ICdlc2NhcGUnIHwgJ291dHNpZGUnIHwgJ3NlbGVjdCcgfCAndGFiJyB8ICdwcm9ncmFtbWF0aWMnO1xuXG4vKiogV2hhdCBhbiBvcGVuIG92ZXJsYXkgdGVsbHMgdGhlIHN0YWNrIGFib3V0IGl0c2VsZi4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXRoT3ZlcmxheUVudHJ5IHtcbiAgLyoqIFRoZSBvdmVybGF5J3MgYm94OyBjbGlja3MgaW5zaWRlIGl0IGFyZSBub3QgXCJvdXRzaWRlXCIuICovXG4gIHBhbmVsKCk6IEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgLyoqIFRoZSB0cmlnZ2VyIG9yIGFuY2hvcjsgY2xpY2tzIG9uIGl0IGFyZSBsZWZ0IHRvIGl0cyBvd24gdG9nZ2xlLiAqL1xuICBhbmNob3IoKTogSFRNTEVsZW1lbnQgfCBudWxsO1xuICAvKiogTW9kYWwgb3ZlcmxheXMgKGRpYWxvZ3MpIHN0b3Agb3V0c2lkZS1jbGljayBoYW5kbGluZyBmb3IgZXZlcnl0aGluZyBiZWxvdyB0aGVtLiAqL1xuICByZWFkb25seSBtb2RhbD86IGJvb2xlYW47XG4gIGNsb3NlT25Fc2NhcGUoKTogYm9vbGVhbjtcbiAgY2xvc2VPbk91dHNpZGVDbGljaygpOiBib29sZWFuO1xuICBkaXNtaXNzKHJlYXNvbjogJ2VzY2FwZScgfCAnb3V0c2lkZScpOiB2b2lkO1xufVxuXG4vKipcbiAqIFRoZSBvcGVuIG92ZXJsYXlzIChwb3BvdmVycywgbWVudXMsIHBpY2tlcnMsIGRpYWxvZ3MpIGluIG9wZW5pbmcgb3JkZXIuXG4gKiBPbmUgZG9jdW1lbnQgbGlzdGVuZXIgZWFjaCBmb3IgRXNjYXBlIGFuZCBvdXRzaWRlIHBvaW50ZXItZG93bnMsIHNvIG9ubHlcbiAqIHRoZSB0b3Btb3N0IG92ZXJsYXkgcmVhY3RzIHRvIEVzY2FwZSBhbmQgYSBjbGljayBpbnNpZGUgYSBuZXN0ZWQgb3ZlcmxheVxuICogZG9lcyBub3QgY2xvc2UgaXRzIHBhcmVudC4gQWxzbyBvd25zIHRoZSBwYWdlIHNjcm9sbCBsb2NrIG9mIG1vZGFsIGRpYWxvZ3MuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQXRoT3ZlcmxheVN0YWNrIHtcbiAgcHJpdmF0ZSByZWFkb25seSBkb2MgPSBpbmplY3QoRE9DVU1FTlQpO1xuICBwcml2YXRlIHJlYWRvbmx5IHpvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgcHJpdmF0ZSByZWFkb25seSBlbnRyaWVzOiBBdGhPdmVybGF5RW50cnlbXSA9IFtdO1xuICBwcml2YXRlIGxpc3RlbmluZyA9IGZhbHNlO1xuICBwcml2YXRlIGVzY2FwZVRhc2sgPSAwO1xuICBwcml2YXRlIGxvY2tzID0gMDtcbiAgcHJpdmF0ZSBzYXZlZFNjcm9sbDogeyBvdmVyZmxvdzogc3RyaW5nOyBwYWRkaW5nUmlnaHQ6IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFJlZ2lzdGVycyBhbiBvdmVybGF5IGFzIHRoZSBuZXcgdG9wbW9zdCBvbmUuICovXG4gIG9wZW4oZW50cnk6IEF0aE92ZXJsYXlFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlKGVudHJ5KTtcbiAgICB0aGlzLmVudHJpZXMucHVzaChlbnRyeSk7XG4gICAgdGhpcy5saXN0ZW4oKTtcbiAgfVxuXG4gIC8qKiBVbnJlZ2lzdGVycyBhbiBvdmVybGF5IChpZGVtcG90ZW50KS4gKi9cbiAgY2xvc2UoZW50cnk6IEF0aE92ZXJsYXlFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlKGVudHJ5KTtcbiAgICBpZiAodGhpcy5lbnRyaWVzLmxlbmd0aCA9PT0gMCkgdGhpcy51bmxpc3RlbigpO1xuICB9XG5cbiAgaXNUb3AoZW50cnk6IEF0aE92ZXJsYXlFbnRyeSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVudHJpZXNbdGhpcy5lbnRyaWVzLmxlbmd0aCAtIDFdID09PSBlbnRyeTtcbiAgfVxuXG4gIC8qKiBIb3cgbWFueSBvdmVybGF5cyBhcmUgb3Blbi4gKi9cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbnRyaWVzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIHdoaWxlIHRoZSBjdXJyZW50IEVzY2FwZSBrZXkgcHJlc3MgaGFzIGFscmVhZHkgY2xvc2VkIGFuIG92ZXJsYXkuXG4gICAqIEEgbmF0aXZlIG1vZGFsIGA8ZGlhbG9nPmAgY2hlY2tzIHRoaXMgaW4gaXRzIGBjYW5jZWxgIGV2ZW50LCB3aGljaCB0aGVcbiAgICogYnJvd3NlciBmaXJlcyBhZnRlciB0aGUga2V5ZG93biwgc28gb25lIHByZXNzIGNsb3NlcyBvbmUgbGF5ZXIuXG4gICAqL1xuICBlc2NhcGVDb25zdW1lZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lc2NhcGVUYXNrICE9PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbW9kYWwgZGlhbG9nIHRoYXQgb3BlbnMgZ29lcyBvbiB0b3Agb2YgdGhlIHRvcCBsYXllci4gRWxlbWVudHMgbWFya2VkXG4gICAqIGBkYXRhLWF0aC10b3AtbGF5ZXJgICh0aGUgdG9hc3QgY29udGFpbmVyKSBhcmUgbW92ZWQgYmFjayBhYm92ZSBpdCwgc28gYVxuICAgKiB0b2FzdCByYWlzZWQgd2hpbGUgYSBkaWFsb2cgaXMgb3BlbiBpcyBzdGlsbCBzZWVuLlxuICAgKi9cbiAgcmFpc2VUb3BMYXllcigpOiB2b2lkIHtcbiAgICBpZiAoIXN1cHBvcnRzVG9wTGF5ZXIoKSkgcmV0dXJuO1xuICAgIGluc3RhbGxUb3BMYXllclN0eWxlcygpO1xuICAgIGZvciAoY29uc3QgZWwgb2YgQXJyYXkuZnJvbSh0aGlzLmRvYy5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignW2RhdGEtYXRoLXRvcC1sYXllcl0nKSkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghZWwuaGFzQXR0cmlidXRlKCdwb3BvdmVyJykpIGVsLnNldEF0dHJpYnV0ZSgncG9wb3ZlcicsICdtYW51YWwnKTtcbiAgICAgICAgaWYgKGVsLm1hdGNoZXMoJzpwb3BvdmVyLW9wZW4nKSkgZWwuaGlkZVBvcG92ZXIoKTtcbiAgICAgICAgZWwuc2hvd1BvcG92ZXIoKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBOb3QgY29ubmVjdGVkOyBub3RoaW5nIHRvIHJhaXNlLlxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBMb2NrcyBwYWdlIHNjcm9sbGluZyB3aGlsZSBhdCBsZWFzdCBvbmUgbG9jayBpcyBoZWxkIChtb2RhbCBkaWFsb2dzKS4gKi9cbiAgbG9ja1Njcm9sbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sb2NrcysrID4gMCkgcmV0dXJuO1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLmRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuZG9jLmJvZHk7XG4gICAgY29uc3QgdmlldyA9IHRoaXMuZG9jLmRlZmF1bHRWaWV3O1xuICAgIGNvbnN0IHNjcm9sbGJhciA9IHZpZXcgPyB2aWV3LmlubmVyV2lkdGggLSByb290LmNsaWVudFdpZHRoIDogMDtcbiAgICB0aGlzLnNhdmVkU2Nyb2xsID0geyBvdmVyZmxvdzogcm9vdC5zdHlsZS5vdmVyZmxvdywgcGFkZGluZ1JpZ2h0OiBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB9O1xuICAgIHJvb3Quc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICBpZiAoc2Nyb2xsYmFyID4gMCkgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHtzY3JvbGxiYXJ9cHhgO1xuICB9XG5cbiAgdW5sb2NrU2Nyb2xsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvY2tzID09PSAwIHx8IC0tdGhpcy5sb2NrcyA+IDApIHJldHVybjtcbiAgICBpZiAodGhpcy5zYXZlZFNjcm9sbCkge1xuICAgICAgdGhpcy5kb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gdGhpcy5zYXZlZFNjcm9sbC5vdmVyZmxvdztcbiAgICAgIHRoaXMuZG9jLmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gdGhpcy5zYXZlZFNjcm9sbC5wYWRkaW5nUmlnaHQ7XG4gICAgfVxuICAgIHRoaXMuc2F2ZWRTY3JvbGwgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmUoZW50cnk6IEF0aE92ZXJsYXlFbnRyeSk6IHZvaWQge1xuICAgIGNvbnN0IGkgPSB0aGlzLmVudHJpZXMuaW5kZXhPZihlbnRyeSk7XG4gICAgaWYgKGkgPj0gMCkgdGhpcy5lbnRyaWVzLnNwbGljZShpLCAxKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZG9ubHkgb25LZXlkb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSAhPT0gJ0VzY2FwZScgfHwgZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZW50cmllc1t0aGlzLmVudHJpZXMubGVuZ3RoIC0gMV07XG4gICAgLy8gQSBtb2RhbCBkaWFsb2cgaGFuZGxlcyBFc2NhcGUgdGhyb3VnaCBpdHMgbmF0aXZlIGBjYW5jZWxgIGV2ZW50LlxuICAgIGlmICghdG9wIHx8IHRvcC5tb2RhbCkgcmV0dXJuO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5tYXJrRXNjYXBlKCk7XG4gICAgaWYgKHRvcC5jbG9zZU9uRXNjYXBlKCkpIHRoaXMuem9uZS5ydW4oKCkgPT4gdG9wLmRpc21pc3MoJ2VzY2FwZScpKTtcbiAgfTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG9uUG9pbnRlckRvd24gPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3QgcGF0aCA9IGV2ZW50LmNvbXBvc2VkUGF0aCgpO1xuICAgIGZvciAobGV0IGkgPSB0aGlzLmVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzW2ldO1xuICAgICAgaWYgKGVudHJ5Lm1vZGFsKSByZXR1cm47XG4gICAgICBjb25zdCBwYW5lbCA9IGVudHJ5LnBhbmVsKCk7XG4gICAgICBjb25zdCBhbmNob3IgPSBlbnRyeS5hbmNob3IoKTtcbiAgICAgIGlmICgocGFuZWwgJiYgcGF0aC5pbmNsdWRlcyhwYW5lbCkpIHx8IChhbmNob3IgJiYgcGF0aC5pbmNsdWRlcyhhbmNob3IpKSkgcmV0dXJuO1xuICAgICAgaWYgKCFlbnRyeS5jbG9zZU9uT3V0c2lkZUNsaWNrKCkpIHJldHVybjtcbiAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gZW50cnkuZGlzbWlzcygnb3V0c2lkZScpKTtcbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBtYXJrRXNjYXBlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXcgPSB0aGlzLmRvYy5kZWZhdWx0VmlldztcbiAgICBpZiAoIXZpZXcpIHJldHVybjtcbiAgICB2aWV3LmNsZWFyVGltZW91dCh0aGlzLmVzY2FwZVRhc2spO1xuICAgIHRoaXMuZXNjYXBlVGFzayA9IHZpZXcuc2V0VGltZW91dCgoKSA9PiAodGhpcy5lc2NhcGVUYXNrID0gMCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdGVuaW5nKSByZXR1cm47XG4gICAgdGhpcy5saXN0ZW5pbmcgPSB0cnVlO1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pO1xuICAgICAgdGhpcy5kb2MuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLm9uUG9pbnRlckRvd24sIHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1bmxpc3RlbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuaW5nKSByZXR1cm47XG4gICAgdGhpcy5saXN0ZW5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLmRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pO1xuICAgIHRoaXMuZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5vblBvaW50ZXJEb3duLCB0cnVlKTtcbiAgfVxufVxuIl19