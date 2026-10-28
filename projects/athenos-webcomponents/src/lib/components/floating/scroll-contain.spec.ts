import { floatPanel, type FloatingCleanup } from './floating';
import { containScrollWhileOverflowing } from './scroll-contain';

/** A scrolling pane (taller content) with an anchor inside, and a floating panel of `rows` rows. */
function setup(
  rows: number,
  listStyle = ''
): {
  pane: HTMLElement;
  anchor: HTMLElement;
  panel: HTMLElement;
  list: HTMLElement;
} {
  const pane = document.createElement('div');
  pane.style.cssText = 'position:fixed;top:0;left:0;width:300px;height:200px;overflow-y:auto';
  const content = document.createElement('div');
  content.style.height = '1000px';
  const anchor = document.createElement('button');
  anchor.textContent = 'anchor';
  content.append(anchor);
  pane.append(content);
  const panel = document.createElement('div');
  panel.style.width = '160px';
  const list = document.createElement('ul');
  list.style.cssText = `margin:0;padding:0;max-height:120px;overflow-y:auto;${listStyle}`;
  for (let i = 0; i < rows; i++) {
    const li = document.createElement('li');
    li.style.height = '24px';
    li.textContent = `Row ${i}`;
    list.append(li);
  }
  panel.append(list);
  content.append(panel);
  document.body.append(pane);
  return { pane, anchor, panel, list };
}

const wheel = (target: Element, deltaY: number): void => {
  target.dispatchEvent(new WheelEvent('wheel', { deltaY, bubbles: true, cancelable: true }));
};

describe('scroll containment (W5-R)', () => {
  let stop: FloatingCleanup | (() => void) | null = null;
  let pane: HTMLElement | null = null;

  afterEach(() => {
    stop?.();
    stop = null;
    pane?.remove();
    pane = null;
  });

  it('contains a list only while it overflows', async () => {
    const short = setup(3);
    pane = short.pane;
    stop = containScrollWhileOverflowing(short.list);
    expect(short.list.style.overscrollBehaviorY).toBe('');

    for (let i = 0; i < 10; i++) short.list.append(document.createElement('li'));
    short.list.querySelectorAll('li').forEach((li) => (li.style.height = '24px'));
    await vi.waitFor(() => expect(short.list.style.overscrollBehaviorY).toBe('contain'));
  });

  it("passes a floating panel's wheel to the anchor's scroller", () => {
    const s = setup(3);
    pane = s.pane;
    stop = floatPanel(s.panel, s.anchor);
    wheel(s.list.firstElementChild!, 80);
    expect(s.pane.scrollTop).toBe(80);
    wheel(s.list.firstElementChild!, -30);
    expect(s.pane.scrollTop).toBe(50);
  });

  it('leaves the wheel to a list inside the panel that can still scroll', () => {
    const s = setup(20);
    pane = s.pane;
    stop = floatPanel(s.panel, s.anchor);
    wheel(s.list.firstElementChild!, 80);
    expect(s.pane.scrollTop).toBe(0);
  });

  it('keeps the wheel at the end of a list that contains it', () => {
    const s = setup(20, 'overscroll-behavior-y:contain');
    pane = s.pane;
    stop = floatPanel(s.panel, s.anchor);
    s.list.scrollTop = s.list.scrollHeight;
    wheel(s.list.lastElementChild!, 80);
    expect(s.pane.scrollTop).toBe(0);
  });

  it('chains again at the end of a list that does not contain it', () => {
    const s = setup(20);
    pane = s.pane;
    stop = floatPanel(s.panel, s.anchor);
    s.list.scrollTop = s.list.scrollHeight;
    wheel(s.list.lastElementChild!, 80);
    expect(s.pane.scrollTop).toBe(80);
  });
});
