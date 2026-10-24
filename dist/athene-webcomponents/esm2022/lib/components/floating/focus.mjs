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
/** The first focusable element of `root` (any tabindex), or `null`. */
export function firstFocusable(root) {
    return root.querySelector(FOCUSABLE);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvZmxvYXRpbmcvZm9jdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUZBQW1GO0FBRW5GLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLFNBQVM7SUFDVCxZQUFZO0lBQ1osd0JBQXdCO0lBQ3hCLDRDQUE0QztJQUM1Qyx3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLFFBQVE7SUFDUixrREFBa0Q7SUFDbEQsWUFBWTtDQUNiLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRVosb0VBQW9FO0FBQ3BFLE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBaUI7SUFDekMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBYyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDckUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDckYsQ0FBQztBQUNKLENBQUM7QUFFRCx1RUFBdUU7QUFDdkUsTUFBTSxVQUFVLGNBQWMsQ0FBQyxJQUFpQjtJQUM5QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQWMsU0FBUyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFpQjtJQUM3RCxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssS0FBSztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3RDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUNoRCxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdkMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELDJFQUEyRTtBQUMzRSxNQUFNLFVBQVUsV0FBVyxDQUFDLEVBQWtDO0lBQzVELElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3pDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxLQUFLLEVBQUUsQ0FBQztBQUMvQyxDQUFDO0FBRUQsNkZBQTZGO0FBQzdGLE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBaUI7SUFDM0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLHNEQUFzRCxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDdEYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFjLDZCQUE2QixDQUFDLElBQUksSUFBSSxDQUFDO0FBQ2hGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGb2N1cyBoZWxwZXJzIHNoYXJlZCBieSB0aGUgb3ZlcmxheSBwcmltaXRpdmVzIChwb3BvdmVyLCBtZW51LCBsaXN0Ym94LCBkaWFsb2cpLlxuXG5jb25zdCBGT0NVU0FCTEUgPSBbXG4gICdhW2hyZWZdJyxcbiAgJ2FyZWFbaHJlZl0nLFxuICAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKScsXG4gICdpbnB1dDpub3QoW2Rpc2FibGVkXSk6bm90KFt0eXBlPVwiaGlkZGVuXCJdKScsXG4gICdzZWxlY3Q6bm90KFtkaXNhYmxlZF0pJyxcbiAgJ3RleHRhcmVhOm5vdChbZGlzYWJsZWRdKScsXG4gICdpZnJhbWUnLFxuICAnW2NvbnRlbnRlZGl0YWJsZV06bm90KFtjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiXSknLFxuICAnW3RhYmluZGV4XScsXG5dLmpvaW4oJywnKTtcblxuLyoqIEVsZW1lbnRzIGluc2lkZSBgcm9vdGAgcmVhY2hhYmxlIHdpdGggVGFiLCBpbiBkb2N1bWVudCBvcmRlci4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0YWJiYWJsZXMocm9vdDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudFtdIHtcbiAgcmV0dXJuIEFycmF5LmZyb20ocm9vdC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihGT0NVU0FCTEUpKS5maWx0ZXIoXG4gICAgKGVsKSA9PiBlbC50YWJJbmRleCA+PSAwICYmICFlbC5jbG9zZXN0KCdbaW5lcnRdJykgJiYgZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPiAwXG4gICk7XG59XG5cbi8qKiBUaGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQgb2YgYHJvb3RgIChhbnkgdGFiaW5kZXgpLCBvciBgbnVsbGAuICovXG5leHBvcnQgZnVuY3Rpb24gZmlyc3RGb2N1c2FibGUocm9vdDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICByZXR1cm4gcm9vdC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihGT0NVU0FCTEUpO1xufVxuXG4vKipcbiAqIEtlZXBzIFRhYiBpbnNpZGUgYHJvb3RgOiBmcm9tIHRoZSBsYXN0IHRhYmJhYmxlIHRvIHRoZSBmaXJzdCBhbmQgYmFjay5cbiAqIFJldHVybnMgdHJ1ZSB3aGVuIGl0IG1vdmVkIGZvY3VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhcFRhYihldmVudDogS2V5Ym9hcmRFdmVudCwgcm9vdDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgaWYgKGV2ZW50LmtleSAhPT0gJ1RhYicpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgaXRlbXMgPSB0YWJiYWJsZXMocm9vdCk7XG4gIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJvb3QuZm9jdXMoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBjb25zdCBmaXJzdCA9IGl0ZW1zWzBdO1xuICBjb25zdCBsYXN0ID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV07XG4gIGNvbnN0IGFjdGl2ZSA9IHJvb3Qub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgKGFjdGl2ZSA9PT0gZmlyc3QgfHwgYWN0aXZlID09PSByb290KSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGFzdC5mb2N1cygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICghZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlID09PSBsYXN0KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBmaXJzdC5mb2N1cygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqIEZvY3VzZXMgYGVsYCBpZiBpdCBpcyBzdGlsbCBpbiB0aGUgZG9jdW1lbnQ7IG5ldmVyIHNjcm9sbHMgdGhlIHBhZ2UuICovXG5leHBvcnQgZnVuY3Rpb24gZm9jdXNTYWZlbHkoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICBpZiAoIWVsIHx8ICFlbC5pc0Nvbm5lY3RlZCkgcmV0dXJuIGZhbHNlO1xuICBlbC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIHJldHVybiBlbC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsO1xufVxuXG4vKiogQSBuYXRpdmVseSBmb2N1c2FibGUgY29udHJvbCwgb3IgdGhlIGZpcnN0IG9uZSBpbnNpZGUgYSB3cmFwcGVyIChlLmcuIGA8YXRoLWJ1dHRvbj5gKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb2N1c1RhcmdldChob3N0OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgaWYgKGhvc3QubWF0Y2hlcygnYnV0dG9uLCBhW2hyZWZdLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XScpKSByZXR1cm4gaG9zdDtcbiAgcmV0dXJuIGhvc3QucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJ2J1dHRvbiwgYVtocmVmXSwgW3RhYmluZGV4XScpID8/IGhvc3Q7XG59XG4iXX0=