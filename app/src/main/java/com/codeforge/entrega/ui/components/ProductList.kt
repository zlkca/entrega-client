package com.codeforge.entrega.ui.components

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.Alignment
//import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
//import androidx.compose.ui.res.painterResource
//import androidx.compose.material.*
//import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import com.codeforge.entrega.data.ProductRepository
//import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import coil.compose.*
import coil.request.ImageRequest

import com.codeforge.entrega.model.Product


@Composable
fun ProductListItem(product: Product) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .wrapContentHeight()
            .padding(12.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
//        Image(
//            painter = painterResource(id = product.imageUrl),
//            contentDescription = "",
//            modifier = Modifier
//                .width(82.dp)
//                .height(82.dp)
//
//        )

        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current)
                .data(product.imageUrl)
                .crossfade(true)
                .build(), // "https://raw.githubusercontent.com/hitanshu-dhawan/McCompose/main/app/src/main/res/drawable-nodpi/menu_item_big_mac.png", //product.imageUrl,
            contentDescription = "",
            modifier = Modifier
                .width(82.dp)
                .height(82.dp)
        )
        Column(
            modifier = Modifier
                .wrapContentHeight()
                .weight(0.9f)
                .padding(horizontal = 10.dp),
            verticalArrangement = Arrangement.SpaceEvenly,
            horizontalAlignment = Alignment.Start
        ) {
            Text(
                text = product.name,
//                style = MaterialTheme.typography.h6,
//                color = colorBlack,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "${product.price}",
//                style = MaterialTheme.typography.h6,
//                color = colorRedDark,
                fontWeight = FontWeight.Bold
            )

        }
//        val counter = remember { mutableStateOf(1) }
//        Box(
//            modifier = Modifier
//                .width(110.dp)
//                .height(40.dp)
//                .clip(shape = CircleShape)
//                .background(colorRedLite)
//        ) {
//            Row(
//                modifier = Modifier
//                    .fillMaxWidth()
//                    .padding(5.dp),
//                verticalAlignment = Alignment.CenterVertically,
//                horizontalArrangement = Arrangement.SpaceBetween
//            ) {
//
//                Box(
//                    modifier = Modifier
//                        .clip(shape = CircleShape)
//                        .background(colorWhite)
//                        .size(32.dp, 32.dp),
//                    contentAlignment = Alignment.Center
//                ) {
//                    IconButton(onClick = { counter.value-- }) {
//                        Icon(
//                            imageVector = Icons.Default.Minimize,
//                            contentDescription = "",
//                            tint = colorRedDark,
//                            modifier = Modifier.size(20.dp, 20.dp)
//                        )
//                    }
//                }
//
//                Text(
//                    text = "${counter.value}",
//                    color = colorBlack,
//                    style = MaterialTheme.typography.button,
//                    fontWeight = FontWeight.Bold
//                )
//
//                Box(
//                    modifier = Modifier
//                        .clip(shape = CircleShape)
//                        .background(Color.Red)
//                        .size(32.dp, 32.dp),
//                    contentAlignment = Alignment.Center
//                ) {
//                    IconButton(onClick = {
//                        counter.value++
//                    }) {
//                        Icon(
//                            imageVector = Icons.Default.Add,
//                            contentDescription = "",
//                            tint = colorWhite,
//                            modifier = Modifier.size(20.dp, 20.dp)
//                        )
//                    }
//                }
//            }
//        }

    }

//    HorizontalDivider()
}

//@Composable
//fun HorizontalDivider() {
//    Divider(
//        color = colorRedLite, thickness = 1.dp,
//        modifier = Modifier.padding(start = 20.dp, end = 20.dp)
//    )
//
//}


@Preview(
    name="Light Mode",
//    uiMode = Configuration.UI_MODE_NIGHT_YES
)
@Preview(showBackground = true)
@Composable
fun PreviewListItem(){
    val product = ProductRepository.getProductListData().products.find { it.id == "2001" }!!

    Column() {
        ProductListItem(
            product = product
        )
    }
}