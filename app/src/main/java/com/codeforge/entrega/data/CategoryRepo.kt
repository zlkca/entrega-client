package com.codeforge.entrega.data

import com.codeforge.entrega.model.Category


object CategoriesRepository {
    private const val imageRoot = "https://raw.githubusercontent.com/hitanshu-dhawan/McCompose/main/app/src/main/res/drawable-nodpi/";

    fun getCategoriesData(): List<Category> {
        return listOf(
            Category(
                id = "1",
                name = "Burgers",
                imageUrl = imageRoot + "category_burgers.png"
            ),
            Category(
                id = "2",
                name = "Fries",
                imageUrl = imageRoot + "category_fries.png"
            ),
            Category(
                id = "3",
                name = "Beverages",
                imageUrl = imageRoot + "category_beverages.png"
            ),
            Category(
                id = "4",
                name = "Combo Meals",
                imageUrl = imageRoot + "category_combo_meals.png"
            ),
            Category(
                id = "5",
                name = "Happy Meals",
                imageUrl = imageRoot + "category_happy_meals.png"
            ),
            Category(
                id = "6",
                name = "Desserts",
                imageUrl = imageRoot + "category_desserts.png"
            )
        )
    }
}