import St from 'gi://St';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

const BinLauncher = GObject.registerClass(
    class BinLauncher extends PanelMenu.Button {
        _init() {
            super._init(0.5, 'BinLauncher');

            const icon = new St.Icon({
                icon_name: 'utilities-terminal-symbolic',
                style_class: 'system-status-icon',
            });

            this.add_child(icon);
            this._loadScripts();
        }

        _loadScripts() {
            const homeDir = GLib.get_home_dir();
            const binDir = Gio.File.new_for_path(`${homeDir}/bin/launch/`);

            try {
                const enumerator = binDir.enumerate_children(
                    'standard::name,standard::type',
                    Gio.FileQueryInfoFlags.NONE,
                    null
                );

                let info;
                let count = 0;
                while ((info = enumerator.next_file(null)) !== null) {
                    const name = info.get_name();
                    const path = `${homeDir}/bin/launch/${name}`;

                    const item = new PopupMenu.PopupMenuItem(name);
                    item.connect('activate', () => {
                        GLib.spawn_command_line_async(`kitty --detach "${path}"`);
                    });
                    this.menu.addMenuItem(item);
                    count++;
                }

                if (count === 0) {
                    this.menu.addMenuItem(
                        new PopupMenu.PopupMenuItem('(Empty ~/bin/launch/)', { reactive: false })
                    );
                }

                enumerator.close(null);
            } catch (e) {
                log(`BinLauncher error: ${e.message}`);
            }
        }
    });

export default class MyBinLauncherExtension {
    enable() {
        this._instance = new BinLauncher();
        Main.panel.addToStatusArea('bin-launcher', this._instance);
    }

    disable() {
        if (this._instance) {
            this._instance.destroy();
            this._instance = null;
        }
    }
}
