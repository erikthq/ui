import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { apiReference } from "../../components/api-reference";
import { icon } from "../../icon";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "example", label: "Example" },
  { id: "bubble", label: "Bubble" },
  { id: "avatar", label: "Avatar" },
  { id: "pending", label: "Pending" },
  { id: "jump-to-latest", label: "Jump to latest" },
  { id: "api-reference", label: "API reference" },
];

const bubbleCode = html`<div class="chat" role="log" aria-label="Conversation">
  <ul>
    <li class="bubble me">Which fruit has the most vitamin C?</li>
    <li class="bubble ghost">
      <p>Per 100 grams, a few stand out:</p>
      <ul>
        <li><strong>Guava</strong>, about 230 mg</li>
        <li><strong>Kiwi</strong>, about 90 mg</li>
        <li><strong>Orange</strong>, about 50 mg</li>
      </ul>
    </li>
    <li class="bubble me">Didn't expect guava!</li>
    <li class="bubble">
      Most people don't. It has about four times as much as an orange.
    </li>
  </ul>
</div>`;

const avatarCode = html`<div class="chat" role="log" aria-label="Conversation">
  <ul>
    <li>
      <span class="avatar" role="img" aria-label="Alex Lee">AL</span>
      <div class="bubble">Did you see the new designs?</div>
      <div class="bubble">I think the colors are much better now.</div>
    </li>
    <li>
      <span class="avatar" role="img" aria-label="You">JR</span>
      <div class="bubble me">Just looked. I love the new buttons.</div>
    </li>
  </ul>
</div>`;

const pendingCode = html`<div class="chat" role="log" aria-label="Conversation">
  <ul>
    <li class="bubble me">What's the tallest mountain in Europe?</li>
    <li>
      <p class="shimmer">Thinking...</p>
    </li>
  </ul>
</div>`;

const jumpCode = html`<div
  class="chat"
  role="log"
  aria-label="Conversation"
  tabindex="0"
  style="height: 16rem"
>
  <ul>
    <li class="bubble me">Can you help me plan a trip to Lisbon?</li>
    <li class="bubble">Sure. How many days do you have?</li>
    <li class="bubble me">Four, in May.</li>
    <li class="bubble">
      Four days is a good length. Spend the first in Alfama and Baixa, the
      second in Belém, and take a day trip to Sintra on the third.
    </li>
    <li class="bubble me">And the last day?</li>
    <li class="bubble">
      Keep it slow. Walk along the river to LX Factory, and end the day at a
      miradouro for the sunset.
    </li>
  </ul>

  <button
    class="jump secondary square round"
    aria-label="Jump to latest"
    onclick="const chat = this.parentElement; chat.focus(); chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' })"
  >
    <svg>...</svg>
  </button>
</div>`;

