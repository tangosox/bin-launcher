# Bin Launcher GNOME Extension

A simple GNOME Shell extension that adds a panel icon to launch scripts from `~/bin/launch/` using `kitty`.

---

## 🔧 Features

- Adds an icon to your top panel
- Shows a dropdown list of scripts in `~/bin/launch/`
- Clicking an entry launches the script in a detached terminal (`kitty --detach`)
- Displays a placeholder if the folder is empty

---

## 📂 Folder Naming for GNOME

GNOME requires the extension folder name to match the `uuid` in `metadata.json`.

## This project uses: asdf
    
    ```json
    "uuid": "my-bin-launcher@paul.local"
    
    So your local folder must be named:
        
~/.local/share/gnome-shell/extensions/my-bin-launcher@paul.local/

If you rename the extension or change the UUID, make sure the folder name and metadata.json match.
🖥️ Changing the Terminal

By default, this extension uses:

GLib.spawn_command_line_async(`kitty --detach "${path}"`);

You can change kitty to your preferred terminal. Examples:

// GNOME Terminal:
GLib.spawn_command_line_async(`gnome-terminal -- "${path}"`);

// foot:
GLib.spawn_command_line_async(`foot -e "${path}"`);

// alacritty:
GLib.spawn_command_line_async(`alacritty -e "${path}"`);

Make sure the terminal you use supports -e or a similar flag for executing commands.
📦 Installation

Clone this repository:

git clone https://github.com/YOUR_USERNAME/bin-launcher.git

Copy the files to your GNOME extensions directory:

mkdir -p ~/.local/share/gnome-shell/extensions/my-bin-launcher@paul.local
cp -r bin-launcher/* ~/.local/share/gnome-shell/extensions/my-bin-launcher@paul.local

Restart GNOME Shell:

Press <kbd>Alt</kbd>+<kbd>F2</kbd>, type r, and press <kbd>Enter</kbd>
Or log out and log back in

Enable the extension:

gnome-extensions enable my-bin-launcher@paul.local

✅ Requirements

GNOME Shell 45–48

kitty (or any terminal you configure it to use)

Executable scripts in ~/bin/launch/
(Make them executable with chmod +x)
