package com.imcity
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.zoontek.rnbootsplash.RNBootSplash
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate


class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    RNBootSplash.init(this, R.style.BootTheme)
  }

  override fun getMainComponentName(): String {
    return "imcity"
  }
}
