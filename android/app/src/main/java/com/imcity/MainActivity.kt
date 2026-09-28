package com.imcity

import android.content.res.Configuration
import android.os.Bundle
import androidx.core.view.WindowCompat
import com.facebook.react.ReactActivity
import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.BootTheme)
    super.onCreate(savedInstanceState)
    applyLightSystemBars()
  }

  override fun onResume() {
    super.onResume()
    applyLightSystemBars()
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    applyLightSystemBars()
  }

  private fun applyLightSystemBars() {
    val controller = WindowCompat.getInsetsController(window, window.decorView)
    controller.isAppearanceLightStatusBars = true
    controller.isAppearanceLightNavigationBars = true
  }

  override fun getMainComponentName(): String {
    return "imcity"
  }
}