export async function ChatPage(path: string) {
  return Layout({
    title: "Chat",
    path,
    toc,
    content: html`
      <div class="prose">
        <hgroup>
          <div class="docs-title">
            <h1>Chat</h1>
            ${raw(titleActions(path, "chat"))}
          </div>
          <p>
            A conversation in bubbles. <code>.chat</code> holds a
            <code>&lt;ul&gt;</code> of messages, and each
            <code>&lt;li class="bubble"&gt;</code> is one message.
          </p>
        </hgroup>

        <h2 id="standalone">Standalone</h2>
      </div>
      <div class="example">
        <div class="code-block">${raw(await standaloneLink("chat"))}</div>
      </div>

      <div class="prose">
        <h2 id="example">Example</h2>
        <p>An example of all parts of the Chat component.</p>
      </div>
      <div class="example">
        <div class="preview preview-padded grid gap-2">
          <style>
            #chat-example {
              width: 100%;
              max-width: 30rem;
              height: 48rem;
              display: flex;
              flex-direction: column;
              margin-inline: auto;

              header {
                button {
                  margin-left: auto;
                  align-self: flex-start;
                }
              }

              hr {
                margin: 0;
                padding: 0;
              }

              .empty {
                margin-block: auto;
              }

              footer {
                margin-top: auto;
              }

              form {
                width: stretch;
                display: grid;
                grid-template-columns: 1fr auto;

                textarea {
                  grid-row: 1;
                  grid-column: 1 / -1;
                  resize: none;
                }

                button {
                  align-self: end;
                  grid-row: 1;
                  grid-column: 2;
                  margin: 0.5rem;
                }
              }
            }
          </style>

          <article id="chat-example" class="secondary" x-data="chat">
            <header>
              <hgroup>
                <h3>New chat</h3>
                <p>How can I help you today?</p>
              </hgroup>

              <button
                @click="onReset"
                aria-label="Reset"
                data-tooltip="left"
                class="secondary square round"
              >
                ${raw(icon("reload"))}
              </button>
            </header>

            <hr />

            <section
              x-ref="output"
              class="chat"
              role="log"
              aria-label="Conversation"
              tabindex="0"
            >
              <div class="empty" x-show="messages.length === 0">
                ${raw(icon("message-circle"))}
                <h3>Morning, erikt!</h3>
                <p>
                  What are we working on today? Press send to start a new
                  conversation
                </p>
              </div>

              <ul x-show="messages.length > 0">
                <template x-for="message in messages">
                  <li>
                    <template x-if="message.sender === 'me'">
                      <span class="avatar" role="img" aria-label="You">ET</span>
                    </template>
                    <template x-if="message.sender !== 'me'">
                      <span class="avatar" role="img" aria-label="Assistant">
                        ${raw(icon("sparkles"))}
                      </span>
                    </template>
                    <template x-if="message.pending">
                      <p class="shimmer">Thinking...</p>
                    </template>
                    <template x-if="!message.pending">
                      <div
                        class="bubble"
                        :class="message.sender === 'me' ? 'me' : 'ghost'"
                        :aria-busy="message.busy ? 'true' : 'false'"
                        x-html="message.message"
                      ></div>
                    </template>
                  </li>
                </template>
              </ul>

              <button
                class="jump secondary square round"
                aria-label="Jump to latest"
                @click="scrollToBottom"
              >
                ${raw(icon("arrow-down"))}
              </button>
            </section>

            <footer>
              <form x-ref="form" @submit="onSubmit">
                <textarea
                  x-text="qued?.message"
                  name="textarea"
                  aria-label="Message"
                ></textarea>

                <button class="square round" type="submit" aria-label="Send">
                  ${raw(icon("arrow-up"))}
                </button>
              </form>
            </footer>
          </article>

          <small style="margin-inline: auto;">
            Demo is read only. Press send to send messages.
          </small>
        </div>
      </div>

      <div class="prose">
        <h2 id="bubble">Bubble</h2>
        <p>
          Each message is an <code>&lt;li class="bubble"&gt;</code>. When the
          <code>&lt;li&gt;</code> holds more than the message, like an avatar,
          put the bubble on a <code>&lt;div&gt;</code> inside it instead. Add
          <code>me</code> for the current user's messages. They move to the
          other side and use the primary color. Give the chat
          <code>role="log"</code> and a label, so new messages are announced as
          they arrive.
        </p>
        <p>
          Other messages have no background, which suits long answers from an
          assistant. Add <code>secondary</code> to put them in a gray bubble,
          like in a chat between people.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">${raw(bubbleCode)}</div>
        <div class="code-block">${raw(await highlight(bubbleCode))}</div>
      </div>

      <div class="prose">
        <h2 id="avatar">Avatar</h2>
        <p>
          Put an <a href="${url("/components/avatar")}">Avatar</a> first in the
          <code>&lt;li&gt;</code> to show who sent the message. It sits next to
          the last bubble, so one <code>&lt;li&gt;</code> can hold several
          bubbles from the same sender. On <code>me</code> messages it moves to
          the other side.
        </p>
        <p>
          Give it <code>role="img"</code> and the sender's name in
          <code>aria-label</code>, so screen readers read the name instead of
          the initials. For an image avatar, put the name in <code>alt</code>.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">${raw(avatarCode)}</div>
        <div class="code-block">${raw(await highlight(avatarCode))}</div>
      </div>

      <div class="prose">
        <h2 id="pending">Pending</h2>
        <p>
          Show that a reply is on its way with a
          <a href="${url("/components/shimmer")}">Shimmer</a> in the
          <code>&lt;li&gt;</code>, in place of the bubble. It gets the bubble's
          padding, so its text lines up with the reply. Swap it for a bubble
          once the reply arrives. If the reply streams in, set
          <code>aria-busy="true"</code> on the bubble until it is done, so
          screen readers read it once instead of word by word.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">${raw(pendingCode)}</div>
        <div class="code-block">${raw(await highlight(pendingCode))}</div>
      </div>

      <div class="prose">
        <h2 id="jump-to-latest">Jump to latest</h2>
        <p>
          Put a <code>&lt;button class="jump"&gt;</code> last in the chat. It
          sticks to the bottom while there are newer messages below, and hides
          once the chat is scrolled to the end. Scroll up in the example to see
          it. Give the chat a height so it scrolls.
        </p>
        <p>
          Showing and hiding needs no JavaScript. Scrolling down on click does.
          Move focus to the chat on click too, since the button hides once the
          chat is scrolled down. In browsers without scroll-state queries the
          button is always visible.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">
          ${raw(
            jumpCode.toString().replace("<svg>...</svg>", icon("arrow-down")),
          )}
        </div>
        <div class="code-block">${raw(await highlight(jumpCode))}</div>
      </div>

      ${apiReference([
        {
          type: "Chat",
          values: [".chat"],
          description:
            "The scrolling container. Holds a ul of bubbles and an optional jump button",
        },
        {
          type: "Bubble",
          values: [".bubble"],
          description:
            "On an li, or a div inside one. One message, with no background",
        },
        {
          type: "Avatar",
          values: [".avatar"],
          description:
            "First in an li. Shows who sent the bubbles, next to the last one",
        },
        {
          type: "Sender",
          values: [".me"],
          description:
            "On a bubble. Moves it to the other side and uses the primary color",
        },
        {
          type: "Style",
          values: [".secondary"],
          description: "On a bubble. A gray background",
        },
        {
          type: "Jump to latest",
          values: [".jump"],
          description:
            "On a button last in .chat. Shows while there are newer messages below",
        },
        {
          type: "Radius",
          values: ["--ui-chat-radius"],
          description: "Corner radius of a bubble",
        },
        {
          type: "Tail",
          values: ["--ui-chat-tail"],
          description: "Corner radius where bubbles meet",
        },
      ])}
    `,
  });
}
