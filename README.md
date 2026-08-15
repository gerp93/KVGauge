# KVGauge

Stream Deck Computer Component Stat Monitor

Monitor your CPU usage, temperature, and clock speed directly on your Stream Deck!

This repo follows the shared conventions in
[gerp93/KVG_Standards](https://github.com/gerp93/KVG_Standards) (release
pipeline, licensing, etc.) — see that repo for the org-wide rules this one
is expected to keep up with.

## Features

- 📊 **CPU Usage**: Real-time CPU utilization percentage
- 🌡️ **CPU Temperature**: Monitor CPU temperature (when available)
- ⚡ **CPU Clock Speed**: Display current CPU frequency in GHz
- 🔄 **Auto-updating**: Metrics update every 2 seconds by default
- ⚙️ **Configurable**: Adjust update intervals through the property inspector

## Installation

### Prerequisites
- [Elgato Stream Deck](https://www.elgato.com/en/downloads) software (version 5.0 or higher)
- [Node.js](https://nodejs.org/) (version 14 or higher)

### Steps

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/gerp93/KVGauge.git
   ```

2. **Install plugin dependencies**
   ```bash
   cd KVGauge/com.gerp93.kvgauge.sdPlugin
   npm install
   ```

3. **Copy the plugin bundle to your Stream Deck plugins folder**

   - **Windows**: Copy the `com.gerp93.kvgauge.sdPlugin` folder to:
     ```
     %appdata%\Elgato\StreamDeck\Plugins\
     ```
   - **macOS**: Copy the `com.gerp93.kvgauge.sdPlugin` folder to:
     ```
     ~/Library/Application Support/com.elgato.StreamDeck/Plugins/
     ```
   - **Linux / Steam Deck**: Copy the `com.gerp93.kvgauge.sdPlugin` folder to:
     ```
     ~/.local/share/elgato/StreamDeck/Plugins/
     ```

   The resulting path should look like:
   - Windows: `%appdata%\Elgato\StreamDeck\Plugins\com.gerp93.kvgauge.sdPlugin\`
   - macOS: `~/Library/Application Support/com.elgato.StreamDeck/Plugins/com.gerp93.kvgauge.sdPlugin/`

4. **Reload Stream Deck**
   - Quit and reopen the Stream Deck application (or use **Stream Deck → Quit** from the menu bar on macOS / system tray on Windows, then relaunch it).
   - The **KV Gauge** category should now appear in the actions list.

### Building a `.streamDeckPlugin` installer

You can produce a double-click installer that Stream Deck will import automatically:

1. Run `npm install` inside `com.gerp93.kvgauge.sdPlugin/` (so `node_modules/` is present).
2. Compress the `com.gerp93.kvgauge.sdPlugin` folder as a ZIP archive.
3. Rename the archive's extension from `.zip` to `.streamDeckPlugin`.
4. Double-click the `.streamDeckPlugin` file — Stream Deck will install it automatically.

## Usage

1. Open Stream Deck software
2. Find "KV Gauge" in the actions list under "System Monitoring"
3. Drag and drop any of the following actions to your Stream Deck:
   - **CPU Usage** – Shows current CPU utilization as a percentage
   - **CPU Temperature** – Shows CPU temperature in Celsius
   - **CPU Clock Speed** – Shows CPU frequency in GHz
4. Click on an action to configure update intervals in the property inspector

## Supported Platforms

- Windows 10 or higher
- macOS 10.14 or higher
- Linux (including Steam Deck / SteamOS)

## Notes

- Temperature readings may not be available on all systems
- Some metrics may require administrator/elevated privileges
- Default update interval is 2 seconds (configurable from 1–10 seconds)

## Future Enhancements

- GPU monitoring (usage, temperature, clock speed)
- RAM usage monitoring
- Network statistics
- Disk I/O monitoring
- Custom alert thresholds
- Graphical displays

## License

AGPL-3.0

## Author

gerp93

