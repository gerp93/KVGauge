# Installation Guide

## For Users

### Prerequisites
- [Elgato Stream Deck](https://www.elgato.com/en/downloads) software (version 5.0 or higher)
- [Node.js](https://nodejs.org/) (version 14 or higher)

### Installing the Plugin

1. **Download the Plugin**
   - Clone or download this repository
   ```bash
   git clone https://github.com/gerp93/KVGauge.git
   cd KVGauge
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Locate Your Stream Deck Plugins Folder**
   - **Windows**: `%appdata%\Elgato\StreamDeck\Plugins\`
   - **macOS**: `~/Library/Application Support/com.elgato.StreamDeck/Plugins/`

4. **Create Plugin Directory**
   - Create a folder named `com.gerp93.kvgauge.sdPlugin` in the plugins directory
   - Copy all files from this repository into that folder

5. **Restart Stream Deck Software**
   - Quit and reopen the Stream Deck software
   - The plugin should now appear in the actions list

## For Developers

### Project Structure
```
com.gerp93.kvgauge.sdPlugin/
├── manifest.json              # Plugin configuration and metadata
├── plugin.js                  # Main plugin code (Node.js)
├── propertyinspector.html     # Settings UI
├── package.json               # Node.js dependencies
├── package-lock.json          # Dependency lock file
├── .gitignore                 # Git ignore rules
├── Images/
│   ├── plugin.png            # Plugin icon
│   ├── category.png          # Category icon
│   └── actions/
│       ├── cpuusage.png      # CPU Usage action icon
│       ├── cputemp.png       # CPU Temperature action icon
│       └── cpuclock.png      # CPU Clock action icon
└── README.md                 # Documentation
```

### Building from Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/gerp93/KVGauge.git
   cd KVGauge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Test the plugin locally**
   ```bash
   node plugin.js -port 12345 -pluginUUID test -registerEvent test -info "{}"
   ```

### Creating a Distribution Package

To distribute the plugin:

1. Create a folder named `com.gerp93.kvgauge.sdPlugin`
2. Copy all necessary files:
   - manifest.json
   - plugin.js
   - propertyinspector.html
   - package.json
   - package-lock.json
   - node_modules/ (after running npm install)
   - Images/ (all icons)
3. Compress the folder as a ZIP file
4. Rename the extension from `.zip` to `.streamDeckPlugin`
5. Double-click the `.streamDeckPlugin` file to install

### Development Tips

- **Testing**: While developing, you can place the plugin folder directly in the plugins directory
- **Debugging**: Check Stream Deck logs at:
  - Windows: `%appdata%\Elgato\StreamDeck\logs\`
  - macOS: `~/Library/Logs/ElgatoStreamDeck/`
- **Hot Reload**: When making changes, restart the Stream Deck software to reload the plugin

## Troubleshooting

### Plugin doesn't appear in Stream Deck
- Verify the folder is named `com.gerp93.kvgauge.sdPlugin` (case-sensitive)
- Check that all files are present and properly copied
- Ensure Node.js is installed and in your system PATH
- Restart Stream Deck software

### Temperature shows "N/A"
- Temperature sensors may not be available on all systems
- On some systems, you may need to run Stream Deck with administrator/elevated privileges
- Virtual machines typically don't have access to temperature sensors

### Actions not updating
- Check Stream Deck logs for errors
- Verify that `systeminformation` package is properly installed
- Ensure Node.js is accessible from the command line

### "Cannot find module" errors
- Run `npm install` in the plugin directory
- Verify that `node_modules` folder exists and contains `systeminformation`

## System Requirements

- **Operating System**: Windows 10+ or macOS 10.14+
- **Stream Deck Software**: Version 5.0 or higher
- **Node.js**: Version 14.x or higher
- **RAM**: Minimal impact (< 50MB)
- **CPU**: Negligible impact (monitoring runs at 2-second intervals)

## Security Notes

- This plugin uses the `systeminformation` library (v5.23.7) which is regularly updated for security
- The plugin only reads system metrics - it does not modify system settings
- All communication stays local between Stream Deck and the plugin (no internet connection required)

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
