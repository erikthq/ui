import { html, raw } from "hono/html";
import { Layout } from "../layout";
import { highlight } from "../highlight";

const toc = [
  { id: "default", label: "Default" },
  { id: "in-a-field", label: "In a field" },
];

export async function ComboboxPage(path: string) {
  return Layout({
    title: "Combobox",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <h1>Combobox <sup class="badge">WIP</sup></h1>
          <p>
            A searchable dropdown built from a text input and the native
            Popover API. CSS does the presentation. A short inline script
            filters the list and handles the pick.
          </p>
        </hgroup>
        <p>
          Each <code>anchor-name</code> must be unique per combobox on the page.
          Set it via an inline style and reference the same value as
          <code>position-anchor</code> on the popover.
        </p>

        <h2 id="default">Default</h2>
      </div>
      <div class="example">
        <div class="preview">
          <div class="combobox" style="width: 14rem">
            <input
              type="search"
              placeholder="Search fruits..."
              style="anchor-name: --combobox-demo"
              onfocus="if(!this.dataset.skip&&!this.nextElementSibling.matches(':popover-open'))this.nextElementSibling.showPopover();delete this.dataset.skip"
              onblur="if(!this.nextElementSibling.contains(event.relatedTarget))setTimeout(()=>this.nextElementSibling.matches(':popover-open')&&this.nextElementSibling.hidePopover())"
              onkeydown="if(event.key==='ArrowDown'){event.preventDefault();const f=this.nextElementSibling.querySelector('li:not([hidden]) button');f&&f.focus()}"
              oninput="this.nextElementSibling.querySelectorAll('li').forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(this.value.toLowerCase()))"
            />
            <div
              popover="manual"
              style="position-anchor: --combobox-demo"
              onpointerdown="const b=event.target.closest('button');if(b){event.preventDefault();this.previousElementSibling.value=b.textContent.trim();this.hidePopover()}"
              onkeydown="const btns=[...this.querySelectorAll('li:not([hidden]) button')],i=btns.indexOf(event.target);if(event.key==='ArrowDown'){event.preventDefault();(btns[i+1]||btns[0])?.focus()}else if(event.key==='ArrowUp'){event.preventDefault();i>0?btns[i-1].focus():this.previousElementSibling.focus()}else if(event.key==='Escape'){this.previousElementSibling.dataset.skip=1;this.hidePopover();this.previousElementSibling.focus()}else if(event.key==='Enter'){event.preventDefault();const b=event.target.closest('button');if(b){this.previousElementSibling.value=b.textContent.trim();this.hidePopover();this.previousElementSibling.focus()}}"
              onfocusout="if(!this.contains(event.relatedTarget)&&event.relatedTarget!==this.previousElementSibling)setTimeout(()=>this.matches(':popover-open')&&this.hidePopover())"
            >
              <menu>
                <li><button class="ghost">Apple</button></li>
                <li><button class="ghost">Banana</button></li>
                <li><button class="ghost">Cherry</button></li>
                <li><button class="ghost">Mango</button></li>
                <li><button class="ghost">Pineapple</button></li>
              </menu>
            </div>
          </div>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<div class="combobox">
  <input type="search" placeholder="Search fruits..."
    style="anchor-name: --my-combobox"
    onfocus="if(!this.dataset.skip&&!this.nextElementSibling.matches(':popover-open'))this.nextElementSibling.showPopover();delete this.dataset.skip"
    onblur="if(!this.nextElementSibling.contains(event.relatedTarget))setTimeout(()=>this.nextElementSibling.matches(':popover-open')&&this.nextElementSibling.hidePopover())"
    onkeydown="if(event.key==='ArrowDown'){event.preventDefault();const f=this.nextElementSibling.querySelector('li:not([hidden]) button');f&&f.focus()}"
    oninput="this.nextElementSibling.querySelectorAll('li').forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(this.value.toLowerCase()))">
  <div popover="manual" style="position-anchor: --my-combobox"
    onpointerdown="const b=event.target.closest('button');if(b){event.preventDefault();this.previousElementSibling.value=b.textContent.trim();this.hidePopover()}"
    onkeydown="const btns=[...this.querySelectorAll('li:not([hidden]) button')],i=btns.indexOf(event.target);if(event.key==='ArrowDown'){event.preventDefault();(btns[i+1]||btns[0])?.focus()}else if(event.key==='ArrowUp'){event.preventDefault();i>0?btns[i-1].focus():this.previousElementSibling.focus()}else if(event.key==='Escape'){this.previousElementSibling.dataset.skip=1;this.hidePopover();this.previousElementSibling.focus()}else if(event.key==='Enter'){event.preventDefault();const b=event.target.closest('button');if(b){this.previousElementSibling.value=b.textContent.trim();this.hidePopover();this.previousElementSibling.focus()}}"
    onfocusout="if(!this.contains(event.relatedTarget)&&event.relatedTarget!==this.previousElementSibling)setTimeout(()=>this.matches(':popover-open')&&this.hidePopover())">
    <menu>
      <li><button class="ghost">Apple</button></li>
      <li><button class="ghost">Banana</button></li>
      <li><button class="ghost">Cherry</button></li>
      <li><button class="ghost">Mango</button></li>
      <li><button class="ghost">Pineapple</button></li>
    </menu>
  </div>
</div>`),
          )}
        </div>
      </div>

      <div class="prose">
        <h2 id="in-a-field">In a field</h2>
        <p>Wrap with a <code>&lt;label&gt;</code> to attach a visible label.</p>
      </div>
      <div class="example">
        <div class="preview">
          <label class="field">
            <span>Favourite fruit</span>
            <div class="combobox">
              <input
                type="search"
                placeholder="Search..."
                style="anchor-name: --combobox-field-demo"
                onfocus="if(!this.dataset.skip&&!this.nextElementSibling.matches(':popover-open'))this.nextElementSibling.showPopover();delete this.dataset.skip"
                onblur="if(!this.nextElementSibling.contains(event.relatedTarget))setTimeout(()=>this.nextElementSibling.matches(':popover-open')&&this.nextElementSibling.hidePopover())"
                onkeydown="if(event.key==='ArrowDown'){event.preventDefault();const f=this.nextElementSibling.querySelector('li:not([hidden]) button');f&&f.focus()}"
                oninput="this.nextElementSibling.querySelectorAll('li').forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(this.value.toLowerCase()))"
              />
              <div
                popover="manual"
                style="position-anchor: --combobox-field-demo"
                onpointerdown="const b=event.target.closest('button');if(b){event.preventDefault();this.previousElementSibling.value=b.textContent.trim();this.hidePopover()}"
                onkeydown="const btns=[...this.querySelectorAll('li:not([hidden]) button')],i=btns.indexOf(event.target);if(event.key==='ArrowDown'){event.preventDefault();(btns[i+1]||btns[0])?.focus()}else if(event.key==='ArrowUp'){event.preventDefault();i>0?btns[i-1].focus():this.previousElementSibling.focus()}else if(event.key==='Escape'){this.previousElementSibling.dataset.skip=1;this.hidePopover();this.previousElementSibling.focus()}else if(event.key==='Enter'){event.preventDefault();const b=event.target.closest('button');if(b){this.previousElementSibling.value=b.textContent.trim();this.hidePopover();this.previousElementSibling.focus()}}"
                onfocusout="if(!this.contains(event.relatedTarget)&&event.relatedTarget!==this.previousElementSibling)setTimeout(()=>this.matches(':popover-open')&&this.hidePopover())"
              >
                <menu>
                  <li><button class="ghost">Apple</button></li>
                  <li><button class="ghost">Banana</button></li>
                  <li><button class="ghost">Cherry</button></li>
                  <li><button class="ghost">Mango</button></li>
                  <li><button class="ghost">Pineapple</button></li>
                </menu>
              </div>
            </div>
          </label>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<label class="field">
  <span>Favourite fruit</span>
  <div class="combobox">
    <input type="search" placeholder="Search..."
      style="anchor-name: --my-combobox"
      onfocus="if(!this.dataset.skip&&!this.nextElementSibling.matches(':popover-open'))this.nextElementSibling.showPopover();delete this.dataset.skip"
      onblur="if(!this.nextElementSibling.contains(event.relatedTarget))setTimeout(()=>this.nextElementSibling.matches(':popover-open')&&this.nextElementSibling.hidePopover())"
      onkeydown="if(event.key==='ArrowDown'){event.preventDefault();const f=this.nextElementSibling.querySelector('li:not([hidden]) button');f&&f.focus()}"
      oninput="this.nextElementSibling.querySelectorAll('li').forEach(li=>li.hidden=!li.textContent.toLowerCase().includes(this.value.toLowerCase()))">
    <div popover="manual" style="position-anchor: --my-combobox"
      onpointerdown="const b=event.target.closest('button');if(b){event.preventDefault();this.previousElementSibling.value=b.textContent.trim();this.hidePopover()}"
      onkeydown="const btns=[...this.querySelectorAll('li:not([hidden]) button')],i=btns.indexOf(event.target);if(event.key==='ArrowDown'){event.preventDefault();(btns[i+1]||btns[0])?.focus()}else if(event.key==='ArrowUp'){event.preventDefault();i>0?btns[i-1].focus():this.previousElementSibling.focus()}else if(event.key==='Escape'){this.previousElementSibling.dataset.skip=1;this.hidePopover();this.previousElementSibling.focus()}else if(event.key==='Enter'){event.preventDefault();const b=event.target.closest('button');if(b){this.previousElementSibling.value=b.textContent.trim();this.hidePopover();this.previousElementSibling.focus()}}"
      onfocusout="if(!this.contains(event.relatedTarget)&&event.relatedTarget!==this.previousElementSibling)setTimeout(()=>this.matches(':popover-open')&&this.hidePopover())">
      <menu>
        <li><button class="ghost">Apple</button></li>
        <li><button class="ghost">Banana</button></li>
        <li><button class="ghost">Cherry</button></li>
      </menu>
    </div>
  </div>
</label>`),
          )}
        </div>
      </div>
    `,
  });
}
