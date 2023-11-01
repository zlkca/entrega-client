package com.codeforge.entrega

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import com.codeforge.entrega.ui.screen.ProductListScreen

@Composable
fun MyApp1(){
    ProductListScreen();
}
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent{
            MyApp1()
        }
    }
}