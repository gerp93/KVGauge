#!/usr/bin/env node

/**
 * KV Gauge - Stream Deck CPU Monitoring Plugin
 * Monitors CPU usage, temperature, and clock speed
 */

const si = require('systeminformation');
const WebSocket = require('ws');

// WebSocket connection to Stream Deck
let websocket = null;
let pluginUUID = null;

// Store active contexts and their settings
const contexts = {};

// Update intervals for each metric type
const updateIntervals = {};

// Action UUIDs
const ACTIONS = {
  CPU_USAGE: 'com.gerp93.kvgauge.cpuusage',
  CPU_TEMP: 'com.gerp93.kvgauge.cputemp',
  CPU_CLOCK: 'com.gerp93.kvgauge.cpuclock'
};

/**
 * Get CPU usage percentage
 */
async function getCPUUsage() {
  try {
    const load = await si.currentLoad();
    return Math.round(load.currentLoad);
  } catch (error) {
    console.error('Error getting CPU usage:', error);
    return null;
  }
}

/**
 * Get CPU temperature
 */
async function getCPUTemperature() {
  try {
    const temp = await si.cpuTemperature();
    if (temp.main !== null && temp.main > 0) {
      return Math.round(temp.main);
    }
    // Fall back to max temperature (common on Linux)
    if (temp.max !== null && temp.max > 0) {
      return Math.round(temp.max);
    }
    // Fall back to first core temperature
    if (temp.cores && temp.cores.length > 0 && temp.cores[0] > 0) {
      return Math.round(temp.cores[0]);
    }
    return null;
  } catch (error) {
    console.error('Error getting CPU temperature:', error);
    return null;
  }
}

/**
 * Get CPU clock speed
 */
async function getCPUClock() {
  try {
    const currentSpeed = await si.cpuCurrentSpeed();
    if (currentSpeed.avg && currentSpeed.avg > 0) {
      return Number(currentSpeed.avg.toFixed(2));
    }
    // Fall back to base speed if current speed is unavailable
    const cpuData = await si.cpu();
    if (cpuData.speed) {
      return Number(cpuData.speed.toFixed(2));
    }
    return null;
  } catch (error) {
    console.error('Error getting CPU clock:', error);
    return null;
  }
}

/**
 * Update the display for a specific context
 */
async function updateDisplay(context, action) {
  if (!websocket || !contexts[context]) {
    return;
  }

  let value = null;
  let title = '';

  switch (action) {
    case ACTIONS.CPU_USAGE:
      value = await getCPUUsage();
      if (value !== null) {
        title = `${value}%`;
      }
      break;

    case ACTIONS.CPU_TEMP:
      value = await getCPUTemperature();
      if (value !== null) {
        title = `${value}°C`;
      } else {
        title = 'N/A';
      }
      break;

    case ACTIONS.CPU_CLOCK:
      value = await getCPUClock();
      if (value !== null) {
        title = `${value} GHz`;
      }
      break;
  }

  // Send title update to Stream Deck
  if (title) {
    const payload = {
      event: 'setTitle',
      context: context,
      payload: {
        title: title,
        target: 0
      }
    };
    websocket.send(JSON.stringify(payload));
  }
}

/**
 * Start periodic updates for a context
 */
function startUpdates(context, action) {
  // Clear any existing interval
  if (updateIntervals[context]) {
    clearInterval(updateIntervals[context]);
    delete updateIntervals[context];
  }

  // Update immediately
  updateDisplay(context, action);

  // Get update interval from settings, default to 2 seconds
  const updateInterval = contexts[context]?.settings?.updateInterval || 2000;

  // Set up periodic updates
  updateIntervals[context] = setInterval(() => {
    updateDisplay(context, action);
  }, updateInterval);
}

/**
 * Stop updates for a context
 */
function stopUpdates(context) {
  if (updateIntervals[context]) {
    clearInterval(updateIntervals[context]);
    delete updateIntervals[context];
  }
}

/**
 * Handle incoming messages from Stream Deck
 */
function handleMessage(message) {
  let jsonObj;
  try {
    jsonObj = JSON.parse(message);
  } catch (error) {
    console.error('Failed to parse message:', error);
    return;
  }

  const event = jsonObj.event;
  const context = jsonObj.context;
  const action = jsonObj.action;

  console.log(`Received event: ${event}`);

  switch (event) {
    case 'keyDown':
      // Key pressed - could trigger refresh or other actions
      if (contexts[context]) {
        updateDisplay(context, action);
      }
      break;

    case 'keyUp':
      // Key released - no action needed for monitoring
      break;

    case 'willAppear':
      // Action appeared on Stream Deck
      contexts[context] = {
        action: action,
        settings: jsonObj.payload?.settings || {}
      };
      startUpdates(context, action);
      break;

    case 'willDisappear':
      // Action removed from Stream Deck
      stopUpdates(context);
      delete contexts[context];
      break;

    case 'didReceiveSettings':
      // Settings updated
      if (contexts[context]) {
        contexts[context].settings = jsonObj.payload?.settings || {};
        // Restart updates with new interval
        startUpdates(context, action);
      }
      break;

    case 'propertyInspectorDidAppear':
      // Property inspector opened
      break;

    case 'propertyInspectorDidDisappear':
      // Property inspector closed
      break;

    case 'sendToPlugin':
      // Message from property inspector
      break;
  }
}

/**
 * Connect to Stream Deck
 */
function connectElgatoStreamDeckSocket(inPort, inPluginUUID, inRegisterEvent, inInfo) {
  pluginUUID = inPluginUUID;

  // Create WebSocket connection
  websocket = new WebSocket(`ws://127.0.0.1:${inPort}`);

  websocket.on('open', () => {
    console.log('Connected to Stream Deck');

    // Register plugin
    const json = {
      event: inRegisterEvent,
      uuid: inPluginUUID
    };
    websocket.send(JSON.stringify(json));
  });

  websocket.on('message', (message) => {
    try {
      // Convert Buffer to string if needed
      const messageStr = typeof message === 'string' ? message : message.toString();
      handleMessage(messageStr);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  websocket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  websocket.on('close', () => {
    console.log('Disconnected from Stream Deck');
    // Clean up all intervals
    Object.keys(updateIntervals).forEach(context => {
      stopUpdates(context);
    });
  });
}

// Parse command line arguments
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i += 2) {
  if (i + 1 < args.length) {
    const key = args[i].replace(/^-+/, '');
    const value = args[i + 1];
    params[key] = value;
  }
}

// Connect to Stream Deck
if (params.port && params.pluginUUID && params.registerEvent && params.info) {
  connectElgatoStreamDeckSocket(
    params.port,
    params.pluginUUID,
    params.registerEvent,
    params.info
  );
} else {
  console.error('Missing required parameters');
  console.log('This plugin must be launched by Stream Deck software');
  process.exit(1);
}
