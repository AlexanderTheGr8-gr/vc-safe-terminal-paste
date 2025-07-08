import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/* export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "safe-terminal-paste" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('safe-terminal-paste.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from safe-terminal-paste!');
	});

	context.subscriptions.push(disposable);
} */

export function deactivate() {}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand(
    'safeTerminalPaste.confirmPaste',
    async () => {
      // Read clipboard
      let clip; if (!(clip = await vscode.env.clipboard.readText())) return;
      
      if (!isStrMultiline(clip)) return terminalPrint(clip);
      
      const preview = normalizeNewlines(clip);
      const confirmed = await vscode.window.showInputBox({
        value: preview,
        prompt: 'Preview paste. Send to terminal? Enter: Yes, Esc: No',
        ignoreFocusOut: false,
        valueSelection: [0, preview.length]
      });
      if (confirmed !== undefined) {
        terminalPrint(clip); // send the **real** multi-line clipboard text
      }
    }
  ));
}


// ─── Internal helpers ────────────────────────────────────────────────────────────
let strMultilineRegex = /[\r\n]/;
let lineTestsRegex = /^([^\r\n]+)(\r?\n*)$/;

/** Normalize CRLF/LF to plain LF */
function normalizeNewlines(text: string): string {
  const cfg = vscode.workspace.getConfiguration('safeTerminalPaste');
  const nlSymbol = cfg.get<string>('newlineSymbol', '↵');
  return text.replace(/\r\n/g, nlSymbol).replace(/[\r\n]/g, nlSymbol);
}

function isStrMultiline(text: string): boolean {
  return !!text.match(strMultilineRegex);
}

function isContentMultiline(text: string): boolean {
  return !text.match(lineTestsRegex);
}

function contentFirstLine(text: string): string {
  let m = text.match(lineTestsRegex);
  return m? m[1] : '';
}

/** Turn text into a boxed string (for debugging/logging) */
function terminalPrint(text: string): void {
  if (! vscode.window.activeTerminal) {
    vscode.window.showErrorMessage('No active terminal found');
    return;
  }
  
  vscode.window.activeTerminal.sendText(text, false);
}
