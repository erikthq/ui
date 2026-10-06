import { html, raw } from "hono/html";
import { HomeLayout, url } from "../layout";
import { ColorSwatches } from "../components/color-swatches";
import { highlight } from "../highlight";
import { icon } from "../icon";
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";
import homeShowcase from "../components/home-showcase";
import { LoginForm } from "../components/showcase/login-form";
import { MilestoneForm } from "../components/showcase/milestone-form";
import { ReferralSurvey } from "../components/showcase/referral-survey";
import { ButtonGroups } from "../components/showcase/button-groups";
import { SavingsTargets } from "../components/showcase/savings-targets";
import { ComponentSampler } from "../components/showcase/component-sampler";
import { Menus } from "../components/showcase/menus";
import { Tabs } from "../components/showcase/tabs";
import { PayoutThreshold } from "../components/showcase/payout-threshold";

const cdnUrl = `https://esm.sh/@erikt/ui`;

function getMainCssSize() {
  const path = "core/dist/ui.css";

  try {
    const cssPath = resolve(import.meta.dirname, "../../..", path);
    console.log(cssPath);
    const css = readFileSync(cssPath);
    const compressed = gzipSync(css);
    return (compressed.byteLength / 1024).toFixed(1);
  } catch {
    return null;
  }
}

export async function HomePage(path: string) {
  const cssSize = getMainCssSize();

  return HomeLayout({
    title: "One stylesheet. That's it",
    path,
    content: html`
      <div class="home-background"></div>

      <section class="home-hero prose">
        <hgroup>
          <h1>
            A UI library for building your next design system in a single CSS
            file
          </h1>
          <p>
            Write semantic HTML and it just looks good. No JavaScript, no build
            step, and your own CSS always wins.
            ${cssSize ? html`<code>${cssSize} kB</code> gzipped.` : ""}
          </p>
        </hgroup>

        <div>
          <a href="${url("/getting-started/introduction")}" class="button">
            Get started
          </a>
          <a
            href="${url("/components/button")}"
            class="button outlined"
            style="background-color: var(--ui-background-color)"
          >
            Components
          </a>
        </div>
        <div class="code-block">
          ${raw(await highlight(`<link rel="stylesheet" href="${cdnUrl}" />`))}
        </div>
      </section>

      <div class="home-swatches">${ColorSwatches()}</div>

      <div class="home-components-showcase">
        ${LoginForm()} ${MilestoneForm()} ${ReferralSurvey()} ${Tabs()}
        ${SavingsTargets()} ${ComponentSampler()} ${Menus()}
        ${PayoutThreshold()} ${ButtonGroups()}
      </div>

      <!-- <section class="home-theme-section tabs">
        <div class="header">
          <header role="tablist" aria-label="Components">
            <label>
              <input
                type="radio"
                name="tabs"
                id="tab-1"
                checked
                aria-controls="panel-1"
              />
              Components
            </label>
            <label>
              <input
                type="radio"
                name="tabs"
                id="tab-2"
                aria-controls="panel-2"
              />
              Colors
            </label>
          </header>
        </div>

        <div class="tabpanels">
          <div
            role="tabpanel"
            id="panel-1"
            aria-labelledby="tab-1"
            tabindex="0"
          >
            ${homeShowcase()}
          </div>
          <div
            role="tabpanel"
            id="panel-2"
            aria-labelledby="tab-2"
            tabindex="0"
          >
            <div class="home-themes-showcase">
              <ul>
                ${[
        "primary",
        "neutral",
        "constructive",
        "destructive",
        "color1",
        "color2",
        "color3",
        "color4",
        "color5",
        "color6",
      ].map(
        (name) => html`
          <li>
            <ul>
              ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                (step) => html`
                  <li
                    class="home-themes-swatch"
                    style="background:var(--ui-${name}-${step})"
                    title="${name}-${step}"
                  ></li>
                `,
              )}
            </ul>
          </li>
        `,
      )}
              </ul>

              <div class="home-themes-modes">
                <div class="home-themes-mode" style="color-scheme:light">
                  <article>
                    <header>Light mode</header>
                    <div>
                      <p>
                        erikt/ui responds to
                        <code>prefers-color-scheme</code> automatically.
                      </p>
                    </div>
                    <footer>
                      <button class="ghost">Cancel</button>
                      <button>Save</button>
                    </footer>
                  </article>
                </div>
                <div class="home-themes-mode" style="color-scheme:dark">
                  <article>
                    <header>Dark mode</header>
                    <div>
                      <p>
                        Force a mode with
                        <code>style="color-scheme: dark"</code>.
                      </p>
                    </div>
                    <footer>
                      <button class="ghost">Cancel</button>
                      <button>Save</button>
                    </footer>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->

      <!-- <hr style="margin: -1px 0 0 0" /> -->

      <!-- <hr style="margin: -1px 0 0 0" /> -->

      <section class="home-features">
        <div class="home-feature-card prose">
          <p><small>Reset + UI in one import</small></p>
          <h2>Batteries included</h2>
          <p>
            @erikt/ui normalizes browser defaults and builds on top of them. One
            stylesheet, one import, and you have both the reset and the
            components.
          </p>
        </div>

        <div class="home-feature-card prose">
          <p><small>No class soup</small></p>
          <h2>Just write HTML</h2>
          <p>
            Components map to native elements. A
            <code>&lt;button&gt;</code> is a button, a
            <code>&lt;dialog&gt;</code> is a dialog. No wrappers, no utility
            classes.
          </p>
        </div>

        <div class="home-feature-card prose">
          <p><small>Works out of the box</small></p>
          <h2>Dark mode included</h2>
          <p>
            Responds to <code>prefers-color-scheme</code> automatically. Force a
            mode on any element with<br />
            <code>style="color-scheme: light"</code> or
            <code>style="color-scheme: dark"</code>.
          </p>
        </div>
      </section>

      <footer class="home-footer prose">
        <p>
          Built by erikt. Code available on
          <a
            href="https://github.com/erikthq/ui"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </p>
      </footer>
    `,
  });
}
