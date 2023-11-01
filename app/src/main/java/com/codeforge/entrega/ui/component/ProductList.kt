package com.codeforge.entrega.ui.component

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
//import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.Divider
//import androidx.compose.ui.res.painterResource
//import androidx.compose.material.*
//import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import com.codeforge.entrega.data.ProductRepository
//import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.codeforge.entrega.data.CategoriesRepository
import com.codeforge.entrega.model.Category


import com.codeforge.entrega.model.Product


@Composable
fun ProductList(
    products: List<Product>,
    categories: List<Category>,
    onMenuItemClick: (id: String) -> Unit = {}
) {
    LazyColumn(
//        state = lazyListState
    ) {
        for (category in categories) {
            item {
                Text(
                    text = category.name,
//                    style = MaterialTheme.typography.h4,
                    modifier = Modifier.padding(16.dp)
                )
            }

            val menuItems = products.filter { it.categoryId == category.id }

            itemsIndexed(menuItems) { index, menuItem ->
                ProductListItem(
                    product = menuItem,
                    onClick = { onMenuItemClick(menuItem.id) },
                )
                if (index != menuItems.lastIndex)
                    Divider(modifier = Modifier.padding(horizontal = 16.dp))
            }
        }
        item {
            Spacer(modifier = Modifier.height(80.dp))
        }
    }
}

@Preview(
    name="Light Mode",
//   uiMode = Configuration.UI_MODE_NIGHT_YES
)
@Preview(showBackground = true)
@Composable
fun PreviewProductList(){
    val products = ProductRepository.getProductListData();
    val categories = CategoriesRepository.getCategoriesData();

    Column() {
        ProductList(
            categories = categories,
            products = products,
        )
    }
}