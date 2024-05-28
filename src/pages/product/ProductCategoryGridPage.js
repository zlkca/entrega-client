
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { categoryAPI } from "../../services/categoryAPI";
import ProductCategoryGrid from "../../components/product/ProductCategoryGrid";
import PageContainer from "../../components/PageContainer";
import TopBar from "../../components/TopBar";
import { selectCart } from "../../redux/cart/cart.selector";


export default function ProductCategoryGridPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const cart = useSelector(selectCart);

    const [catMap, setCatMap] = useState();


    useEffect(() => {
          categoryAPI.fetchCategoryMap({}).then((r) => {
            if (r.status == 200) {
              setCatMap(r.data);
            }
          });
    }, []);

    return (
      <div>
        <TopBar />
        <PageContainer>
            {/* <TopBar /> */}
            <ProductCategoryGrid categoryMap={catMap} />
        </PageContainer>
      </div>
    );
}
