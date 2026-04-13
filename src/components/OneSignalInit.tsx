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
          enable: false, // Hidden to use custom dashboard integration
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
