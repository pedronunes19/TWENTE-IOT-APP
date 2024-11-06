import React, { useState, useEffect } from 'react';
import { Text, View, Image, Button, PermissionsAndroid, Platform } from 'react-native';

let BleManager;
/*if (Platform.OS !== 'web') {
  // Only import `react-native-ble-plx` on mobile
  BleManager = require('react-native-ble-plx').BleManager;
}*/

// Importing images
import stillImage from '../assets/images/still.png';
import runningImage from '../assets/images/running.png';
import pushUpsImage from '../assets/images/push-ups.png';
import squatsImage from '../assets/images/squats.png';
// import jumpingJacksImage from '../assets/images/jumping-jacks.png';

const DEVICE_ADDRESS = "C1:B0:66:6D:31:B7";  // Replace with the address of your device

export default function App() {
  const activityNames = ["Still", "Running", "Push-Ups", "Squats", "Jumping Jacks"];
  
  const activities = new Map([
    ["Still", stillImage],
    ["Running", runningImage],
    ["Push-Ups", pushUpsImage],
    ["Squats", squatsImage],
    ["Jumping Jacks", stillImage]
  ]);

  const [currentActivity, setCurrentActivity] = useState(activityNames[2]);
  const [currentActivityPNG, setCurrentActivityPNG] = useState(activities.get("Push-Ups"));
  const [deviceData, setDeviceData] = useState(null);

  const manager = Platform.OS !== 'web' ? new BleManager() : null;

  async function connectWithRetry(device, maxRetries = 10, timeout = 10000) {
    let attempt = 0;
    let server = null;
  
    while (attempt < maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1} to connect to device...`);
        
        const connectionPromise = device.gatt.connect();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Connection timeout")), timeout)
        );
  
        // Race between connection attempt and timeout
        server = await Promise.race([connectionPromise, timeoutPromise]);
  
        if (server && server.connected) {
          console.log("Connected to GATT server");
          return server; // Successfully connected
        }
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
      }
  
      attempt++;
      console.log(`Retrying (${attempt}/${maxRetries})...`);
    }
  
    throw new Error("Failed to connect to device after multiple attempts");
  }

  const connectToWebBluetoothDevice = async () => {
    try {
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ namePrefix: 'CPS' }],
        optionalServices: ['0000feaa-0000-1000-8000-00805f9b34fb']
      });
      console.log("Connected to device:", device.name);
      if (device.gatt){
        console.log(device.gatt)
      }
      
      if (device.gatt.connected) {
        device.gatt.disconnect();
      }
      console.log("o primeiro avião atingiu a torre");

      const server = await connectWithRetry(device);

      console.log("o segundo avião atingiu a torre");
      
      const service = await server.getPrimaryService('0000feaa-0000-1000-8000-00805f9b34fb');

      console.log("eleições presidenciais 2024");
      
      const customData = await service.readValue();
      console.log(customData);
      setDeviceData(customData); 
    } catch (error) {
      console.error("Error connecting to web Bluetooth device:", error);
    }
  };
/*
  useEffect(() => {
      /*
      const connectToBluetoothDevice = async () => {
        // Request permission on Android
        
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'Location permission is required for Bluetooth scanning',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location permission denied.");
            return;
          }
        }

        // Attempt to connect to the device
        try {
          const device = await manager.connectToDevice(DEVICE_ADDRESS);
          console.log("Connected to device:", device.name);

          await device.discoverAllServicesAndCharacteristics();
          
          // Replace with the actual service and characteristic UUIDs for your device
          const targetServiceUUID = "YOUR_SERVICE_UUID";
          const targetCharacteristicUUID = "YOUR_CHARACTERISTIC_UUID";
          
          const characteristic = await device.readCharacteristicForService(targetServiceUUID, targetCharacteristicUUID);
          const value = characteristic.value;  // Data received from the device
          setDeviceData(value);
        } catch (error) {
          console.log("Error connecting to device:", error);
        }
      };

      // Connect as soon as the component mounts
      connectToBluetoothDevice();

      // Clean up the BLE manager on unmount
      return () => manager.destroy();
    
  }, []);*/

  return (
    <View>
      <View className="w-screen px-1 py-2 border-b-[3px] border-indigo-600 items-center">
        <Text className="text-xl">What Thing Doing</Text>
      </View>
      
      <View className='p-2 h-screen items-center justify-center'>
        <Image
          source={currentActivityPNG}
          style={{ width: 200, height: 200 }}
        />
        <Text>{currentActivity}</Text>
        <Text>{deviceData ? `Device Data: ${deviceData}` : "No Data from Device"}</Text>
        {/* Button to connect to Bluetooth device */}
        {Platform.OS === "web" && (
          <Button title="Connect to Bluetooth" onPress={connectToWebBluetoothDevice} />
        )}
      </View>
    </View>
  );
}
