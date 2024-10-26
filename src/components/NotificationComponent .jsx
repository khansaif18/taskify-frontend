import React, { useEffect } from 'react';
import { messaging } from '../service/firebase';
import { getToken } from 'firebase/messaging';

const NotificationComponent = () => {

    useEffect(() => {
        Notification.requestPermission()
            .then((permission) => {
                if (permission === 'granted') {
                    // Replace "YOUR_VAPID_KEY" with your actual VAPID key
                    getToken(messaging, { vapidKey: import.meta.env.VITE_VAP_ID_KEY })
                        .then((token) => {
                            console.log('Device token:', token);
                        })
                        .catch((error) => {
                            console.error('Error getting token:', error);
                        });
                } else {
                    console.error('Notification permission not granted');
                }
            })
            .catch((error) => {
                console.error('Permission denied or error:', error);
            });
    }, []);

    return <div className='absolute bottom-0'>Enable notifications to receive updates!</div>;
};

export default NotificationComponent;
