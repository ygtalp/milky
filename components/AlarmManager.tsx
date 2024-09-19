import * as Notifications from 'expo-notifications';

export const scheduleLactationAlarm = async (hours: number) => {
  const triggerTime = new Date().getTime() + hours * 60 * 60 * 1000;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Lactation Reminder',
      body: 'Time for the next lactation session!',
    },
    trigger: {
      date: new Date(triggerTime),
    },
  });
};