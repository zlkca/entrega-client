package com.codeforge.entrega

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import com.codeforge.entrega.data.ProductRepository
import com.codeforge.entrega.ui.components.ProductListItem

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MyApp1(){
    val product = ProductRepository.getProductListData().products.find { it.id == "2001" }!!

//    Scaffold(
//        content = {
            ProductListItem(
                product = product
            )
//        }
//    )
}
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)

        setContent{
            MyApp1()
        }
    }
}