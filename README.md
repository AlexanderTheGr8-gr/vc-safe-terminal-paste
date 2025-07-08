# Safe Terminal Paste

Are you tired of pasting harmful data in your terminal without realizing?
Are you afraid you may ruin something in your remote server by accidental paste?
Then this plugin is your saviour!

## Features

#### Available commands
- `safeTerminalPaste.confirmPaste` get's current clipboard
  - if it's single line, it's passed to active terminal
  - if it's multiline, it's previewed in a popup. Enter to confirm, Esc to cancel.

#### Keybindings (Suggested)
- `ctrl + v`: safeTerminalPaste.confirmPaste [when: `terminalFocus`]

<!-- ## Requirements -->

<!-- If you have any requirements or dependencies, add a section describing those and how to install and configure them. -->

## Extension Settings

- `safeTerminalPaste.newlineSymbol`: Choose how the new line will be styled in the single-line input box

## Known Issues

VCode (at least in version 1.77.3 where I am stranded) does not seem to provide a "Modal" popup,
so we have to use a plain, single-liner, input box... This of course has as a result that a multi-line text
has to be presented as a single-line text.

(There is a "web view" option, but it takes a complete editor pane... Doesn't look nice)

Also, in order for this to work, you will have to add this in your settings:
```
"terminal.integrated.commandsToSkipShell": [
  // skip the shell for your custom paste preview command
  "safeTerminalPaste.confirmPaste"
],
```
or if you already have this entry `terminal.integrated.commandsToSkipShell`, then inside it add: `"safeTerminalPaste.confirmPaste"`


## Misc

[Github repo](https://github.com/AlexanderTheGr8-gr/vc-safe-terminal-paste).

<!-- ## Release Notes

Users appreciate release notes as you update your extension. -->

<!-- ### 1.0.0

Initial release of ... -->

<!-- ---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!** -->
