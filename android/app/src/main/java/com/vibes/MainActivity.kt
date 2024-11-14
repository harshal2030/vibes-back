package com.vibes;

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.reactnativenavigation.NavigationActivity

import org.devio.rn.splashscreen.SplashScreen
import android.os.Bundle

class MainActivity : NavigationActivity() {
  // override fun getMainComponentName(): String = "vibes"

  // /** 
  //  * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
  //  * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
  //  */	   */
  // override fun createReactActivityDelegate(): ReactActivityDelegate =
  //     DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState)
    }

}
