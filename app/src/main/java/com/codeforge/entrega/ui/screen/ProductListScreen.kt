package com.codeforge.entrega.ui.screen

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.codeforge.entrega.data.CategoriesRepository
import com.codeforge.entrega.data.ProductRepository
import com.codeforge.entrega.ui.component.CartButton
import com.codeforge.entrega.ui.component.ProductList

@Composable
fun ProductListScreen(){
    val products = ProductRepository.getProductListData();
    val categories = CategoriesRepository.getCategoriesData();

//    Scaffold(
//        content = {

    Column() {
        ProductList(
            categories = categories,
            products = products,
        )

//        AnimatedVisibility(
//            visible = products.any { it.quantity > 0 },
//            enter = slideInVertically(
//                initialOffsetY = { it * 2 }
//            ),
//            exit = slideOutVertically(
//                targetOffsetY = { it * 2 }
//            ),
//            modifier = Modifier
//                .padding(16.dp)
//                .align(Alignment.BottomCenter)
//        ) {
//            CartButton(
//                quantity = products.sumOf { it.quantity },
//                price = products.filter { it.quantity > 0 }.sumOf { it.price },
//                onClick = {}
//            )
//        }

    }
}
