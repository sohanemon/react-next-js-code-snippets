import { ExtensionContext, commands, window } from 'vscode';
import { showInputBox, showQuickPick } from './lib/basicInput';
import { multiStepInput } from './lib/multiStepInput';
import { quickOpen } from './lib/quickOpen';

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand('shadcn.installComponents', async () => {
      const options: {
        [key: string]: (context: ExtensionContext) => Promise<void>;
      } = {
        showQuickPick,
        showInputBox,
        multiStepInput,
        quickOpen,
      };
      const quickPick = window.createQuickPick();
      quickPick.items = Object.keys(options).map((label) => ({ label }));
      quickPick.onDidChangeSelection((selection) => {
        if (selection[0]) {
          options[selection[0].label](context).catch(console.error);
        }
      });
      quickPick.onDidHide(() => quickPick.dispose());
      quickPick.show();
    })
  );
}
