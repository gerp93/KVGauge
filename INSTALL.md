# Installation Guide

## For Users

### Prerequisites
- [Elgato Stream Deck](https://www.elgato.com/en/downloads) software (version 5.0 or higher)
- [Node.js](https://nodejs.org/) (version 14 or higher)

### Installing the Plugin

1. **Download the Plugin**
   ```bash
   git clone https://github.com/gerp93/KVGauge.git
   cd KVGauge
   ```

2. **Install Dependencies**
   ```bash
   cd com.gerp93.kvgauge.sdPlugin
   npm install
   cd ..
   ```

3. **Locate Your Stream Deck Plugins Folder**
   - **Windows**: `%appdata%\Elgato\StreamDeck\Plugins\`
   - **macOS**: `~/Library/Application Support/com.elgato.StreamDeck/Plugins/`

4. **Copy the Plugin Bundle**
   Copy the entire `com.gerp93.kvgauge.sdPlugin` folder (including `node_modules/`) into the plugins directory.
   The folder name **must** be `com.gerp93.kvgauge.sdPlugin` (case-sensitive).

5. **Reload Stream Deck**
   - Quit Stream Deck completely (system tray on Windows / menu bar on macOS).
   - Relaunch Stream Deck.
   - The **KV Gauge** category should appear in the actions list.

## For Developers

### Project Structure
```
com.gerp93.kvgauge.sdPlugin/
├── manifest.json              # Plugin configuration and metadata
├── index.html                 # Stream Deck entry point (CodePath wrapper)
├── plugin.js                  # Main plugin code (Node.js)
├── propertyinspector.html     # Settings UI
├── package.json               # Node.js dependencies
├── package-lock.json          # Dependency lock file
└── Images/
    ├── plugin.png             # Plugin icon
    ├── category.png           # Category icon
    └── actions/
        ├── cpuusage.png       # CPU Usage action icon
        ├── cputemp.png        # CPU Temperature action icon
        └── cpuclock.png       # CPU Clock action icon
```

### Building from Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/gerp93/KVGauge.git
   cd KVGauge
   ```

2. **Install dependencies**
   ```bash
   cd com.gerp93.kvgauge.sdPlugin
   npm install
   ```

3. **Test the plugin logic locally (Node.js CLI)**
   ```bash
   node plugin.js -port 12345 -pluginUUID test -registerEvent test -info "{}"
   ```

### Creating a Distribution Package (`.streamDeckPlugin`)

1. Make sure `node_modules/` is present inside `com.gerp93.kvgauge.sdPlugin/` (run `npm install` if not).
2. Compress the `com.gerp93.kvgauge.sdPlugin` folder as a ZIP archive.
3. Rename the archive extension from `.zip` to `.streamDeckPlugin`.
4. Double-click the `.streamDeckPlugin` file — Stream Deck will install it automatically.

### Development Tips

- **Testing**: Place the plugin folder directly in the plugins directory while developing.
- **Debugging**: Check Stream Deck logs at:
  - Windows: `%appdata%\Elgato\StreamDeck\logs\`
  - macOS: `~/Library/Logs/ElgatoStreamDeck/`
- **Hot Reload**: After making changes, restart Stream Deck to reload the plugin.

## Troubleshooting

### Plugin doesn't appear in Stream Deck
- Verify the folder inside the plugins directory is named exactly `com.gerp93.kvgauge.sdPlugin` (case-sensitive).
- Confirm that `node_modules/` exists inside the bundle (run `npm install` if missing).
- Ensure Node.js is installed and in your system PATH.
- Restart Stream Deck software.

### Temperature shows "N/A"
- Temperature sensors may not be available on all systems.
- On some systems, you may need to run Stream Deck with administrator/elevated privileges.
- Virtual machines typically don't have access to temperature sensors.

### Actions not updating
- Check Stream Deck logs for errors.
- Verify that the `systeminformation` package is properly installed inside the bundle.
- Ensure Node.js is accessible from the command line.

### "Cannot find module" errors
- Run `npm install` inside `com.gerp93.kvgauge.sdPlugin/`.
- Verify that `node_modules/` exists and contains `systeminformation` and `ws`.

## System Requirements

- **Operating System**: Windows 10+ or macOS 10.14+
- **Stream Deck Software**: Version 5.0 or higher
- **Node.js**: Version 14.x or higher
- **RAM**: Minimal impact (< 50 MB)
- **CPU**: Negligible impact (monitoring runs at 2-second intervals)

## Security Notes

- This plugin uses the `systeminformation` library (v5.x) which is regularly updated for security.
- The plugin only reads system metrics — it does not modify system settings.
- All communication stays local between Stream Deck and the plugin (no internet connection required).

## Future Enhancements

Planned features for future versions:
- GPU monitoring (usage, temperature, VRAM)
- RAM usage and availability
- Network throughput monitoring
- Disk I/O statistics
- Custom alert thresholds with color changes
- Graphical bar/gauge displays
- Per-core CPU monitoring
- Fan speed monitoring

