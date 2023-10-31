package com.codeforge.entrega.model

data class Product(
    val id: String,
    val name: String,
    val price: Double,
    val imageUrl: String,
    val categoryId: String,
)

data class ProductList(
    val categories: List<Category>,
    val products: List<Product>
)