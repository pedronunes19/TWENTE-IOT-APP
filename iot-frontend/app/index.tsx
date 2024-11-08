import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';

// Importing images
import stillImage from '../assets/images/still.png';
import runningImage from '../assets/images/running.png';
import pushUpsImage from '../assets/images/push-ups.png';
import squatsImage from '../assets/images/squats.png';

export default function App() {
  const activityNames = ["Still", "Running", "Push-Ups", "Squats"];
  
  const activities = new Map([
    ["Still", stillImage],
    ["Running", runningImage],
    ["Push-Ups", pushUpsImage],
    ["Squats", squatsImage]
  ]);

  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const currentActivity = activityNames[currentActivityIndex];
  const currentActivityPNG = activities.get(currentActivity);


  const [lastActivities, setLastActivities] = useState<{ activity: string; time: number }[]>([]);


  // Helper function to generate a random interval between 5 and 30 seconds
  const getRandomInterval = () => Math.floor(Math.random() * (20 - 5 + 1) + 5) * 1000;

  useEffect(() => {

    let interval = getRandomInterval()

    // Set a random interval to change the activity
    const activityInterval = setInterval(() => {

      // Update the state to add the new activity
      setLastActivities((prevActivities) => {
        // Add the new activity to the front of the array
        const updatedActivities = [{activity: currentActivity, time: interval/1000}, ...prevActivities];

        // Ensure the array doesn't exceed 5 items
        if (updatedActivities.length > 5) {
          updatedActivities.pop(); // Remove the last item (oldest activity)
        }

        return updatedActivities;
      });
      setCurrentActivityIndex((prevIndex) => (prevIndex + 1) % activityNames.length);
    }, interval);

    // Cleanup interval on unmount or before setting a new interval
    return () => clearInterval(activityInterval);
  }, [currentActivityIndex]);

  useEffect(() => {

    
    // Reset time elapsed to 0 when activity changes
    setTimeElapsed(0);

    // Start counting time for current activity
    const timeInterval = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    // Cleanup timer when activity changes
    return () => clearInterval(timeInterval);
  }, [currentActivityIndex]);

  return (
    <View className='bg-white	'>
      <View className="mt-6 -screen px-1 py-2 border-b-[3px] border-indigo-600 items-center">
        <Text className="text-xl">What Thing Doing</Text>
      </View>
      
      <View className='p-2 h-screen items-center justify-center'>
        <Image
          source={currentActivityPNG}
          style={{ width: 200, height: 200 }}
        />
        <Text className='mt-2'>{currentActivity}</Text>
        <Text>Time Elapsed: {timeElapsed} seconds</Text>
        <View className='mt-4'>
          <Text>Recent Activities:</Text>
          {lastActivities.map((entry, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{entry.activity} - {entry.time} seconds</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
