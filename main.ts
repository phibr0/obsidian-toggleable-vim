import { EditorPosition, MarkdownView, Plugin, WorkspaceLeaf } from 'obsidian';

export default class ToggleVimPlugin extends Plugin {

	async toggleVimMode(leaf: WorkspaceLeaf) {
		//@ts-ignore
		this.app.vault.setConfig("vimMode", !this.app.vault.getConfig("vimMode"));
		await this.app.workspace.duplicateLeaf(leaf);
		//@ts-ignore
		const cursorPos: EditorPosition = leaf.view.editor.getCursor();
		leaf.detach();
		//@ts-ignore
		this.app.workspace.activeLeaf.view.editor.setCursor(cursorPos);
	}

	async onload() {

		this.addCommand({
			id: 'toggle-vim-mode',
			name: 'Toggle Vim Mode',
			checkCallback: (checking: boolean) => {
				let leaf: WorkspaceLeaf = this.app.workspace.activeLeaf;
				if (leaf.view instanceof MarkdownView) {
					if (!checking) {
						this.toggleVimMode(leaf);
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
