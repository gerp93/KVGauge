# Contributing to KVGauge

Thank you for your interest in contributing to KVGauge! This document provides guidelines and information for contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/KVGauge.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`

## Development Setup

### Prerequisites
- Node.js 14.x or higher
- Elgato Stream Deck software
- Git

### Testing Your Changes

1. Copy the plugin to Stream Deck plugins folder:
   - Windows: `%appdata%\Elgato\StreamDeck\Plugins\com.gerp93.kvgauge.sdPlugin`
   - macOS: `~/Library/Application Support/com.elgato.StreamDeck/Plugins/com.gerp93.kvgauge.sdPlugin`

2. Restart Stream Deck software

3. Check logs for errors:
   - Windows: `%appdata%\Elgato\StreamDeck\logs\`
   - macOS: `~/Library/Logs/ElgatoStreamDeck/`

## Code Style

- Use 2 spaces for indentation
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code patterns

## Adding New Metrics

To add a new system metric (e.g., GPU, RAM):

1. **Update manifest.json**: Add a new action definition
   ```json
   {
     "Name": "Your Metric Name",
     "UUID": "com.gerp93.kvgauge.yourmetric",
     "Icon": "Images/actions/yourmetric",
     "Tooltip": "Description",
     "States": [...],
     "PropertyInspectorPath": "propertyinspector.html",
     "SupportedInMultiActions": true,
     "Controllers": ["Keypad"]
   }
   ```

2. **Add icon**: Create an icon at `Images/actions/yourmetric.png` (144x144 pixels)

3. **Update plugin.js**: 
   - Add your action UUID to the `ACTIONS` constant
   - Create a function to fetch the metric
   - Add a case in the `updateDisplay` switch statement

4. **Update documentation**: Document the new metric in README.md

## Pull Request Process

1. Ensure your code follows the existing style
2. Update documentation if needed
3. Test your changes thoroughly
4. Update the version number in `manifest.json` and `package.json` (follow [Semantic Versioning](https://semver.org/))
5. Create a pull request with a clear description of changes

## Feature Ideas

Here are some features that would be great additions:

### High Priority
- [ ] GPU monitoring (usage, temperature, memory)
- [ ] RAM usage monitoring
- [ ] Network statistics (upload/download speed)
- [ ] Disk I/O monitoring

### Medium Priority
- [ ] Custom alert thresholds with visual indicators
- [ ] Graphical displays (bars, gauges, graphs)
- [ ] Per-core CPU monitoring
- [ ] Fan speed monitoring
- [ ] Process monitoring (top CPU/RAM consumers)

### Low Priority
- [ ] Historical graphs
- [ ] Export metrics to CSV
- [ ] Custom metric formulas
- [ ] Multiple profile support

## Reporting Issues

When reporting issues, please include:
- Operating system and version
- Stream Deck software version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Relevant log excerpts

## Questions?

Feel free to open an issue for questions or discussion!

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.
