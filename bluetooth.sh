#!/bin/bash

DEVICE_MAC="CF:F9:41:A3:E8:40"


# Use bluetoothctl to connect to the BLE device
echo "Starting connection to BLE device at $DEVICE_MAC..."

# Start bluetoothctl and run commands within it
bluetoothctl << EOF
power on
agent on
default-agent
connect $DEVICE_MAC
EOF

# Check if the connection was successful
if bluetoothctl info "$DEVICE_MAC" | grep -q "Connected: yes"; then
    echo "Successfully connected to the BLE device at $DEVICE_MAC."
else
    echo "Failed to connect to the BLE device. Please check the device and try again."
fi
