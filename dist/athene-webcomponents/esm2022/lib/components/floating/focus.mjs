// Focus helpers shared by the overlay primitives (popover, menu, listbox, dialog).
const FOCUSABLE = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    '[contenteditable]:not([contenteditable="false"])',
    '[tabindex]',
].join(',');
/** Elements inside `root` reachable with Tab, in document order. */
export function tabbables(root) {
    return Array.from(root.querySelectorAll(FOCUSABLE)).filter((el) => el.tabIndex >= 0 && !el.closest('[inert]') && el.getClientRects().length > 0);
}
/**
 * Keeps Tab inside `root`: from the last tabbable to the first and back.
 * Returns true when it moved focus.
 */
export function trapTab(event, root) {
    if (event.key !== 'Tab')
        return false;
    const items = tabbables(root);
    if (items.length === 0) {
        event.preventDefault();
        root.focus();
        return true;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = root.ownerDocument.activeElement;
    if (event.shiftKey && (active === first || active === root)) {
        event.preventDefault();
        last.focus();
        return true;
    }
    if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
        return true;
    }
    return false;
}
/** Focuses `el` if it is still in the document; never scrolls the page. */
export function focusSafely(el) {
    if (!el || !el.isConnected)
        return false;
    el.focus({ preventScroll: true });
    return el.ownerDocument.activeElement === el;
}
/** A natively focusable control, or the first one inside a wrapper (e.g. `<ath-button>`). */
export function focusTarget(host) {
    if (host.matches('button, a[href], input, select, textarea, [tabindex]'))
        return host;
    return host.querySelector('button, a[href], [tabindex]') ?? host;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvZmxvYXRpbmcvZm9jdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUZBQW1GO0FBRW5GLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLFNBQVM7SUFDVCxZQUFZO0lBQ1osd0JBQXdCO0lBQ3hCLDRDQUE0QztJQUM1Qyx3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLFFBQVE7SUFDUixrREFBa0Q7SUFDbEQsWUFBWTtDQUNiLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRVosb0VBQW9FO0FBQ3BFLE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBaUI7SUFDekMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBYyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDckUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDckYsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQUFDLEtBQW9CLEVBQUUsSUFBaUI7SUFDN0QsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN0QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDaEQsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM1RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLFdBQVcsQ0FBQyxFQUFrQztJQUM1RCxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVc7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN6QyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEMsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsS0FBSyxFQUFFLENBQUM7QUFDL0MsQ0FBQztBQUVELDZGQUE2RjtBQUM3RixNQUFNLFVBQVUsV0FBVyxDQUFDLElBQWlCO0lBQzNDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxzREFBc0QsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3RGLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBYyw2QkFBNkIsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUNoRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRm9jdXMgaGVscGVycyBzaGFyZWQgYnkgdGhlIG92ZXJsYXkgcHJpbWl0aXZlcyAocG9wb3ZlciwgbWVudSwgbGlzdGJveCwgZGlhbG9nKS5cblxuY29uc3QgRk9DVVNBQkxFID0gW1xuICAnYVtocmVmXScsXG4gICdhcmVhW2hyZWZdJyxcbiAgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSknLFxuICAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pOm5vdChbdHlwZT1cImhpZGRlblwiXSknLFxuICAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKScsXG4gICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSknLFxuICAnaWZyYW1lJyxcbiAgJ1tjb250ZW50ZWRpdGFibGVdOm5vdChbY29udGVudGVkaXRhYmxlPVwiZmFsc2VcIl0pJyxcbiAgJ1t0YWJpbmRleF0nLFxuXS5qb2luKCcsJyk7XG5cbi8qKiBFbGVtZW50cyBpbnNpZGUgYHJvb3RgIHJlYWNoYWJsZSB3aXRoIFRhYiwgaW4gZG9jdW1lbnQgb3JkZXIuICovXG5leHBvcnQgZnVuY3Rpb24gdGFiYmFibGVzKHJvb3Q6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnRbXSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oRk9DVVNBQkxFKSkuZmlsdGVyKFxuICAgIChlbCkgPT4gZWwudGFiSW5kZXggPj0gMCAmJiAhZWwuY2xvc2VzdCgnW2luZXJ0XScpICYmIGVsLmdldENsaWVudFJlY3RzKCkubGVuZ3RoID4gMFxuICApO1xufVxuXG4vKipcbiAqIEtlZXBzIFRhYiBpbnNpZGUgYHJvb3RgOiBmcm9tIHRoZSBsYXN0IHRhYmJhYmxlIHRvIHRoZSBmaXJzdCBhbmQgYmFjay5cbiAqIFJldHVybnMgdHJ1ZSB3aGVuIGl0IG1vdmVkIGZvY3VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhcFRhYihldmVudDogS2V5Ym9hcmRFdmVudCwgcm9vdDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgaWYgKGV2ZW50LmtleSAhPT0gJ1RhYicpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgaXRlbXMgPSB0YWJiYWJsZXMocm9vdCk7XG4gIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJvb3QuZm9jdXMoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBjb25zdCBmaXJzdCA9IGl0ZW1zWzBdO1xuICBjb25zdCBsYXN0ID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV07XG4gIGNvbnN0IGFjdGl2ZSA9IHJvb3Qub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgKGFjdGl2ZSA9PT0gZmlyc3QgfHwgYWN0aXZlID09PSByb290KSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGFzdC5mb2N1cygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICghZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlID09PSBsYXN0KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBmaXJzdC5mb2N1cygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqIEZvY3VzZXMgYGVsYCBpZiBpdCBpcyBzdGlsbCBpbiB0aGUgZG9jdW1lbnQ7IG5ldmVyIHNjcm9sbHMgdGhlIHBhZ2UuICovXG5leHBvcnQgZnVuY3Rpb24gZm9jdXNTYWZlbHkoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICBpZiAoIWVsIHx8ICFlbC5pc0Nvbm5lY3RlZCkgcmV0dXJuIGZhbHNlO1xuICBlbC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIHJldHVybiBlbC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsO1xufVxuXG4vKiogQSBuYXRpdmVseSBmb2N1c2FibGUgY29udHJvbCwgb3IgdGhlIGZpcnN0IG9uZSBpbnNpZGUgYSB3cmFwcGVyIChlLmcuIGA8YXRoLWJ1dHRvbj5gKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb2N1c1RhcmdldChob3N0OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgaWYgKGhvc3QubWF0Y2hlcygnYnV0dG9uLCBhW2hyZWZdLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XScpKSByZXR1cm4gaG9zdDtcbiAgcmV0dXJuIGhvc3QucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJ2J1dHRvbiwgYVtocmVmXSwgW3RhYmluZGV4XScpID8/IGhvc3Q7XG59XG4iXX0=