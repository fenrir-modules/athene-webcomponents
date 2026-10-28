// ===========================================
// ATHENOS WEBCOMPONENTS - ICONS ENTRY POINT
// ===========================================
//
// `@athenos/webcomponents/icons`: every Lucide icon as plain data, from the
// framework-free `lucide` package (quality package W4-A). Draw one with
// `ath-icon` from the main entry:
//
//   import { AthIconComponent } from '@athenos/webcomponents';
//   import { Users } from '@athenos/webcomponents/icons';
//   <ath-icon [img]="Users" [size]="16" />
//
// Only re-exports, no code of its own: each icon stays its own module, so a
// bundle gets exactly the icons it imports, in the chunk that imports them.

export * from 'lucide';
