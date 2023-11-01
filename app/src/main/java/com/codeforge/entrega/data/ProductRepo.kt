package com.codeforge.entrega.data

import com.codeforge.entrega.model.Product


object ProductRepository {
    private const val imageRoot =
        "https://raw.githubusercontent.com/hitanshu-dhawan/McCompose/main/app/src/main/res/drawable-nodpi/";

    fun getProductListData(): List<Product> {
        return listOf(
                Product(
                    id = "1001",
                    imageUrl = imageRoot + "menu_item_big_mac.png",
                    name = "Big Mac",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1002",
                    name = "Quarter Pounder with Cheese",
                    imageUrl = imageRoot + "menu_item_quarter_pounder_with_cheese.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1003",
                    name = "Double Quarter Pounder with Cheese",
                    imageUrl = imageRoot + "menu_item_double_quarter_pounder_with_cheese.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1004",
                    name = "Quarter Pounder with Cheese Deluxe",
                    imageUrl = imageRoot + "menu_item_quarter_pounder_with_cheese_deluxe.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1005",
                    name = "McDouble",
                    imageUrl = imageRoot + "menu_item_mcdouble.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1006",
                    name = "Quarter Pounder with Cheese Bacon",
                    imageUrl = imageRoot + "menu_item_quarter_pounder_with_cheese_bacon.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1007",
                    name = "Cheeseburger",
                    imageUrl = imageRoot + "menu_item_cheeseburger.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1008",
                    name = "Double Cheeseburger",
                    imageUrl = imageRoot + "menu_item_double_cheeseburger.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1009",
                    name = "Hamburger",
                    imageUrl = imageRoot + "menu_item_hamburger.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1010",
                    name = "McChicken",
                    imageUrl = imageRoot + "menu_item_mcchicken.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "1011",
                    name = "Filet-O-Fish",
                    imageUrl = imageRoot + "menu_item_filet_o_fish.png",
                    price = getRandomPrice(),
                    categoryId = "1"
                ),
                Product(
                    id = "2001",
                    name = "Small French Fries",
                    imageUrl = imageRoot + "menu_item_small_french_fries.png",
                    price = getRandomPrice(),
                    categoryId = "2"
                ),
                Product(
                    id = "2002",
                    name = "Medium French Fries",
                    imageUrl = imageRoot + "menu_item_medium_french_fries.png",
                    price = getRandomPrice(),
                    categoryId = "2"
                ),
                Product(
                    id = "2003",
                    name = "Large French Fries",
                    imageUrl = imageRoot + "menu_item_large_french_fries.png",
                    price = getRandomPrice(),
                    categoryId = "2"
                ),
                Product(
                    id = "3001",
                    name = "Coca Cola",
                    imageUrl = imageRoot + "menu_item_coca_cola.png",
                    price = getRandomPrice(),
                    categoryId = "3"
                ),
                Product(
                    id = "3002",
                    name = "Diet Coke",
                    imageUrl = imageRoot + "menu_item_diet_coke.png",
                    price = getRandomPrice(),
                    categoryId = "3"
                ),
                Product(
                    id = "3003",
                    name = "Fanta Orange",
                    imageUrl = imageRoot + "menu_item_fanta_orange.png",
                    price = getRandomPrice(),
                    categoryId = "3"
                ),
                Product(
                    id = "4001",
                    name = "Big MAC Combo Meal",
                    imageUrl = imageRoot + "menu_item_big_mac_combo_meal.png",
                    price = getRandomPrice(),
                    categoryId = "4"
                ),
                Product(
                    id = "4002",
                    name = "Filet Fish Meal",
                    imageUrl = imageRoot + "menu_item_filet_o_fish_meal.png",
                    price = getRandomPrice(),
                    categoryId = "4"
                ),
                Product(
                    id = "4003",
                    name = "Double Quarter Pounder",
                    imageUrl = imageRoot + "menu_item_double_quarter_pounder_with_cheese_meal.png",
                    price = getRandomPrice(),
                    categoryId = "4"
                ),
                Product(
                    id = "5001",
                    name = "Hamburger Happy Meal",
                    imageUrl = imageRoot + "menu_item_hamburger_happy_meal.png",
                    price = getRandomPrice(),
                    categoryId = "5"
                ),
                Product(
                    id = "5002",
                    name = "Chicken McNuggets Happy Meal",
                    imageUrl = imageRoot + "menu_item_four_piece_chicken_mcnuggets_happy_meal.png",
                    price = getRandomPrice(),
                    categoryId = "5"
                ),
                Product(
                    id = "6001",
                    name = "Kiddie Cone",
                    imageUrl = imageRoot + "menu_item_kiddie_cone.png",
                    price = getRandomPrice(),
                    categoryId = "6"
                ),
                Product(
                    id = "6002",
                    name = "Hot Caramel Sundae",
                    imageUrl = imageRoot + "menu_item_hot_caramel_sundae.png",
                    price = getRandomPrice(),
                    categoryId = "6"
                ),
            )
    }

    private fun getRandomPrice(): Double = (1..9).random() + 0.99
}