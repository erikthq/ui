import { html, raw } from "hono/html";
import { Layout, url } from "../../layout";
import { highlight } from "../../highlight";
import { standaloneLink, titleActions } from "../../components/standalone";
import { apiReference } from "../../components/api-reference";
import { icon } from "../../icon";

const toc = [
  { id: "standalone", label: "Standalone" },
  { id: "example", label: "Example" },
  { id: "default", label: "Default" },
  { id: "avatar-and-time", label: "Avatar and time" },
  { id: "typing", label: "Typing" },
  { id: "chat-box", label: "Chat box" },
  { id: "api-reference", label: "API reference" },
];

const defaultCode = html`<ol class="chat">
  <li>
    <p>Hey, are we still on for Friday?</p>
  </li>
  <li class="sent">
    <p>Yes!</p>
    <p>I booked a table for seven.</p>
  </li>
  <li>
    <p>Perfect, see you there.</p>
  </li>
</ol>`;

const avatarCode = html`<ol class="chat">
  <li>
    <span class="avatar">AL</span>
    <p>Did you see the new designs?</p>
    <p>I think the colors are much better now.</p>
    <small><time datetime="09:41">09:41</time></small>
  </li>
  <li class="sent">
    <span class="avatar">ME</span>
    <p>Just looked. I love the new buttons.</p>
    <small><time datetime="09:43">09:43</time></small>
  </li>
</ol>`;

const typingCode = html`<ol class="chat">
  <li>
    <span class="avatar">AL</span>
    <p class="typing" aria-label="Alex is typing"></p>
  </li>
</ol>`;

const chatBoxMessages = html`<ol class="chat">
  <li>
    <span class="avatar">AL</span>
    <p>Can you send me the report?</p>
  </li>
  <li class="sent">
    <p>Sure, give me a minute.</p>
    <p>Sent! Check your inbox.</p>
    <small>Read</small>
  </li>
  <li>
    <span class="avatar">AL</span>
    <p>Got it, thanks!</p>
  </li>
</ol>`;

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
            Messages in bubbles, using <code>&lt;ol class="chat"&gt;</code>.
            Each <code>&lt;li&gt;</code> is one turn from one sender, and each
            <code>&lt;p&gt;</code> in it is one bubble.
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
              max-width: 30rem;
              min-height: 40rem;
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

          <article
            id="chat-example"
            class="secondary"
            style="width: 100%"
            x-data="chat"
          >
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

            <section x-ref="output">
              <div class="empty" x-show="messages.length === 0">
                ${raw(icon("message-circle"))}
                <h3>Morning, erikt!</h3>
                <p>
                  What are we working on today? Press send to start a new
                  conversation
                </p>
              </div>

              <ul x-show="messages.length > 0" class="chat">
                <template x-for="message in messages">
                  <li
                    :class="message.sender === 'me' ? 'sent' : ''"
                    x-html="message.message"
                  ></li>
                </template>
              </ul>
            </section>

            <footer>
              <form x-ref="form" @submit="onSubmit">
                <textarea x-text="qued?.message" name="textarea"></textarea>
                <button class="square round" type="submit">
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
        <h2 id="default">Default</h2>
        <p>
          Add <code>sent</code> to the <code>&lt;li&gt;</code> for the current
          user's messages. They move to the other side and use the primary
          color. Bubbles in the same turn get tighter corners where they meet.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">${raw(defaultCode)}</div>
        <div class="code-block">${raw(await highlight(defaultCode))}</div>
      </div>

      <div class="prose">
        <h2 id="avatar-and-time">Avatar and time</h2>
        <p>
          Put an <a href="${url("/components/avatar")}">Avatar</a> first in the
          turn. It sits at the bottom, next to the last bubble. A
          <code>&lt;small&gt;</code> last in the turn shows the time or the read
          status.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">${raw(avatarCode)}</div>
        <div class="code-block">${raw(await highlight(avatarCode))}</div>
      </div>

      <div class="prose">
        <h2 id="typing">Typing</h2>
        <p>
          Add <code>typing</code> to an empty bubble to show three dots while
          the other person writes. Give it an <code>aria-label</code>, so screen
          readers know what it means. The dots stop when the user prefers
          reduced motion.
        </p>
      </div>
      <div class="example">
        <div class="preview preview-padded">${raw(typingCode)}</div>
        <div class="code-block">${raw(await highlight(typingCode))}</div>
      </div>

      <div class="prose">
        <h2 id="chat-box">Chat box</h2>
        <p>
          Put the chat in a <a href="${url("/components/card")}">Card</a> with a
          <a href="${url("/components/text-field")}">Text Field</a>
          below it. Set a height on the list and let it scroll.
        </p>
      </div>
      <div class="example">
        <div class="preview">
          <article style="width: 100%; max-width: 24rem">
            <header>Alex</header>
            ${raw(
              chatBoxMessages
                .toString()
                .replace(
                  '<ol class="chat">',
                  '<ol class="chat" style="padding: var(--ui-spacing-4); max-height: 20rem; overflow-y: auto">',
                ),
            )}
            <footer>
              <label style="width: 100%">
                <input
                  type="text"
                  placeholder="Write a message"
                  aria-label="Message"
                />
                <button data-suffix class="square" aria-label="Send">
                  ${raw(icon("send"))}
                </button>
              </label>
            </footer>
          </article>
        </div>
        <div class="code-block">
          ${raw(
            await highlight(`<article>
  <header>Alex</header>
  ${chatBoxMessages.toString().replace('<ol class="chat">', '<ol class="chat" style="padding: var(--ui-spacing-4); max-height: 20rem; overflow-y: auto">')}
  <footer>
    <label>
      <input type="text" placeholder="Write a message" aria-label="Message" />
      <button data-suffix class="square" aria-label="Send"><svg>...</svg></button>
    </label>
  </footer>
</article>`),
          )}
        </div>
      </div>

      ${apiReference([
        {
          type: "Sender",
          values: [".sent"],
          description:
            "On the li. Moves the turn to the other side and uses the primary color",
        },
        {
          type: "Typing",
          values: [".typing"],
          description: "On an empty p. Shows three animated dots",
        },
        {
          type: "Radius",
          values: ["--ui-chat-radius"],
          description: "Corner radius of a bubble",
        },
        {
          type: "Tail",
          values: ["--ui-chat-tail"],
          description: "Corner radius where bubbles in the same turn meet",
        },
      ])}
    `,
  });
}
