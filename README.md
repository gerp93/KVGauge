# KVGauge

Stream Deck Computer Component Stat Monitor

Monitor your CPU usage, temperature, and clock speed directly on your Stream Deck!

## Features

- 📊 **CPU Usage**: Real-time CPU utilization percentage
- 🌡️ **CPU Temperature**: Monitor CPU temperature (when available)
- ⚡ **CPU Clock Speed**: Display current CPU frequency in GHz
- 🔄 **Auto-updating**: Metrics update every 2 seconds by default
- ⚙️ **Configurable**: Adjust update intervals through the property inspector

## Installation

### Prerequisites
- Elgato Stream Deck (software version 5.0 or higher)
- Node.js installed on your system

### Steps

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the plugin folder to your Stream Deck plugins directory:
   - **Windows**: `%appdata%\Elgato\StreamDeck\Plugins\`
   - **macOS**: `~/Library/Application Support/com.elgato.StreamDeck/Plugins/`
4. Restart Stream Deck software

## Usage

1. Open Stream Deck software
2. Find "KV Gauge" in the actions list under "System Monitoring"
3. Drag and drop any of the following actions to your Stream Deck:
   - **CPU Usage** - Shows current CPU utilization as a percentage
   - **CPU Temperature** - Shows CPU temperature in Celsius
   - **CPU Clock Speed** - Shows CPU frequency in GHz
4. Click on an action to configure update intervals in the property inspector

## Supported Platforms

- Windows 10 or higher
- macOS 10.14 or higher

## Notes

- Temperature readings may not be available on all systems
- Some metrics may require administrator/elevated privileges
- Default update interval is 2 seconds (configurable from 1-10 seconds)

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
