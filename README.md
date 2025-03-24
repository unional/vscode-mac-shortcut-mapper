# vscode-macos-key-mapper

This is a Visual Studio Code extension that allows users to mimic their MacOS keyboard shortcuts in Windows.

## Features

Keybindings in MacOS heavily rely on the Command (⌘) key.
In Windows, the equivalent key is the Windows (⊞) key.
However, it is primarily used for system-level shortcuts,
making it not possible to configure keybindings in the same way as MacOS within Visual Studio Code.

This extension uses [AutoHotkey](https://www.autohotkey.com/) to intercept key presses and remap them to the appropriate Windows key equivalents.

## Requirements

To use this extension, you need to have [AutoHotkey](https://www.autohotkey.com/) installed on your system.
You can download it from [here](https://www.autohotkey.com/).
Once installed, the extension will automatically detect the AutoHotkey installation and set up the necessary key mappings.
