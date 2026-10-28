// Stylelint custom syntax for Angular inline component styles (READ-ONLY).
//
// Shared between athenos-webcomponents (canonical) and athenos-web (copy, see
// `npm run lint:shared`).
//
// Lints the template literals of `styles: `…`` / `styles: [`…`, `…`]` in a
// .ts file as SCSS. Everything outside those literals is blanked to spaces
// (newlines kept), so reported line/column numbers point into the .ts file.
//
// There is deliberately no way back: an unchanged parse stringifies to the
// original .ts text, a changed one (stylelint --fix) throws, so a blanked file
// can never be written over the TypeScript source. Fix inline styles by hand,
// or move them to a .scss file.
import postcssScss from 'postcss-scss';

/** [{ start, end }] offsets of the inline style literals' contents. */
export function inlineStyleRanges(src) {
  const out = [];
  const re = /styles\s*:\s*\[?\s*`/g;
  let m;
  while ((m = re.exec(src))) {
    let i = m.index + m[0].length;
    for (;;) {
      const start = i;
      let end = start;
      while (end < src.length && !(src[end] === '`' && src[end - 1] !== '\\')) end++;
      if (end >= src.length) break;
      out.push({ start, end });
      const rest = src.slice(end + 1).match(/^\s*,\s*`/);
      if (!rest) break;
      i = end + 1 + rest[0].length;
    }
  }
  return out;
}

/** The source with everything but the inline styles blanked out. */
export function maskToInlineStyles(src) {
  const chars = src.replace(/[^\n]/g, ' ').split('');
  for (const { start, end } of inlineStyleRanges(src)) {
    for (let i = start; i < end; i++) chars[i] = src[i];
  }
  // `${expr}` interpolations are not SCSS; blank them too.
  return chars.join('').replace(/\$\{[^}]*\}/g, (s) => s.replace(/[^\n]/g, ' '));
}

export function parse(css, opts) {
  const original = String(css);
  const masked = maskToInlineStyles(original);
  const root = postcssScss.parse(masked, opts);
  root.raws.athenosInline = { original, masked };
  return root;
}

// PostCSS always stringifies; an unchanged root gives back the original .ts
// text (so nothing is ever rewritten), a changed one (a --fix) throws.
export function stringify(node, builder) {
  const inline = node.type === 'root' ? node.raws.athenosInline : undefined;
  if (!inline) return postcssScss.stringify(node, builder);
  let out = '';
  postcssScss.stringify(node, (part) => {
    out += part;
  });
  if (out !== inline.masked) {
    throw new Error(
      'angular-inline-styles is a read-only Stylelint syntax: refusing to rewrite a .ts file. ' +
        'Fix inline styles by hand (stylelint --fix only applies to .scss).'
    );
  }
  builder(inline.original, node);
}

export default { parse, stringify };
