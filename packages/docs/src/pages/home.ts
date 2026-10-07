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
import { ConnectBank } from "../components/showcase/connect-bank";
import { AccountAccess } from "../components/showcase/account-access";
import { CoverArt } from "../components/showcase/cover-art";
import { Payments } from "../components/showcase/payments";
import { KitchenIsland } from "../components/showcase/kitchen-island";
import { Faq } from "../components/showcase/faq";
import { ClaimableBalance } from "../components/showcase/claimable-balance";
import { SyncingAccounts } from "../components/showcase/syncing-accounts";

const cdnUrl = `https://esm.sh/@erikt/ui`;

function getMainCssSize() {
  const path = "core/dist/ui.css";

  try {
    const cssPath = resolve(import.meta.dirname, "../../..", path);
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
        ${LoginForm()} ${ReferralSurvey()} ${Tabs()} ${MilestoneForm()}
        ${SavingsTargets()} ${ComponentSampler()} ${Menus()}
        ${PayoutThreshold()} ${ButtonGroups()} ${ConnectBank()}
        ${AccountAccess()} ${CoverArt()}
        ${Payments()} ${KitchenIsland()} ${Faq()}
        ${ClaimableBalance()} ${SyncingAccounts()}
      </div>

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
