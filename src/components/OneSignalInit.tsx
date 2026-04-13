"use client";

import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

export default function OneSignalInit() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    
    if (appId && typeof window !== 'undefined') {
      OneSignal.init({
        appId: appId,
        allowLocalhostAsSecureOrigin: true, // Useful for development
        notifyButton: {
          enable: true,
          position: 'bottom-right',
          colors: {
            'circle.background': '#FF8C00', // Matching your site's orange
          }
        },
        welcomeNotification: {
          title: "Welcome to IELTS Wisdom",
          message: "Thank you for subscribing to our notifications!",
        }
      }).then(() => {
        console.log("OneSignal Initialized");
      }).catch((err) => {
        console.error("OneSignal Init Error:", err);
      });
    }
  }, []);

  return null;
}
