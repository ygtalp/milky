import React, { useState, useEffect } from 'react';
import { Text, Button, View } from 'react-native';
import { storeSession } from '../utils/storage';

const Chronometer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    storeSession({ startTime: new Date(), duration: time });
    setTime(0);
  };

  return (
    <View>
      <Text>{new Date(time * 1000).toISOString().substr(11, 8)}</Text>
      <Button title={isRunning ? "Pause" : "Start"} onPress={isRunning ? handlePause : handleStart} />
      <Button title="End Session" onPress={handleReset} />
    </View>
  );
};

export default Chronometer;