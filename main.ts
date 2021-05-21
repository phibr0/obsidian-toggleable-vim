import { MarkdownView, Plugin, WorkspaceLeaf } from 'obsidian';

export default class ToggleVimPlugin extends Plugin {

	async onload() {
		this.addCommand({
			id: 'toggle-vim-mode',
			name: 'Toggle Vim Mode',
			checkCallback: (checking: boolean) => {
				let leaf: WorkspaceLeaf = this.app.workspace.activeLeaf;
				if (leaf.view instanceof MarkdownView) {
					if (!checking) {
						//@ts-ignore
						this.app.vault.setConfig("vimMode", !this.app.vault.getConfig("vimMode"));
						this.app.workspace.iterateAllLeaves(async (i) => {
							if (i.view instanceof MarkdownView) {
								//@ts-ignore
								i.view.editor.cm.setOption("keyMap", this.app.vault.getConfig("vimMode")?"vim":"default");
								//@ts-ignore
								i.view.editor.cm.refresh();
							}
						});
					}
					return true;
				}
				return false;
			}
		});
	}

	onunload() {
		console.log('unloading plugin');
	}

}
