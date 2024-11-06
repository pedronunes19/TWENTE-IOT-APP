import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';

// Importing images
import stillImage from '../assets/images/still.png';
import runningImage from '../assets/images/running.png';
import pushUpsImage from '../assets/images/push-ups.png';
import squatsImage from '../assets/images/squats.png';
//import jumpingJacksImage from '../assets/images/jumping-jacks.png';

export default function App() {
  const activityNames = [
    "Still",
    "Running",
    "Push-Ups",
    "Squats",
    "Jumping Jacks"
  ];

  // Mapping activities to images
  const activities = new Map([
    ["Still", stillImage],
    ["Running", runningImage],
    ["Push-Ups", pushUpsImage],
    ["Squats", squatsImage],
    ["Jumping Jacks", stillImage]
  ]);

  const [currentActivity, setCurrentActivity] = useState(activityNames[2]);
  const [currentActivityPNG, setCurrentActivityPNG] = useState(activities.get("Push-Ups"));

  return (
    <View>
      <View className="w-screen px-1 py-2 border-b-[3px] border-indigo-600 items-center">
        <Text className="text-xl text-indigo-600">What Thing Doing</Text>
      </View>
      
      <View className='p-2 h-screen items-center justify-center'>
        {/* Use the image directly */}
        <Image
          source={currentActivityPNG}
          style={{ width: 200, height: 200 }}
        />
        <Text>{currentActivity}</Text>
      </View>
    </View>
  );
}
