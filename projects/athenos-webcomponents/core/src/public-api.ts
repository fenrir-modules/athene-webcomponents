// ===========================================
// ATHENOS WEBCOMPONENTS - CORE ENTRY POINT
// ===========================================
//
// `@athenos/webcomponents/core`: what an app needs at its root — the label
// tokens it provides and the toast service it calls — without the
// components (and the forms and icon code behind them). Everything here is
// re-exported from `@athenos/webcomponents` too, so existing imports keep
// working and both resolve to the same tokens and service.

export * from './labels';
export * from './status-labels';
export * from './priority-labels';
export * from './toast.service';
export * from './display-context';
