import { html } from "hono/html";
import { LoginForm } from "./showcase/login-form";
import { MilestoneForm } from "./showcase/milestone-form";
import { ReferralSurvey } from "./showcase/referral-survey";
import { ButtonGroups } from "./showcase/button-groups";
import { SavingsTargets } from "./showcase/savings-targets";
import { ComponentSampler } from "./showcase/component-sampler";
import { Menus } from "./showcase/menus";
import { Tabs } from "./showcase/tabs";
import { PayoutThreshold } from "./showcase/payout-threshold";
import { ConnectBank } from "./showcase/connect-bank";
import { AccountAccess } from "./showcase/account-access";
import { CoverArt } from "./showcase/cover-art";
import { Payments } from "./showcase/payments";
import { KitchenIsland } from "./showcase/kitchen-island";
import { Faq } from "./showcase/faq";
import { ClaimableBalance } from "./showcase/claimable-balance";
import { SyncingAccounts } from "./showcase/syncing-accounts";

// scopedTheme gives the showcase its own theme tokens, so they can be edited on it alone.
// Leave it off where the page-wide pickers should reach the showcase
export function Showcase({ scopedTheme = false } = {}) {
  return html`
    <div class="components-showcase" ${scopedTheme ? "data-ui-theme" : ""}>
      ${LoginForm()} ${ReferralSurvey()} ${Tabs()} ${MilestoneForm()}
      ${SavingsTargets()} ${ComponentSampler()} ${Menus()}
      ${PayoutThreshold()} ${ButtonGroups()} ${ConnectBank()}
      ${AccountAccess()} ${CoverArt()} ${Payments()} ${KitchenIsland()}
      ${Faq()} ${ClaimableBalance()} ${SyncingAccounts()}
    </div>
  `;
}
